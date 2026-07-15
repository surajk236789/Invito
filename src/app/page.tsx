import Link from "next/link";
import { ArrowRight, Sparkles, Image as ImageIcon, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-32">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center gap-8 mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>The easiest way to create digital cards</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-balance">
          Celebrate life's moments with{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            beautiful invitations
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl text-balance">
          Choose a template, customize with your own text and photos, and share instantly with friends and family. No account required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link 
            href="/templates" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-semibold text-lg hover:scale-105 transition-transform"
          >
            Explore Templates
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto px-4 mt-40">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
            <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-2">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Stunning Designs</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Professionally crafted templates for birthdays, anniversaries, and parties that look amazing on any device.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Fully Customizable</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Personalize every detail. Add your own photos, change colors, and write heartfelt messages easily.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
              <Share2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Share Instantly</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Download as a high-quality image or share a live link directly to WhatsApp, Instagram, and more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
