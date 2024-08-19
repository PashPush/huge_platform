import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface Props {
	_id: string | number
	name: string
	totalQuestions?: number
	showCount?: boolean
	linked?: boolean
}

const RenderTag = ({
	_id,
	name,
	totalQuestions,
	showCount,
	linked = true,
}: Props) => {
	if (linked) {
		return (
			<Link href={`/tags/${name}`} className='flex justify-between gap-2'>
				<Badge className='subtle-medium background-light800_dark300 text-light400_light500 cursor-pointer rounded-md border-none px-4 py-2 uppercase'>
					{name}
				</Badge>
				{showCount && (
					<p className='small-medium text-dark500_light700'>{totalQuestions}</p>
				)}
			</Link>
		)
	} else {
		return (
			<div className='flex justify-between gap-2'>
				<Badge className='subtle-medium background-light800_dark300 text-light400_light500 cursor-pointer rounded-md border-none px-4 py-2 uppercase'>
					{name}
				</Badge>
				{showCount && (
					<p className='small-medium text-dark500_light700'>{totalQuestions}</p>
				)}
			</div>
		)
	}
}

export default RenderTag
