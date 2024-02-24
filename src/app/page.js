import Link from "next/link"

export default function Home() {
  return (
<div className="flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver">
  <h1 className="text-lg font-semibold">Campus Quest</h1>
  <div className="flex gap-[40px] text-m">
    <Link href="/">
      <button className="btn">Home</button>
    </Link>
    <Link href="/quests">
      <button className="btn">Quests</button>
    </Link>
    <Link href="/qrscan">
      <button className="btn">Scanner</button>
    </Link>
    <Link href="/login">
      <button className="btn">Login</button>
    </Link>
  </div>
</div>
  )
}
