import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
	mongoose.set('strictQuery', true)

	console.log('IIIII TRY MONGGGOGOGOOGOSOSOOS')
	if (!process.env.MONGODB_URL) {
		return console.log('Missing MONGODB_URL ')
	}
	if (isConnected) {
		return console.log('Mongodb is already connected')
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: 'ShareKnowledge',
		})
		isConnected = true
		console.log('Mongodb is  connected')
	} catch (error) {
		console.log('Mongoose failed connection: ', error)
	}
}
