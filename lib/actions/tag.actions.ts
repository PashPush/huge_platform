'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
	GetAllTagsParams,
	GetQuestionsByTagIdParams,
	GetTopInteractedTagsParams,
} from './shared.types'
import Tag, { ITag } from '@/database/tag.model'
import Question, { IQuestion } from '@/database/question.model'
import { FilterQuery } from 'mongoose'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		connectToDatabase()

		const { userId } = params

		const user = await User.findById(userId)

		if (!user) throw new Error('User not found')

		// Find interactions for the user and group by tags...
		// Interaction...

		return [
			{ _id: '1', name: 'tag' },
			{ _id: '2', name: 'tag2' },
		]
	} catch (error) {
		console.log(error)
		throw error
	}
}

export async function getTagName(tagId: string) {
	try {
		connectToDatabase()

		const name = await Tag.findById(tagId)

		if (!name) throw new Error('Tag not found')

		// Find interactions for the user and group by tags...
		// Interaction...

		return name.name
	} catch (error) {
		console.log(error)
		throw Error
	}
}

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase()

		const { searchQuery, filter, page = 1, pageSize = 4 } = params

		const skipAmount = (page - 1) * pageSize

		const query: FilterQuery<ITag> = {}

		if (searchQuery) {
			query.$or = [
				{ name: { $regex: new RegExp(searchQuery, 'i') } },
				{ description: { $regex: new RegExp(searchQuery, 'i') } },
			]
		}

		let sortOptions = {}

		switch (filter) {
			case 'popular':
				sortOptions = { questions: -1 }
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
				break
		}
		const tags = await Tag.find(query)
			.skip(skipAmount)
			.limit(pageSize)
			.sort(sortOptions)

		const totalQuestions = await Tag.countDocuments(query)

		const isNext = totalQuestions > skipAmount + tags.length
		return { tags, isNext }
	} catch (error) {
		console.log(error)
		throw error
	}
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
	try {
		connectToDatabase()

		const { tagId, searchQuery, page = 1, pageSize = 4 } = params

		const skipAmount = (page - 1) * pageSize

		const tagFilter: FilterQuery<ITag> = { _id: tagId }

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
