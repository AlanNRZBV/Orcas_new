import mongoose, { model, models, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_fACTOR = 10;

interface IUserFields extends mongoose.Document {
	username: string;
	name: string;
	lastName: string;
	middleName?: string;
	role: string;
	email: string;
	password: string;
}

const UserSchema = new Schema<IUserFields>(
	{
		username: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},
		lastName: {
			type: String,
		},
		middleName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{ timestamps: true },
);

UserSchema.methods.checkPassword = function (password: string) {
	return bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(SALT_WORK_fACTOR);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

export const User = models.User || model('User', UserSchema);
