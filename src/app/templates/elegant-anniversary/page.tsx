"use client";

import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps, PhotoShape } from "@/types/template";
import { Camera } from "lucide-react";

const TEMPLATE_PALETTES: Record<string, { primary: string, font: string, name: string }[]> = {
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
  "botanical-love": [
    { primary: "#f8f4eb", font: "#5c4033", name: "Classic Sepia" },
    { primary: "#fefce8", font: "#3f6212", name: "Earthy Olive" },
    { primary: "#fafaf9", font: "#78350f", name: "Warm Amber" }
  ],
  "sacred-knots": [
    { primary: "#fff1f2", font: "#9f1239", name: "Rose Pink" },
    { primary: "#eff6ff", font: "#1e3a8a", name: "Indigo Night" },
    { primary: "#fff7ed", font: "#c2410c", name: "Sunset Orange" }
  ]
};

const initialData: CardData = {
  title: "Celebrating 30 Years of Love",
  name: "Jacob & Anna",
  date: "SUNDAY, OCTOBER 14",
  time: "7:00 PM",
  venue: "Oakwood Barn, 175 Cedar Lane, Asheville, NC",
  rsvp: "RSVP - (555) 312-7890",
  photoUrl: null,
  photoRotation: 0,
  photoZoom: 1,
  photoFit: "cover",
  photoShape: "vertical",
  style: "botanical-love",
  primaryColor: TEMPLATE_PALETTES["botanical-love"]?.[0]?.primary || "#ffffff",
  fontColor: TEMPLATE_PALETTES["botanical-love"]?.[0]?.font || "#000000",
  aspectRatio: "aspect-[3/4]",
};

const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[240px] sm:max-h-[320px] shadow-lg";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[240px] sm:max-h-[320px] rounded-3xl shadow-xl";
  return "aspect-[3/4] w-auto h-full max-h-[280px] sm:max-h-[380px] rounded-3xl shadow-xl"; // vertical
};

