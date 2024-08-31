'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
	tagName: string
}

const EditTagAction = ({ tagName }: Props) => {
	const router = useRouter()

	const handleEdit = async () => {
		router.push(`/tags/edit/${JSON.parse(tagName)}`)
	}
	return (
		<Image
			src='/assets/icons/edit.svg'
			alt='Edit'
			width={32}
			height={32}
			className='absolute right-1 top-1 cursor-pointer object-contain p-2'
			onClick={handleEdit}
		/>
	)
}

export default EditTagAction
