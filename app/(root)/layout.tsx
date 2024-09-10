import LeftSidebar from '@/components/shared/sidebars/LeftSidebar'
import Navbar from '@/components/shared/navbar/Navbar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='background-light850_dark100 relative'>
			<Navbar />
			<div className='flex'>
				<LeftSidebar />
				<div className='flex flex-1 flex-col xl:flex-row'>{children}</div>
			</div>
			<Toaster />
		</main>
	)
}

export default Layout
