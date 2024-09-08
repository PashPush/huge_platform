import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface Props {
	title: string
	description?: string
	link: string
	linkTitle: string
	showImage?: boolean
}

const NoResult = ({
	title,
	description,
	link,
	linkTitle,
	showImage = true,
}: Props) => {
	return (
		<div className='mt-10 flex w-full flex-col items-center justify-center'>
			{showImage && (
				<>
					<Image
						src='/assets/images/light-illustration.png'
						alt='No result illustration'
						width={270}
						height={200}
						className='mb-8 block object-contain dark:hidden'
					/>
					<Image
						src='/assets/images/dark-illustration.png'
						alt='No result illustration'
						width={270}
						height={200}
						className='mb-8 hidden object-contain dark:flex'
					/>
				</>
			)}
			<h2 className='h2-bold text-dark200_light900'>{title} </h2>
			<p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>
				{description}
			</p>
			<Link href={link}>
				<Button variant='homeBtn' className='mt-5'>
					{linkTitle}
				</Button>
			</Link>
		</div>
	)
}

export default NoResult
