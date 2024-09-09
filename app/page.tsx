import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { getSession } from '@/lib/actions/getSession';
import { getUsers } from '@/lib/actions/user.action';
import Link from 'next/link';

const Home = async () => {
	const session = await getSession();

	return (
		<main style={{ height: '100%' }}>
			<Container disableGutters sx={{ height: '100%' }}>
				<Link href="/register">Register</Link>
				<Link href="/login">Login</Link>
			</Container>
		</main>
	);
};

export default Home;
