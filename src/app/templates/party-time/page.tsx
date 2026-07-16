"use client";

import { useMemo } from "react";
import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps, PhotoShape } from "@/types/template";
import { Camera } from "lucide-react";


const TEMPLATE_PALETTES: Record<string, { primary: string, font: string, name: string }[]> = {
  // Birthday
  "modern": [
    { primary: "#111111", font: "#ec4899", name: "Dark Pink" },
    { primary: "#0f172a", font: "#38bdf8", name: "Navy Blue" },
    { primary: "#171717", font: "#22c55e", name: "Charcoal Green" }
  ],
  "playful": [
    { primary: "#fcd34d", font: "#78350f", name: "Sunny Yellow" },
    { primary: "#fbcfe8", font: "#831843", name: "Bubblegum Pink" },
    { primary: "#bfdbfe", font: "#1e3a8a", name: "Sky Blue" }
  ],
  "elegant": [
    { primary: "#fdfbf7", font: "#b45309", name: "Ivory Gold" },
    { primary: "#f8fafc", font: "#334155", name: "Slate White" },
    { primary: "#fef2f2", font: "#991b1b", name: "Rose Red" }
  ],
  "neon": [
    { primary: "#000000", font: "#a855f7", name: "Cyber Purple" },
    { primary: "#050505", font: "#10b981", name: "Matrix Green" },
    { primary: "#09090b", font: "#f43f5e", name: "Neon Rose" }
  ],
  "luxury": [
    { primary: "#18181b", font: "#fbbf24", name: "Onyx Gold" },
    { primary: "#1e1b4b", font: "#e0e7ff", name: "Royal Indigo" },
    { primary: "#27272a", font: "#e4e4e7", name: "Silver Slate" }
  ],
  "retro": [
    { primary: "#fef3c7", font: "#ea580c", name: "Retro Orange" },
    { primary: "#ecfeff", font: "#0891b2", name: "Vintage Teal" },
    { primary: "#fce7f3", font: "#db2777", name: "Disco Pink" }
  ],
  "polaroid": [
    { primary: "#ffffff", font: "#171717", name: "Classic White" },
    { primary: "#fefce8", font: "#854d0e", name: "Sepia Tone" },
    { primary: "#f1f5f9", font: "#334155", name: "Cool Gray" }
  ],
  "minimalist": [
    { primary: "#ffffff", font: "#000000", name: "Stark Contrast" },
    { primary: "#f5f5f4", font: "#292524", name: "Warm Stone" },
    { primary: "#f0fdf4", font: "#14532d", name: "Mint Black" }
  ],
  "balloon": [
    { primary: "#dbeafe", font: "#1d4ed8", name: "Sky Balloons" },
    { primary: "#fce7f3", font: "#be185d", name: "Pink Balloons" },
    { primary: "#fef3c7", font: "#b45309", name: "Gold Balloons" }
  ],
  "animated": [
    { primary: "#2dd4bf", font: "#042f2e", name: "Teal Party" },
    { primary: "#f472b6", font: "#4c0519", name: "Pink Party" },
    { primary: "#a78bfa", font: "#2e1065", name: "Purple Party" }
  ],

  // Anniversary
  "classic": [
    { primary: "#ffffff", font: "#1f2937", name: "Classic Monochrome" },
    { primary: "#fefce8", font: "#854d0e", name: "Warm Ivory" },
    { primary: "#f8fafc", font: "#0f172a", name: "Cool Silver" }
  ],
  "gold-foil": [
    { primary: "#111827", font: "#fbbf24", name: "Midnight Gold" },
    { primary: "#fdfbf7", font: "#b45309", name: "Champagne Gold" },
    { primary: "#4c1d95", font: "#fde047", name: "Royal Gold" }
  ],
  "floral": [
    { primary: "#fdf2f8", font: "#831843", name: "Rose Garden" },
    { primary: "#f0fdf4", font: "#14532d", name: "Emerald Garden" },
    { primary: "#eff6ff", font: "#1e3a8a", name: "Bluebell Garden" }
  ],

  // Party Time
  "neon-nights": [
    { primary: "#000000", font: "#ec4899", name: "Pink Neon" },
    { primary: "#050505", font: "#06b6d4", name: "Cyan Neon" },
    { primary: "#09090b", font: "#22c55e", name: "Green Neon" }
  ],
  "club": [
    { primary: "#171717", font: "#ffffff", name: "VIP Black" },
    { primary: "#1e1b4b", font: "#f472b6", name: "Ultraviolet" },
    { primary: "#450a0a", font: "#fca5a5", name: "Red Room" }
  ],
  "animated-disco": [
    { primary: "#2e1065", font: "#fbbf24", name: "Studio 54" },
    { primary: "#111827", font: "#a78bfa", name: "Strobe Purple" },
    { primary: "#064e3b", font: "#34d399", name: "Laser Green" }
  ]
};

const initialData: CardData = {
  title: "You're Invited",
  name: "Summer House Party",
  date: "Friday, July 21st",
  time: "9:00 PM - Late",
  venue: "The Beach House, Malibu",
  rsvp: "RSVP to Mike by July 15th",
  photoUrl: null,
  photoRotation: 0,
  photoZoom: 1,
  photoFit: "cover",
  photoShape: "horizontal",
  style: "neon-nights",
  primaryColor: TEMPLATE_PALETTES["neon-nights"]?.[0]?.primary || "#ffffff", // Violet
  fontColor: TEMPLATE_PALETTES["neon-nights"]?.[0]?.font || "#000000",
  aspectRatio: "aspect-[9/16]",
};

