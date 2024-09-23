import React from 'react';
import { getStudio } from '@/lib/actions/studio.action';
import { IStudio, IStudioResponse } from '@/lib/types';
import Grid from '@mui/material/Grid2';
import UserForm from '@/components/shared/UserForm';
import StudioForm from '@/components/studio/StudioForm';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const Page = async () => {
	const studio = await getStudio();

	let studioParsed: IStudio | null = null;
	if (studio.data) {
		studioParsed = JSON.parse(studio.data);
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

	const studioBoard = (
		<Box>
			<Typography>{studioParsed?.name}</Typography>
			<Typography>{studioParsed?.owner}</Typography>
			<Typography>Teams:{studioParsed?.teams.length}</Typography>
			<Typography>Tasks:{studioParsed?.tasks.length}</Typography>
			<Typography>Projects:{studioParsed?.projects.length}</Typography>
			<Typography>Staff:{studioParsed?.staff.length}</Typography>
		</Box>
	);

	return (
		<Grid
			container
			justifyContent={!studio.data ? 'center' : 'initial'}
			alignItems={!studio.data ? 'center' : 'initial'}
			height="100%"
		>
			<Grid>{!studio.data ? QuestionBlock : studioBoard}</Grid>
		</Grid>
	);
};

export default Page;
