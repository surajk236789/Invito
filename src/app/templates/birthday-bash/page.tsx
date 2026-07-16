"use client";

import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps, PhotoShape } from "@/types/template";
import { Camera, Calendar, MapPin, PartyPopper, Sparkles, Star, Heart, Clock, Music } from "lucide-react";
import { useMemo, useEffect, useState } from "react";


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
  "traditional-ganesha": [
    { primary: "#7f1d1d", font: "#fef3c7", name: "Auspicious Red" },
    { primary: "#f59e0b", font: "#451a03", name: "Marigold Yellow" },
    { primary: "#14532d", font: "#fefce8", name: "Sacred Green" }
  ],
  "royal-peacock": [
    { primary: "#082f49", font: "#38bdf8", name: "Peacock Blue" },
    { primary: "#064e3b", font: "#34d399", name: "Peacock Green" },
    { primary: "#4c1d95", font: "#a78bfa", name: "Peacock Purple" }
  ],
  "mandala-magic": [
    { primary: "#1e3a8a", font: "#ffffff", name: "Sapphire White" },
    { primary: "#451a03", font: "#fef3c7", name: "Earthy Brown" },
    { primary: "#3b0764", font: "#f3e8ff", name: "Regal Purple" }
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
  title: "You're invited to celebrate",
  name: "Ira's 2nd Birthday",
  date: "Saturday, October 24th",
  time: "8:00 PM onwards",
  venue: "The Grand Lounge, 123 Party Lane, NY",
  rsvp: "RSVP by Oct 20th to 555-0199",
  photoUrl: null,
  photoRotation: 0,
  photoZoom: 1,
  photoFit: "cover",
  photoShape: "vertical",
  style: "modern",
  primaryColor: TEMPLATE_PALETTES["modern"]?.[0]?.primary || "#ffffff",
  fontColor: TEMPLATE_PALETTES["modern"]?.[0]?.font || "#000000",
  aspectRatio: "aspect-[3/4]",
};

export default function BirthdayBashEditor() {
  return (
    <TemplateEditor
      title="Customize Invitation"
      defaultData={initialData}
      availableStyles={["modern", "playful", "elegant", "neon", "luxury", "retro", "polaroid", "minimalist", "balloon", "animated", "traditional-ganesha", "royal-peacock", "mandala-magic"]}
      hideSizeSelector={true}
      styleColorPalettes={TEMPLATE_PALETTES}
      renderTemplate={(data, FullPictureDisplay, gifTime) => {
        const props = { data, FullPictureDisplay, gifTime };
        switch (data.style) {
          case "modern": return <ModernTemplate {...props} />;
          case "playful": return <PlayfulTemplate {...props} />;
          case "elegant": return <ElegantTemplate {...props} />;
          case "neon": return <NeonTemplate {...props} />;
          case "luxury": return <LuxuryTemplate {...props} />;
          case "retro": return <RetroTemplate {...props} />;
          case "polaroid": return <PolaroidTemplate {...props} />;
          case "minimalist": return <MinimalistTemplate {...props} />;
          case "balloon": return <BalloonTemplate {...props} />;
          case "animated": return <AnimatedPartyTemplate {...props} />;
          case "traditional-ganesha": return <TraditionalGaneshaTemplate {...props} />;
          case "royal-peacock": return <RoyalPeacockTemplate {...props} />;
          case "mandala-magic": return <MandalaMagicTemplate {...props} />;
          default: return <ModernTemplate {...props} />;
        }
      }}
    />
  );
}

/* ================= TEMPLATES ================= */

// Helper for photo shape
const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[240px] sm:max-h-[320px] shadow-lg";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[240px] sm:max-h-[320px] rounded-3xl shadow-xl";
  return "aspect-[3/4] w-auto h-full max-h-[280px] sm:max-h-[380px] rounded-3xl shadow-xl"; // vertical
};

function ModernTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30" 
        style={{ background: `radial-gradient(circle at top right, ${data.primaryColor}, transparent 50%), radial-gradient(circle at bottom left, ${data.primaryColor}, transparent 50%)` }}
      ></div>
      
      <div className="p-6 pb-2 sm:p-8 sm:pb-4 z-10 text-center flex-shrink-0">
        <p className="font-semibold tracking-widest uppercase text-[10px] font-bold sm:text-sm font-bold mb-2 sm:mb-4" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white">
          {data.name}
        </h1>
      </div>

            {data.photoUrl ? (
        <div className="px-6 z-10 w-full mb-2 sm:mb-4 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden border-2 bg-transparent shadow-[0_0_20px_rgba(0,0,0,0.5)]`} style={{ borderColor: `${data.primaryColor}50` }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      <div className="p-4 sm:p-8 pt-0 sm:pt-0 z-10 w-full bg-black/90 mt-auto flex-shrink-0 border-t border-white/10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 text-center mb-3 mt-4 w-full justify-center">
          <div>
            <p className="font-bold text-sm font-bold sm:text-lg text-white">{data.date}</p>
            <p className="text-white/80 text-xs font-bold sm:text-sm font-bold">{data.time}</p>
          </div>
        </div>
        <div className="text-center w-full bg-white/10 p-2 sm:p-3 rounded-xl mb-3">
          <p className="text-xs font-bold sm:text-sm font-bold font-medium text-white">{data.venue}</p>
        </div>
        <p className="text-[10px] font-bold sm:text-xs font-bold text-white/90">{data.rsvp}</p>
      </div>
    </div>
  );
}

function PlayfulTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col border-4 border-white`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')] z-0"></div>
      
      <div className={`p-4 sm:p-8 z-20 flex-1 flex flex-col items-center text-center justify-center`}>
        {data.photoUrl && (
          <div className={`${shapeClasses} mb-4 sm:mb-8 bg-white overflow-hidden border-4 border-white shadow-xl rotate-[-3deg] relative z-10`}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        )}
        
        <div className="bg-white p-4 sm:p-6 rounded-3xl w-full shadow-lg border-2 border-white rotate-[2deg] relative z-20">
          <p className="font-bold tracking-widest uppercase text-[10px] font-bold sm:text-xs font-bold mb-2" style={{ color: data.primaryColor }}>{data.title}</p>
          <h1 className="text-xl sm:text-3xl font-black leading-tight mb-2 sm:mb-4 text-zinc-900">
            {data.name}
          </h1>
          
          <div className="w-8 sm:w-12 h-1 mx-auto my-2 sm:my-4 rounded-full" style={{ backgroundColor: data.primaryColor }}></div>
          
          <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-4 text-xs sm:text-sm font-bold text-[#451a03] font-bold">
            <p className="flex items-center justify-center gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: data.primaryColor }} /> {data.date} • {data.time}
            </p>
            <p className="flex items-center justify-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: data.primaryColor }} /> {data.venue}
            </p>
          </div>
          
          <div className="py-1 px-3 sm:py-2 sm:px-4 rounded-xl text-[10px] font-bold sm:text-xs font-bold font-black inline-block mt-2 text-white" style={{ backgroundColor: data.primaryColor }}>
            {data.rsvp}
          </div>
        </div>
      </div>
    </div>
  );
}

function ElegantTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-3 border border-zinc-200 z-0"></div>
      
      {/* Top */}
      <div className="p-6 sm:p-8 pt-8 sm:pt-10 flex-shrink-0 text-center z-10 w-full">
        <p className="tracking-[0.2em] uppercase text-[10px] font-bold sm:text-xs font-bold mb-3 sm:mb-6 font-serif italic" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-2xl sm:text-4xl font-light font-serif text-[#1c1917] font-bold leading-tight">
          {data.name}
        </h1>
      </div>

      {/* Middle */}
      {data.photoUrl ? (
        <div className="px-6 z-10 w-full flex flex-1 justify-center items-center min-h-0 py-2">
          <div className={`${shapeClasses} overflow-hidden border p-1 bg-transparent`} style={{ borderColor: data.primaryColor }}>
            <div className={`w-full h-full overflow-hidden bg-[#d6d3d1] flex items-center justify-center ${data.photoShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}>
              <FullPictureDisplay src={data.photoUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      {/* Bottom */}
      <div className="p-6 sm:p-8 pb-8 sm:pb-10 flex-shrink-0 text-center z-10 w-full flex flex-col items-center">
        <div className="h-[1px] w-8 sm:w-12 mx-auto mb-4 sm:mb-6 opacity-100" style={{ backgroundColor: data.primaryColor }}></div>
        <p className="font-serif text-sm font-bold sm:text-lg mb-1 sm:mb-2 text-[#292524] font-bold">{data.date}</p>
        <p className="text-[#57534e] font-bold text-xs font-bold sm:text-sm font-bold mb-4 sm:mb-6">{data.time}</p>
        <p className="text-[10px] font-bold sm:text-sm font-bold font-medium tracking-wide max-w-[90%] sm:max-w-[80%] mx-auto leading-relaxed text-[#292524] font-bold">{data.venue}</p>
        <p className="text-[8px] font-bold sm:text-[10px] font-bold mt-4 sm:mt-6 tracking-widest uppercase opacity-80" style={{ color: data.primaryColor }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

function NeonTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 bg-[size:20px_20px] z-0" style={{ backgroundImage: `linear-gradient(${data.primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${data.primaryColor}20 1px, transparent 1px)` }}></div>
      
      <div className="p-6 pb-0 sm:p-8 sm:pb-0 z-10 text-center mt-2 sm:mt-4 flex-shrink-0">
        <p className="font-bold tracking-widest uppercase text-[10px] font-bold sm:text-xs font-bold mb-2 sm:mb-4" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white mb-2 sm:mb-6" style={{ textShadow: `0 0 10px ${data.primaryColor}` }}>
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-6 sm:px-8 flex-1 flex flex-col items-center justify-center z-10 w-full mb-2 sm:mb-6 relative min-h-0">
          <div className={`${shapeClasses} bg-transparent overflow-hidden border-2 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 15px ${data.primaryColor}80` }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      <div className="p-6 pt-0 sm:p-8 sm:pt-0 z-10 w-full flex-shrink-0 flex flex-col items-center">
        <div className="w-full border bg-black/80 p-3 sm:p-4" style={{ borderColor: `${data.primaryColor}50`, boxShadow: `0 0 10px ${data.primaryColor}40` }}>
          <p className="font-bold text-sm font-bold sm:text-lg text-white text-center mb-1">{data.date}</p>
          <p className="text-xs sm:text-sm text-center mb-2 sm:mb-4 font-bold" style={{ color: data.primaryColor }}>{data.time}</p>
          <p className="text-[10px] font-bold sm:text-sm font-bold font-medium text-white text-center leading-relaxed">{data.venue}</p>
        </div>
        <p className="text-[8px] font-bold sm:text-[10px] font-bold text-white/90 mt-4 sm:mt-6 tracking-widest bg-black px-2">{data.rsvp}</p>
      </div>
    </div>
  );
}

function LuxuryTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col border-[12px] shadow-inner`} style={{ backgroundColor: data.primaryColor, borderColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
      
      <div className="p-6 sm:p-10 pb-0 z-10 text-center mt-2 sm:mt-4 flex-shrink-0">
        <p className="tracking-[0.3em] uppercase text-[8px] font-bold sm:text-[10px] font-bold mb-2 sm:mb-4 opacity-100" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-2xl sm:text-4xl font-serif leading-tight mb-2">
          {data.name}
        </h1>
        <div className="w-16 sm:w-24 h-[1px] mx-auto my-3 sm:my-4 opacity-100" style={{ backgroundColor: data.primaryColor }}></div>
      </div>

      <div className="px-6 sm:px-10 z-10 w-full flex flex-1 justify-center items-center mb-2 sm:mb-4 min-h-0">
        <div className={`${shapeClasses} border p-1 bg-[#1e293b]`} style={{ borderColor: data.primaryColor }}>
          <div className={`w-full h-full bg-[#0f172a] flex items-center justify-center overflow-hidden ${data.photoShape === 'circle' ? 'rounded-full' : ''}`}>
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 opacity-100" style={{ color: data.primaryColor }} />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 pt-0 z-10 w-full flex-shrink-0 flex flex-col items-center">
        <p className="font-serif text-sm font-bold sm:text-lg mb-1" style={{ color: data.primaryColor }}>{data.date}</p>
        <p className="text-white/80 text-xs font-bold sm:text-sm font-bold mb-3 sm:mb-4">{data.time}</p>
        
        <p className="text-[10px] font-bold sm:text-xs font-bold font-medium tracking-widest leading-loose text-center max-w-[90%] sm:max-w-[80%] uppercase">{data.venue}</p>
        
        <p className="text-[8px] font-bold sm:text-[10px] font-bold mt-3 sm:mt-6 tracking-[0.2em] uppercase opacity-100" style={{ color: data.primaryColor }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

// ================= NEW TEMPLATES =================

function RetroTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] pointer-events-none"></div>
      
      {/* Top */}
      <div className="p-4 sm:p-6 pb-2 z-10 text-center flex-shrink-0 w-full">
        <div className="bg-white border-2 border-black p-1 sm:p-2 shadow-[2px_2px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] inline-block mb-2 sm:mb-4 transform -rotate-2">
          <p className="font-bold tracking-widest uppercase text-[8px] font-bold sm:text-[10px] font-bold text-black">{data.title}</p>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white transform rotate-1" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>
          {data.name}
        </h1>
      </div>

      {/* Middle */}
      <div className="px-4 sm:px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0 py-2">
        <div className={`${shapeClasses} bg-white border-4 border-black shadow-[4px_4px_0_0_#000] sm:shadow-[8px_8px_0_0_#000] overflow-hidden`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-black/90" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-4 sm:p-6 pt-2 z-10 w-full flex-shrink-0">
        <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] p-3 sm:p-4 flex flex-col items-center text-center">
          <div className="flex justify-between w-full items-center mb-2 sm:mb-3 border-b-2 border-dashed border-black pb-2">
            <p className="font-black text-[10px] font-bold sm:text-sm font-bold text-black">{data.date}</p>
            <p className="text-black text-[10px] sm:text-sm font-bold bg-yellow-300 px-1 sm:px-2 border-2 border-black">{data.time}</p>
          </div>
          <p className="text-[10px] sm:text-sm font-bold text-black uppercase mb-2 sm:mb-3 leading-tight">{data.venue}</p>
          <div className="bg-black text-white px-2 py-1 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase">{data.rsvp}</div>
        </div>
      </div>
    </div>
  );
}

function PolaroidTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const isCircle = data.photoShape === 'circle';
  const isHorizontal = data.photoShape === 'horizontal';
  
  // Create an aesthetic textured background for Polaroid
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col p-6 sm:p-8 shadow-inner border border-zinc-300/50`} style={{ backgroundColor: `${data.primaryColor}20`, backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')", color: data.fontColor }}>
      
      {/* Scattered background elements to make it unique */}
      <div className="absolute top-8 left-4 w-12 h-12 rounded-full opacity-20 blur-xl" style={{ backgroundColor: data.primaryColor }}></div>
      <div className="absolute bottom-16 right-4 w-20 h-20 rounded-full opacity-20 blur-xl" style={{ backgroundColor: data.primaryColor }}></div>

      <div className="flex-1 w-full bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15),0_8px_10px_-6px_rgba(0,0,0,0.1)] border border-zinc-200 flex flex-col p-4 sm:p-5 relative transform rotate-1 transition-transform z-10">
        {/* Tape decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-sm rotate-[-3deg] z-20" style={{ mixBlendMode: 'multiply' }}></div>
        
        {/* Photo area */}
        <div className={`w-full ${isHorizontal ? 'aspect-[4/3]' : 'aspect-square'} bg-[#1a1a1a] mb-5 overflow-hidden shadow-inner ${isCircle ? 'rounded-full' : 'rounded-sm'}`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} className="contrast-110 saturate-50" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white/20" />
            </div>
          )}
        </div>

        {/* Hand-written style text area */}
        <div className="flex flex-col items-center justify-center text-center flex-1 font-serif text-[#1e293b] font-bold">
          <p className="text-[8px] font-bold sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 font-sans opacity-100" style={{ color: data.primaryColor }}>{data.title}</p>
          <h1 className="text-2xl sm:text-3xl font-bold italic mb-3 text-zinc-900" style={{ textDecorationColor: data.primaryColor, textDecorationLine: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: '6px' }}>
            {data.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 text-[10px] font-bold sm:text-xs font-bold font-medium mb-3 opacity-80">
            <span className="bg-zinc-100 px-2 py-0.5 rounded-sm">{data.date}</span>
            <span className="bg-zinc-100 px-2 py-0.5 rounded-sm">{data.time}</span>
          </div>
          <p className="text-[10px] font-bold sm:text-xs font-bold max-w-[90%] leading-relaxed opacity-90">{data.venue}</p>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-widest mt-auto pt-3 font-sans font-bold" style={{ color: data.primaryColor }}>{data.rsvp}</p>
        </div>
      </div>
    </div>
  );
}

function MinimalistTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col p-6 sm:p-10 border border-zinc-100`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="w-full flex justify-between items-start mb-6 sm:mb-12">
        <div className="w-3/4">
          <h1 className="text-2xl sm:text-4xl font-light tracking-tight leading-none mb-2 sm:mb-4">
            {data.name}
          </h1>
          <p className="text-[10px] font-bold sm:text-xs font-bold uppercase tracking-[0.2em] font-medium" style={{ color: data.primaryColor }}>{data.title}</p>
        </div>
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex-shrink-0" style={{ backgroundColor: data.primaryColor }}></div>
      </div>

      {data.photoUrl ? (
        <div className="px-6 flex-1 flex items-center justify-center w-full mb-6 sm:mb-12 min-h-0">
          <div className={`${shapeClasses} overflow-hidden bg-zinc-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-zinc-200`}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      <div className="w-full grid grid-cols-2 gap-4 sm:gap-8 text-[10px] font-bold sm:text-sm font-bold">
        <div>
          <p className="font-bold mb-1" style={{ color: data.primaryColor }}>When</p>
          <p>{data.date}</p>
          <p className="text-zinc-500">{data.time}</p>
        </div>
        <div>
          <p className="font-bold mb-1" style={{ color: data.primaryColor }}>Where</p>
          <p className="leading-snug">{data.venue}</p>
        </div>
      </div>
      <div className="w-full mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-200">
        <p className="text-[8px] font-bold sm:text-xs font-bold tracking-widest uppercase text-zinc-400">{data.rsvp}</p>
      </div>
    </div>
  );
}

function BalloonTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  
  const balloons = [
    { left: '10%', top: '15%', size: 60, color: data.primaryColor },
    { left: '80%', top: '25%', size: 80, color: '#fbcfe8' },
    { left: '20%', top: '70%', size: 50, color: '#fef08a' },
    { left: '75%', top: '65%', size: 70, color: '#bae6fd' },
  ];

  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      {/* Background Balloons */}
      {balloons.map((b, i) => (
        <div key={i} className="absolute z-0 opacity-100" style={{ left: b.left, top: b.top, width: b.size, height: b.size * 1.2, backgroundColor: b.color, borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%', transform: `rotate(${i % 2 === 0 ? 15 : -15}deg)` }}>
          <div className="absolute top-[98%] left-1/2 w-0.5 h-16 bg-slate-300 -translate-x-1/2 rotate-[-5deg]"></div>
        </div>
      ))}
      
      <div className="p-6 pb-2 z-10 text-center flex-shrink-0 relative bg-white/90 backdrop-blur-sm m-4 rounded-3xl shadow-sm border border-white/90">
        <p className="font-bold tracking-widest uppercase text-[10px] font-bold sm:text-xs font-bold mb-1" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-3xl sm:text-4xl font-black leading-tight text-slate-800">
          {data.name}
        </h1>
      </div>

      <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0">
        <div className={`${shapeClasses} bg-white p-2 sm:p-3 shadow-xl overflow-hidden rounded-2xl rotate-2 border border-slate-100`}>
          <div className="w-full h-full overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <Camera className="w-8 h-8 text-slate-300" />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 z-10 w-full flex-shrink-0">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white flex flex-col items-center text-center mx-4 mb-4">
          <p className="font-bold text-sm font-bold text-slate-800 mb-1">{data.date} • {data.time}</p>
          <p className="text-xs font-bold font-medium text-slate-600 mb-2">{data.venue}</p>
          <p className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full text-white" style={{ backgroundColor: data.primaryColor }}>{data.rsvp}</p>
        </div>
      </div>
    </div>
  );
}


function AnimatedPartyTemplate({ data, FullPictureDisplay, gifTime }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  const [localTime, setLocalTime] = useState(0);

  useEffect(() => {
    if (gifTime !== null && gifTime !== undefined) return;
    let rAF: number;
    let start = Date.now();
    const loop = () => {
      setLocalTime(Date.now() - start);
      rAF = requestAnimationFrame(loop);
    };
    rAF = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rAF);
  }, [gifTime]);

  const time = (gifTime !== null && gifTime !== undefined) ? gifTime : localTime;

  const balloons = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      left: 15 + i * 15,
      width: 40 + i * 10,
      height: 48 + i * 12,
      duration: 6000 + i * 1000,
      offset: i * 2000,
      color: i % 2 === 0 ? data.primaryColor : '#fbbf24'
    }));
  }, [data.primaryColor]);

  const lights = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 4,
      duration: 1000 + Math.random() * 1000,
      offset: Math.random() * 2000
    }));
  }, []);
  
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      {/* Floating Animated Balloons */}
      {balloons.map((b, i) => {
        const progress = ((time + b.offset) % b.duration) / b.duration;
        const y = 120 - progress * 150;
        const rot = progress * 360;
        const op = progress > 0.9 ? 1 - ((progress - 0.9) * 10) : 1;

        return (
          <div key={`ab-${i}`} className="absolute z-0" style={{ 
            left: `${b.left}%`, 
            width: `${b.width}px`, 
            height: `${b.height}px`, 
            backgroundColor: b.color,
            opacity: op * 0.6,
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            transform: `translateY(${y}vh) rotate(${rot}deg)`
          }}>
            <div className="absolute top-[98%] left-1/2 w-0.5 h-12 bg-white/20 -translate-x-1/2"></div>
          </div>
        );
      })}

      {/* Blinking Lights */}
      {lights.map((l, i) => {
        const phase = ((time + l.offset) % l.duration) / l.duration;
        const scale = 0.8 + 0.2 * Math.sin(phase * Math.PI * 2);
        const op = 0.4 + 0.6 * Math.sin(phase * Math.PI * 2);

        return (
          <div key={`al-${i}`} className="absolute z-0 bg-white shadow-[0_0_10px_#fff] rounded-full" style={{
            left: `${l.left}%`,
            top: `${l.top}%`,
            width: `${l.size}px`,
            height: `${l.size}px`,
            opacity: op,
            transform: `scale(${scale})`
          }}></div>
        );
      })}

      <div className="p-6 pb-2 z-10 text-center flex-shrink-0 mt-4">
        <h1 className="text-4xl sm:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: `0 0 15px ${data.primaryColor}` }}>
          {data.name}
        </h1>
        <p className="font-bold tracking-widest uppercase text-xs font-bold sm:text-sm font-bold mt-2" style={{ color: data.primaryColor }}>{data.title}</p>
      </div>

      {data.photoUrl ? (
        <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0">
          <div className={`${shapeClasses} border-4 bg-black/90 backdrop-blur-md p-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor }}>
            <div className="w-full h-full overflow-hidden bg-black/90 flex items-center justify-center">
              <FullPictureDisplay src={data.photoUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}

      <div className="p-6 pt-4 z-10 w-full flex-shrink-0 flex flex-col items-center">
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
          <p className="font-bold text-sm font-bold sm:text-base text-white mb-1">{data.date}</p>
          <p className="text-xs font-bold sm:text-sm font-bold text-white/80 mb-3">{data.time}</p>
          <p className="text-[10px] font-bold sm:text-xs font-bold font-medium text-white/90 leading-relaxed mb-4">{data.venue}</p>
          <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full inline-block text-white" style={{ backgroundColor: data.primaryColor }}>{data.rsvp}</p>
        </div>
      </div>
    </div>
  );
}


function TraditionalGaneshaTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden bg-cover bg-center`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-10 bg-[url('/images/marigold_garland.png')] bg-contain pointer-events-none mix-blend-multiply"></div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[70%] h-[40%] opacity-80 pointer-events-none bg-[url('/images/ganesha.png')] bg-contain bg-top bg-no-repeat mix-blend-screen"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-20">
        <p className="font-serif italic text-sm sm:text-base font-bold mb-2">{data.title}</p>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-tight drop-shadow-sm mb-4">
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-6 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] border-4`} style={{ borderColor: data.fontColor }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative z-10 px-8">
           <div className="w-64 h-64 sm:w-80 sm:h-80 opacity-70 bg-[url('/images/ganesha.png')] bg-contain bg-center bg-no-repeat mix-blend-screen mb-4"></div>
        </div>
      )}

      <div className="z-10 w-full flex-shrink-0 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-3 w-full mb-4 font-serif font-bold text-sm sm:text-base">
          <span>{data.date}</span>
          <span>&bull;</span>
          <span>{data.time}</span>
        </div>
        
        <p className="text-xs font-bold sm:text-sm font-bold tracking-widest opacity-90 mb-6 uppercase max-w-[80%] mx-auto">{data.venue}</p>
        <p className="text-[10px] font-bold sm:text-xs font-bold opacity-100 mb-8 pb-4 uppercase tracking-widest border-t pt-4 w-1/2 mx-auto" style={{ borderColor: `${data.fontColor}40` }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

function RoyalPeacockTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden bg-cover bg-center`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute top-0 right-0 h-full w-[70%] opacity-90 pointer-events-none bg-[url('/images/peacock_motif.png')] bg-contain bg-right bg-no-repeat"></div>
      
      <div className="p-8 pb-4 z-10 text-left flex-shrink-0 mt-8 sm:mt-12 w-2/3">
        <p className="font-sans font-bold tracking-widest text-[10px] sm:text-xs uppercase mb-2 opacity-90">{data.title}</p>
        <h1 className="text-5xl sm:text-7xl font-serif font-black leading-none drop-shadow-md">
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-6 relative flex flex-1 justify-start items-center min-h-0 pr-[30%]">
          <div className={`${shapeClasses} overflow-hidden shadow-2xl rounded-tr-[4rem] rounded-bl-[4rem] border-2`} style={{ borderColor: data.fontColor }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative z-10 px-8"></div>
      )}

      <div className="z-10 w-full flex-shrink-0 flex flex-col items-start justify-center text-left p-8">
        <div className="font-sans font-bold text-sm sm:text-base mb-2 border-l-2 pl-3" style={{ borderColor: data.fontColor }}>
          {data.date} <br/> {data.time}
        </div>
        <p className="text-xs font-bold sm:text-sm font-bold opacity-90 mb-4 max-w-[70%]">{data.venue}</p>
        <p className="text-[10px] font-bold sm:text-xs font-bold opacity-100 mb-4 tracking-widest uppercase">{data.rsvp}</p>
      </div>
    </div>
  );
}

function MandalaMagicTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden bg-cover bg-center`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('/images/mandala.png')] bg-cover bg-center bg-no-repeat mix-blend-plus-lighter"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square opacity-[0.05] pointer-events-none bg-[url('/images/mandala.png')] bg-contain bg-center bg-no-repeat mix-blend-plus-lighter animate-[spin_60s_linear_infinite]"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-8">
        <p className="font-serif italic font-bold text-sm sm:text-base mb-3 opacity-90">{data.title}</p>
        <h1 className="text-5xl sm:text-6xl font-serif font-black leading-tight drop-shadow-lg tracking-wide uppercase">
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-6 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-full border-8`} style={{ borderColor: `${data.fontColor}30` }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative z-10 px-8"></div>
      )}

      <div className="z-10 w-full flex-shrink-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-t from-black/40 to-transparent">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-4 border border-white/20">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-widest">{data.date} &bull; {data.time}</span>
        </div>
        <p className="text-xs font-bold sm:text-sm font-bold opacity-100 mb-6 uppercase tracking-wider">{data.venue}</p>
        <p className="text-[10px] font-bold sm:text-xs font-bold opacity-80 uppercase tracking-widest">{data.rsvp}</p>
      </div>
    </div>
  );
}

