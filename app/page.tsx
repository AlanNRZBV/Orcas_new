'use client';

import { Container } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { changeName, currentName } from '@/lib/features/users/usersSlice';
import { signUp } from '@/lib/actions/signUp.action';

const Home = () => {
	const name = useAppSelector(currentName);
	const dispatch = useAppDispatch();

	const testFn = async () => {
		await signUp();
	};

	return (
		<main style={{ height: '100%' }}>
			<Container disableGutters sx={{ height: '100%' }}>
				test defname: {name}
				<Button onClick={testFn}>test</Button>
			</Container>
		</main>
	);
};

export default Home;
