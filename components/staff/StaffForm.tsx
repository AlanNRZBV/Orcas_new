'use client';
import React, { FC } from 'react';
import { FormControl, FormGroup, InputLabel, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useFormState } from 'react-dom';
import { IStaffResponse, IStaffUnitPopulated } from '@/lib/types';
import { manageStaff, sendRequest } from '@/lib/actions/staff.action';
import Box from '@mui/material/Box';
import SubmitLoadingButton from '@/components/shared/SubmitLoadingButton';

const INITIAL_STATE: IStaffResponse = {
	errorMsg: null,
	dbErrorMsg: null,
	message: null,
};

interface Props {
	type: 'invite' | 'manage';
	staff?: string;
}

const StaffForm: FC<Props> = ({ type, staff }) => {
	const isStaffExists = staff !== undefined;

	const [rank, setRank] = React.useState('');
	const [specName, setSpecName] = React.useState('');
	const [user, setUser] = React.useState('');
	const formRef = React.useRef<HTMLFormElement>(null);

	const action = type === 'invite' ? sendRequest : manageStaff;

	const [state, formAction] = useFormState<IStaffResponse, FormData>(action, INITIAL_STATE);

	const handleChange = (event: SelectChangeEvent) => {
		setUser(event.target.value as string);
	};

	const handleRankChange = (event: SelectChangeEvent) => {
		setRank(event.target.value as string);
	};
	const handleSpecChange = (event: SelectChangeEvent) => {
		setSpecName(event.target.value as string);
	};

	const inputStyles = {
		marginBottom: '1rem',
	};

	const updateBtnStyle = { alignSelf: 'center' };

	if (type === 'manage' && isStaffExists) {
		const data: IStaffUnitPopulated[] = JSON.parse(staff);

		return (
			<form
				ref={formRef}
				action={formAction}
				style={{ border: '1px solid lightgrey', padding: '1rem', borderRadius: '8px' }}
			>
				<FormGroup>
					<Typography variant="h6" mb={1}>
						Manage user
					</Typography>
					<FormControl fullWidth sx={inputStyles}>
						<InputLabel id="user-select-label">User</InputLabel>
						<Select
							labelId="user-select-label"
							id="user-select"
							value={user}
							label="User"
							name="userSelectValue"
							onChange={handleChange}
							required
						>
							{data.map((item) => (
								<MenuItem key={item.userId.username} value={item.userId._id}>
									{item.userId.username}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Box display="flex" gap="1rem">
						<FormControl fullWidth sx={inputStyles}>
							<InputLabel id="userRankLabel">Rank</InputLabel>
							<Select
								id="userRank"
								labelId="userRankLabel"
								name="userRank"
								value={rank}
								label="Rank"
								onChange={handleRankChange}
							>
								<MenuItem value="Junior">Junior</MenuItem>
								<MenuItem value="Middle">Middle</MenuItem>
								<MenuItem value="Senior">Senior</MenuItem>
							</Select>
						</FormControl>
						<FormControl fullWidth sx={{ marginBottom: '1rem' }}>
							<InputLabel id="specNameLabel">Spec</InputLabel>
							<Select
								id="specname"
								labelId="specNameLabel"
								name="specName"
								value={specName}
								label="Spec"
								onChange={handleSpecChange}
							>
								<MenuItem value="Architect">Architect</MenuItem>
								<MenuItem value="Designer">Designer</MenuItem>
								<MenuItem value="3D Viz">Viz</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<SubmitLoadingButton btnText="update" style={updateBtnStyle} />
				</FormGroup>
			</form>
		);
	}

	return (
		<form
			ref={formRef}
			action={formAction}
			style={{ border: '1px solid lightgrey', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
		>
			<FormGroup>
				<Typography variant="h6" mb={1}>
					Invite user
				</Typography>
				<FormControl sx={inputStyles}>
					<TextField
						type="email"
						id="userEmail"
						name="userEmail"
						label="Email"
						error={!!state.errorMsg}
						helperText={state.errorMsg}
					/>
				</FormControl>
				<SubmitLoadingButton btnText="send invite" style={updateBtnStyle} />
			</FormGroup>
		</form>
	);
};

export default StaffForm;
