'use client';

import React, { useState, useEffect } from 'react';

interface ColorPalette {
  name: string;
  colors: string[];
}

export default function ColorGenerator() {
  const [color, setColor] = useState('#2563eb');
  const [colorType, setColorType] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const [palette, setPalette] = useState<ColorPalette[]>([]);
  const [paletteType, setPaletteType] = useState<'analogous' | 'monochromatic' | 'triadic' | 'complementary'>('analogous');
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  // Generate palette whenever color or palette type changes
  useEffect(() => {
    generatePalette();
  }, [color, paletteType]);

  // Load recent colors from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentColors');
    if (saved) {
      try {
        setRecentColors(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved colors');
      }
    }
  }, []);

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ] 
      : [0, 0, 0];
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  // Generate a palette based on the current color
  const generatePalette = () => {
    const rgb = hexToRgb(color);
    const [h, s, l] = rgbToHsl(...rgb);
    
    let newPalette: ColorPalette[] = [];
    
    switch (paletteType) {
      case 'analogous':
        // Generate colors with similar hue
        newPalette = [{
          name: 'Analogous',
          colors: [
            rgbToHex(...hslToRgb((h - 30 + 360) % 360, s, l)),
            rgbToHex(...hslToRgb((h - 15 + 360) % 360, s, l)),
            color,
            rgbToHex(...hslToRgb((h + 15) % 360, s, l)),
            rgbToHex(...hslToRgb((h + 30) % 360, s, l))
          ]
        }];
        break;
        
      case 'monochromatic':
        // Generate colors with same hue but different lightness/saturation
        newPalette = [{
          name: 'Light Shades',
          colors: [
            rgbToHex(...hslToRgb(h, s, Math.min(l + 40, 95))),
            rgbToHex(...hslToRgb(h, s, Math.min(l + 20, 85))),
            color,
            rgbToHex(...hslToRgb(h, s, Math.max(l - 20, 15))),
            rgbToHex(...hslToRgb(h, s, Math.max(l - 40, 5)))
          ]
        }, {
          name: 'Saturation Variations',
          colors: [
            rgbToHex(...hslToRgb(h, Math.max(s - 40, 5), l)),
            rgbToHex(...hslToRgb(h, Math.max(s - 20, 10), l)),
            color,
            rgbToHex(...hslToRgb(h, Math.min(s + 20, 95), l)),
            rgbToHex(...hslToRgb(h, Math.min(s + 40, 100), l))
          ]
        }];
        break;
        
      case 'triadic':
        // Generate colors with evenly spaced hues (120° apart)
        newPalette = [{
          name: 'Triadic',
          colors: [
            color,
            rgbToHex(...hslToRgb((h + 120) % 360, s, l)),
            rgbToHex(...hslToRgb((h + 240) % 360, s, l))
          ]
        }];
        break;
        
      case 'complementary':
        // Generate colors with opposite hues (180° apart)
        newPalette = [{
          name: 'Complementary',
          colors: [
            rgbToHex(...hslToRgb((h - 30 + 360) % 360, s, l)),
            rgbToHex(...hslToRgb((h - 15 + 360) % 360, s, l)),
            color,
            rgbToHex(...hslToRgb((h + 165) % 360, s, l)),
            rgbToHex(...hslToRgb((h + 180) % 360, s, l))
          ]
        }];
        break;
    }
    
    setPalette(newPalette);
  };

  // Generate a random color
  const generateRandomColor = () => {
    const hex = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    setColor(hex);
    addToRecentColors(hex);
  };

  // Add a color to recent colors
  const addToRecentColors = (hex: string) => {
    const updated = [hex, ...recentColors.filter(c => c !== hex)].slice(0, 8);
    setRecentColors(updated);
    localStorage.setItem('recentColors', JSON.stringify(updated));
  };

  // Format color based on selected type
  const formatColor = (hex: string) => {
    if (colorType === 'hex') {
      return hex;
    } else if (colorType === 'rgb') {
      const [r, g, b] = hexToRgb(hex);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const [r, g, b] = hexToRgb(hex);
      const [h, s, l] = rgbToHsl(r, g, b);
      return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    }
  };

  // Copy color to clipboard
  const copyToClipboard = (colorValue: string) => {
    navigator.clipboard.writeText(colorValue)
      .then(() => {
        setCopied(colorValue);
        setTimeout(() => setCopied(null), 1500);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        {/* Color Picker Section */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div 
              className="w-full md:w-32 h-32 rounded-lg shadow-md border border-gray-200 flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            
            <div className="flex-grow space-y-4">
              <div>
                <label htmlFor="color-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Choose a color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="color-input"
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                      addToRecentColors(e.target.value);
                    }}
                    className="h-10 w-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => {
                      // Validate and set if valid hex
                      if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                        setColor(e.target.value);
                        addToRecentColors(e.target.value);
                      }
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md flex-grow text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="#RRGGBB"
                  />
                  <button
                    onClick={generateRandomColor}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Random
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color Format
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setColorType('hex')}
                    className={`px-3 py-1 rounded-md border ${
                      colorType === 'hex' 
                        ? 'bg-blue-600 text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    HEX
                  </button>
                  <button
                    onClick={() => setColorType('rgb')}
                    className={`px-3 py-1 rounded-md border ${
                      colorType === 'rgb' 
                        ? 'bg-blue-600 text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    RGB
                  </button>
                  <button
                    onClick={() => setColorType('hsl')}
                    className={`px-3 py-1 rounded-md border ${
                      colorType === 'hsl' 
                        ? 'bg-blue-600 text-white' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    HSL
                  </button>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {formatColor(color)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(formatColor(color))}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    {copied === formatColor(color) ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              {recentColors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recent Colors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {recentColors.map((c, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-md cursor-pointer border border-gray-200"
                        style={{ backgroundColor: c }}
                        onClick={() => setColor(c)}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Palette Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Palette Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => setPaletteType('analogous')}
                className={`px-3 py-2 rounded-md border text-sm ${
                  paletteType === 'analogous' 
                    ? 'bg-blue-600 text-white' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Analogous
              </button>
              <button
                onClick={() => setPaletteType('monochromatic')}
                className={`px-3 py-2 rounded-md border text-sm ${
                  paletteType === 'monochromatic' 
                    ? 'bg-blue-600 text-white' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Monochromatic
              </button>
              <button
                onClick={() => setPaletteType('triadic')}
                className={`px-3 py-2 rounded-md border text-sm ${
                  paletteType === 'triadic' 
                    ? 'bg-blue-600 text-white' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Triadic
              </button>
              <button
                onClick={() => setPaletteType('complementary')}
                className={`px-3 py-2 rounded-md border text-sm ${
                  paletteType === 'complementary' 
                    ? 'bg-blue-600 text-white' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Complementary
              </button>
            </div>
          </div>
          
          {palette.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6 last:mb-0">
              <h3 className="text-sm font-medium text-gray-700 mb-2">{group.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {group.colors.map((c, i) => (
                  <div key={i} className="relative group">
                    <div 
                      className="h-12 rounded-md cursor-pointer"
                      style={{ backgroundColor: c }}
                      onClick={() => {
                        setColor(c);
                        addToRecentColors(c);
                      }}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-600">{c}</span>
                      <button
                        onClick={() => copyToClipboard(formatColor(c))}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {copied === formatColor(c) ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}