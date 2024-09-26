import React from 'react';
import Grid from '@mui/material/Grid2';
import StudioForm from '@/components/studio/StudioForm';
import TaskForm from '@/components/task/TaskForm';

const Page = () => {
	return (
		<Grid container justifyContent="center" alignItems="center" height="100%">
			<Grid>
				<TaskForm />
			</Grid>
		</Grid>
	);
};

export default Page;
