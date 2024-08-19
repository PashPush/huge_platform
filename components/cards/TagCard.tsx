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
				href={`/tags/${tag.name}`}
				className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'
			>
				<div className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border p-8 '>
					<div>
						<Badge className='h2-bold background-light800_dark400 text-dark200_light900 cursor-pointer rounded-none border-none px-4 py-2 uppercase'>
							{tag.name}
						</Badge>
						<p className='body-medium text-dark200_light900 mt-4'>
							{tag?.description}
						</p>
						<p className='body-regular text-dark500_light500 mt-4'>
							<span className='paragraph-medium text-primary-500'>
								{tag.questions.length}+
							</span>{' '}
							Questions
						</p>
					</div>
				</div>
			</Link>
		</>
	)
}

export default TagCard
