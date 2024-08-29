import Link from 'next/link'
import { Badge } from '../ui/badge'

interface Props {
	tag: {
		_id: string
		name: string
		description: string
		questions: {
			_id: string
		}[]
	}
}

const TagCard = async ({ tag }: Props) => {
	return (
		<>
			<Link
				href={`/tags/${tag._id}`}
				className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'
			>
				<article className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
					<Badge variant='tagTitle'>{tag.name}</Badge>
					<p className='small-regular text-dark300_light900 mt-4'>
						{tag.description}
					</p>

					<p className='small-medium text-dark400_light500 mt-3.5'>
						<span className='body-semibold primary-text-gradient mr-2.5'>
							{tag.questions.length}+
						</span>{' '}
						Questions
					</p>
				</article>
			</Link>
		</>
	)
}

export default TagCard
