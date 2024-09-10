import React from 'react'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className='xl:background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto p-6 shadow-light-300 dark:shadow-none max-xl:right-auto max-xl:top-auto max-xl:inline-block max-xl:min-h-screen max-xl:w-full max-xl:flex-1 max-xl:px-6 max-xl:pb-6 max-lg:px-14 max-sm:px-4 max-sm:pt-0 max-xs:mt-24 xl:border-l xl:pt-36'>
			<div className='max-xl:card-wrapper max-xl:mx-auto max-xl:w-full max-xl:max-w-5xl max-xl:p-9'>
				{children}
			</div>
		</section>
	)
}

export default SidebarLayout
