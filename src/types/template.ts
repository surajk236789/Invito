import React from 'react';

export type TemplateStyle = "modern" | "playful" | "elegant" | "neon" | "luxury" | "retro" | "polaroid" | "minimalist" | "balloon" | "animated" | string;
export type PhotoFit = "cover" | "contain";
export type PhotoShape = "vertical" | "horizontal" | "circle";
export type AspectRatio = "aspect-[3/4]" | "aspect-[9/16]" | "aspect-[4/3]";

export type CardData = {
  title: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  rsvp: string;
  photoUrl: string | null;
  photoRotation: number;
  photoZoom: number;
  photoFit: PhotoFit;
  photoShape: PhotoShape;
  style: TemplateStyle;
  primaryColor: string;
  fontColor: string;
  aspectRatio: AspectRatio;
};

export type TemplateProps = {
  data: CardData;
  FullPictureDisplay: React.FC<{ src: string; className?: string }>;
  gifTime?: number | null;
};
