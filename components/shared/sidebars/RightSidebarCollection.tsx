import React from 'react'
import RenderTag from '../RenderTag'
import { getTopPopularTags, userFollowedTags } from '@/lib/actions/tag.actions'
import SidebarLayout from './SidebarLayout'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.action'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const RightSidebarCollection = async () => {
	const { userId: clerkId } = auth()

	let mongoUser
	let tagList

	if (clerkId) {
		mongoUser = await getUserById({ userId: clerkId })
		tagList = await userFollowedTags(mongoUser._id)
		console.log(tagList)
	} else {
		return null
	}

	const popularTags = await getTopPopularTags()

	return (
		<SidebarLayout>
			<div>
				<h3 className='h3-bold text-dark200_light900'>
					Отслеживаемые Вами теги
				</h3>
				<div className='mt-7 flex w-full flex-wrap gap-[20px]'>
					{tagList?.map((tag: any) => {
						let unseen = ''
						if (tag.unseenQuestions.length > 0) {
							unseen = `?unseen=${JSON.stringify(tag.unseenQuestions)}`
						}
						return (
							<Link
								href={`/tags/${tag.name}${unseen}`}
								key={tag.name}
								className='flex justify-between relative gap-2'
							>
								<Badge>{tag.name}</Badge>
								{tag.unseenQuestions.length > 0 && (
									<span className='absolute border rounded-xl bg-primary-500 text-white text-[10px] -top-2 -right-1 size-4 px-1 font-bold'>
										{tag.unseenQuestions.length}
									</span>
								)}
							</Link>
						)
					})}
					{/* padding: 1px 5px;
    border: 1px solid #47b756;
    border-radius: 50%;
    background: #33bf79;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    position: relative;
    right: 18px;
    top: -7px;
    width: 18px;
    height: 18px; */}
				</div>
			</div>
			<div className='mt-16'>
				<h3 className='h3-bold text-dark200_light900'>Популярные теги</h3>
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

export default RightSidebarCollection
