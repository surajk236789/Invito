"use client";

import { TemplateEditor } from "@/components/TemplateEditor";
import { CardData, TemplateProps, PhotoShape } from "@/types/template";
import { Camera } from "lucide-react";

const initialData: CardData = {
  title: "Join us to celebrate the wedding of",
  name: "Anjali & Rahul",
  date: "Sunday, December 10th",
  time: "6:00 PM onwards",
  venue: "The Royal Palace Gardens, Jaipur",
  rsvp: "RSVP to Sharma Family",
  photoUrl: null,
  photoRotation: 0,
  photoZoom: 1,
  photoFit: "cover",
  photoShape: "vertical",
  style: "traditional-ganesha",
  primaryColor: "#fdfbf7", // Cream background
  fontColor: "#8b0000", // Deep red text
  aspectRatio: "aspect-[3/4]",
};

const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[160px] sm:max-h-[220px]";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[160px] sm:max-h-[220px] rounded-[2rem]";
  return "aspect-[3/4] w-auto h-full max-h-[200px] sm:max-h-[260px] rounded-t-[5rem]"; // vertical arched
};

function GaneshaTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center border-[8px]`} style={{ backgroundColor: data.primaryColor, color: data.fontColor, borderColor: data.fontColor }}>
      {/* Background Ganesha Watermark */}
      <div className="absolute inset-0 z-0 opacity-[0.07] bg-[url('/images/ganesha.png')] bg-contain bg-center bg-no-repeat pointer-events-none scale-90"></div>
      
      <div className="absolute inset-2 border-2 border-dashed z-0 pointer-events-none opacity-50" style={{ borderColor: data.fontColor }}></div>

      <div className="p-8 pb-4 z-10 flex-shrink-0 mt-2">
        <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-4 opacity-80">{data.title}</p>
        <h1 className="text-4xl sm:text-5xl font-serif mb-2" style={{ textShadow: `0 2px 10px ${data.fontColor}30` }}>
          {data.name}
        </h1>
        <div className="w-1/2 h-px mx-auto my-3 opacity-30" style={{ backgroundColor: data.fontColor }}></div>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden shadow-lg border-[3px] p-1 bg-white/50`} style={{ borderColor: `${data.fontColor}60` }}>
          <div className="w-full h-full overflow-hidden rounded-t-[4.5rem]">
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/5">
                <Camera className="w-8 h-8 sm:w-12 sm:h-12 opacity-30" style={{ color: data.fontColor }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center">
        <p className="font-serif text-sm sm:text-lg font-medium mb-1">{data.date}</p>
        <p className="text-xs sm:text-sm opacity-80 mb-4 font-medium">{data.time} | {data.venue}</p>
        <p className="text-[9px] sm:text-[10px] tracking-widest uppercase opacity-60">{data.rsvp}</p>
      </div>
    </div>
  );
}

function SacredKnotsTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      {/* Background Wedding Knot Watermark */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/wedding_knot.png')] bg-contain bg-bottom bg-no-repeat pointer-events-none translate-y-16"></div>
      
      {/* Floral corners using CSS gradients */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at top left, ${data.fontColor}, transparent 70%)` }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle at bottom right, ${data.fontColor}, transparent 70%)` }}></div>

      <div className="p-8 pb-4 z-10 text-center flex-shrink-0 mt-4">
        <p className="font-serif italic text-sm mb-4 opacity-80">{data.title}</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold leading-tight">
          {data.name}
        </h1>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden shadow-2xl p-2 bg-white/20 backdrop-blur-sm rounded-full`} style={{ border: `1px solid ${data.fontColor}40` }}>
          <div className="w-full h-full overflow-hidden rounded-full">
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/5">
                <Camera className="w-8 h-8 sm:w-12 sm:h-12 opacity-30" style={{ color: data.fontColor }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center text-center">
        <p className="text-sm sm:text-base font-bold tracking-widest uppercase mb-1">{data.date}</p>
        <p className="text-xs sm:text-sm opacity-80 mb-4">{data.time} &middot; {data.venue}</p>
        <div className="px-6 py-2 border rounded-full text-[10px] sm:text-xs tracking-widest opacity-70" style={{ borderColor: `${data.fontColor}50` }}>
          {data.rsvp}
        </div>
      </div>
    </div>
  );
}

function RoyalPalaceTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col text-center border-x-[16px] border-y-[24px]`} style={{ backgroundColor: data.primaryColor, color: data.fontColor, borderColor: data.fontColor }}>
      <div className="absolute inset-0 border border-white/50 z-0 pointer-events-none m-2"></div>
      
      <div className="p-8 pb-4 z-10 flex-shrink-0 mt-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-widest leading-tight">
          {data.name}
        </h1>
        <p className="font-sans font-light tracking-widest text-[10px] sm:text-xs mt-3 opacity-80 uppercase">{data.title}</p>
      </div>

      <div className="px-8 z-10 w-full mb-4 relative flex flex-1 justify-center items-center min-h-0">
        <div className={`${shapeClasses} overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-2`} style={{ borderColor: data.fontColor }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/10">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 opacity-40" style={{ color: data.fontColor }} />
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0 z-10 w-full mt-auto flex-shrink-0 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 h-px opacity-30" style={{ backgroundColor: data.fontColor }}></div>
          <p className="text-sm sm:text-base font-bold uppercase tracking-widest whitespace-nowrap">{data.date}</p>
          <div className="flex-1 h-px opacity-30" style={{ backgroundColor: data.fontColor }}></div>
        </div>
        <p className="text-xs sm:text-sm font-medium mb-3 opacity-90">{data.time} | {data.venue}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">{data.rsvp}</p>
      </div>
    </div>
  );
}

export default function WeddingEditor() {
  return (
    <TemplateEditor
      title="Customize Wedding Invite"
      defaultData={initialData}
      availableStyles={["traditional-ganesha", "sacred-knots", "royal-palace"]}
      renderTemplate={(data, FullPictureDisplay, gifTime) => {
        const props = { data, FullPictureDisplay, gifTime };
        switch (data.style) {
          case "traditional-ganesha": return <GaneshaTemplate {...props} />;
          case "sacred-knots": return <SacredKnotsTemplate {...props} />;
          case "royal-palace": return <RoyalPalaceTemplate {...props} />;
          default: return <GaneshaTemplate {...props} />;
        }
      }}
    />
  );
}
