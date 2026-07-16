import os

with open('src/app/templates/birthday-bash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
        """        <div className={`${shapeClasses} mb-4 sm:mb-8 bg-white overflow-hidden border-4 border-white shadow-xl rotate-[-3deg] relative z-10`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-white/80"><Camera className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600/90" /></div>
          )}
        </div>""",
        """        {data.photoUrl && (
          <div className={`${shapeClasses} mb-4 sm:mb-8 bg-white overflow-hidden border-4 border-white shadow-xl rotate-[-3deg] relative z-10`}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        )}"""
    ),
    (
        """      <div className="px-6 z-10 w-full flex flex-1 justify-center items-center min-h-0 py-2">
        <div className={`${shapeClasses} overflow-hidden border p-1 bg-transparent`} style={{ borderColor: data.primaryColor }}>
          <div className={`w-full h-full overflow-hidden bg-[#d6d3d1] flex items-center justify-center ${data.photoShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}>
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-[#a8a29e] font-bold" />
            )}
          </div>
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-6 z-10 w-full flex flex-1 justify-center items-center min-h-0 py-2">
          <div className={`${shapeClasses} overflow-hidden border p-1 bg-transparent`} style={{ borderColor: data.primaryColor }}>
            <div className={`w-full h-full overflow-hidden bg-[#d6d3d1] flex items-center justify-center ${data.photoShape === 'circle' ? 'rounded-full' : 'rounded-xl'}`}>
              <FullPictureDisplay src={data.photoUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    ),
    (
        """      <div className="px-6 sm:px-8 flex-1 flex flex-col items-center justify-center z-10 w-full mb-2 sm:mb-6 relative min-h-0">
        <div className={`${shapeClasses} bg-transparent overflow-hidden border-2 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 15px ${data.primaryColor}80` }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <Camera className="w-8 h-8 sm:w-12 sm:h-12" style={{ color: data.primaryColor }} />
          )}
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-6 sm:px-8 flex-1 flex flex-col items-center justify-center z-10 w-full mb-2 sm:mb-6 relative min-h-0">
          <div className={`${shapeClasses} bg-transparent overflow-hidden border-2 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor, boxShadow: `0 0 15px ${data.primaryColor}80` }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    ),
    (
        """      <div className="px-6 z-10 w-full flex flex-1 justify-center items-center relative min-h-0 mt-4 sm:mt-6 mb-2">
        <div className={`${shapeClasses} overflow-hidden shadow-2xl relative`}>
          <div className="absolute inset-0 border border-white/20 z-10"></div>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 opacity-100" style={{ color: data.primaryColor }} />
            </div>
          )}
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-6 z-10 w-full flex flex-1 justify-center items-center relative min-h-0 mt-4 sm:mt-6 mb-2">
          <div className={`${shapeClasses} overflow-hidden shadow-2xl relative`}>
            <div className="absolute inset-0 border border-white/20 z-10"></div>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    ),
    (
        """      <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full relative mb-4 min-h-0">
        <div className={`${shapeClasses} overflow-hidden rounded-xl shadow-lg saturate-150`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} className="contrast-125 sepia-[0.3]" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#fef3c7]">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-black/90" />
            </div>
          )}
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full relative mb-4 min-h-0">
          <div className={`${shapeClasses} overflow-hidden rounded-xl shadow-lg saturate-150`}>
            <FullPictureDisplay src={data.photoUrl} className="contrast-125 sepia-[0.3]" />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    ),
    (
        """      <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0 mb-4 sm:mb-8">
        <div className={`${shapeClasses} bg-white p-2 sm:p-4 pb-8 sm:pb-12 shadow-xl rotate-[2deg]`}>
          <div className="w-full h-full bg-zinc-100 overflow-hidden">
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white/20" />
              </div>
            )}
          </div>
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0 mb-4 sm:mb-8">
          <div className={`${shapeClasses} bg-white p-2 sm:p-4 pb-8 sm:pb-12 shadow-xl rotate-[2deg]`}>
            <div className="w-full h-full bg-zinc-100 overflow-hidden">
              <FullPictureDisplay src={data.photoUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    ),
    (
        """      <div className="px-8 z-10 w-full flex-1 flex items-center justify-center min-h-0 py-2 sm:py-6">
        <div className={`${shapeClasses} overflow-hidden`}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} className="grayscale contrast-125" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100">
              <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-300" />
            </div>
          )}
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-8 z-10 w-full flex-1 flex items-center justify-center min-h-0 py-2 sm:py-6">
          <div className={`${shapeClasses} overflow-hidden`}>
            <FullPictureDisplay src={data.photoUrl} className="grayscale contrast-125" />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    ),
    (
        """      <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0 mb-4 sm:mb-8">
        <div className={`${shapeClasses} overflow-hidden rounded-full shadow-lg border-4`} style={{ borderColor: data.primaryColor }}>
          {data.photoUrl ? (
            <FullPictureDisplay src={data.photoUrl} />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/40 backdrop-blur-sm">
              <Camera className="w-8 h-8 text-slate-300" />
            </div>
          )}
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0 mb-4 sm:mb-8">
          <div className={`${shapeClasses} overflow-hidden rounded-full shadow-lg border-4`} style={{ borderColor: data.primaryColor }}>
            <FullPictureDisplay src={data.photoUrl} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    ),
    (
        """      <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0">
        <div className={`${shapeClasses} border-4 bg-black/90 backdrop-blur-md p-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor }}>
          <div className="w-full h-full overflow-hidden bg-black/90 flex items-center justify-center">
            {data.photoUrl ? (
              <FullPictureDisplay src={data.photoUrl} />
            ) : (
              <Camera className="w-8 h-8 text-white/90" />
            )}
          </div>
        </div>
      </div>""",
        """      {data.photoUrl ? (
        <div className="px-6 flex-1 flex flex-col items-center justify-center z-10 w-full min-h-0">
          <div className={`${shapeClasses} border-4 bg-black/90 backdrop-blur-md p-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]`} style={{ borderColor: data.primaryColor }}>
            <div className="w-full h-full overflow-hidden bg-black/90 flex items-center justify-center">
              <FullPictureDisplay src={data.photoUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0"></div>
      )}"""
    )
]

for target, rep in replacements:
    content = content.replace(target, rep)

with open('src/app/templates/birthday-bash/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
