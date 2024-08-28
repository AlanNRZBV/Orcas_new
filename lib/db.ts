import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDb = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) return console.log('MISSING MONGODB URL - CHECK ENV');

	if (isConnected) return console.log('ALREADY CONNECTED');

	try {
		await mongoose.connect(process.env.MONGODB_URL, { dbName: 'OrcasDB' });

		isConnected = true;

		console.log('MONGODB IS CONNECTED');
	} catch (e) {
		console.log('CONNECTION FAILED - ', e);
	}
};
