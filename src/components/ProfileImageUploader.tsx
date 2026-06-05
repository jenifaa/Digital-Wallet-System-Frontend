"use client";

import { CircleUserRoundIcon, CameraIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useEffect } from "react";

export default function ProfileImageUploader({ onChange, currentImage }: {
  onChange: (file: File | null) => void;
  currentImage?: string;
}) {
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({ accept: "image/*" });

  useEffect(() => {
    if (files.length > 0) {
      onChange(files[0]?.file as File);
    } else {
      onChange(null);
    }
  }, [files, onChange]);

  const previewUrl = files[0]?.preview || currentImage || null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="group relative cursor-pointer"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        aria-label={previewUrl ? "Change profile photo" : "Upload profile photo"}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openFileDialog()}
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-0.5 rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-cyan-500 opacity-70 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md" />

        {/* Avatar circle */}
        <div className="relative size-28 overflow-hidden rounded-full border-[3px] border-slate-950 bg-slate-900">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="size-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-linear-to-br from-slate-800 to-slate-900">
              <CircleUserRoundIcon className="size-12 text-slate-600" />
            </div>
          )}

          {/* Camera overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/50 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
            <CameraIcon className="size-6 text-white drop-shadow" />
            <span className="text-[10px] font-semibold tracking-widest text-white/90 uppercase">
              {previewUrl ? "Change" : "Upload"}
            </span>
          </div>
        </div>

        {/* Camera badge */}
        <div className="absolute -bottom-0.5 -right-0.5 flex size-8 items-center justify-center rounded-full border-2 border-slate-950 bg-indigo-600 shadow-lg shadow-indigo-500/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500">
          <CameraIcon className="size-3.5 text-white" />
        </div>

        <input
          {...getInputProps()}
          aria-label="Upload image file"
          className="sr-only"
          tabIndex={-1}
        />
      </div>

      {/* Remove button */}
      {files.length > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            removeFile(files[0]?.id);
          }}
          className="text-xs text-slate-500 underline-offset-2 transition-colors hover:text-rose-400 hover:underline"
        >
          Remove photo
        </button>
      )}
    </div>
  );
}