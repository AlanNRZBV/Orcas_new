import { Container } from '@mui/system';
import Link from 'next/link';

const Home = async () => {
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
