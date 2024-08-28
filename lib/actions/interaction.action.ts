'use server'

import Question from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { ViewQuestionParams } from './shared.types'
import Interaction from '@/database/interaction.model'
import User from '@/database/user.model'

const reputationBonuses = [
	{ views: 100, bonus: 50 },
	{ views: 500, bonus: 100 },
	{ views: 1000, bonus: 150 },
	{ views: 10000, bonus: 200 },
	{ views: 25000, bonus: 300 },
]

export async function viewQuestion(params: ViewQuestionParams) {
	try {
		await connectToDatabase()

		const { questionId, userId } = params

		if (userId) {
			const existingInteraction = await Interaction.findOne({
				user: userId,
				action: 'view',
				question: questionId,
			})

			if (existingInteraction) return console.log('User has already viewed.')

			// Update view count for the question and make a bonus if many views
			Question.findByIdAndUpdate(questionId, {
				$inc: { views: 1 },
			}).then(async (question) => {
				for (const score of reputationBonuses) {
					if (question?.views === score.views) {
						await User.findByIdAndUpdate(question.author, {
							$inc: { reputation: score.bonus },
						})
						await Interaction.create({
							user: userId,
							action: 'viewBonus',
							question: questionId,
						})
					}
				}
			})

			// Create interaction
			await Interaction.create({
				user: userId,
				action: 'view',
				question: questionId,
			})
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
