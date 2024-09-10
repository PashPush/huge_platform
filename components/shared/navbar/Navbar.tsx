'use client'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Theme from './Theme'
import MobileNav from './MobileNav'
import GlobalSearch from '../search/GlobalSearch'
import { useTheme } from '@/context/ThemeProvider'
import { dark } from '@clerk/themes'

const Navbar = () => {
	const { mode } = useTheme()
	return (
		<nav className='flex-between background-light900_dark200 sn:px-12 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none'>
			<Link href={'/'} className='flex items-center gap-1'>
				<Image
					src='/assets/images/site-logo.svg'
					width={23}
					height={23}
					alt='Nutri Balance'
					className='mr-2'
				/>
				<p className='h2-bold font-merienda text-dark-100 dark:text-light-900 max-sm:hidden'>
					Nutri <span className='text-primary-500'>Balance</span>
				</p>
			</Link>
			<GlobalSearch />
			<div className='flex-between gap-5'>
				<Theme />
				<SignedIn>
					<UserButton
						appearance={{
							baseTheme: mode === 'dark' ? dark : undefined,
							elements: {
								avatarBox: 'size-10',
							},
							variables: {
								colorPrimary: '#69b564',
							},
						}}
					/>
				</SignedIn>
				<MobileNav />
			</div>
		</nav>
	)
}

export default Navbar
