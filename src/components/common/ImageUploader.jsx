import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';

export const ImageUploader = ({ photos = [], onPhotosChange, maxPhotos = 4 }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const remainingSlots = maxPhotos - photos.length;
    const selectedFiles = files.slice(0, remainingSlots);

    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotosChange(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <label className="flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-[#005A36]" />
          <span>Upload Problem Photos</span>
        </label>
        <span className="text-slate-500 font-medium">
          {photos.length} / {maxPhotos} photos uploaded
        </span>
      </div>

      {photos.length < maxPhotos && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
            dragActive 
              ? 'border-[#005A36] bg-emerald-50/60 scale-[0.99]' 
              : 'border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400'
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload-input"
          />
          <label htmlFor="photo-upload-input" className="cursor-pointer block">
            <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-[#005A36] mx-auto flex items-center justify-center mb-2">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              Click to select photos or drag & drop here
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPG, PNG, WEBP (Up to 4 clear photos of the issue)
            </p>
          </label>
        </div>
      )}

      {/* Thumbnails grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {photos.map((src, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-100">
              <img src={src} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                  title="Remove Photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                Photo #{index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
