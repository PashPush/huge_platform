'use client'
import React from 'react'
import Image from 'next/image'
import { toggleFollowTag } from '@/lib/actions/tag.actions'
import { usePathname } from 'next/navigation'
import { toast } from '../ui/use-toast'
import { Button } from '../ui/button'

type Props = {
	userId: string
	tagName: string
	hasFollowed: boolean
}
const FollowTag = ({ userId, tagName, hasFollowed }: Props) => {
	const pathname = usePathname()
	const handleSave = async () => {
		await toggleFollowTag({
			tagName: JSON.parse(tagName),
			userId: JSON.parse(userId),
			hasFollowed,
			path: pathname,
		})

		return toast({
			title: `The tag ${!hasFollowed ? 'added to ' : 'removed from '}following`,
			variant: 'success',
		})
	}

	return (
		<Button
			variant='editProfile'
			onClick={handleSave}
			className='flex justify-between'
		>
			{hasFollowed ? 'Отслеживается' : 'Отслеживать тег'}
			<Image
				src={
					hasFollowed
						? '/assets/icons/tag-red.svg'
						: '/assets/icons/tag-grey.svg'
				}
				width={24}
				height={24}
				alt='star'
				className='fill-green-900'
			/>
		</Button>
	)
}

export default FollowTag
