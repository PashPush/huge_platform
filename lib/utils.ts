import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'
import { BADGE_CRITERIA } from '@/constants'
import { BadgeCounts } from '@/types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
	const now = new Date()
	const timeDifference = now.getTime() - createdAt.getTime()

	// Define time intervals in milliseconds
	const minute = 60 * 1000
	const hour = 60 * minute
	const day = 24 * hour
	const week = 7 * day
	const month = 30 * day
	const year = 365 * day

	if (timeDifference < minute) {
		const seconds = Math.floor(timeDifference / 1000)
		return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`
	} else if (timeDifference < hour) {
		const minutes = Math.floor(timeDifference / minute)
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
	} else if (timeDifference < day) {
		const hours = Math.floor(timeDifference / hour)
		return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
	} else if (timeDifference < week) {
		const days = Math.floor(timeDifference / day)
		return `${days} ${days === 1 ? 'day' : 'days'} ago`
	} else if (timeDifference < month) {
		const weeks = Math.floor(timeDifference / week)
		return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
	} else if (timeDifference < year) {
		const months = Math.floor(timeDifference / month)
		return `${months} ${months === 1 ? 'month' : 'months'} ago`
	} else {
		const years = Math.floor(timeDifference / year)
		return `${years} ${years === 1 ? 'year' : 'years'} ago`
	}
}

export const formatAndDivideNumber = (num: number): string => {
	if (num >= 1000000) {
		const formattedNum = (num / 1000000).toFixed(1)
		return `${formattedNum}M`
	} else if (num >= 1000) {
		const formattedNum = (num / 1000).toFixed(1)
		return `${formattedNum}K`
	} else {
		return num.toString()
	}
}

export const getJoinedDate = (date: Date): string => {
	const month = date.toLocaleString('en-EN', { month: 'long' })
	const year = date.getFullYear()

	const joinedDate = `${month} ${year}`

	return joinedDate
}

interface UrlQueryParams {
	params: string
	key: string
	value: string | null
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
	const currentUrl = qs.parse(params)
	if (key === 'page') {
		const newValue = +value! < 1 ? '1' : value
		currentUrl[key] = newValue
	} else {
		currentUrl[key] = value
		currentUrl.page = '1'
	}
	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	)
}

interface RemoveUrlQueryParams {
	params: string
	keysToRemove: string[]
}

export const removeKeysFromQuery = ({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) => {
	const currentUrl = qs.parse(params)

	keysToRemove.forEach((key) => {
		delete currentUrl[key]
	})
	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{
			skipNull: true,
		}
	)
}
interface BadgeParam {
	criteria: {
		type: keyof typeof BADGE_CRITERIA
		count: number
	}[]
}

export const assignBadges = (params: BadgeParam) => {
	const badgeCounts: BadgeCounts = {
		GOLD: 0,
		SILVER: 0,
		BRONZE: 0,
	}

	const { criteria } = params

	criteria.forEach((item) => {
		const { type, count } = item
		const badgeLevels: BadgeCounts = BADGE_CRITERIA[type]

		Object.keys(badgeLevels).forEach((level: any) => {
			if (count >= badgeLevels[level as keyof BadgeCounts]) {
				badgeCounts[level as keyof BadgeCounts] += 1
			}
		})
	})

	return badgeCounts
}

export const shieldingRegExp = (str: string, flags: string) => {
	if (!str) return
	return new RegExp(
		str.replace(/(\[|\\|\^|\$|\||\?|\*|\+|\(|\)|\.)/g, '\\$1'),
		flags
	)
}

function cyrillicToLatin(input: string): string {
	const transliterationMap: { [key: string]: string } = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'e',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'kh',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',
	}

	return input
		.split('')
		.map((char) => transliterationMap[char] || char)
		.join('')
}

export function transformString(input: string): string {
	const transliterated = cyrillicToLatin(input.toLowerCase().trim())
	return transliterated.replace(/[^a-zA-Z0-9 ]/g, '').replace(/[ ]/g, '-')
}
