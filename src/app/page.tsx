import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen mt-24 flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center">Welcome to our website</h1>
      <p className="text-xl text-center">expolore ideas!</p>

      <Link href="/ideas" className="px-6 py-3 rounded-md bg-primary cursor-pointer hover:bg-primary/90 font-bold text-white">ideas</Link>
    </main>
  );
}
