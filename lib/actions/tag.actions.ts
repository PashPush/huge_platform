'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
	EditTagParams,
	GetAllTagsParams,
	GetQuestionsByTagNameParams,
	GetTopInteractedTagsParams,
} from './shared.types'
import Tag, { ITag } from '@/database/tag.model'
import Question, { IQuestion } from '@/database/question.model'
import { FilterQuery } from 'mongoose'
import Interaction from '@/database/interaction.model'
import { shieldingRegExp } from '../utils'
import { revalidatePath } from 'next/cache'
import { ITEMS_PER_PAGE } from '@/constants'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		connectToDatabase()

		const { userId } = params

		const user = await User.findById(userId)

		if (!user) throw new Error('User not found')

		// Find the user's interactions
		const userInteractions = await Interaction.find({ user: user._id })
			.populate('tags')
			.exec()

		// Extract tags from user's interactions
		const userTags = userInteractions.reduce((tags, interaction) => {
			if (interaction.tags) {
				tags = tags.concat(interaction.tags)
			}
			return tags
		}, [])

		const reducer = (map: any, item: any) => {
			if (map[item._id] == null) {
				map[item._id] = { _id: item._id, name: item.name, amount: 1 }
			} else {
				map[item._id].amount++
			}
			return map
		}
		const userTagsMap = userTags.reduce(reducer, {})
		const userTagsArray = Object.values(userTagsMap)
			.sort((a: any, b: any) => b.amount - a.amount)
			.slice(0, 3)

		for (const item of userTagsArray) {
			// @ts-ignore
			delete item.amount
		}

		return userTagsArray
	} catch (error) {
		console.log(error)
		throw error
	}
}

export async function getTagByName(name: string) {
	try {
		connectToDatabase()

		const tagName = await Tag.findOne({ name })

		if (!tagName) throw new Error('Tag not found')

		// Find interactions for the user and group by tags...
		// Interaction...

		return tagName
	} catch (error) {
		console.log(error)
		throw Error
	}
}

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase()

		const { searchQuery, filter, pageSize = ITEMS_PER_PAGE } = params
		let { page = 1 } = params
		if (page < 1) page = 1

		const skipAmount = (page - 1) * pageSize

		const query: FilterQuery<ITag> = {}

		if (searchQuery) {
			const shieldedQuery = shieldingRegExp(searchQuery, 'gi')
			query.$or = [
				{ name: { $regex: shieldedQuery } },
				{ description: { $regex: shieldedQuery } },
			]
		}

		let sortOptions = {}

		switch (filter) {
			case 'popular':
				sortOptions = { questionsCount: -1 }
				break
			case 'recent':
				sortOptions = { createdOn: -1 }
				break
			case 'name':
				sortOptions = { name: 1 }
				break
			case 'old':
				sortOptions = { createdOn: 1 }
				break

			default:
				sortOptions = { createdOn: 1 }
				break
		}

		const tags = await Tag.aggregate([
			{ $match: query },
			{
				$addFields: {
					questionsCount: { $size: '$questions' },
				},
			},
			{ $sort: sortOptions },
			{ $skip: skipAmount },
			{ $limit: pageSize },
		]).exec()

		tags.forEach((tag) => {
			delete tag.followers
			delete tag.questions
		})

		const totalQuestions = await Tag.countDocuments(query)

		const isNext = totalQuestions > skipAmount + tags.length
		return { tags, isNext }
	} catch (error) {
		console.log(error)
		throw error
	}
}

export async function getQuestionsByTagName(
	params: GetQuestionsByTagNameParams
) {
	try {
		connectToDatabase()

		const { name, searchQuery, pageSize = ITEMS_PER_PAGE } = params
		let { page = 1 } = params
		page < 1 && (page = 1)

		const skipAmount = (page - 1) * pageSize

		const tagFilter: FilterQuery<ITag> = { name: name }

		const query: FilterQuery<IQuestion> = {}

		if (searchQuery) {
			query.$or = [
				{ title: { $regex: searchQuery, $options: 'i' } },
				{ content: { $regex: searchQuery, $options: 'i' } },
			]
		}

		const tag = await Tag.findOne(tagFilter).populate({
			path: 'questions',
			model: Question,
			match: query,
			options: {
				skip: skipAmount,
				limit: pageSize,
				sort: { createdAt: -1 },
			},
			populate: [
				{ path: 'tags', model: Tag, select: '_id name' },
				{ path: 'author', model: User, select: '_id clerkId name picture' },
			],
		})

		if (!tag) {
			throw new Error('Tag not found')
		}

		const currentTag = await Tag.findOne(tagFilter).populate({
			path: 'questions',
			model: Question,
			match: query,
			options: {
				sort: { createdAt: -1 },
			},
			populate: [
				{ path: 'tags', model: Tag, select: '_id name' },
				{ path: 'author', model: User, select: '_id clerkId name picture' },
			],
		})

		const totalQuestions = currentTag.questions.length

		const isNext = totalQuestions > skipAmount + pageSize
		const questions = tag.questions

		return { tagTitle: tag.name, questions, isNext }
	} catch (error) {
		console.log(error)
		throw error
	}
}

export async function getTopPopularTags() {
	try {
		connectToDatabase()

		const popularTags = await Tag.aggregate([
			{ $project: { name: 1, numberOfQuestions: { $size: '$questions' } } },
			{ $sort: { numberOfQuestions: -1 } },
			{ $limit: 5 },
		])

		return popularTags
	} catch (error) {
		console.log(error)
		throw error
	}
}

export async function editTag(params: EditTagParams) {
	try {
		connectToDatabase()

		const { tagId, name, description, path } = params

		const tag = await Tag.findById(tagId)

		if (!tag) {
			throw new Error('Tag not found')
		}

		tag.name = name
		tag.description = description

		await tag.save()

		revalidatePath(path)
	} catch (error) {
		console.log(error)
	}
}
