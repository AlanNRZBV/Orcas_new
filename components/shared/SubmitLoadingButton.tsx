import React, { FC, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormStatus } from 'react-dom';

interface Props {
	btnText: string;
	style: {
		[key: string]: string;
	};
}

const SubmitLoadingButton: FC<Props> = ({ btnText, style }) => {
	const { pending } = useFormStatus();

	return (
		<LoadingButton
			loading={pending}
			type="submit"
			loadingIndicator={<CircularProgress />}
			disabled={pending}
			sx={style}
		>
			{btnText}
		</LoadingButton>
	);
};

export default SubmitLoadingButton;
