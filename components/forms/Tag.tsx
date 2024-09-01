'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TagSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { editTag } from '@/lib/actions/tag.actions'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

type Props = { tagDetails: string }

const Tag = ({ tagDetails }: Props) => {
	const pathname = usePathname()
	const router = useRouter()

	const [isSubmitting, setIsSubmitting] = useState(false)
	const parsedTagDetails = JSON.parse(tagDetails || '')

	const form = useForm<z.infer<typeof TagSchema>>({
		resolver: zodResolver(TagSchema),
		defaultValues: {
			name: parsedTagDetails.name,
			description: parsedTagDetails.description || '',
		},
	})

	async function onSubmit(values: z.infer<typeof TagSchema>) {
		setIsSubmitting(true)
		console.log('VALUESSSS: ', values)
		try {
			await editTag({
				tagId: parsedTagDetails._id,
				name: values.name,
				description: values.description,
				path: pathname,
			})

			router.push(`/tags/`)
			return toast({
				title: `Tag ${values.name} successfully edited`,
				variant: 'success',
			})
		} catch (error) {
			console.log(error)
			toast({
				title: 'Tag not edited, Error',
				variant: 'destructive',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex w-full flex-col gap-10'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex w-full flex-col'>
							<FormLabel className='paragraph-semibold text-dark400_light800'>
								Tag Name <span className='text-primary-500'>*</span>
							</FormLabel>
							<FormControl className='mt-3.5'>
								<Input
									className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
									{...field}
								/>
							</FormControl>
							<FormDescription className='body-regular mt-2.5 text-light-500'>
								You can rename the tag.
							</FormDescription>
							<FormMessage className='text-red-500' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem className='flex w-full flex-col'>
							<FormLabel className='paragraph-semibold text-dark400_light800'>
								Tag description <span className='text-primary-500'>*</span>
							</FormLabel>
							<FormControl className='mt-3.5'>
								<Input
									className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
									{...field}
								/>
							</FormControl>
							<FormDescription className='body-regular mt-2.5 text-light-500'>
								Write a short description of this tag.
							</FormDescription>
							<FormMessage className='text-red-500' />
						</FormItem>
					)}
				/>

				<Button type='submit' variant='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Editing...' : 'Edit'}
				</Button>
			</form>
		</Form>
	)
}

export default Tag
