'use client'

import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface CustomInputProps {
	route: string
	placeholder: string
	otherClasses: string
}

const LocalSearchbar = ({
	route,
	placeholder,
	otherClasses,
}: CustomInputProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const inputRef = useRef<HTMLInputElement>(null)

	const query = searchParams.get('q')

	const [search, setSearch] = useState(query || '')

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'q',
					value: search,
				})
				router.push(newUrl, { scroll: false })
			} else if (pathname === route) {
				const newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keysToRemove: ['q'],
				})
				router.push(newUrl, { scroll: false })
			}
		}, 400)
		return () => clearTimeout(delayDebounceFn)
	}, [search, route, pathname, router, searchParams, query])

	return (
		<div
			className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
		>
			<Image
				src='/assets/icons/search.svg'
				alt='search icon'
				onClick={() => inputRef.current?.focus()}
				width={24}
				height={24}
			/>
			<Input
				type='text'
				placeholder={placeholder}
				value={search}
				ref={inputRef}
				onChange={(e) => {
					setSearch(e.target.value)
				}}
				className='paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none'
			/>
			{search && (
				<Image
					src='/assets/icons/close.svg'
					alt='close icon'
					onClick={() => setSearch('')}
					width={32}
					height={32}
					className='size-8 cursor-pointer rounded-md p-1 hover:bg-slate-200/50'
				/>
			)}
		</div>
	)
}

export default LocalSearchbar
