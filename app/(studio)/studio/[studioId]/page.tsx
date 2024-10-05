import React from 'react';
import { getStudio } from '@/lib/actions/studio.action';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { Divider, Typography } from '@mui/material';
import StudioTasks from '@/components/studio/StudioTasks';
import StudioProjects from '@/components/studio/StudioProjects';
import StudioTeams from '@/components/studio/StudioTeams';
import StudioStaff from '@/components/studio/StudioStaff';

const Page = async ({ params }: { params: { studioId: string } }) => {
	const studio = await getStudio();

	if (!studio.data) {
		return (
			<Box>
				<Typography>Something went wrong</Typography>
			</Box>
		);
	}

	const QuestionBlock = (
		<Box display="flex" flexDirection="column">
			<Typography marginBottom={2}>
				It seems you&apos;re new.
				<br />
				Create a studio or join an existing one.
			</Typography>
			<Box display="flex" justifyContent="space-around">
				<Button component={Link} href="/studio/create" sx={{ flexBasis: '25%' }}>
					Create
				</Button>
				<Button component={Link} href="#">
					Join
				</Button>
			</Box>
		</Box>
	);

	const fz = 18;
	const dividerMargins = '1rem 0 1rem 0';

	const studioBoard = (
		<Box mt={2}>
			<Box>
				<Typography variant="h4" mb={2}>
					Summary
				</Typography>
				<Typography fontSize={fz}>
					<b>Studio name:&nbsp;</b>
					{studio.data.name}
				</Typography>
			</Box>{' '}
			<Typography fontSize={fz}>
				<b>Owner:&nbsp;</b>
				{studio.data.owner.username}
			</Typography>
			<Typography fontSize={fz}>
				<b>Teams:&nbsp;</b>
				{studio.data.teams.length}
			</Typography>
			<Typography fontSize={fz}>
				<b>Tasks:&nbsp;</b>
				{studio.data.tasks.length}
			</Typography>
			<Typography fontSize={fz}>
				<b>Projects:&nbsp;</b>
				{studio.data.projects.length}
			</Typography>
			<Typography fontSize={fz}>
				<b>Staff:&nbsp;</b>
				{studio.data.staff.length}
			</Typography>
			<Divider sx={{ margin: dividerMargins }} />
			<StudioTasks tasks={studio.data.tasks} />
			<Divider sx={{ margin: dividerMargins }} />
			<StudioProjects />
			<Divider sx={{ margin: dividerMargins }} />
			<StudioTeams />
			<Divider sx={{ margin: dividerMargins }} />
			<StudioStaff staff={studio.data.staff} studioId={params.studioId} />
		</Box>
	);

	return (
		<Grid
			container
			justifyContent={!studio.data ? 'center' : 'initial'}
			alignItems={!studio.data ? 'center' : 'initial'}
			height="100%"
		>
			<Grid flexGrow="1">{!studio.data ? QuestionBlock : studioBoard}</Grid>
		</Grid>
	);
};

export default Page;
