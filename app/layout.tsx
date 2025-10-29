import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';
import type {Metadata} from 'next';
import {Martian_Mono, Schibsted_Grotesk} from 'next/font/google';
import './globals.css';

const schibstedGrotesk = Schibsted_Grotesk({
	variable: '--font-schibsted_Grotesk',
	subsets: ['latin'],
});

const martianMono = Martian_Mono({
	variable: '--font-martian-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'DevEvent',
	description: "The Hub for every Dev Event you Mustn't Miss",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${schibstedGrotesk.variable} ${martianMono.variable} m-h-screen antialiased`}>
				<div className='absolute inset-0 top-0 z-[-1] m-h-screen'>
					<Navbar />
					<LightRays
						raysOrigin='top-center-offset'
						raysColor='#5dfeca'
						raysSpeed={0.5}
						lightSpread={0.9}
						rayLength={1.4}
						followMouse={true}
						mouseInfluence={0.02}
						noiseAmount={0}
						distortion={0.01}
					/>
				</div>
				<main>{children}</main>
			</body>
		</html>
	);
}
