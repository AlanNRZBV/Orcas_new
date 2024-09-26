import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Link from 'next/link';

interface Props {
	tasks: [] | undefined;
}

const StudioTasks: FC<Props> = ({ tasks }) => {
	const isEmpty = tasks?.length === 0;

	const createBtn = (
		<Button component={Link} href="/task/create">
			Add task
		</Button>
	);

	return (
		<Box>
			<Typography variant="h5">Tasks</Typography>
			{isEmpty && createBtn}
			<Typography>Current: </Typography>
		</Box>
	);
};

export default StudioTasks;
