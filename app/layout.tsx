/* eslint-disable camelcase */
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter, Merienda } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'
import '../styles/prism.css'
import { ThemeProvider } from '@/context/ThemeProvider'

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
})

const merienda = Merienda({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-merienda',
})

export const metadata: Metadata = {
	title: {
		template: '%s | Nutri Balance',
		default: 'Nutri Balance',
	},
	description:
		'A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.',
	icons: {
		icon: '/assets/icons/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} ${merienda.variable}`}>
				<ClerkProvider
					appearance={{
						elements: {
							formButtonPrimary: 'primary-gradient',
							footerActionLink: 'primary-text-gradient hover:text-primary-500',
						},
					}}
				>
					<ThemeProvider>{children}</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	)
}
