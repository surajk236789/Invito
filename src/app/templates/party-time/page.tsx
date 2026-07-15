"use client";

import { useMemo } from "react";
import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps, PhotoShape } from "@/types/template";
import { Camera } from "lucide-react";

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
  primaryColor: "#8b5cf6", // Violet
  fontColor: "#ffffff",
  aspectRatio: "aspect-[9/16]",
};

const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[160px] sm:max-h-[220px]";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[160px] sm:max-h-[220px] rounded-2xl";
  return "aspect-[3/4] w-auto h-full max-h-[200px] sm:max-h-[260px] rounded-2xl"; // vertical
};

function NeonNightsTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-zinc-950 relative flex flex-col border-2`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 20px ${data.primaryColor}40 inset`, color: data.fontColor }}>
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-8">
        <p className="font-mono text-sm tracking-widest uppercase mb-2" style={{ color: data.primaryColor, textShadow: `0 0 10px ${data.primaryColor}` }}>{data.title}</p>
        <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter" style={{ textShadow: `0 0 20px ${data.primaryColor}` }}>
          {data.name}
        </h1>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden border-4 shadow-[0_0_30px_rgba(0,0,0,0.8)]`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 20px ${data.primaryColor}` }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white/20" />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center font-mono text-center">
        <div className="bg-black/80 backdrop-blur-md border px-6 py-4 rounded-xl shadow-xl w-full" style={{ borderColor: `${data.primaryColor}50` }}>
          <p className="text-base sm:text-lg font-bold mb-1 text-white">{data.date}</p>
          <p className="text-sm text-zinc-400 mb-2">{data.time}</p>
          <p className="text-xs sm:text-sm text-zinc-300">{data.venue}</p>
        </div>
        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest mt-4">{data.rsvp}</p>
      </div>
    </div>
  );
}

function ClubTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-[#050505] relative flex flex-col overflow-hidden`} style={{ color: data.fontColor }}>
      {/* Abstract blur circles */}
      <div className="absolute top-0 right-0 w-64 h-64 mix-blend-screen opacity-50 blur-3xl pointer-events-none" style={{ backgroundColor: data.primaryColor }}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 mix-blend-screen opacity-40 blur-3xl pointer-events-none" style={{ backgroundColor: data.primaryColor }}></div>

      <div className="p-8 pb-4 z-10 text-left flex-shrink-0 mt-4">
        <p className="font-sans font-bold text-xs uppercase tracking-widest mb-4 opacity-70 border-l-2 pl-3" style={{ borderColor: data.primaryColor }}>{data.title}</p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase leading-[0.9] tracking-tighter">
          {data.name}
        </h1>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden shadow-2xl saturate-150`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} className="mix-blend-luminosity opacity-90" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-800" />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col text-left">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10">
            <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">When</p>
            <p className="text-xs sm:text-sm font-bold">{data.date}</p>
            <p className="text-xs text-zinc-400">{data.time}</p>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-xl p-3 border border-white/10">
            <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">Where</p>
            <p className="text-xs sm:text-sm font-bold truncate">{data.venue}</p>
          </div>
        </div>
        <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">{data.rsvp}</p>
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
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none opacity-40">
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
        <p className="font-bold text-xs uppercase tracking-[0.3em] mb-3 text-white/80">{data.title}</p>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          {data.name}
        </h1>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-4 border-white/10`} style={{ borderColor: `${data.primaryColor}50` }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/60 backdrop-blur-md">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white/30" />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center text-center">
        <div className="inline-block bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 mb-4">
          <p className="text-sm sm:text-base font-bold">{data.date} &bull; {data.time}</p>
        </div>
        <p className="text-xs sm:text-sm font-medium mb-3 text-white/90">{data.venue}</p>
        <p className="text-[9px] text-white/40 uppercase tracking-widest">{data.rsvp}</p>
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
