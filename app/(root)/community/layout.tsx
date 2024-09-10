import RightSidebar from '@/components/shared/sidebars/RightSidebar'
import React from 'react'
import InnerLayout from '../innerLayout'

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<InnerLayout>{children}</InnerLayout>
			<RightSidebar />
		</>
	)
}

export default layout
