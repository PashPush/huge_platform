import Link from 'next/link'
import { Badge } from '../ui/badge'
import { currentUser } from '@clerk/nextjs/server'
import EditTagAction from '../shared/EditTagAction'

interface Props {
	tag: {
		_id: string
		name: string
		description: string
		questionsCount: number
	}
}

const TagCard = async ({ tag }: Props) => {
	const user = await currentUser()
	return (
		<div className='relative'>
			{user
				? user?.id === process.env.ADMIN_ID && (
						<EditTagAction tagName={JSON.stringify(tag.name)} />
					)
				: ''}
			<Link
				href={`/tags/${tag.name}`}
				className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'
			>
				<article className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
					<Badge variant='tagTitle'>{tag.name}</Badge>
					<p className='small-regular text-dark300_light900 mt-4'>
						{tag.description}
					</p>

					<p className='small-medium text-dark400_light500 mt-3.5'>
						<span className='body-semibold primary-text-gradient mr-2.5'>
							{tag.questionsCount}+
						</span>{' '}
						Questions
					</p>
				</article>
			</Link>
		</div>
	)
}

export default TagCard
