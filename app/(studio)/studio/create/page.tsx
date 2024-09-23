import React from 'react';
import Grid from '@mui/material/Grid2';
import StudioForm from '@/components/studio/StudioForm';

const Page = () => {
	return (
		<Grid container justifyContent="center" alignItems="center" height="100%">
			<Grid>
				<StudioForm />
			</Grid>
		</Grid>
	);
};

export default Page;
