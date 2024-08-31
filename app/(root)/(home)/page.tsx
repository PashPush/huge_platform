import HomeFilters from '@/components/Home/HomeFilters'
import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Button } from '@/components/ui/button'
import { HomePageFilters } from '@/constants/filters'
import {
	getQuestions,
	getRecommendedQuestions,
} from '@/lib/actions/question.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'

export const metadata: Metadata = {
	title: 'Home',
}

export default async function Home({ searchParams }: SearchParamsProps) {
	const { userId } = auth()
	let result

	if (searchParams?.filter === 'recommended') {
		if (userId) {
			result = await getRecommendedQuestions({
				userId,
				searchQuery: searchParams.q,
				page: searchParams.page ? +searchParams.page : 1,
			})
		} else {
			result = { questions: [], isNext: false }
		}
	} else {
		result = await getQuestions({
			searchQuery: searchParams.q,
			filter: searchParams.filter,
			page: searchParams.page ? +searchParams.page : 1,
		})
	}

	return (
		<>
			<div className='flex w-full flex-row justify-between gap-4 '>
				<h1 className='h1-bold text-dark100_light900 min-w-fit'>
					All Questions
				</h1>
				<Link href='/ask-question' className='flex justify-end max-sm:w-full'>
					<Button variant='homeBtn'>Ask a Question</Button>
				</Link>
			</div>
			<div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
				<LocalSearchbar
					route='/'
					placeholder='Search for questions'
					otherClasses='flex-1'
				/>

				<Filter
					filters={HomePageFilters}
					otherClasses='min-h-[56px] sm:min-w-[170px]'
					containerclasses='hidden max-md:flex'
				/>
			</div>
			<HomeFilters />
			<div className='mt-10 flex w-full flex-col gap-6'>
				{result.questions.length > 0 ? (
					result.questions.map((question) => (
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
				) : (
					<NoResult
						title='There’s no question to show'
						description='Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡'
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
