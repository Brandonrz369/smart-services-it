'use client';

import React, { useState, useRef } from 'react';
import { trackToolUsage } from '@/lib/analytics';

interface CompressedImage {
  id: string;
  originalName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dataUrl: string;
  width: number;
  height: number;
  type: string;
}

export default function ImageCompressor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = async (files: FileList) => {
    // Filter for image files only
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length === 0) return;
    
    setIsProcessing(true);
    
    // Track compression start
    trackToolUsage('ImageCompressor', 'compression_start', { 
      fileCount: imageFiles.length,
      quality: quality,
      maxWidth: maxWidth
    });
    
    const newCompressedImages: CompressedImage[] = [];
    
    try {
      // Process each image
      for (const file of imageFiles) {
        const compressedImage = await compressImage(file);
        newCompressedImages.push(compressedImage);
      }
      
      // Add to state
      setCompressedImages(prev => [...newCompressedImages, ...prev]);
      
      // Calculate total compression stats
      const totalOriginalSize = newCompressedImages.reduce((sum, img) => sum + img.originalSize, 0);
      const totalCompressedSize = newCompressedImages.reduce((sum, img) => sum + img.compressedSize, 0);
      const averageRatio = newCompressedImages.reduce((sum, img) => sum + img.compressionRatio, 0) / newCompressedImages.length;
      
      // Track compression completion
      trackToolUsage('ImageCompressor', 'compression_complete', {
        fileCount: newCompressedImages.length,
        totalOriginalSize,
        totalCompressedSize,
        averageRatio: averageRatio.toFixed(2),
        quality: quality,
        maxWidth: maxWidth
      });
    } catch (error) {
      console.error('Error compressing images:', error);
      
      // Track error
      trackToolUsage('ImageCompressor', 'compression_error', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsProcessing(false);
      
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const compressImage = (file: File): Promise<CompressedImage> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const img = new Image();
        
        img.onload = () => {
          // Create a canvas with the desired dimensions
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Scale down if image is larger than max width
          if (width > maxWidth) {
            const ratio = maxWidth / width;
            width = maxWidth;
            height = height * ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw the image on the canvas
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Could not get canvas context'));
          
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the compressed image data URL
          const compressedDataUrl = canvas.toDataURL(file.type, quality / 100);
          
          // Calculate size of compressed image
          const compressedSize = Math.round((compressedDataUrl.length * 3) / 4) - 
            compressedDataUrl.split(',')[0].length - 1;
          
          const originalSize = file.size;
          const compressionRatio = originalSize / compressedSize;
          
          // Create a unique ID
          const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          resolve({
            id,
            originalName: file.name,
            originalSize,
            compressedSize,
            compressionRatio,
            dataUrl: compressedDataUrl,
            width,
            height,
            type: file.type
          });
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        if (event.target?.result) {
          img.src = event.target.result as string;
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const downloadImage = (image: CompressedImage) => {
    // Create a temporary link
    const link = document.createElement('a');
    link.href = image.dataUrl;
    
    // Set the file name - add compressed suffix
    const nameParts = image.originalName.split('.');
    const ext = nameParts.pop();
    const baseName = nameParts.join('.');
    link.download = `${baseName}-compressed.${ext}`;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Track download
    trackToolUsage('ImageCompressor', 'download_image', {
      originalSize: image.originalSize, 
      compressedSize: image.compressedSize,
      ratio: image.compressionRatio.toFixed(2)
    });
  };

  const downloadAll = () => {
    // Create a zip file using JSZip
    // For this demo, we'll just trigger individual downloads
    compressedImages.forEach(image => {
      setTimeout(() => downloadImage(image), 300);
    });
    
    // Track bulk download
    trackToolUsage('ImageCompressor', 'download_all', {
      imageCount: compressedImages.length
    });
  };

  const removeImage = (id: string) => {
    setCompressedImages(prev => prev.filter(img => img.id !== id));
  };

  const clearAll = () => {
    setCompressedImages([]);
    trackToolUsage('ImageCompressor', 'clear_all');
  };

  const totalSavings = () => {
    const originalSize = compressedImages.reduce((sum, img) => sum + img.originalSize, 0);
    const compressedSize = compressedImages.reduce((sum, img) => sum + img.compressedSize, 0);
    return {
      original: originalSize,
      compressed: compressedSize,
      saved: originalSize - compressedSize,
      percentage: Math.round((1 - compressedSize / originalSize) * 100)
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Configuration panel */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Image Compression Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10% (Low)</span>
              <span>50%</span>
              <span>100% (High)</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Width: {maxWidth}px
            </label>
            <input
              type="range"
              min="800"
              max="3840"
              step="160"
              value={maxWidth}
              onChange={(e) => setMaxWidth(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>800px</span>
              <span>1920px</span>
              <span>3840px</span>
            </div>
          </div>
        </div>
        
        {/* Drag & Drop area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <p className="text-lg font-medium text-gray-700 mb-1">
            {dragActive ? 'Drop images here' : 'Click or drag images here'}
          </p>
          <p className="text-sm text-gray-500">
            Supports JPG, PNG, WebP, and GIF formats
          </p>
          
          {isProcessing && (
            <div className="mt-4">
              <div className="w-12 h-12 mx-auto border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
              <p className="mt-2 text-blue-600">Processing images...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Results */}
      {compressedImages.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Compressed Images ({compressedImages.length})</h2>
            <div className="flex gap-2">
              <button
                onClick={downloadAll}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Download All
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
          
          {/* Total savings summary */}
          <div className="mb-6 bg-green-50 p-3 rounded-md">
            <h3 className="font-medium text-green-800 mb-1">Total Savings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Original Size</p>
                <p className="font-medium">{formatBytes(totalSavings().original)}</p>
              </div>
              <div>
                <p className="text-gray-500">Compressed Size</p>
                <p className="font-medium">{formatBytes(totalSavings().compressed)}</p>
              </div>
              <div>
                <p className="text-gray-500">Space Saved</p>
                <p className="font-medium">{formatBytes(totalSavings().saved)}</p>
              </div>
              <div>
                <p className="text-gray-500">Reduction</p>
                <p className="font-medium">{totalSavings().percentage}%</p>
              </div>
            </div>
          </div>
          
          {/* Image grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {compressedImages.map(image => (
              <div key={image.id} className="border rounded-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img 
                    src={image.dataUrl} 
                    alt={image.originalName}
                    className="object-contain w-full h-full"
                  />
                </div>
                
                <div className="p-3">
                  <p className="font-medium text-gray-800 mb-1 truncate" title={image.originalName}>
                    {image.originalName}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <p className="text-gray-500">Original</p>
                      <p>{formatBytes(image.originalSize)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Compressed</p>
                      <p>{formatBytes(image.compressedSize)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Dimensions</p>
                      <p>{image.width} × {image.height}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reduction</p>
                      <p>{Math.round((1 - image.compressedSize / image.originalSize) * 100)}%</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => downloadImage(image)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}