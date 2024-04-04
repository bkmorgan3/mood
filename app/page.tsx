import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? '/journal' : '/new-user';

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">This is the best Journal App ever.</h1>
        <p className="text-2xl text-white/60 mb-4">The best tool for tracking your mood so be honest and write a lot.</p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 rounded-lg text-xl py-2">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
