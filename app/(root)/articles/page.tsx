import Filter from '@/components/shared/Filter'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'
import React from 'react'

const Page = () => {
	return (
		<>
			<div className='flex w-full flex-row justify-between gap-4 '>
				<h1 className='h1-bold text-dark100_light900 min-w-fit'>Статьи</h1>
			</div>
			<div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
				<LocalSearchbar
					route='/articles'
					placeholder='Search for questions'
					otherClasses='flex-1'
				/>

				<Filter
					filters={HomePageFilters}
					otherClasses='min-h-[56px] sm:min-w-[170px]'
					containerclasses='hidden max-md:flex'
				/>
			</div>
			<div className='mt-10 flex w-full flex-col gap-6'>
				<div className='card-wrapper rounded-[10px] p-9 sm:px-11'>
					<div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
						<div>
							<span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden'>
								TIME
							</span>
							<Link href={`/question/123`}>
								<h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
									TITLE
								</h3>
							</Link>
						</div>
					</div>

					<div className='mt-3.5 flex flex-wrap gap-2'>TAGS</div>

					<div className='flex-between mt-6 w-full flex-wrap gap-3'>
						AUTHOR
						<div className='max-sm: flex flex-wrap items-center gap-3 max-sm:justify-start'>
							Metrics
						</div>
					</div>
				</div>
			</div>
			<div className='mt-10'>Pagination</div>
		</>
	)
}

export default Page
