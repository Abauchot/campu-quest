"use client";
import { useSession, SessionProvider } from 'next-auth/react';
import LogButton from '../component/logButton';
import Navbar from '../component/navbar';

export default function log() {
	return (
		<SessionProvider>
			<LoginPage />
		</SessionProvider>
	);
}

function LoginPage() {
	const { data: session } = useSession();

	return (
		<div>
			<Navbar />
			<div class="flex flex-col h-screen w-full items-center justify-center bg-black bg-cover bg-no-repeat">
				<div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
					<div class="text-white">
						<div class="mb-8 flex flex-col items-center">
							<h1 class="mb-2 text-2xl">Campus Quest</h1>
							<span class="text-gray-300">Enter Login Details</span>
						</div>
						<form action="#">
							<div class="mb-4 text-lg">
								<input class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="id@email.com" />
							</div>

							<div class="mb-4 text-lg">
								<input class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="*********" />
							</div>
							<div class="mt-8 flex justify-center text-lg text-white">
								<LogButton />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}