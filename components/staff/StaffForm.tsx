'use client';
import React from 'react';
import {
	CircularProgress,
	FormControl,
	FormGroup,
	InputLabel,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormState, useFormStatus } from 'react-dom';
import { IStaffResponse } from '@/lib/types';
import { addStaff } from '@/lib/actions/staff.action';

const INITIAL_STATE: IStaffResponse = {
	errorMsg: null,
	dbErrorMsg: null,
	message: null,
};

const StaffForm = () => {
	const { pending } = useFormStatus();

	const [rank, setRank] = React.useState('');
	const [specName, setSpecName] = React.useState('');

	const handleRankChange = (event: SelectChangeEvent) => {
		setRank(event.target.value as string);
	};
	const handleSpecChange = (event: SelectChangeEvent) => {
		setSpecName(event.target.value as string);
	};

	const [state, formAction] = useFormState<IStaffResponse, FormData>(addStaff, INITIAL_STATE);

	const inputStyles = {
		marginBottom: '1rem',
	};
	return (
		<form action={formAction}>
			<FormGroup>
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
				<FormControl sx={inputStyles}>
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
				<FormControl fullWidth>
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
				<LoadingButton
					loading={pending}
					type="submit"
					loadingIndicator={<CircularProgress />}
					disabled={pending}
					sx={{ alignSelf: 'center' }}
				>
					Submit
				</LoadingButton>
			</FormGroup>
		</form>
	);
};

export default StaffForm;
