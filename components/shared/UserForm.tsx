'use client';
import React, { FC, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
	CircularProgress,
	FormControl,
	FormGroup,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from '@mui/material';
import { signIn, signUp } from '@/lib/actions/user.action';
import { IUserFormResponse } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Link from 'next/link';

interface Props {
	isRegister?: boolean;
}

const INITIAL_STATE: IUserFormResponse = {
	data: null,
	isJSON: false,
	message: '',
	errorMsg: null,
	dbErrorMsg: null,
};

const UserForm: FC<Props> = ({ isRegister }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { pending } = useFormStatus();
	const router = useRouter();

	const action = isRegister ? signUp : signIn;

	const [state, formAction] = useFormState<IUserFormResponse, FormData>(action, INITIAL_STATE);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	useEffect(() => {
		if (state?.message === 'Login successful' || state?.message === 'Registration successful') {
			router.push('/');
		}
	}, [state, router]);

	const formContainerStyles = {
		margin: '0',
	};
	const formControlStyles = {
		margin: '0',
		marginBottom: '.5rem',
	};
	const loadingButtonStyles = {
		alignSelf: 'center',
	};

	const errorMessage = state.zodErrors?.email || state.dbErrorMsg;

	return (
		<form action={formAction}>
			<FormGroup style={formContainerStyles}>
				<Typography marginBottom={2} variant="h6" textAlign="center">
					{isRegister ? 'Sign Up' : 'Sign In'}
				</Typography>
				{isRegister && (
					<FormControl style={formControlStyles}>
						<TextField
							id="username"
							name="username"
							type="text"
							label="Username"
							error={!!state.zodErrors?.username}
							helperText={state.zodErrors?.username}
						/>
					</FormControl>
				)}
				<FormControl style={formControlStyles}>
					<TextField
						id="email"
						name="email"
						type="email"
						label="Email"
						error={!!state.zodErrors?.email || !!state.dbErrorMsg}
						helperText={errorMessage}
					/>
				</FormControl>
				<FormControl style={formControlStyles}>
					<TextField
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						error={!!state.zodErrors?.password}
						helperText={state.zodErrors?.password}
						slotProps={{
							input: {
								endAdornment: (
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
								),
							},
						}}
						label="Password"
						required
					/>
				</FormControl>
				<Box display="flex" justifyContent={isRegister ? 'center' : 'space-between'} alignItems="center" marginTop={1}>
					{!isRegister && (
						<Typography component={Link} href="#" color="primary" sx={{ textDecoration: 'none' }}>
							Forgot?
						</Typography>
					)}
					<LoadingButton
						loading={pending}
						type="submit"
						loadingIndicator={<CircularProgress />}
						sx={loadingButtonStyles}
						disabled={pending}
					>
						Submit
					</LoadingButton>
				</Box>
			</FormGroup>
		</form>
	);
};

export default UserForm;
