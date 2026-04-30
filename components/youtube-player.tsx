"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Play, Lock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  showControls?: boolean;
  allowFullscreen?: boolean;
  isLocked?: boolean;
  onUnlockClick?: () => void;
  thumbnailQuality?: "default" | "medium" | "high" | "maxres";
}

/**
 * Secure YouTube Player Component
 * 
 * Security Features:
 * - Uses youtube-nocookie.com domain (enhanced privacy mode)
 * - Disables related videos from other channels (rel=0)
 * - Prevents keyboard controls when iframe not focused (disablekb=1)
 * - Uses strict Content Security Policy compatible embedding
 * - Lazy loads iframe only when user clicks to play
 * - Supports locked/preview states for paid content
 * 
 * For Unlisted Videos:
 * - Unlisted videos work the same as public videos for embedding
 * - The video ID is all that's needed - no special auth required
 * - Unlisted videos won't appear in search but can be embedded
 */
export function YouTubePlayer({
  videoId,
  title = "Video player",
  className,
  autoplay = false,
  showControls = true,
  allowFullscreen = true,
  isLocked = false,
  onUnlockClick,
  thumbnailQuality = "maxres",
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Validate video ID format (11 characters, alphanumeric with - and _)
  const isValidVideoId = /^[a-zA-Z0-9_-]{11}$/.test(videoId);

  const handlePlay = useCallback(() => {
    if (isLocked) {
      onUnlockClick?.();
      return;
    }
    setIsPlaying(true);
  }, [isLocked, onUnlockClick]);

  // Build secure embed URL with privacy-enhanced domain
  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
  
  // Security and UX parameters
  embedUrl.searchParams.set("rel", "0"); // Don't show videos from other channels
  embedUrl.searchParams.set("modestbranding", "1"); // Minimal YouTube branding
  embedUrl.searchParams.set("playsinline", "1"); // Play inline on mobile
  embedUrl.searchParams.set("origin", typeof window !== "undefined" ? window.location.origin : "");
  
  if (autoplay || isPlaying) {
    embedUrl.searchParams.set("autoplay", "1");
  }
  
  if (!showControls) {
    embedUrl.searchParams.set("controls", "0");
    embedUrl.searchParams.set("disablekb", "1"); // Disable keyboard controls
  }

  // Thumbnail URL with fallback
  const thumbnailUrl = thumbnailError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}default.jpg`;

  if (!isValidVideoId) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-10 w-10" />
          <p className="text-sm">Invalid video ID</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg bg-black",
        className
      )}
    >
      {isPlaying && !isLocked ? (
        <iframe
          src={embedUrl.toString()}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={allowFullscreen}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={isLocked ? "Unlock video" : "Play video"}
        >
          {/* Thumbnail */}
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setThumbnailError(true)}
            unoptimized
          />
          
          {/* Overlay */}
          <div
            className={cn(
              "absolute inset-0 transition-colors duration-300",
              isLocked
                ? "bg-black/60"
                : "bg-black/30 group-hover:bg-black/40"
            )}
          />
          
          {/* Play/Lock Button */}
          <div
            className={cn(
              "relative z-10 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
              isLocked
                ? "bg-muted-foreground/80"
                : "bg-primary"
            )}
          >
            {isLocked ? (
              <Lock className="h-7 w-7 text-background" />
            ) : (
              <Play className="h-7 w-7 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </div>
          
          {/* Locked Message */}
          {isLocked && (
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-sm font-medium text-white">
                Enroll to unlock this lesson
              </p>
            </div>
          )}
        </button>
      )}
    </div>
  );
}

/**
 * Example usage with course lesson data
 */
interface LessonVideoProps {
  lesson: {
    id: string;
    title: string;
    videoId: string;
    isFree: boolean;
  };
  isEnrolled: boolean;
  onEnrollClick: () => void;
}

export function LessonVideo({ lesson, isEnrolled, onEnrollClick }: LessonVideoProps) {
  const canWatch = lesson.isFree || isEnrolled;
  
  return (
    <div className="space-y-2">
      <YouTubePlayer
        videoId={lesson.videoId}
        title={lesson.title}
        isLocked={!canWatch}
        onUnlockClick={onEnrollClick}
      />
      <h3 className="font-medium">{lesson.title}</h3>
      {lesson.isFree && !isEnrolled && (
        <span className="inline-block rounded bg-accent/20 px-2 py-0.5 text-xs text-accent-foreground">
          Free Preview
        </span>
      )}
    </div>
  );
}
