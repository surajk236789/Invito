import Link from "next/link";
import { Sparkles, Calendar, PartyPopper } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Choose a Template
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Select a starting point for your digital invitation. You can customize colors, text, and photos in the next step.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Birthday Template Card */}
        <Link href="/templates/birthday-bash" className="group flex flex-col gap-4">
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 overflow-hidden relative flex items-center justify-center p-8 transition-transform group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-pink-500/20 border border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-6 rounded-xl w-full text-center shadow-lg border border-white/20">
              <PartyPopper className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Birthday Bash</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">Vibrant & Fun</p>
            </div>
          </div>
        </Link>
        
        {/* Anniversary Template Card */}
        <Link href="/templates/elegant-anniversary" className="group flex flex-col gap-4">
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-zinc-800 to-black overflow-hidden relative flex items-center justify-center p-8 transition-transform group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-zinc-900/50 border border-zinc-700">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
            <div className="bg-zinc-900/90 backdrop-blur-sm p-6 rounded-xl w-full text-center shadow-lg border border-zinc-700/50">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">Elegant Anniversary</h3>
              <p className="text-zinc-400 mt-2">Sleek & Minimalist</p>
            </div>
          </div>
        </Link>
        
        {/* Party Time Template Card */}
        <Link href="/templates/party-time" className="group flex flex-col gap-4">
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden relative flex items-center justify-center p-8 transition-transform group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-purple-500/20 border border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] mix-blend-overlay"></div>
            <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-6 rounded-xl w-full text-center shadow-lg border border-white/20">
              <Calendar className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Party Time</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">Neon & Modern</p>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Wedding Category */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
        <Link href="/templates/wedding" className="group flex flex-col gap-4">
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-red-800 to-rose-950 overflow-hidden relative flex items-center justify-center p-8 transition-transform group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-red-900/50 border border-red-900/50">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-overlay"></div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl w-full text-center shadow-lg border border-white/20">
              <Sparkles className="w-12 h-12 text-rose-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">Wedding</h3>
              <p className="text-rose-200 mt-2">Traditional & Royal</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
