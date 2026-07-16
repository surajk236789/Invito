import os

with open('src/app/templates/birthday-bash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

palettes_to_add = """  "animated": [
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
  ],"""

content = content.replace("""  "animated": [
    { primary: "#2dd4bf", font: "#042f2e", name: "Teal Party" },
    { primary: "#f472b6", font: "#4c0519", name: "Pink Party" },
    { primary: "#a78bfa", font: "#2e1065", name: "Purple Party" }
  ],""", palettes_to_add)

editor_original = """      availableStyles={["modern", "playful", "elegant", "neon", "luxury", "retro", "polaroid", "minimalist", "balloon", "animated"]}
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
          default: return <ModernTemplate {...props} />;
        }
      }}"""

editor_new = """      availableStyles={["modern", "playful", "elegant", "neon", "luxury", "retro", "polaroid", "minimalist", "balloon", "animated", "traditional-ganesha", "royal-peacock", "mandala-magic"]}
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
      }}"""

content = content.replace(editor_original, editor_new)

templates_to_add = """

function TraditionalGaneshaTemplate({ data, FullPictureDisplay }: TemplateProps) {
  const shapeClasses = getPhotoShapeClasses(data.photoShape);
  return (
    <div className={`${data.aspectRatio} w-full relative flex flex-col overflow-hidden bg-cover bg-center`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}>
      <div className="absolute inset-0 opacity-10 bg-[url('/images/marigold_garland.png')] bg-contain pointer-events-none mix-blend-multiply"></div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-24 opacity-30 pointer-events-none bg-[url('/images/ganesha.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply"></div>
      
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
           <div className="w-32 h-32 opacity-40 bg-[url('/images/ganesha.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply mb-4"></div>
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
      <div className="absolute top-0 right-0 h-full w-[40%] opacity-[0.8] pointer-events-none bg-[url('/images/peacock_motif.png')] bg-contain bg-right bg-no-repeat mix-blend-screen"></div>
      
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

"""

content = content + templates_to_add

with open('src/app/templates/birthday-bash/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
