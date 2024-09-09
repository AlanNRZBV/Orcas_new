'use client';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

const theme = createTheme({
	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
			},
		},
		MuiLoadingButton: {
			defaultProps: {
				variant: 'contained',
			},
		},
	},
});

export default theme;
