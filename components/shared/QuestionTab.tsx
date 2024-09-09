import { getUserQuestions } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import React from 'react'
import QuestionCard, { QuestionProps } from '../cards/QuestionCard'
import Pagination from './Pagination'
import NoResult from './NoResult'

interface Props extends SearchParamsProps {
	userId: string
	clerkId?: string | null
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
	const result = await getUserQuestions({
		userId,
		page: searchParams.page ? +searchParams.page : 1,
	})

	if (result.questions.length > 0) {
		return (
			<>
				{result.questions.map((question: QuestionProps) => (
					<QuestionCard
						key={question._id}
						_id={question._id}
						clerkId={clerkId}
						title={question.title}
						tags={question.tags}
						author={question.author}
						upvotes={question.upvotes}
						views={question.views}
						answers={question.answers}
						createdAt={question.createdAt}
					/>
				))}
				<div className='mt-10'>
					<Pagination
						pageNumber={searchParams?.page ? +searchParams.page : 1}
						isNext={result.isNext || false}
					/>
				</div>
			</>
		)
	} else {
		return (
			<NoResult
				title='No questions yet'
				description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved! 💡'
				link='/ask-question'
				linkTitle='Ask a question'
				showImage={false}
			/>
		)
	}
}

export default QuestionTab
