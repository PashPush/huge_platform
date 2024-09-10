'use client'
import { useTheme } from '@/context/ThemeProvider'
import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
	const { mode } = useTheme()
	return (
		<SignUp
			appearance={{
				baseTheme: mode === 'dark' ? dark : undefined,
			}}
		/>
	)
}
