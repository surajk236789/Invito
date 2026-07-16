"use client";

import React, { useState, useRef } from "react";
import { Camera, Download, Share2, Type, MapPin, Calendar, Clock, Palette, ArrowLeft, RotateCw, ZoomIn, Shapes } from "lucide-react";
import { toPng } from "html-to-image";
import Link from "next/link";
import { CardData, TemplateStyle, AspectRatio, PhotoFit, PhotoShape } from "@/types/template";

export type TemplateEditorProps = {
  title: string;
  defaultData: CardData;
  availableStyles: TemplateStyle[];
  renderTemplate: (
    data: CardData, 
    FullPictureDisplay: React.FC<{ src: string; className?: string }>, 
    gifTime: number | null
  ) => React.ReactNode;
};

export function TemplateEditor({ title, defaultData, availableStyles, renderTemplate }: TemplateEditorProps) {
  const [data, setData] = useState<CardData>(defaultData);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingGif, setIsExportingGif] = useState(false);
  const [gifTime, setGifTime] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({ ...prev, photoUrl: reader.result as string, photoRotation: 0, photoZoom: 1 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotateImage = () => {
    setData((prev) => ({ ...prev, photoRotation: (prev.photoRotation + 90) % 360 }));
  };

  const generateImage = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        skipFonts: false,
      });
      return dataUrl;
    } catch (err) {
      console.error("Error generating image:", err);
      alert("Failed to generate image. Please try again.");
      return null;
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = async () => {
    const dataUrl = await generateImage();
    if (dataUrl) {
      const link = document.createElement("a");
      link.download = `invitation-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleDownloadGif = async () => {
    if (!cardRef.current) return;
    try {
      setIsExportingGif(true);
      
      // @ts-ignore
      const { GIFEncoder, quantize, applyPalette } = await import('gifenc');
      const { toCanvas } = await import('html-to-image');

      const gif = GIFEncoder();
      const frames = 20; 
      const delay = 100;

      for (let i = 0; i < frames; i++) {
        setGifTime(i * delay);
        // Wait for React to render the new time and DOM to update
        await new Promise(r => setTimeout(r, 50));
        
        const canvas = await toCanvas(cardRef.current, {
          quality: 1,
          pixelRatio: 1,
          skipFonts: false,
        });

        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        
        const { width, height } = canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        
        const palette = quantize(imageData.data, 256);
        const index = applyPalette(imageData.data, palette);
        
        gif.writeFrame(index, width, height, { palette, delay });
      }
      setGifTime(null);

      gif.finish();
      const buffer = gif.bytes();
      const blob = new Blob([buffer], { type: 'image/gif' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = `invitation-animated-${Date.now()}.gif`;
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating GIF:", err);
      alert("Failed to generate GIF. Please try again.");
      setGifTime(null);
    } finally {
      setIsExportingGif(false);
    }
  };

  const handleShare = async () => {
    const dataUrl = await generateImage();
    if (!dataUrl) return;

    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "invitation.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Invitation",
          text: "Check out my invitation!",
          files: [file],
        });
      } else {
        alert("Your device doesn't support sharing files natively. Please download instead.");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      alert("Sharing was cancelled or failed.");
    }
  };

  const FullPictureDisplay = ({ src, className }: { src: string, className?: string }) => (
    <div className={`relative w-full h-full overflow-hidden bg-transparent flex items-center justify-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt="Invitation Photo" 
        className={`w-full h-full transition-transform z-10 ${data.photoFit === 'cover' ? 'object-cover' : 'object-contain'}`} 
        style={{ transform: `rotate(${data.photoRotation}deg) scale(${data.photoZoom})` }} 
      />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col lg:flex-row w-full bg-zinc-50 dark:bg-black min-h-full">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-[500px] xl:w-[550px] bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 pt-4 lg:pt-6 overflow-y-auto flex-shrink-0 flex flex-col gap-8 z-10">
        
        <div>
          <Link href="/templates" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors mb-4 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Templates
          </Link>
          <h2 className="text-2xl font-bold mb-1 text-zinc-900 dark:text-zinc-50">{title}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Edit the details below to see live changes.</p>
        </div>

        <div className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4 text-pink-500" />
              Template Style
            </label>
            <div className="flex flex-wrap gap-2">
              {availableStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => setData({ ...data, style })}
                  className={`py-2 px-3 text-sm rounded-lg capitalize font-medium transition-all ${
                    data.style === style 
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md" 
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  {style.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Colors & Card Size */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: data.primaryColor }} />
                Theme
              </label>
              <input 
                type="color" 
                value={data.primaryColor}
                onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: data.fontColor || '#ffffff' }} />
                Text
              </label>
              <input 
                type="color" 
                value={data.fontColor || '#ffffff'}
                onChange={(e) => setData({ ...data, fontColor: e.target.value })}
                className="w-full h-10 rounded-lg cursor-pointer border border-zinc-200 dark:border-zinc-800 p-0 overflow-hidden"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Shapes className="w-4 h-4 text-emerald-500" />
                Size
              </label>
              <select
                value={data.aspectRatio}
                onChange={(e) => setData({ ...data, aspectRatio: e.target.value as AspectRatio })}
                className="w-full h-10 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-medium outline-none focus:ring-2 focus:ring-pink-500 transition-shadow appearance-none"
              >
                <option value="aspect-[3/4]">Portrait (3:4)</option>
                <option value="aspect-[9/16]">Story (9:16)</option>
                <option value="aspect-[4/3]">Landscape (4:3)</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-500" />
              Photo
            </label>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
            />
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all"
              >
                <Camera className="w-5 h-5" />
                {data.photoUrl ? "Change Photo" : "Upload Photo"}
              </button>
              {data.photoUrl && (
                <button
                  onClick={handleRotateImage}
                  className="flex items-center justify-center p-3 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                  title="Rotate Image"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Photo Adjustments */}
            {data.photoUrl && (
              <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-xl space-y-4 mt-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                    <Shapes className="w-3 h-3" /> Photo Shape
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["vertical", "circle", "horizontal"] as PhotoShape[]).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => setData({ ...data, photoShape: shape })}
                        className={`text-xs px-2 py-1.5 rounded-md capitalize transition-colors border ${
                          data.photoShape === shape 
                            ? "bg-white dark:bg-zinc-950 border-pink-500 shadow-sm font-bold text-pink-600 dark:text-pink-400" 
                            : "bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Image Fit</label>
                  <div className="flex bg-zinc-200 dark:bg-zinc-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setData({ ...data, photoFit: "contain" })}
                      className={`text-xs px-2 py-1 rounded-md transition-colors ${data.photoFit === "contain" ? "bg-white dark:bg-zinc-950 shadow-sm" : ""}`}
                    >
                      Fit Entirely
                    </button>
                    <button
                      onClick={() => setData({ ...data, photoFit: "cover" })}
                      className={`text-xs px-2 py-1 rounded-md transition-colors ${data.photoFit === "cover" ? "bg-white dark:bg-zinc-950 shadow-sm" : ""}`}
                    >
                      Fill Box
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    <label className="flex items-center gap-1"><ZoomIn className="w-3 h-3" /> Zoom</label>
                    <span>{Math.round(data.photoZoom * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="3" 
                    step="0.1" 
                    value={data.photoZoom} 
                    onChange={(e) => setData({...data, photoZoom: parseFloat(e.target.value)})}
                    className="w-full accent-pink-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Text Details */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Type className="w-4 h-4" /> Heading
              </label>
              <input 
                type="text" 
                value={data.title}
                onChange={(e) => setData({...data, title: e.target.value})}
                className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Type className="w-4 h-4" /> Main Name / Occasion
              </label>
              <input 
                type="text" 
                value={data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
                className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-pink-500 outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Calendar className="w-4 h-4" /> Date
                </label>
                <input 
                  type="text" 
                  value={data.date}
                  onChange={(e) => setData({...data, date: e.target.value})}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-pink-500 outline-none text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Clock className="w-4 h-4" /> Time
                </label>
                <input 
                  type="text" 
                  value={data.time}
                  onChange={(e) => setData({...data, time: e.target.value})}
                  className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-pink-500 outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <MapPin className="w-4 h-4" /> Venue
              </label>
              <textarea 
                value={data.venue}
                onChange={(e) => setData({...data, venue: e.target.value})}
                className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-pink-500 outline-none text-sm resize-none"
                rows={2}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">RSVP Info</label>
              <input 
                type="text" 
                value={data.rsvp}
                onChange={(e) => setData({...data, rsvp: e.target.value})}
                className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-pink-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        
        {/* Actions Menu */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 lg:top-6 lg:translate-y-0 lg:right-6 flex flex-col lg:flex-row items-end lg:items-center gap-4 lg:gap-3 z-20">
          <button 
            onClick={handleDownloadGif}
            disabled={isExporting || isExportingGif}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white p-3 lg:px-4 lg:py-2 rounded-full shadow-lg border border-orange-400/50 font-medium hover:scale-105 transition-transform disabled:opacity-50"
            title="Save GIF"
          >
            <Download className="w-5 h-5 lg:w-4 lg:h-4" /> <span className="hidden lg:inline">{isExportingGif ? "Generating GIF..." : "Save GIF"}</span>
          </button>
          <button 
            onClick={handleDownload}
            disabled={isExporting || isExportingGif}
            className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 p-3 lg:px-4 lg:py-2 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 font-medium hover:scale-105 transition-transform disabled:opacity-50"
            title="Save Image"
          >
            <Download className="w-5 h-5 lg:w-4 lg:h-4 text-zinc-900 dark:text-zinc-100" /> <span className="hidden lg:inline text-zinc-900 dark:text-zinc-100">{isExporting ? "Saving..." : "Save Image"}</span>
          </button>
          <button 
            onClick={handleShare}
            disabled={isExporting || isExportingGif}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white p-3 lg:px-4 lg:py-2 rounded-full shadow-lg shadow-pink-500/25 font-medium hover:scale-105 transition-transform disabled:opacity-50"
            title="Share"
          >
            <Share2 className="w-5 h-5 lg:w-4 lg:h-4" /> <span className="hidden lg:inline">Share</span>
          </button>
        </div>

        {/* The Card Itself */}
        <div 
          className="w-full max-w-[420px] transition-all duration-500 origin-center relative" 
          style={{ transform: (isExporting || isExportingGif) ? "scale(1)" : "scale(1)" }}
        >
          {/* We wrap the inner content in the ref so no external transforms affect the capture */}
          <div ref={cardRef} className="w-full bg-transparent overflow-hidden rounded-[2rem] shadow-2xl">
            {renderTemplate(data, FullPictureDisplay, gifTime)}
          </div>
        </div>
      </div>
    </div>
  );
}
