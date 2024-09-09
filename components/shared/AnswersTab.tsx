import { getUserAnswers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import AnswerCard from '../cards/AnswerCard'
import Pagination from './Pagination'
import NoResult from './NoResult'

interface Props extends SearchParamsProps {
	userId: string
	clerkId?: string | null
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
	const result = await getUserAnswers({
		userId,
		page: searchParams.pageAnswers ? +searchParams.pageAnswers : 1,
	})

	if (result.answers.length > 0) {
		return (
			<>
				{result.answers.map((item) => (
					<AnswerCard
						key={item._id}
						clerkId={clerkId}
						_id={item._id}
						question={item.question}
						author={item.author}
						upvotes={item.upvotes.length}
						createdAt={item.createdAt}
					/>
				))}
				<div className='mt-10'>
					<Pagination
						pageNumber={
							searchParams?.pageAnswers ? +searchParams.pageAnswers : 1
						}
						isNext={result.isNext || false}
						isAnswersTab
					/>
				</div>
			</>
		)
	} else {
		return (
			<NoResult
				title='No answers yet'
				description='Go to the Home page, choose an interesting question and participate in discussion ☀️'
				link='/'
				linkTitle='Explore questions'
				showImage={false}
			/>
		)
	}
}

export default AnswersTab
