import Link from "next/link";

export function Navbar() {
  return (
    <header className="w-full bg-white dark:bg-zinc-950">
      <div className="px-6 lg:px-8 py-5 flex items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Invito
          </span>
        </Link>
      </div>
    </header>
  );
}
