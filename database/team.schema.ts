import mongoose, { model, Schema, Types } from 'mongoose';
import { Studio } from '@/database/studio.schema';
import { User } from '@/database/user.schema';
import Project from '@/database/project.schema';

const TeamSchema = new mongoose.Schema({
	studioId: {
		type: Schema.Types.ObjectId,
		ref: 'Studio',
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => {
				const studio = await Studio.findById(value);
				return Boolean(studio);
			},
			message: 'VALIDATOR ERROR: Studio does not exist!',
		},
	},
	name: {
		type: String,
		required: true,
	},
	members: [
		{
			userId: {
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
			teamRole: {
				type: String,
				required: true,
			},
		},
	],
});

TeamSchema.post('findOneAndDelete', async function (team) {
	try {
		await Studio.updateMany({ 'teams.teamId': team._id }, { $pull: { teams: { teamId: team._id } } });
		await Project.updateMany({ 'team.teamId': team._id }, { $pull: { team: { teamId: team._id } } });
	} catch (e) {
		console.log('Caught in middleware on try - ON TEAM DELETE - ', e);
	}
});

const Team = model('Team', TeamSchema);
export default Team;
