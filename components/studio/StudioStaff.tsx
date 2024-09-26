import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import StaffForm from '@/components/staff/StaffForm';
import { IStaffUnitPopulated } from '@/lib/types';
import StaffList from '@/components/staff/staffList/StaffList';

interface Props {
	staff: IStaffUnitPopulated[];
}

const StudioStaff: FC<Props> = ({ staff }) => {
	return (
		<Box>
			<Typography variant="h5">Staff</Typography>
			<StaffList staff={staff} />
			<StaffForm />
		</Box>
	);
};

export default StudioStaff;
