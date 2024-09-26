import React, { FC } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { IStaffUnitPopulated } from '@/lib/types';

interface Props {
	staff: IStaffUnitPopulated[];
}

const StaffList: FC<Props> = ({ staff }) => {
	return (
		<List dense>
			{staff.map((item, index) => (
				<ListItemButton key={index}>
					<ListItemText primary={item.userId.username} secondary={`${item.spec.name} ${item.spec.rank}`} />
				</ListItemButton>
			))}
		</List>
	);
};

export default StaffList;
