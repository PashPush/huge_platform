import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTag from '../RenderTag'
import { getHotQuestions } from '@/lib/actions/question.action'
import { getTopPopularTags } from '@/lib/actions/tag.actions'
import SidebarLayout from './SidebarLayout'

const RightSidebar = async () => {
	const hotQuestions = await getHotQuestions()
	const popularTags = await getTopPopularTags()

	return (
		<SidebarLayout>
			<div>
				<h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
				<div className='mt-7 flex w-full flex-col gap-[30px]'>
					{hotQuestions.map((question) => (
						<Link
							href={`/question/${question._id}`}
							key={question._id}
							className='flex cursor-pointer items-center justify-between gap-7'
						>
							<p className='body-medium text-dark500_light700'>
								{question.title}
							</p>
							<Image
								src='/assets/icons/chevron-right.svg'
								alt='chevron right'
								width={20}
								height={20}
								className='invert-colors'
							/>
						</Link>
					))}
				</div>
			</div>
			<div className='mt-16'>
				<h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
				<div className='mt-7 flex flex-col gap-4'>
					{popularTags.map((tag) => (
						<RenderTag
							key={tag._id}
							name={tag.name}
							totalQuestions={tag.numberOfQuestions}
							showCount
						/>
					))}
				</div>
			</div>
		</SidebarLayout>
	)
}

export default RightSidebar
