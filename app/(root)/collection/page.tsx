import QuestionCard from '@/components/cards/QuestionCard'
import Filter from '@/components/shared/Filter'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Collections',
}

export default async function Collection({ searchParams }: SearchParamsProps) {
	const { userId } = auth()

	if (!userId)
		return (
			<section className='mt-12 flex flex-wrap gap-4'>
				<div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
					Для просмотра добавленного в избранное необходимо{' '}
					<Link href='/sign-in' className='mt-2 font-bold text-accent-blue'>
						Войти
					</Link>
					{' или '}
					<Link href='/sign-up' className='mt-2 font-bold text-accent-blue'>
						Зарегистрироваться
					</Link>
				</div>
			</section>
		)

	const result = await getSavedQuestions({
		clerkId: userId,
		searchQuery: searchParams.q,
		filter: searchParams.filter,
		page: searchParams.page ? +searchParams.page : 1,
	})

	return (
		<>
			<h1 className='h1-bold text-dark100_light900'>Избранное</h1>

			<div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
				<LocalSearchbar
					route='/collection'
					placeholder='Search for questions'
					otherClasses='flex-1'
				/>

				<Filter
					filters={QuestionFilters}
					otherClasses='min-h-[56px] sm:min-w-[170px]'
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
				) : (
					<NoResult
						title='There’s no question saved to show'
						description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the next big thing others learn from. Get involved! 💡'
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
