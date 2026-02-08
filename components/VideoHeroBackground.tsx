"use client";

export function VideoHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-105"
      >
        <source src="/denver-colorado-hero.mp4" type="video/mp4" />
      </video>
      {/* Cinematic gradient overlay - darker at top and bottom for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
    </div>
  );
}
