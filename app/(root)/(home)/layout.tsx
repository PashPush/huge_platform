import RightSidebarHome from '@/components/shared/sidebars/RightSidebarHome'
import React from 'react'
import InnerLayout from '../innerLayout'

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<InnerLayout>{children}</InnerLayout>
			<RightSidebarHome />
		</>
	)
}

export default layout
