import React from 'react';
import Grid from '@mui/material/Grid2';
import UserForm from '@/components/shared/UserForm';

const Page = () => {
	return (
		<Grid container justifyContent="center" alignItems="center" height="100%">
			<Grid>
				<UserForm isRegister />
			</Grid>
		</Grid>
	);
};

export default Page;
