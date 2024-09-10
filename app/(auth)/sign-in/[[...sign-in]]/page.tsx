'use client'
import { useTheme } from '@/context/ThemeProvider'
import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
	const { mode } = useTheme()
	return (
		<SignIn
			appearance={{
				baseTheme: mode === 'dark' ? dark : undefined,
			}}
		/>
	)
}
