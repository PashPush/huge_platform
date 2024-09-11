import QuestionCard from '@/components/cards/QuestionCard'
import FollowTag from '@/components/shared/FollowTag'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { getQuestionsByTagName, getTagByName } from '@/lib/actions/tag.actions'
import { getUserById } from '@/lib/actions/user.action'
import { TAGProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'

type Props = { params: { name: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return {
		title: `${params.name} | Tag`,
	}
}

const Page = async ({ params, searchParams }: TAGProps) => {
	const { userId: clerkId } = auth()
	const result = await getQuestionsByTagName({
		name: params.name,
		page: searchParams.page ? +searchParams.page : 1,
		searchQuery: searchParams.q,
	})

	let unseen: string[] | undefined

	if (searchParams.unseen) {
		unseen = JSON.parse(searchParams.unseen)
		console.log('UNSEEN: ', unseen, 'QUWEURSUR: ', result.questions)
	}

	const currentTag = await getTagByName(params.name)

	let mongoUser

	if (clerkId) {
		mongoUser = await getUserById({ userId: clerkId })
	}

	return (
		<>
			<div className='flex justify-between'>
				<h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>
				<FollowTag
					tagName={JSON.stringify(params.name)}
					userId={JSON.stringify(mongoUser?._id)}
					hasFollowed={currentTag?.followers.includes(mongoUser?._id)}
				/>
			</div>
			<div className='mt-11 w-full'>
				<LocalSearchbar
					route={`/tags/${params.name}`}
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
							isUnseen={unseen?.includes(question._id.toString())}
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
