import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

type Props = {
	title?: string
}

const ErrorPage = ({ title = 'Something went wrong' }: Props) => {
	const router = useRouter()
	return (
		<div>
			<h2 className='h2-bold mb-8'>Error. {title}</h2>
			<Button
				variant='homeBtn'
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => router.back()
				}
			>
				Go back
			</Button>
		</div>
	)
}

export default ErrorPage
