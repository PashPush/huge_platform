import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Tag from '@/components/forms/Tag'
import { getTagByName } from '@/lib/actions/tag.actions'

type Props = {
	params: { name: string }
}

const Page = async ({ params }: Props) => {
	const { userId } = auth()

	if (!userId || userId !== process.env.ADMIN_ID) redirect('/')

	const result = await getTagByName(params.name)

	return (
		<>
			<h1 className='h1-bold text-dark100_light900'>Edit Tag</h1>

			<div className='mt-9'>
				<Tag tagDetails={JSON.stringify(result)} />
			</div>
		</>
	)
}

export default Page
