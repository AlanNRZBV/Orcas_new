'use client';
import React, { FC, useEffect, useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	CircularProgress,
	FormControl,
	FormGroup,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Typography,
} from '@mui/material';
import { signIn, signUp } from '@/lib/actions/user.action';
import { IErrorResponse } from '@/lib/types';

interface Props {
	isRegister?: boolean;
}

const initialState: IErrorResponse = {
	message: '',
	isJSON: false,
};

const UserForm: FC<Props> = ({ isRegister }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { pending } = useFormStatus();

	const action = isRegister ? signUp : signIn;

	const [state, formAction] = useFormState<undefined | IErrorResponse, FormData>(action, undefined);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	useEffect(() => {
		if (state?.message && !state.isJSON) {
			console.log('Non parsed ', state.message);
		} else if (state?.isJSON) {
			console.log('Parsed ', JSON.parse(state.message));
		}
	}, [state]);

	const formContainerStyles: React.CSSProperties = {
		margin: '0',
	};
	const formControlStyles: React.CSSProperties = {
		margin: '0',
		marginBottom: '.5rem',
	};
	const loadingButtonStyles: React.CSSProperties = {
		marginTop: '1rem',
		alignSelf: 'center',
	};

	const registerFields = (
		<>
			<FormControl style={formControlStyles}>
				<InputLabel htmlFor="name">Name</InputLabel>
				<OutlinedInput id="name" name="name" type="text" label="Name" required />
			</FormControl>
			<FormControl style={formControlStyles}>
				<InputLabel htmlFor="lastName">Last name</InputLabel>
				<OutlinedInput id="lastName" type="text" name="lastName" label="Last name" required />
			</FormControl>
			<FormControl style={formControlStyles}>
				<InputLabel htmlFor="middleName">Middle name</InputLabel>
				<OutlinedInput id="middleName" type="text" name="middleName" label="Middle name" />
			</FormControl>
		</>
	);
	return (
		<form action={formAction}>
			<FormGroup style={formContainerStyles}>
				<Typography marginBottom={2} variant="h6" textAlign="center">
					{isRegister ? 'Sign Up' : 'Sign In'}
				</Typography>
				{isRegister ? registerFields : <></>}
				<FormControl style={formControlStyles}>
					<InputLabel htmlFor="email">Email</InputLabel>
					<OutlinedInput id="email" name="email" type="email" label="Email" />
				</FormControl>
				<FormControl style={formControlStyles}>
					<InputLabel htmlFor="password">Password</InputLabel>
					<OutlinedInput
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									onMouseUp={handleMouseUpPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
						required
					/>
				</FormControl>
				<LoadingButton
					loading={pending}
					type="submit"
					loadingIndicator={<CircularProgress />}
					sx={loadingButtonStyles}
					disabled={pending}
				>
					Submit
				</LoadingButton>
			</FormGroup>
		</form>
	);
};

export default UserForm;
