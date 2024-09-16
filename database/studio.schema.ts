import { model, models, Schema, Types } from 'mongoose';
import { User } from '@/database/user.schema';
import Project from '@/database/project.schema';
import Team from '@/database/team.schema';

const StudioSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		owner: {
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
		projects: [
			{
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
		],
		staff: [
			{
				userId: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					validate: {
						validator: async (value: Types.ObjectId) => {
							const user = await User.findById(value);
							return Boolean(user);
						},
						message: 'VALIDATOR ERROR: User does not exist!',
					},
				},
				spec: {
					name: {
						type: String,
					},
					rank: {
						type: String,
					},
				},
			},
		],
		tasks: [
			{
				taskId: {
					type: Schema.Types.ObjectId,
					ref: 'Task',
					validate: {
						validator: async (value: Types.ObjectId) => {
							const task = await Project.findById(value);
							return Boolean(task);
						},
						message: 'VALIDATOR ERROR: Project does not exist!',
					},
				},
			},
		],
		teams: [
			{
				teamId: {
					type: Schema.Types.ObjectId,
					ref: 'Team',
					validate: {
						validator: async (value: Types.ObjectId) => {
							const team = await Team.findById(value);
							return Boolean(team);
						},
						message: 'VALIDATOR ERROR: Team does not exist!',
					},
				},
			},
		],
	},
	{ timestamps: true },
);

StudioSchema.post('findOneAndDelete', async function (studio) {
	try {
		await Team.deleteMany({ studioId: studio._id });
		await Project.deleteMany({ studioId: studio._id });
	} catch (e) {
		console.log('Caught in middleware on try - ON STUDIO DELETE - ', e);
	}
});

export const Studio = models.Studio || model('Studio', StudioSchema);
