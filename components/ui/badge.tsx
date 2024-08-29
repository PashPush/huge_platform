import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva('', {
	variants: {
		variant: {
			default:
				'subtle-medium background-light800_dark300 text-light400_light500 cursor-pointer rounded-md border-none px-4 py-2 uppercase',
			secondary:
				'h2-bold background-light800_dark400 text-dark200_light900 cursor-pointer rounded-none border-none px-4 py-2 uppercase',
			tagTitle:
				'background-light800_dark400 paragraph-semibold text-dark300_light900 w-fit cursor-pointer rounded-sm px-5 py-1.5',
			outline: '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	)
}

export { Badge, badgeVariants }
