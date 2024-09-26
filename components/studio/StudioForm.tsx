'use client';
import React, { useEffect } from 'react';
import { CircularProgress, FormControl, FormGroup, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormState, useFormStatus } from 'react-dom';
import { createStudio } from '@/lib/actions/studio.action';
import { IStudioResponse } from '@/lib/types';
import { useRouter } from 'next/navigation';

const INITIAL_STATE: IStudioResponse = {
	data: null,
	message: null,
	errorMsg: null,
	dbErrorMsg: null,
};

const StudioForm = () => {
	const { pending } = useFormStatus();
	const router = useRouter();
	const [state, formAction] = useFormState<IStudioResponse, FormData>(createStudio, INITIAL_STATE);

	useEffect(() => {
		if (state?.message === 'Studio created successfully') {
			router.push('/studio');
		}
	}, [state, router]);

	return (
		<form action={formAction}>
			<FormGroup>
				<Typography mb={2}>Create studio</Typography>
				<FormControl sx={{ marginBottom: '1rem' }}>
					<TextField
						id="studioName"
						name="studioName"
						type="text"
						label="Name"
						error={!!state.zodErrors?.name}
						helperText={state.zodErrors?.name}
						required
					/>
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

export default StudioForm;
