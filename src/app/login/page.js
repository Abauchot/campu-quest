"use client";
import { useSession, SessionProvider } from 'next-auth/react';
import LogButton from '../component/logButton';

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
		<div className="flex min-h-full flex-1">
			<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div className="mx-auto w-full max-w-sm lg:w-96">
					<div>
						<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white-900">
							Sign in to your account
						</h2>
					</div>
					<div className="mt-10">
						<div>
							<form action="#" method="POST" className="space-y-6">

								<div>
									<LogButton />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}