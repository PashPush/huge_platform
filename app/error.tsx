'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Error = () => {
	return (
		<div>
			<h2 className='h2-bold mb-8'>Error. Something went wrong</h2>
			<Link href='/'>
				<Button variant='homeBtn'>Go to Home page</Button>
			</Link>
		</div>
	)
}

export default Error
