import { signIn, signOut, useSession } from "next-auth/react"

export default function LogButton() {
  const { data: session } = useSession()

  if(session) {
    console.log("session", session)

    rerturn (
      <>
        Log in as {session.user.email} <br />
        <button onClick={() => signOut()}> Logout</button>
      </>
    )
  }
  return (
    <>
      Not Log in <br />
      <button onClick={() => signIn("google")}>Loggin with Google</button>
    </>
  )
}