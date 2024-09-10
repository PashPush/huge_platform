import React from 'react'

const InnerLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className='flex flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 xl:min-h-screen'>
			<div className='mx-auto w-full max-w-5xl'>{children}</div>
		</section>
	)
}

export default InnerLayout
