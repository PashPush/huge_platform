'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import GlobalResult from './GlobalResult'

const GlobalSearch = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const query = searchParams.get('global')

	const searchContainerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const [search, setSearch] = useState(query || '')
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const handleOutsideClick = (event: any) => {
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target)
			) {
				setIsOpen(false)
				setSearch('')
			}
		}

		setIsOpen(false)
		document.addEventListener('click', handleOutsideClick)

		return () => {
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [pathname])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (search) {
				const newUrl = formUrlQuery({
					params: searchParams.toString(),
					key: 'global',
					value: search,
				})
				router.push(newUrl, { scroll: false })
			} else {
				const newUrl = removeKeysFromQuery({
					params: searchParams.toString(),
					keysToRemove: ['global', 'type'],
				})
				router.push(newUrl, { scroll: false })
			}
		}, 400)
		return () => clearTimeout(delayDebounceFn)
	}, [search, pathname, router, searchParams, query])

	return (
		<div
			className='relative w-full max-w-[600px] max-lg:hidden'
			ref={searchContainerRef}
		>
			<div className='background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
				<Image
					src='/assets/icons/search.svg'
					alt='search'
					width={24}
					height={24}
					onClick={() => inputRef.current?.focus()}
				/>

				<Input
					ref={inputRef}
					type='text'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)

						if (!isOpen) setIsOpen(true)
						if (e.target.value === '' && isOpen) setIsOpen(false)
					}}
					placeholder='Search globally'
					className='paragraph-regular no-focus placeholder  text-dark400_light700 border-none bg-transparent shadow-none outline-none'
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
			{isOpen && <GlobalResult />}
		</div>
	)
}

export default GlobalSearch
