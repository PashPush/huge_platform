/* eslint-disable camelcase */
import Link from 'next/link'
import React from 'react'

export default function NotFound({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex flex-col min-h-screen justify-center items-center pb-20 bg-blue-300 text-white'>
			<h1 className='h1-bold mb-4'>Oops... Page Not Found 🧩</h1>
			<h2 className='h1-bold text-8xl mb-4'>404</h2>
			<Link href='/' className='hover:cursor-pointer hover:text-primary-500'>
				Back to ShareKnowledge
			</Link>
		</div>
	)
}