function BotanicalLoveTemplate({ data, FullPictureDisplay }: TemplateProps) {
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden bg-cover bg-center`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute top-0 right-0 h-full w-[45%] opacity-[0.85] pointer-events-none bg-[url('/images/dried_flowers_border.png')] bg-contain bg-right bg-no-repeat mix-blend-multiply"></div>
      <div className="absolute top-2 left-2 w-32 h-32 opacity-70 pointer-events-none bg-[url('/images/line_art_flower.png')] bg-contain bg-no-repeat mix-blend-multiply"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 opacity-40 pointer-events-none bg-[url('/images/line_art_flower.png')] bg-contain bg-no-repeat mix-blend-multiply rotate-45"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-6 sm:mt-10">
        <p className="font-sans font-bold tracking-widest text-sm sm:text-base mb-2">{data.title}</p>
        <p className="font-sans text-[10px] font-bold sm:text-xs font-bold opacity-90 mb-4 tracking-wide max-w-[200px] mx-auto leading-relaxed">Join us for an evening as we celebrate the Wedding Anniversary of</p>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-6 relative flex flex-1 justify-center items-center min-h-0 pr-[20%]">
          <div className="relative overflow-hidden w-auto h-full max-h-[180px] sm:max-h-[220px] aspect-square shadow-[0_4px_15px_rgba(0,0,0,0.1)]" style={{ borderRadius: '43% 57% 55% 45% / 54% 43% 57% 46%', border: `1.5px solid ${data.fontColor}`, outline: `1px solid ${data.fontColor}`, outlineOffset: '3px' }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative z-10 px-8">
           <div className="w-16 h-16 opacity-30 bg-[url('/images/line_art_flower.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply mb-4"></div>
        </div>
      )}

      <div className="z-10 w-full flex-shrink-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl sm:text-8xl font-script leading-tight mb-8 drop-shadow-sm pr-10">
          {data.name}
        </h1>
        
        <div className="flex items-center justify-center gap-4 w-full mb-6 max-w-[320px] mx-auto text-[9px] font-bold sm:text-[10px] font-bold tracking-widest uppercase">
          <span>{data.date.split(',')[0]}</span>
          <div className="h-4 w-[1.5px] opacity-100" style={{ backgroundColor: data.fontColor }}></div>
          <span>{data.date.split(',').slice(1).join(',').trim() || data.date}</span>
          <div className="h-4 w-[1.5px] opacity-100" style={{ backgroundColor: data.fontColor }}></div>
          <span>{data.time}</span>
        </div>
        
        <p className="text-[10px] font-bold sm:text-[11px] font-bold tracking-widest opacity-90 mb-6 max-w-[220px] mx-auto leading-relaxed uppercase">{data.venue}</p>
        <p className="text-[10px] font-bold sm:text-[11px] font-bold tracking-widest opacity-100 mb-8 pb-4 uppercase">{data.rsvp}</p>
      </div>
    </div>
  );
}

function ClassicTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col border-[12px] border-white shadow-inner`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-4 border border-zinc-300 pointer-events-none"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0">
        <p className="font-serif italic text-sm font-bold mb-4">{data.title}</p>
        <h1 className="text-3xl sm:text-5xl font-serif font-light leading-tight">
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden shadow-md`} style={{ border: `2px solid ${data.fontColor}` }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 px-8 z-10">
          <div className="w-16 h-px opacity-30 mb-2" style={{ backgroundColor: data.fontColor }}></div>
          <div className="w-8 h-px opacity-30" style={{ backgroundColor: data.fontColor }}></div>
        </div>
      )}

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center font-serif text-center">
        <div className="w-12 h-px bg-zinc-300 mb-4"></div>
        <p className="text-sm font-bold sm:text-lg mb-1">{data.date} &middot; {data.time}</p>
        <p className="text-xs font-bold sm:text-sm font-bold text-zinc-600 mb-4">{data.venue}</p>
        <p className="text-[10px] font-bold sm:text-xs font-bold text-zinc-500 uppercase tracking-widest">{data.rsvp}</p>
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
        <h1 className="text-4xl sm:text-5xl font-serif font-black leading-tight uppercase tracking-widest drop-shadow-md">
          {data.name}
        </h1>
        <p className="font-sans tracking-widest text-xs font-bold sm:text-sm font-bold mt-4 opacity-90">{data.title}</p>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden shadow-2xl`} style={{ border: `4px solid ${data.fontColor}` }}>
            <FullPictureDisplay src={data.photoUrl} className="grayscale contrast-125 brightness-110" />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 z-10 px-8">
           <div className="w-24 h-24 border-2 opacity-20 rounded-full flex items-center justify-center" style={{ borderColor: data.fontColor }}>
              <div className="w-16 h-16 border opacity-50 rounded-full" style={{ borderColor: data.fontColor }}></div>
           </div>
        </div>
      )}

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center text-center">
        <p className="text-sm sm:text-base font-bold tracking-widest uppercase mb-1">{data.date}</p>
        <p className="text-xs font-bold sm:text-sm font-bold opacity-100 mb-4">{data.time} | {data.venue}</p>
        <div className="px-6 py-2 border rounded-full text-[10px] font-bold sm:text-xs font-bold tracking-widest opacity-100" style={{ borderColor: data.fontColor }}>
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
        <p className="font-serif italic text-lg font-bold mb-2">{data.title}</p>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold leading-none tracking-tight">
          {data.name}
        </h1>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden rounded-[3rem] shadow-xl border-4 border-white`}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 z-10 px-8">
           {/* Expand gracefully */}
        </div>
      )}

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center font-serif text-center mb-4">
        <p className="text-lg font-bold sm:text-xl font-bold mb-1">{data.date}</p>
        <p className="text-sm font-bold opacity-90 mb-3">{data.time} &middot; {data.venue}</p>
        <p className="text-[10px] font-bold sm:text-xs font-bold uppercase tracking-wider">{data.rsvp}</p>
      </div>
    </div>
  );
}

function SacredKnotsTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden bg-cover bg-center`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 opacity-20 pointer-events-none bg-[url('/images/wedding_knot.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply"></div>
      
      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-8 sm:mt-12">
        <p className="font-serif italic text-sm sm:text-base mb-2 font-bold">{data.title}</p>
        <p className="font-sans text-[10px] font-bold sm:text-xs font-bold opacity-90 mb-4 tracking-widest uppercase">Honoring the eternal bond of</p>
      </div>

      {data.photoUrl ? (
        <div className="px-8 z-10 w-full mb-6 relative flex flex-1 justify-center items-center min-h-0">
          <div className={`${shapeClasses} overflow-hidden shadow-lg border-4`} style={{ borderColor: data.fontColor }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative z-10 px-8">
           <div className="w-24 h-24 opacity-40 bg-[url('/images/wedding_knot.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply mb-4"></div>
        </div>
      )}

      <div className="z-10 w-full flex-shrink-0 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-7xl font-script leading-tight mb-6">
          {data.name}
        </h1>
        
        <div className="flex items-center justify-center gap-3 w-full mb-4 font-serif font-bold text-xs sm:text-sm">
          <span>{data.date}</span>
          <span>&bull;</span>
          <span>{data.time}</span>
        </div>
        
        <p className="text-xs font-bold sm:text-sm font-bold tracking-widest opacity-90 mb-6 uppercase">{data.venue}</p>
        <p className="text-[10px] font-bold sm:text-xs font-bold opacity-100 mb-8 pb-4 uppercase tracking-widest border-t pt-4 w-1/2 mx-auto" style={{ borderColor: `${data.fontColor}40` }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

export default function ElegantAnniversaryEditor() {
  return (
    <TemplateEditor
      title="Customize Anniversary"
      defaultData={initialData}
      availableStyles={["classic", "gold-foil", "floral", "botanical-love", "sacred-knots"]}
      hideSizeSelector={true}
      styleColorPalettes={TEMPLATE_PALETTES}
      renderTemplate={(data, FullPictureDisplay, gifTime) => {
        const props = { data, FullPictureDisplay, gifTime };
        switch (data.style) {
          case "classic": return <ClassicTemplate {...props} />;
          case "gold-foil": return <GoldFoilTemplate {...props} />;
          case "floral": return <FloralTemplate {...props} />;
          case "botanical-love": return <BotanicalLoveTemplate {...props} />;
          case "sacred-knots": return <SacredKnotsTemplate {...props} />;
          default: return <BotanicalLoveTemplate {...props} />;
        }
      }}
    />
  );
}
