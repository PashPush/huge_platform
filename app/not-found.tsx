/* eslint-disable camelcase */
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-green-400 pb-20 text-white'>
			<h1 className='h1-bold mb-4'>Oops... Page Not Found 🧩</h1>
			<h2 className='h1-bold mb-4 text-8xl'>404</h2>
			<Link href='/' className='hover:cursor-pointer hover:text-primary-500'>
				Back to Nutri Balance
			</Link>
		</div>
	)
}