const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[240px] sm:max-h-[320px] shadow-lg";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[240px] sm:max-h-[320px] rounded-3xl shadow-xl";
  return "aspect-[3/4] w-auto h-full max-h-[280px] sm:max-h-[380px] rounded-3xl shadow-xl"; // vertical
};

function NeonNightsTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-zinc-950 relative flex flex-col border-2`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 20px ${data.primaryColor}40 inset`, color: data.fontColor }}>
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-8">
        <p className="font-mono text-sm font-bold tracking-widest uppercase mb-2" style={{ color: data.primaryColor, textShadow: `0 0 10px ${data.primaryColor}` }}>{data.title}</p>
        <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter" style={{ textShadow: `0 0 20px ${data.primaryColor}` }}>
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden border-4 shadow-[0_0_30px_rgba(0,0,0,0.8)]`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 20px ${data.primaryColor}` }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center font-mono text-center">
        <div className="bg-black/80 backdrop-blur-md border px-6 py-4 rounded-xl shadow-xl w-full" style={{ borderColor: `${data.primaryColor}50` }}>
          <p className="text-base sm:text-lg font-bold mb-1 text-white">{data.date}</p>
          <p className="text-sm font-bold text-zinc-400 mb-2">{data.time}</p>
          <p className="text-xs font-bold sm:text-sm font-bold text-zinc-300">{data.venue}</p>
        </div>
        <p className="text-[10px] font-bold sm:text-xs font-bold text-zinc-500 uppercase tracking-widest mt-4">{data.rsvp}</p>
      </div>
    </div>
  );
}

function ClubTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-[#050505] relative flex flex-col overflow-hidden`} style={{ color: data.fontColor }}>
      {/* Abstract blur circles */}
      <div className="absolute top-0 right-0 w-64 h-64 mix-blend-screen opacity-100 blur-3xl pointer-events-none" style={{ backgroundColor: data.primaryColor }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 mix-blend-screen opacity-100 blur-3xl pointer-events-none" style={{ backgroundColor: data.primaryColor }}></div>

      <div className="p-8 pb-4 z-10 text-left flex-shrink-0 mt-4">
        <p className="font-sans font-bold text-xs font-bold uppercase tracking-widest mb-4 opacity-100 border-l-2 pl-3" style={{ borderColor: data.primaryColor }}>{data.title}</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase leading-[0.9] tracking-tighter">
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden shadow-2xl saturate-150`}>
            <FullPictureDisplay src={data.photoUrl} className="mix-blend-luminosity opacity-90" />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col text-left">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10">
            <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">When</p>
            <p className="text-xs sm:text-sm font-bold">{data.date}</p>
            <p className="text-xs font-bold text-zinc-400">{data.time}</p>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10">
            <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">Where</p>
            <p className="text-xs sm:text-sm font-bold truncate">{data.venue}</p>
          </div>
        </div>
        <p className="text-[10px] font-bold text-zinc-600 font-mono tracking-widest uppercase">{data.rsvp}</p>
      </div>
    </div>
  );
}

function AnimatedDiscoTemplate({ data, FullPictureDisplay, gifTime }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  const time = gifTime ?? Date.now();

  const strobeOpacity = useMemo(() => {
    return 0.3 + (Math.sin(time * 0.01) * 0.2);
  }, [time]);

  const discRotation = useMemo(() => {
    return (time * 0.05) % 360;
  }, [time]);

  return (
    <div className={`${data.aspectRatio} w-full bg-[#1a0b2e] relative flex flex-col overflow-hidden`} style={{ color: data.fontColor }}>
      {/* Background Animated Strobe */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-75"
        style={{ 
          background: `radial-gradient(circle at center, ${data.primaryColor} ${strobeOpacity * 100}%, transparent 100%)`,
          opacity: strobeOpacity 
        }}
      ></div>

      {/* Rotating Disco Ball (Simulated) */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none opacity-100">
        <div 
          className="w-full h-full rounded-full border border-white/20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
          style={{ 
            transform: `rotate(${discRotation}deg)`,
            backgroundSize: '20px 20px',
            backgroundColor: data.primaryColor,
            boxShadow: `0 0 30px ${data.primaryColor}`
          }}
        ></div>
      </div>

      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-16">
        <p className="font-bold text-xs font-bold uppercase tracking-[0.3em] mb-3 text-white/80">{data.title}</p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-4 border-white/10`} style={{ borderColor: `${data.primaryColor}50` }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center text-center">
        <div className="inline-block bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 mb-4">
          <p className="text-sm sm:text-base font-bold">{data.date} &bull; {data.time}</p>
        </div>
        <p className="text-xs font-bold sm:text-sm font-bold font-medium mb-3 text-white/90">{data.venue}</p>
        <p className="text-[9px] font-bold text-white/90 uppercase tracking-widest">{data.rsvp}</p>
      </div>
    </div>
  );
}

export default function PartyTimeEditor() {
  return (
    <TemplateEditor
      title="Customize Party Invite"
      defaultData={initialData}
      availableStyles={["neon-nights", "club", "animated-disco"]}
      hideSizeSelector={true}
      styleColorPalettes={TEMPLATE_PALETTES}
      renderTemplate={(data, FullPictureDisplay, gifTime) => {
        const props = { data, FullPictureDisplay, gifTime };
        switch (data.style) {
          case "neon-nights": return <NeonNightsTemplate {...props} />;
          case "club": return <ClubTemplate {...props} />;
          case "animated-disco": return <AnimatedDiscoTemplate {...props} />;
          default: return <NeonNightsTemplate {...props} />;
        }
      }}
    />
  );
}
