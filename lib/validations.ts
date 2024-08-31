import { z } from 'zod'
export const QuestionsSchema = z.object({
	title: z
		.string()
		.min(10, { message: 'Question must contain at least 10 character(s)' })
		.max(130, { message: 'Question must contain no more 130 character(s)' }),
	explanation: z.string().min(100),
	tags: z
		.array(z.string().min(1).max(15))
		.min(1)
		.max(3, { message: 'Must contain no more 3 TAGS' }),
})

export const AnswerSchema = z.object({
	answer: z.string().min(90),
})

export const ProfileSchema = z.object({
	name: z.string().min(5).max(50),
	username: z.string().min(5).max(50),
	bio: z.string().min(10).max(150),
	portfolioWebsite: z.string().url(),
	location: z.string().min(5).max(50),
})

export const TagSchema = z.object({
	name: z.string().max(15),
	description: z.string().max(150),
})
