import React from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
	return <div>Page {params.slug}</div>
}

export default Page
