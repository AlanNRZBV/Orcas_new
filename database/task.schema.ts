import { model, models, Schema, Types } from 'mongoose';
import Project from '@/database/project.schema';
import { User } from '@/database/user.schema';

const TaskSchema = new Schema({
	projectId: {
		projectId: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			validate: {
				validator: async (value: Types.ObjectId) => {
					const project = await Project.findById(value);
					return Boolean(project);
				},
				message: 'VALIDATOR ERROR: Project does not exist!',
			},
		},
	},
	manager: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => {
				const user = await User.findById(value);
				return Boolean(user);
			},
			message: 'VALIDATOR ERROR: User does not exist!',
		},
	},
	recipient: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => {
				const user = await User.findById(value);
				return Boolean(user);
			},
			message: 'VALIDATOR ERROR: User does not exist!',
		},
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date(),
	},
	difficulty: {
		type: String,
		enum: ['easy', 'medium', 'hard'],
	},
	expireAt: {
		type: Date,
		required: true,
	},
	isUrgent: {
		type: Boolean,
		required: true,
		default: false,
	},
	isComplete: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const Task = models.Task || model('Task', TaskSchema);
export default Task;
