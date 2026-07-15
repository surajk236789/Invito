"use client";

import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps, PhotoShape } from "@/types/template";
import { Camera } from "lucide-react";

const initialData: CardData = {
  title: "Together Forever",
  name: "Sarah & John's 10th Anniversary",
  date: "Saturday, November 12th",
  time: "7:00 PM",
  venue: "The Grand Ballroom, NY",
  rsvp: "RSVP to Sarah 555-0123",
  photoUrl: null,
  photoRotation: 0,
  photoZoom: 1,
  photoFit: "cover",
  photoShape: "vertical",
  style: "classic",
  primaryColor: "#f8f5f0", // Warm cream for background
  fontColor: "#27272a", // Dark text
  aspectRatio: "aspect-[3/4]",
};

const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[160px] sm:max-h-[220px]";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[160px] sm:max-h-[220px] rounded-2xl";
  return "aspect-[3/4] w-auto h-full max-h-[200px] sm:max-h-[260px] rounded-2xl"; // vertical
};

function ClassicTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col border-[12px] border-white shadow-inner`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-4 border border-zinc-300 pointer-events-none"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0">
        <p className="font-serif italic text-sm mb-4">{data.title}</p>
        <h1 className="text-3xl sm:text-5xl font-serif font-light leading-tight">
          {data.name}
        </h1>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden shadow-md`} style={{ border: `2px solid ${data.fontColor}` }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-300" />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center font-serif text-center">
        <div className="w-12 h-px bg-zinc-300 mb-4"></div>
        <p className="text-sm sm:text-lg mb-1">{data.date} &middot; {data.time}</p>
        <p className="text-xs sm:text-sm text-zinc-600 mb-4">{data.venue}</p>
        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest">{data.rsvp}</p>
      </div>
    </div>
  );
}

function GoldFoilTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>

      <div className="p-8 pb-4 z-10 text-center flex-shrink-0">
        <h1 className="text-4xl sm:text-5xl font-serif font-black leading-tight uppercase tracking-widest">
          {data.name}
        </h1>
        <p className="font-sans font-light tracking-widest text-xs sm:text-sm mt-4 opacity-80">{data.title}</p>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden shadow-2xl`} style={{ border: `4px solid ${data.fontColor}` }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} className="grayscale contrast-125 brightness-110" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white/20" />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center text-center">
        <p className="text-sm sm:text-base font-bold tracking-widest uppercase mb-1">{data.date}</p>
        <p className="text-xs sm:text-sm opacity-70 mb-4">{data.time} | {data.venue}</p>
        <div className="px-6 py-2 border rounded-full text-[10px] sm:text-xs tracking-widest opacity-60" style={{ borderColor: data.fontColor }}>
          {data.rsvp}
        </div>
      </div>
    </div>
  );
}

function FloralTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      {/* Decorative floral elements (CSS circles) */}
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full mix-blend-multiply opacity-20 blur-xl pointer-events-none" style={{ backgroundColor: data.fontColor }}></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full mix-blend-multiply opacity-15 blur-2xl pointer-events-none" style={{ backgroundColor: data.fontColor }}></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-4">
        <p className="font-serif italic text-lg mb-2">{data.title}</p>
        <h1 className="text-4xl sm:text-6xl font-serif leading-none tracking-tight">
          {data.name}
        </h1>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden rounded-[3rem] shadow-xl border-4 border-white`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-200">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-400" />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center font-serif text-center mb-4">
        <p className="text-lg sm:text-xl font-medium mb-1">{data.date}</p>
        <p className="text-sm text-zinc-600 mb-3">{data.time} &middot; {data.venue}</p>
        <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">{data.rsvp}</p>
      </div>
    </div>
  );
}

export default function ElegantAnniversaryEditor() {
  return (
    <TemplateEditor
      title="Customize Anniversary"
      defaultData={initialData}
      availableStyles={["classic", "gold-foil", "floral"]}
      renderTemplate={(data, FullPictureDisplay, gifTime) => {
        const props = { data, FullPictureDisplay, gifTime };
        switch (data.style) {
          case "classic": return <ClassicTemplate {...props} />;
          case "gold-foil": return <GoldFoilTemplate {...props} />;
          case "floral": return <FloralTemplate {...props} />;
          default: return <ClassicTemplate {...props} />;
        }
      }}
    />
  );
}
