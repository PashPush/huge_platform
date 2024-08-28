import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { getQuestionsByTagId, getTagName } from '@/lib/actions/tag.actions'
import { URLProps } from '@/types'
import type { Metadata } from 'next'

type Props = { params: { id: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const tagName = await getTagName(params.id)
	return {
		title: `${tagName} | Tag`,
	}
}

const Page = async ({ params, searchParams }: URLProps) => {
	const result = await getQuestionsByTagId({
		tagId: params.id,
		page: searchParams.page ? +searchParams.page : 1,
		searchQuery: searchParams.q,
	})

	return (
		<>
			<h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>

			<div className='mt-11 w-full'>
				<LocalSearchbar
					route={`/tags/${params.id}`}
					iconPosition='left'
					imgsrc='/assets/icons/search.svg'
					placeholder='Search tag questions'
					otherClasses='flex-1'
				/>
			</div>

			<div className='mt-10 flex w-full flex-col gap-6'>
				{result.questions.length > 0 ? (
					result.questions.map((question: any) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : !searchParams.q ? (
					<NoResult
						title='There’s no tag question saved to show'
						description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
						link='/ask-question'
						linkTitle='Ask a Question'
					/>
				) : (
					<NoResult
						title='No tag question found'
						description='Be the first to break the silence with this tag! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
						link='/ask-question'
						linkTitle='Ask a Question'
					/>
				)}
			</div>
			<div className='mt-10'>
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={result.isNext || false}
				/>
			</div>
		</>
	)
}

export default Page
