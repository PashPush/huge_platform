/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['ts', 'tsx', 'mdx'],
	experimental: {
		mdxRs: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
}

module.exports = nextConfig
