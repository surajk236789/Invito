"use client";

import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps } from "@/types/template";

const TEMPLATE_PALETTES: Record<string, { primary: string, font: string, name: string }[]> = {
  "floral-elegance": [
    { primary: "#FDFBF7", font: "#8B0000", name: "Classic Crimson" },
    { primary: "#F0FDF4", font: "#14532D", name: "Forest Green" },
    { primary: "#EEF2FF", font: "#1E3A8A", name: "Royal Blue" }
  ],
  "traditional-ganesha": [
    { primary: "#FFF1F1", font: "#B91C1C", name: "Auspicious Red" },
    { primary: "#FEF3C7", font: "#B45309", name: "Marigold Yellow" },
    { primary: "#F0FDF4", font: "#065F46", name: "Sacred Green" }
  ],
  "sacred-knots": [
    { primary: "#FCE7F3", font: "#9D174D", name: "Rose Pink" },
    { primary: "#E0E7FF", font: "#3730A3", name: "Indigo Night" },
    { primary: "#FFEDD5", font: "#9A3412", name: "Sunset Orange" }
  ],
  "royal-palace": [
    { primary: "#0F172A", font: "#FDE047", name: "Midnight Gold" },
    { primary: "#450A0A", font: "#FEF08A", name: "Ruby Gold" },
    { primary: "#064E3B", font: "#D9F99D", name: "Emerald Gold" }
  ],
  "mandala-magic": [
    { primary: "#FFFFFF", font: "#172554", name: "Sapphire White" },
    { primary: "#FFFBEB", font: "#78350F", name: "Earthy Brown" },
    { primary: "#F5F3FF", font: "#4C1D95", name: "Regal Purple" }
  ],
  "haldi-marigold": [
    { primary: "#FFF8E7", font: "#D97706", name: "Haldi Orange" },
    { primary: "#FEF2F2", font: "#991B1B", name: "Sindoor Red" },
    { primary: "#ECFCCB", font: "#3F6212", name: "Mehendi Green" }
  ],
  "mehendi-elegance": [
    { primary: "#064E3B", font: "#FBBF24", name: "Emerald Yellow" },
    { primary: "#4A044E", font: "#F0ABFC", name: "Deep Plum" },
    { primary: "#172554", font: "#93C5FD", name: "Navy Sky" }
  ],
  "royal-peacock": [
    { primary: "#1E3A8A", font: "#FDE047", name: "Peacock Blue" },
    { primary: "#064E3B", font: "#A7F3D0", name: "Peacock Green" },
    { primary: "#2E1065", font: "#C4B5FD", name: "Peacock Purple" }
  ],
  "pastel-arch": [
    { primary: "#FDF2F8", font: "#831843", name: "Soft Rose" },
    { primary: "#EFF6FF", font: "#1E40AF", name: "Soft Blue" },
    { primary: "#F0FDF4", font: "#166534", name: "Soft Mint" }
  ],
  "amethyst-romance": [
    { primary: "#4C1D95", font: "#FDE047", name: "Amethyst Gold" },
    { primary: "#020617", font: "#E2E8F0", name: "Obsidian Silver" },
    { primary: "#7F1D1D", font: "#FECACA", name: "Crimson Rose" }
  ]
};

const initialData: CardData = {
  title: "Join us to celebrate the wedding of",
  name: "Jyoti & Suraj",
  date: "Sunday, December 10th",
  time: "6:00 PM onwards",
  venue: "The Royal Palace Gardens, Jaipur",
  rsvp: "RSVP to Sharma Family",
  photoUrl: null,
  photoRotation: 0,
  photoZoom: 1,
  photoFit: "cover",
  photoShape: "vertical",
  style: "amethyst-romance",
  primaryColor: TEMPLATE_PALETTES["amethyst-romance"][0].primary,
  fontColor: TEMPLATE_PALETTES["amethyst-romance"][0].font,
  aspectRatio: "aspect-[3/4]",
};

function FloralEleganceTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center overflow-hidden justify-center`} style={{ backgroundColor: bg, color: fg }}>
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none mix-blend-multiply"></div>
      
      <div className="absolute -top-4 -left-4 w-48 h-48 sm:w-64 sm:h-64 z-10 opacity-90 pointer-events-none mix-blend-multiply bg-[url('/images/floral_border.png')] bg-contain bg-no-repeat bg-right-top -scale-x-100"></div>
      <div className="absolute -bottom-4 -right-4 w-48 h-48 sm:w-64 sm:h-64 z-10 opacity-90 pointer-events-none mix-blend-multiply bg-[url('/images/floral_border.png')] bg-contain bg-no-repeat bg-left-bottom rotate-180 -scale-x-100"></div>
      
      <div className="absolute inset-4 sm:inset-5 z-0 border border-solid pointer-events-none" style={{ borderColor: `${fg}60` }}></div>

      <div className="p-8 z-20 flex flex-col items-center justify-center flex-1">
        <p className="font-sans-clean text-[8px] sm:text-[9px] uppercase tracking-[0.3em] mb-8 opacity-90 font-bold leading-relaxed mx-auto max-w-[200px]">
          {data.title}
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-script leading-tight mb-8" style={{ color: fg }}>
          {data.name}
        </h1>
        
        <div className="flex items-center justify-center w-full gap-3 mb-6 max-w-[250px] mx-auto">
          <div className="flex-1 border-t py-2 text-[8px] sm:text-[9px] font-sans-clean font-bold uppercase tracking-[0.2em] text-right" style={{ borderColor: `${fg}60` }}>
            {data.date}
          </div>
          <div className="flex-1 border-t py-2 text-[8px] sm:text-[9px] font-sans-clean font-bold uppercase tracking-[0.2em] text-left" style={{ borderColor: `${fg}60` }}>
            {data.time}
          </div>
        </div>
        <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] tracking-[0.15em] uppercase opacity-90 mb-6 leading-relaxed max-w-[240px]">{data.venue}</p>
        <p className="font-script font-bold text-2xl opacity-100 mt-4">{data.rsvp}</p>
      </div>
    </div>
  );
}

function GaneshaTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center border-[8px] justify-center`} style={{ backgroundColor: bg, color: fg, borderColor: fg }}>
      <div className="absolute inset-0 z-0 opacity-[0.5] bg-[url('/images/ganesha.png')] bg-contain bg-center bg-no-repeat pointer-events-none scale-[1.3] sm:scale-[1.5] mix-blend-screen"></div>
      <div className="absolute inset-2 sm:inset-3 border-[1.5px] border-solid z-0 pointer-events-none opacity-50 outline outline-[1px] outline-offset-4" style={{ borderColor: fg, outlineColor: `${fg}60` }}></div>

      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1">
        <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.25em] mb-6 opacity-90">{data.title}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-elegant mb-8" style={{ textShadow: `0 2px 10px ${fg}20` }}>
          {data.name}
        </h1>
        <div className="flex items-center justify-center gap-2 max-w-[150px] mx-auto opacity-70 mb-8 w-full">
          <div className="h-px flex-1" style={{ backgroundColor: fg }}></div>
          <div className="w-1.5 h-1.5 rounded-full rotate-45" style={{ backgroundColor: fg }}></div>
          <div className="h-px flex-1" style={{ backgroundColor: fg }}></div>
        </div>
        <p className="font-serif-elegant text-lg sm:text-2xl font-bold mb-3 tracking-wide">{data.date}</p>
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] opacity-90 mb-8 tracking-widest uppercase">{data.time} &middot; {data.venue}</p>
        <p className="font-sans-clean font-bold text-[8px] sm:text-[9px] tracking-[0.2em] uppercase opacity-90 border-t border-b py-3 px-8" style={{ borderColor: `${fg}60` }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

function SacredKnotsTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col justify-center`} style={{ backgroundColor: bg, color: fg }}>
      <div className="absolute inset-0 z-0 opacity-[0.15] bg-[url('/images/wedding_knot.png')] bg-contain bg-bottom bg-no-repeat pointer-events-none translate-y-12 scale-110 invert-[0.3]"></div>
      
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 opacity-30 pointer-events-none mix-blend-overlay" style={{ background: `radial-gradient(circle at top left, ${fg}, transparent 70%)` }}></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-30 pointer-events-none mix-blend-overlay" style={{ background: `radial-gradient(circle at bottom right, ${fg}, transparent 70%)` }}></div>

      <div className="p-8 z-10 flex flex-col items-center justify-center text-center flex-1">
        <p className="font-serif-elegant font-bold italic text-sm sm:text-base mb-6 opacity-90 tracking-widest">{data.title}</p>
        <h1 className="text-5xl sm:text-7xl font-script mb-10 drop-shadow-md">
          {data.name}
        </h1>
        <p className="font-sans-clean text-sm sm:text-base font-bold tracking-[0.2em] uppercase mb-4">{data.date}</p>
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] opacity-90 mb-10 tracking-widest uppercase">{data.time} &bull; {data.venue}</p>
        <div className="px-10 py-3 border-[1.5px] rounded-full font-sans-clean font-bold text-[9px] sm:text-[10px] tracking-[0.25em] uppercase opacity-100 backdrop-blur-sm" style={{ borderColor: `${fg}60`, backgroundColor: `${fg}15` }}>
          {data.rsvp}
        </div>
      </div>
    </div>
  );
}

function RoyalPalaceTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center border-x-[12px] border-y-[20px] justify-center`} style={{ backgroundColor: bg, color: fg, borderColor: fg }}>
      <div className="absolute inset-0 border-[1.5px] border-white/60 z-0 pointer-events-none m-2 sm:m-3"></div>
      <div className="absolute inset-0 border border-white/30 z-0 pointer-events-none m-3 sm:m-4"></div>
      
      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-elegant font-bold uppercase tracking-[0.15em] leading-tight mb-8">
          {data.name}
        </h1>
        <div className="flex items-center justify-center gap-4 mb-10 opacity-90 w-full max-w-[200px] mx-auto">
          <div className="flex-1 h-px" style={{ backgroundColor: fg }}></div>
          <p className="font-sans-clean font-bold tracking-[0.25em] text-[9px] sm:text-[10px] uppercase">{data.title}</p>
          <div className="flex-1 h-px" style={{ backgroundColor: fg }}></div>
        </div>

        <div className="w-full flex items-center justify-center gap-3 mb-6 max-w-[250px] mx-auto">
          <div className="flex-1 h-px opacity-60" style={{ backgroundColor: fg }}></div>
          <p className="font-serif-elegant text-base sm:text-lg font-bold uppercase tracking-[0.2em] whitespace-nowrap">{data.date}</p>
          <div className="flex-1 h-px opacity-60" style={{ backgroundColor: fg }}></div>
        </div>
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] mb-8 opacity-100 tracking-widest uppercase">{data.time} | {data.venue}</p>
        <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.3em] opacity-90 mt-4">{data.rsvp}</p>
      </div>
    </div>
  );
}

function MandalaMagicTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center border-8 justify-center`} style={{ backgroundColor: bg, color: fg, borderColor: fg }}>
      <div className="absolute inset-0 z-0 opacity-[0.08] bg-[url('/images/mandala.png')] bg-contain bg-center bg-no-repeat pointer-events-none scale-150"></div>
      
      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1">
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mb-6 opacity-90">{data.title}</p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif-elegant font-bold uppercase tracking-widest leading-tight mb-10">
          {data.name}
        </h1>

        <div className="flex items-center justify-center gap-4 w-full mb-6 max-w-[300px] mx-auto">
           <div className="flex-1 h-px opacity-60" style={{ backgroundColor: fg }}></div>
           <p className="font-serif-elegant text-base sm:text-xl font-bold uppercase tracking-[0.2em]">{data.date}</p>
           <div className="flex-1 h-px opacity-60" style={{ backgroundColor: fg }}></div>
        </div>
        <p className="font-sans-clean font-bold text-[11px] sm:text-[12px] opacity-90 mb-8 tracking-widest uppercase">{data.time} | {data.venue}</p>
        <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase opacity-100 border-2 py-3 px-8 rounded-full mt-4" style={{ borderColor: fg }}>{data.rsvp}</p>
      </div>
    </div>
  );
}

function HaldiMarigoldTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center overflow-hidden justify-center`} style={{ backgroundColor: bg, color: fg }}>
      <div className="absolute top-0 inset-x-0 h-48 sm:h-64 z-0 opacity-80 mix-blend-multiply bg-[url('/images/marigold_garland.png')] bg-cover bg-top bg-no-repeat pointer-events-none"></div>
      
      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1 mt-12 sm:mt-16">
        <p className="font-sans-clean font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.2em] mb-4 opacity-100">{data.title}</p>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-script leading-tight mb-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.15)' }}>
          {data.name}
        </h1>

        <p className="font-sans-clean text-sm sm:text-base font-bold uppercase tracking-widest mb-3">{data.date}</p>
        <p className="font-sans-clean text-[10px] sm:text-[11px] font-bold opacity-90 mb-8 tracking-widest uppercase">{data.time} &bull; {data.venue}</p>
        <div className="w-20 h-1.5 rounded-full opacity-50 mb-8" style={{ backgroundColor: fg }}></div>
        <p className="font-script font-bold text-3xl sm:text-4xl opacity-100">{data.rsvp}</p>
      </div>
    </div>
  );
}

function MehendiEleganceTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center border-[12px] border-double justify-center`} style={{ backgroundColor: bg, color: fg, borderColor: fg }}>
      <div className="absolute -top-4 -left-4 w-32 h-32 sm:w-48 sm:h-48 z-0 opacity-40 mix-blend-screen bg-[url('/images/henna_pattern.png')] bg-contain bg-no-repeat bg-center pointer-events-none invert rotate-[-45deg]"></div>
      <div className="absolute -bottom-4 -right-4 w-32 h-32 sm:w-48 sm:h-48 z-0 opacity-40 mix-blend-screen bg-[url('/images/henna_pattern.png')] bg-contain bg-no-repeat bg-center pointer-events-none invert rotate-[135deg]"></div>
      
      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1">
        <p className="font-serif-elegant font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.3em] mb-6 opacity-90">{data.title}</p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif-elegant font-bold leading-tight drop-shadow-md mb-12">
          {data.name}
        </h1>

        <p className="font-serif-elegant font-bold text-lg sm:text-xl tracking-[0.15em] mb-4">{data.date}</p>
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] opacity-100 mb-10 tracking-widest uppercase">{data.time} | {data.venue}</p>
        <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] tracking-[0.25em] uppercase opacity-80 mt-4">{data.rsvp}</p>
      </div>
    </div>
  );
}

function RoyalPeacockTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center overflow-hidden justify-center`} style={{ backgroundColor: bg, color: fg }}>
      <div className="absolute inset-0 z-0 opacity-[0.25] bg-[url('/images/peacock_motif.png')] bg-contain bg-center bg-no-repeat pointer-events-none scale-[1.2] translate-y-12"></div>
      
      <div className="absolute inset-4 border border-solid opacity-50 z-0 pointer-events-none rounded-t-full" style={{ borderColor: fg }}></div>
      <div className="absolute inset-6 border border-solid opacity-30 z-0 pointer-events-none rounded-t-full" style={{ borderColor: fg }}></div>

      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-script leading-tight mb-8" style={{ textShadow: `2px 2px 10px ${fg}40` }}>
          {data.name}
        </h1>
        <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.4em] mb-12 opacity-90 border-b-2 border-t-2 py-2 px-6" style={{ borderColor: `${fg}60` }}>{data.title}</p>

        <p className="font-serif-elegant font-bold text-base sm:text-lg tracking-[0.2em] uppercase mb-4">{data.date}</p>
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] opacity-100 mb-10 tracking-widest uppercase">{data.time} &bull; {data.venue}</p>
        <p className="font-script font-bold text-3xl sm:text-4xl opacity-100 mt-4">{data.rsvp}</p>
      </div>
    </div>
  );
}

function PastelArchTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center overflow-hidden p-3 sm:p-4 justify-center`} style={{ backgroundColor: bg, color: fg }}>
      <div className="absolute inset-4 sm:inset-5 rounded-t-full border-2 border-solid opacity-30 pointer-events-none" style={{ borderColor: fg, backgroundColor: `${fg}08` }}></div>

      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1">
        <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.3em] mb-8 opacity-90">{data.title}</p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif-elegant font-bold leading-tight mb-12">
          {data.name}
        </h1>

        <p className="font-sans-clean font-bold text-sm sm:text-base tracking-[0.2em] uppercase mb-3">{data.date}</p>
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] opacity-90 mb-10 tracking-widest uppercase">{data.time} | {data.venue}</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-1.5 h-1.5 rounded-full opacity-70" style={{ backgroundColor: fg }}></div>
          <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.3em] opacity-100">{data.rsvp}</p>
          <div className="w-1.5 h-1.5 rounded-full opacity-70" style={{ backgroundColor: fg }}></div>
        </div>
      </div>
    </div>
  );
}

function AmethystRomanceTemplate({ data }: TemplateProps) {
  const bg = data.primaryColor;
  const fg = data.fontColor;
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center overflow-hidden justify-center`} style={{ backgroundColor: bg, color: fg }}>
      {/* Soft watercolor-like background glow */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen" style={{ background: `radial-gradient(circle at center, ${fg}20 0%, transparent 80%)` }}></div>
      <div className="absolute -top-10 -right-10 w-64 h-64 opacity-30 pointer-events-none mix-blend-screen" style={{ background: `radial-gradient(circle at center, ${fg}30 0%, transparent 70%)` }}></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 opacity-30 pointer-events-none mix-blend-screen" style={{ background: `radial-gradient(circle at center, ${fg}30 0%, transparent 70%)` }}></div>

      <div className="absolute inset-5 border-[1.5px] border-dashed opacity-40 z-0 pointer-events-none" style={{ borderColor: fg }}></div>
      <div className="absolute inset-6 border-[2px] border-solid opacity-70 z-0 pointer-events-none" style={{ borderColor: fg }}></div>

      <div className="p-8 z-10 flex flex-col items-center justify-center flex-1">
        <div className="mb-6 opacity-100">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto" style={{ stroke: fg }}>
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={fg} fillOpacity="0.4"/>
           </svg>
        </div>
        <p className="font-serif-elegant font-bold italic text-sm sm:text-base mb-6 opacity-100 tracking-wider">{data.title}</p>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-script leading-tight mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {data.name}
        </h1>

        <div className="w-12 h-[2px] opacity-80 mb-8" style={{ backgroundColor: fg }}></div>

        <p className="font-serif-elegant font-bold text-base sm:text-lg tracking-[0.15em] uppercase mb-3">{data.date}</p>
        <p className="font-sans-clean font-bold text-[10px] sm:text-[11px] opacity-100 mb-10 tracking-widest uppercase">{data.time} | {data.venue}</p>
        
        <div className="border-t-2 border-b-2 py-2 px-8" style={{ borderColor: `${fg}60` }}>
          <p className="font-sans-clean font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.3em] opacity-100">{data.rsvp}</p>
        </div>
      </div>
    </div>
  );
}

export default function WeddingEditor() {
  return (
    <TemplateEditor
      title="Customize Wedding Invite"
      defaultData={initialData}
      hidePhotoUpload={true}
      hideSizeSelector={true}
      styleColorPalettes={TEMPLATE_PALETTES}
      availableStyles={["floral-elegance", "traditional-ganesha", "sacred-knots", "royal-palace", "mandala-magic", "haldi-marigold", "mehendi-elegance", "royal-peacock", "pastel-arch", "amethyst-romance"]}
      renderTemplate={(data, FullPictureDisplay, gifTime) => {
        const props = { data, FullPictureDisplay, gifTime };
        switch (data.style) {
          case "floral-elegance": return <FloralEleganceTemplate {...props} />;
          case "traditional-ganesha": return <GaneshaTemplate {...props} />;
          case "sacred-knots": return <SacredKnotsTemplate {...props} />;
          case "royal-palace": return <RoyalPalaceTemplate {...props} />;
          case "mandala-magic": return <MandalaMagicTemplate {...props} />;
          case "haldi-marigold": return <HaldiMarigoldTemplate {...props} />;
          case "mehendi-elegance": return <MehendiEleganceTemplate {...props} />;
          case "royal-peacock": return <RoyalPeacockTemplate {...props} />;
          case "pastel-arch": return <PastelArchTemplate {...props} />;
          case "amethyst-romance": return <AmethystRomanceTemplate {...props} />;
          default: return <AmethystRomanceTemplate {...props} />;
        }
      }}
    />
  );
}
