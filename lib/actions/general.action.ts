'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { SearchParams } from './shared.types'
import User from '@/database/user.model'
import Tag from '@/database/tag.model'
import Answer from '@/database/answer.model'
import { shieldingRegExp } from '../utils'

const SearchableTypes = ['question', 'user', 'answer', 'tag']

export async function globalSearch(params: SearchParams) {
	try {
		await connectToDatabase()

		const { query, type } = params

		const shieldedQuery = query && shieldingRegExp(query, 'gi')

		let results = []

		const modelsAndTypes = [
			{ model: Question, searchField: 'title', type: 'question' },
			{ model: User, searchField: 'name', type: 'user' },
			{ model: Answer, searchField: 'content', type: 'answer' },
			{ model: Tag, searchField: 'name', type: 'tag' },
		]

		const typeLower = type?.toLowerCase()

		if (!typeLower || !SearchableTypes.includes(typeLower)) {
			for (const { model, searchField, type } of modelsAndTypes) {
				const queryResults = await model
					.find({ [searchField]: shieldedQuery })
					.limit(2)
				results.push(
					...queryResults.map((item) => ({
						title:
							type === 'answer'
								? `Answers containing ${query}`
								: item[searchField],
						type,
						id:
							type === 'user'
								? item.clerkId
								: type === 'answer'
									? item.question
									: item.name, // used name except _id for alias for tags
					}))
				)
			}
		} else {
			const modelInfo = modelsAndTypes.find((item) => item.type === type)
			if (!modelInfo) {
				throw new Error('invalid search type')
			}

			const queryResults = await modelInfo.model
				.find({
					[modelInfo.searchField]: shieldedQuery,
				})
				.limit(8)

			results = queryResults.map((item) => ({
				title:
					type === 'answer'
						? `Answers containing ${query}`
						: item[modelInfo.searchField],
				type,
				id:
					type === 'user'
						? item.clerkId
						: type === 'answer'
							? item.question
							: item.name, // used name except _id for alias for tags
			}))
		}
		return JSON.stringify(results)
	} catch (error) {
		console.log('Error fetching global results: ', error)
		throw new Error()
	}
}
