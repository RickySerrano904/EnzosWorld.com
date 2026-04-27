"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BackHomeButton from "@/app/components/BackHomeButton";

const imageData: Record<string, string[]> = {
  2024: [
    "20240401_194099.jpg",
    "20240401_194100.jpg",
    "20240401_194101.jpg",
    "20240405_183303.jpg",
    "20240405_183305.jpg",
    "20240413_174619.jpg",
    "20240506_063532.jpg",
    "20240506_084626.jpg",
    "20240506_084635.jpg",
    "20240506_100818.jpg",
    "20240506_184142.jpg",
    "20240506_185620.jpg",
    "20240507_161104.jpg",
    "20240509_144455.jpg",
    "20240510_115544.jpg",
    "20240511_133602.jpg",
    "20240706_161235.jpg",
    "20240706_174048.jpg",
    "20240706_174103.jpg",
    "20240719_224045.jpg",
    "20240720_115258.jpg",
    "20240801_161400.jpg",
    "20240803_130423.jpg",
    "20240803_222243.jpg",
    "20240808_150135.jpg",
    "20240811_170002.jpg",
    "20240811_203007.jpg",
    "20240812_103032.jpg",
    "20240813_203552.jpg",
    "20240814_144940.jpg",
    "20240921_164004.jpg",
    "20240926_203121.jpg",
    "20240926_203124.jpg",
    "20240926_203125.jpg",
    "20240926_203127.jpg",
    "20240926_203132.jpg",
    "20240926_203134.jpg",
    "20240926_203135.jpg",
    "20240926_203138.jpg",
    "20240926_203141.jpg",
    "20240926_205848.jpg",
    "20240926_222256.jpg",
    "20241010_104339.jpg",
    "20241101_224501.jpg",
    "20241101_224508.jpg",
    "20241106_123657.jpg",
    "20241106_124526.jpg",
  ],
  2025: [
    "20250101_165930.jpg",
    "20250101_173404.jpg",
    "20250102_094508.jpg",
    "20250204_071104.jpg",
    "20250204_082846.jpg",
    "20250204_134328.jpg",
    "20250204_135844.jpg",
    "20250204_140806.jpg",
    "20250204_140839.jpg",
    "20250204_143715.jpg",
    "20250205_071532.jpg",
    "20250205_071729.jpg",
    "20250214_142406.jpg",
    "20250223_135639.jpg",
    "20250223_140533.jpg",
    "20250223_140543.jpg",
    "20250301_165013.jpg",
    "20250301_165107.jpg",
    "20250316_215558.jpg",
    "20250320_202736.jpg",
    "20250321_180054.jpg",
    "20250322_165834.jpg",
    "20250322_171543.jpg",
    "20250405_093612.jpg",
    "20250426_134723.jpg",
    "20250517_122122.jpg",
    "20250517_141253.jpg",
    "20250517_141302.jpg",
    "20250517_143543.jpg",
    "20250628_103256.jpg",
    "20250630_113849.jpg",
    "20250630_113859.jpg",
  ],
};

const imgPath = (year: string, filename: string) =>
  `/images/gallery/${year}/${filename}`;

type SelectedImage = {
  year: string;
  index: number;
  src: string;
  alt: string;
};

