import { signIn, signOut, useSession } from "next-auth/react"

export default function LogButton() {
	const { data: session } = useSession()

	if (session) {
		console.log('session', session)
		return (
			<>
				Signed in as {session.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	}
	return (
		<>
			<button
				onClick={() => signIn()}
				className="bg-yellow-400  bg-opacity-50 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
			>
				Sign in
			</button>
		</>
	)
}