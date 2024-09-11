import RightSidebarCollection from '@/components/shared/sidebars/RightSidebarCollection'
import React from 'react'
import InnerLayout from '../innerLayout'

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<InnerLayout>{children}</InnerLayout>
			<RightSidebarCollection />
		</>
	)
}

export default layout
