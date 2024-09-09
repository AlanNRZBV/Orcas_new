import mongoose, { model, models, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_fACTOR = 10;

interface IUserFields extends mongoose.Document {
	name: string;
	lastName: string;
	middleName?: string;
	email: string;
	password: string;
}

const UserSchema = new Schema<IUserFields>({
	name: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		default: '',
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
});

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
