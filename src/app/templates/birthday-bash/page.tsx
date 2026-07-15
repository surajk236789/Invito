"use client";

import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps, PhotoShape } from "@/types/template";
import { Camera, Calendar, MapPin, PartyPopper, Sparkles, Star, Heart, Clock, Music } from "lucide-react";
import { useMemo, useEffect, useState } from "react";

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
  primaryColor: "#ec4899",
  fontColor: "#ffffff",
  aspectRatio: "aspect-[3/4]",
};

export default function BirthdayBashEditor() {
  return (
    <TemplateEditor
      title="Customize Invitation"
      defaultData={initialData}
      availableStyles={["modern", "playful", "elegant", "neon", "luxury", "retro", "polaroid", "minimalist", "balloon", "animated"]}
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
          default: return <ModernTemplate {...props} />;
        }
      }}
    />
  );
}

/* ================= TEMPLATES ================= */

// Helper for photo shape
const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[160px] sm:max-h-[220px]";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[160px] sm:max-h-[220px] rounded-2xl";
  return "aspect-[3/4] w-auto h-full max-h-[200px] sm:max-h-[260px] rounded-2xl"; // vertical
};

function ModernTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-[#111] relative flex flex-col`} style={{ color: data.fontColor }}>
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30" 
        style={{ background: `radial-gradient(circle at top right, ${data.primaryColor}, transparent 50%), radial-gradient(circle at bottom left, ${data.primaryColor}, transparent 50%)` }}
      ></div>
      
      <div className="p-6 pb-2 sm:p-8 sm:pb-4 z-10 text-center flex-shrink-0">
        <p className="font-semibold tracking-widest uppercase text-[10px] sm:text-sm mb-2 sm:mb-4" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white">
          {data.name}
        </h1>
      </div>

      <div className="px-6 z-10 w-full mb-2 sm:mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden border-2 bg-transparent shadow-[0_0_20px_rgba(0,0,0,0.5)]`} style={{ borderColor: `${data.primaryColor}50` }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white/20" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-8 pt-0 sm:pt-0 z-10 w-full bg-black/40 mt-auto flex-shrink-0 border-t border-white/10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 text-center mb-3 mt-4 w-full justify-center">
          <div>
            <p className="font-bold text-sm sm:text-lg text-white">{data.date}</p>
            <p className="text-white/80 text-xs sm:text-sm">{data.time}</p>
          </div>
        </div>
        <div className="text-center w-full bg-white/10 p-2 sm:p-3 rounded-xl mb-3">
          <p className="text-xs sm:text-sm font-medium text-white">{data.venue}</p>
        </div>
        <p className="text-[10px] sm:text-xs text-white/60">{data.rsvp}</p>
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
        <div className={`${shapeClasses} mb-4 sm:mb-8 bg-white overflow-hidden border-4 border-white shadow-xl rotate-[-3deg] relative z-10`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-white/80"><Camera className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600/50" /></div>
          )}
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-3xl w-full shadow-lg border-2 border-white rotate-[2deg] relative z-20">
          <p className="font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2" style={{ color: data.primaryColor }}>{data.title}</p>
          <h1 className="text-xl sm:text-3xl font-black leading-tight mb-2 sm:mb-4 text-zinc-900">
            {data.name}
          </h1>
          
          <div className="w-8 sm:w-12 h-1 mx-auto my-2 sm:my-4 rounded-full" style={{ backgroundColor: data.primaryColor }}></div>
          
          <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-4 text-xs sm:text-sm font-bold text-[#451a03]">
            <p className="flex items-center justify-center gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: data.primaryColor }} /> {data.date} • {data.time}
            </p>
            <p className="flex items-center justify-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: data.primaryColor }} /> {data.venue}
            </p>
          </div>
          
          <div className="py-1 px-3 sm:py-2 sm:px-4 rounded-xl text-[10px] sm:text-xs font-black inline-block mt-2 text-white" style={{ backgroundColor: data.primaryColor }}>
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
    <div className={`${data.aspectRatio} w-full bg-[#fdfbf7] relative flex flex-col`} style={{ color: data.fontColor }}>
      <div className="absolute inset-3 border border-zinc-200 z-0"></div>
      
      {/* Top */}
      <div className="p-6 sm:p-8 pt-8 sm:pt-10 flex-shrink-0 text-center z-10 w-full">
        <p className="tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-6 font-serif italic" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-2xl sm:text-4xl font-light font-serif text-[#1c1917] leading-tight">
          {data.name}
        </h1>
      </div>

      {/* Middle */}
      <div className="px-6 z-10 w-full flex flex-1 justify-center items-center min-h-0 py-2">
        <div className={`${shapeClasses} overflow-hidden border p-1 bg-transparent`} style={{ borderColor: data.primaryColor }}>
          <div className={`w-full h-full overflow-hidden bg-[#d6d3d1] flex items-center justify-center ${data.photoShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}>
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-[#a8a29e]" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="p-6 sm:p-8 pb-8 sm:pb-10 flex-shrink-0 text-center z-10 w-full flex flex-col items-center">
        <div className="h-[1px] w-8 sm:w-12 mx-auto mb-4 sm:mb-6 opacity-50" style={{ backgroundColor: data.primaryColor }}></div>
        <p className="font-serif text-sm sm:text-lg mb-1 sm:mb-2 text-[#292524]">{data.date}</p>
        <p className="text-[#57534e] text-xs sm:text-sm mb-4 sm:mb-6">{data.time}</p>
        <p className="text-[10px] sm:text-sm font-medium tracking-wide max-w-[90%] sm:max-w-[80%] mx-auto leading-relaxed text-[#292524]">{data.venue}</p>
        <p className="text-[8px] sm:text-[10px] mt-4 sm:mt-6 tracking-widest uppercase opacity-80" style={{ color: data.primaryColor }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

function NeonTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-zinc-950 relative flex flex-col`} style={{ color: data.fontColor }}>
      <div className="absolute inset-0 bg-[size:20px_20px] z-0" style={{ backgroundImage: `linear-gradient(${data.primaryColor}20 1px, transparent 1px), linear-gradient(90deg, ${data.primaryColor}20 1px, transparent 1px)` }}></div>
      
      <div className="p-6 pb-0 sm:p-8 sm:pb-0 z-10 text-center mt-2 sm:mt-4 flex-shrink-0">
        <p className="font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-2 sm:mb-4" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-2xl sm:text-4xl font-black leading-tight text-white mb-2 sm:mb-6" style={{ textShadow: `0 0 10px ${data.primaryColor}` }}>
          {data.name}
        </h1>
      </div>

      <div className="px-6 sm:px-8 flex-1 flex flex-col items-center justify-center z-10 w-full mb-2 sm:mb-6 relative min-h-0">
        <div className={`${shapeClasses} bg-transparent overflow-hidden border-2 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 15px ${data.primaryColor}80` }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <Camera className="w-8 h-8 sm:w-12 sm:h-12" style={{ color: data.primaryColor }} />
          )}
        </div>
      </div>

      <div className="p-6 pt-0 sm:p-8 sm:pt-0 z-10 w-full flex-shrink-0 flex flex-col items-center">
        <div className="w-full border bg-black/80 p-3 sm:p-4" style={{ borderColor: `${data.primaryColor}50`, boxShadow: `0 0 10px ${data.primaryColor}40` }}>
          <p className="font-bold text-sm sm:text-lg text-white text-center mb-1">{data.date}</p>
          <p className="text-xs sm:text-sm text-center mb-2 sm:mb-4 font-bold" style={{ color: data.primaryColor }}>{data.time}</p>
          <p className="text-[10px] sm:text-sm font-medium text-white text-center leading-relaxed">{data.venue}</p>
        </div>
        <p className="text-[8px] sm:text-[10px] text-white/50 mt-4 sm:mt-6 tracking-widest bg-black px-2">{data.rsvp}</p>
      </div>
    </div>
  );
}

function LuxuryTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-zinc-900 relative flex flex-col border-[12px] shadow-inner`} style={{ borderColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
      
      <div className="p-6 sm:p-10 pb-0 z-10 text-center mt-2 sm:mt-4 flex-shrink-0">
        <p className="tracking-[0.3em] uppercase text-[8px] sm:text-[10px] mb-2 sm:mb-4 opacity-70" style={{ color: data.primaryColor }}>{data.title}</p>
        <h1 className="text-2xl sm:text-4xl font-serif leading-tight mb-2">
          {data.name}
        </h1>
        <div className="w-16 sm:w-24 h-[1px] mx-auto my-3 sm:my-4 opacity-50" style={{ backgroundColor: data.primaryColor }}></div>
      </div>

      <div className="px-6 sm:px-10 z-10 w-full flex flex-1 justify-center items-center mb-2 sm:mb-4 min-h-0">
        <div className={`${shapeClasses} border p-1 bg-[#1e293b]`} style={{ borderColor: data.primaryColor }}>
          <div className={`w-full h-full bg-[#0f172a] flex items-center justify-center overflow-hidden ${data.photoShape === 'circle' ? 'rounded-full' : ''}`}>
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" style={{ color: data.primaryColor }} />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 pt-0 z-10 w-full flex-shrink-0 flex flex-col items-center">
        <p className="font-serif text-sm sm:text-lg mb-1" style={{ color: data.primaryColor }}>{data.date}</p>
        <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">{data.time}</p>
        
        <p className="text-[10px] sm:text-xs font-medium tracking-widest leading-loose text-center max-w-[90%] sm:max-w-[80%] uppercase">{data.venue}</p>
        
        <p className="text-[8px] sm:text-[10px] mt-3 sm:mt-6 tracking-[0.2em] uppercase opacity-50" style={{ color: data.primaryColor }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

// ================= NEW TEMPLATES =================

function RetroTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-[#f4eadd] relative flex flex-col`} style={{ color: data.fontColor }}>
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] pointer-events-none"></div>
      
      {/* Top */}
      <div className="p-4 sm:p-6 pb-2 z-10 text-center flex-shrink-0 w-full">
        <div className="bg-white border-2 border-black p-1 sm:p-2 shadow-[2px_2px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] inline-block mb-2 sm:mb-4 transform -rotate-2">
          <p className="font-bold tracking-widest uppercase text-[8px] sm:text-[10px] text-black">{data.title}</p>
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
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-black/50" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-4 sm:p-6 pt-2 z-10 w-full flex-shrink-0">
        <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] p-3 sm:p-4 flex flex-col items-center text-center">
          <div className="flex justify-between w-full items-center mb-2 sm:mb-3 border-b-2 border-dashed border-black pb-2">
            <p className="font-black text-[10px] sm:text-sm text-black">{data.date}</p>
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
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/70 backdrop-blur-md border border-zinc-200/50 shadow-sm rotate-[-3deg] z-20" style={{ mixBlendMode: 'multiply' }}></div>
        
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
        <div className="flex flex-col items-center justify-center text-center flex-1 font-serif text-[#1e293b]">
          <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] mb-1 font-sans opacity-60" style={{ color: data.primaryColor }}>{data.title}</p>
          <h1 className="text-2xl sm:text-3xl font-bold italic mb-3 text-zinc-900" style={{ textDecorationColor: data.primaryColor, textDecorationLine: 'underline', textDecorationStyle: 'wavy', textUnderlineOffset: '6px' }}>
            {data.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 text-[10px] sm:text-xs font-medium mb-3 opacity-80">
            <span className="bg-zinc-100 px-2 py-0.5 rounded-sm">{data.date}</span>
            <span className="bg-zinc-100 px-2 py-0.5 rounded-sm">{data.time}</span>
          </div>
          <p className="text-[10px] sm:text-xs max-w-[90%] leading-relaxed opacity-90">{data.venue}</p>
          <p className="text-[8px] sm:text-[10px] uppercase tracking-widest mt-auto pt-3 font-sans font-bold" style={{ color: data.primaryColor }}>{data.rsvp}</p>
        </div>
      </div>
    </div>
  );
}

function MinimalistTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full bg-white relative flex flex-col p-6 sm:p-10 border border-zinc-100`} style={{ color: data.fontColor }}>
      <div className="w-full flex justify-between items-start mb-6 sm:mb-12">
        <div className="w-3/4">
          <h1 className="text-2xl sm:text-4xl font-light tracking-tight leading-none mb-2 sm:mb-4">
            {data.name}
          </h1>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium" style={{ color: data.primaryColor }}>{data.title}</p>
        </div>
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex-shrink-0" style={{ backgroundColor: data.primaryColor }}></div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full mb-6 sm:mb-12 min-h-0">
        <div className={`${shapeClasses} overflow-hidden bg-zinc-50 shadow-sm border border-zinc-100`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-300" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 sm:gap-8 text-[10px] sm:text-sm">
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
        <p className="text-[8px] sm:text-xs tracking-widest uppercase text-zinc-400">{data.rsvp}</p>
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
    <div className={`${data.aspectRatio} w-full bg-slate-50 relative flex flex-col overflow-hidden`} style={{ color: data.fontColor }}>
      {/* Background Balloons */}
      {balloons.map((b, i) => (
        <div key={i} className="absolute z-0 opacity-50" style={{ left: b.left, top: b.top, width: b.size, height: b.size * 1.2, backgroundColor: b.color, borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%', transform: `rotate(${i % 2 === 0 ? 15 : -15}deg)` }}>
          <div className="absolute top-[98%] left-1/2 w-0.5 h-16 bg-slate-300 -translate-x-1/2 rotate-[-5deg]"></div>
        </div>
      ))}
      
      <div className="p-6 pb-2 z-10 text-center flex-shrink-0 relative bg-white/40 backdrop-blur-sm m-4 rounded-3xl shadow-sm border border-white/60">
        <p className="font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-1" style={{ color: data.primaryColor }}>{data.title}</p>
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
        <div className="bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-white flex flex-col items-center text-center mx-4 mb-4">
          <p className="font-bold text-sm text-slate-800 mb-1">{data.date} • {data.time}</p>
          <p className="text-xs font-medium text-slate-600 mb-2">{data.venue}</p>
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
    <div className={`${data.aspectRatio} w-full relative flex flex-col bg-indigo-950 overflow-hidden`} style={{ color: data.fontColor }}>
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
        <h1 className="text-4xl sm:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: `0 0 15px ${data.primaryColor}` }}>
          {data.name}
        </h1>
        <p className="font-bold tracking-widest uppercase text-xs sm:text-sm mt-2" style={{ color: data.primaryColor }}>{data.title}</p>
      </div>

      <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0">
        <div className={`${shapeClasses} border-4 bg-black/50 backdrop-blur-md p-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor }}>
          <div className="w-full h-full overflow-hidden bg-black/40 flex items-center justify-center">
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <Camera className="w-8 h-8 text-white/50" />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 z-10 w-full flex-shrink-0 flex flex-col items-center">
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20">
          <p className="font-bold text-sm sm:text-base text-white mb-1">{data.date}</p>
          <p className="text-xs sm:text-sm text-white/80 mb-3">{data.time}</p>
          <p className="text-[10px] sm:text-xs font-medium text-white/90 leading-relaxed mb-4">{data.venue}</p>
          <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full inline-block text-white" style={{ backgroundColor: data.primaryColor }}>{data.rsvp}</p>
        </div>
      </div>
    </div>
  );
}
