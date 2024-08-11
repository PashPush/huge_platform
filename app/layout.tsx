import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs'
import './globals.css'
import React from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import { Inter, Space_Grotesk } from 'next/font/google' // eslint-disable-line
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'ShareKnowledge',
	description:
		'This is a Q&A platform of choice that people visit to ask questions, learn, and share their knowledge.',
	icons: {
		icon: '/assets/images/site-logo.svg',
	},
}

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
})
const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-spaceGrotesk',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} ${spaceGrotesk.variable} font-inter`}>
				<ClerkProvider
					appearance={{
						elements: {
							formButtonPrimary: 'primary-gradient',
							footerActionLink: 'primary-text-gradient hover:text-primary-500',
						},
					}}
				>
					<ThemeProvider>
						<h1 className='h1-bold'>This is a piece of text</h1>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
						{children}
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	)
}