function Thumb({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-[0_8px_18px_rgba(31,26,20,0.12)]"
      title="View photo"
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[var(--primary)]/20" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
        className={`object-cover transition duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } group-hover:scale-[1.03]`}
        onLoad={() => setLoaded(true)}
      />
    </button>
  );
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );
  const [collapsedYears, setCollapsedYears] = useState<Record<string, boolean>>(
    {}
  );

  const imagesByYear = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(imageData).map(([year, files]) => [
          year,
          [...files].sort((a, b) => b.localeCompare(a)),
        ])
      ) as Record<string, string[]>,
    []
  );

  // Newest years first
  const years = useMemo(
    () => Object.keys(imageData).sort((a, b) => Number(b) - Number(a)),
    []
  );

  const toggleYear = (year: string) => {
    setCollapsedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const preload = (src: string) => {
    // Preload modal image so click feels instant
    if (typeof window === "undefined") return;
    const img = new window.Image();
    img.src = src;
  };

  const preloadNeighbors = (year: string, index: number) => {
    const files = imagesByYear[year];
    if (!files?.length) return;

    const prev = files[(index - 1 + files.length) % files.length];
    const next = files[(index + 1) % files.length];

    preload(imgPath(year, prev));
    preload(imgPath(year, next));
  };

  const openImage = (year: string, index: number) => {
    const files = imagesByYear[year];
    if (!files?.length) return;

    const filename = files[index];
    const src = imgPath(year, filename);

    // preload clicked image + neighbors for fast open + fast arrows
    preload(src);
    preloadNeighbors(year, index);

    setSlideDirection(null);
    setSelectedImage({ year, index, src, alt: filename });
  };

  const navigateImage = (offset: number) => {
    setSlideDirection(offset > 0 ? "next" : "prev");

    setSelectedImage((prev) => {
      if (!prev) return prev;

      const files = imagesByYear[prev.year];
      if (!files?.length) return prev;

      let newIndex = prev.index + offset;
      if (newIndex < 0) newIndex = files.length - 1;
      if (newIndex >= files.length) newIndex = 0;

      const filename = files[newIndex];
      const src = imgPath(prev.year, filename);

      // preload neighbors on every move, so nav stays snappy
      preload(src);
      preloadNeighbors(prev.year, newIndex);

      return { year: prev.year, index: newIndex, src, alt: filename };
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <main className="space-y-8">
      <BackHomeButton />

      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Gallery <span className="text-[var(--secondary)]">📸</span>
        </h1>
        <p className="text-foreground/70">
          A highly scientific collection of Enzo being adorable.
        </p>
      </header>

      {years.map((year) => {
        const files = imagesByYear[year];
        const isCollapsed = collapsedYears[year];

        return (
          <section
            key={year}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow)]"
          >
            <button
              type="button"
              onClick={() => toggleYear(year)}
              className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--primary)]/10"
              aria-expanded={!isCollapsed}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold">{year}</span>
                <span className="rounded-full bg-[var(--primary)]/25 px-3 py-1 text-xs font-medium">
                  {files.length} photos
                </span>
              </div>

              <span className="text-sm font-semibold text-foreground/70 transition duration-300 group-hover:text-secondary group-hover:[text-shadow:0_0_10px_rgba(217,130,43,0.45),0_0_18px_rgba(241,198,106,0.36)]">
                {isCollapsed ? "Show" : "Hide"}
              </span>
            </button>

            {!isCollapsed && (
              <div className="grid grid-cols-1 gap-4 border-t border-border bg-background/35 p-5 sm:grid-cols-2 md:grid-cols-3">
                {files.map((filename, index) => {
                  const src = imgPath(year, filename);
                  return (
                    <Thumb
                      key={`${year}-${filename}`}
                      src={src}
                      alt={filename}
                      onClick={() => openImage(year, index)}
                    />
                  );
                })}
              </div>
            )}
          </section>
        );
      })}

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="group absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-background/85 text-foreground/85 shadow-[0_8px_18px_rgba(0,0,0,0.16)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/55 hover:bg-primary hover:text-secondary hover:shadow-[0_0_0_1px_rgba(217,130,43,0.24),0_10px_24px_rgba(0,0,0,0.22),0_0_22px_rgba(241,198,106,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 active:scale-95"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image modal"
            >
              <X
                aria-hidden="true"
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-90"
                strokeWidth={2.5}
              />
            </button>

            <button
              type="button"
              className="group absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/35 bg-background/85 text-2xl font-bold text-foreground/85 shadow-[0_8px_18px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:-translate-x-0.5 hover:border-secondary/55 hover:bg-primary hover:text-secondary hover:shadow-[0_0_0_1px_rgba(217,130,43,0.24),0_10px_24px_rgba(0,0,0,0.22),0_0_22px_rgba(241,198,106,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(-1);
              }}
              aria-label="Previous image"
            >
              <span
                aria-hidden="true"
                className="flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-0.5"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2.6} />
              </span>
            </button>

            <button
              type="button"
              className="group absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/35 bg-background/85 text-2xl font-bold text-foreground/85 shadow-[0_8px_18px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:translate-x-0.5 hover:border-secondary/55 hover:bg-primary hover:text-secondary hover:shadow-[0_0_0_1px_rgba(217,130,43,0.24),0_10px_24px_rgba(0,0,0,0.22),0_0_22px_rgba(241,198,106,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(1);
              }}
              aria-label="Next image"
            >
              <span
                aria-hidden="true"
                className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2.6} />
              </span>
            </button>

            <div className="relative h-[80vh] w-full overflow-hidden bg-black">
              <div
                key={selectedImage.src}
                className={`absolute inset-0 ${
                  slideDirection === "next"
                    ? "gallery-slide-next"
                    : slideDirection === "prev"
                      ? "gallery-slide-prev"
                      : ""
                }`}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                  loading="eager"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-border bg-background p-4 text-sm text-foreground/70">
              <span className="truncate">{selectedImage.alt}</span>
              <span className="shrink-0">
                {selectedImage.year} • {selectedImage.index + 1}/
                {imagesByYear[selectedImage.year].length}
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
