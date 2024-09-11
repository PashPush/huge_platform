import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface Props {
	name: string
	totalQuestions?: number
	showCount?: boolean
	linked?: boolean
}

const RenderTag = ({
	name,
	totalQuestions,
	showCount,
	linked = true,
}: Props) => {
	if (linked) {
		return (
			<Link href={`/tags/${name}`} className='flex justify-between gap-2'>
				<Badge>{name}</Badge>
				{showCount && (
					<p className='small-medium text-dark500_light700'>{totalQuestions}</p>
				)}
			</Link>
		)
	} else {
		return (
			<div className='flex justify-between gap-2'>
				<Badge>{name}</Badge>
				{showCount && (
					<p className='small-medium text-dark500_light700'>{totalQuestions}</p>
				)}
			</div>
		)
	}
}

export default RenderTag
