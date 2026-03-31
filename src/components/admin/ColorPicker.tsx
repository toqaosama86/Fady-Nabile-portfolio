import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string; // HSL format: "38 90% 55%"
  onChange: (value: string) => void;
  placeholder?: string;
}

// Color conversion utilities
const ColorUtils = {
  // Convert HEX to HSL
  hexToHsl: (hex: string): { h: number; s: number; l: number } | null => {
    const cleanHex = hex.replace(/^#/, '').toLowerCase();
    if (!/^[0-9a-f]{6}$/.test(cleanHex)) return null;
    
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  },

  // Convert HSL to HEX
  hslToHex: (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  },

  // Parse any color format (HSL space-separated, HEX, or hsl() function)
  parseColor: (input: string): { h: number; s: number; l: number } | null => {
    const trimmed = input.trim();

    // Try HEX format (#RRGGBB)
    if (trimmed.startsWith('#')) {
      return ColorUtils.hexToHsl(trimmed);
    }

    // Try hsl() function format: hsl(38, 90%, 55%)
    const hslFuncMatch = trimmed.match(/hsl\s*\(\s*(\d+\.?\d*)\s*,\s*(\d+\.?\d*)%?\s*,\s*(\d+\.?\d*)%?\s*\)/i);
    if (hslFuncMatch) {
      return {
        h: Math.round(parseFloat(hslFuncMatch[1])) % 360,
        s: Math.round(parseFloat(hslFuncMatch[2])),
        l: Math.round(parseFloat(hslFuncMatch[3]))
      };
    }

    // Try space-separated HSL format: 38 90% 55% or 38 90 55
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 3) {
      const h = parseInt(parts[0]);
      const s = parseInt(parts[1]);
      const l = parseInt(parts[2]);
      
      if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
        return {
          h: h % 360,
          s: Math.min(100, Math.max(0, s)),
          l: Math.min(100, Math.max(0, l))
        };
      }
    }

    return null;
  }
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  placeholder = '38 90% 55%',
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inputFormat, setInputFormat] = useState<'hsl' | 'hex' | 'unknown'>('hsl');
  const [copiedClass, setCopiedClass] = useState<'hsl' | 'hex' | 'hslFunc' | null>(null);

  // Parse initial value
  const parseInitialValue = (val: string) => {
    const parsed = ColorUtils.parseColor(val);
    if (parsed) {
      if (val.trim().startsWith('#')) {
        setInputFormat('hex');
      } else if (val.trim().toLowerCase().startsWith('hsl')) {
        setInputFormat('hsl');
      } else {
        setInputFormat('hsl');
      }
      return parsed;
    }
    setInputFormat('unknown');
    return { h: 38, s: 90, l: 55 };
  };

  const [hsl, setHsl] = useState(() => parseInitialValue(value));

  // Update HSL when value prop changes
  useEffect(() => {
    const parsed = ColorUtils.parseColor(value);
    if (parsed) {
      setHsl(parsed);
    }
  }, [value]);

  const copyToClipboard = (text: string, type: 'hsl' | 'hex' | 'hslFunc') => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedClass(type);
      setTimeout(() => setCopiedClass(null), 2000);
    }).catch((err) => {
      console.error('Failed to copy:', err);
      // Fallback: try using the old method
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedClass(type);
        setTimeout(() => setCopiedClass(null), 2000);
      } catch (e) {
        console.error('Fallback copy failed:', e);
      }
      document.body.removeChild(textArea);
    });
  };

  const handleHslChange = () => {
    const newValue = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const parsed = ColorUtils.parseColor(text);
    
    if (parsed) {
      setHsl(parsed);
      // Always store as HSL space-separated format in database
      onChange(`${parsed.h} ${parsed.s}% ${parsed.l}%`);
      
      // Update format indicator
      if (text.trim().startsWith('#')) {
        setInputFormat('hex');
      } else if (text.trim().toLowerCase().startsWith('hsl')) {
        setInputFormat('hsl');
      } else {
        setInputFormat('hsl');
      }
    } else {
      onChange(text);
      setInputFormat('unknown');
    }
  };

  const previewColor = ColorUtils.hslToHex(hsl.h, hsl.s, hsl.l);
  const hslString = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
  const hexString = previewColor;
  const hslFunctionString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-3 p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center justify-between mb-2">
        <Label className="text-sm font-semibold">{label}</Label>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">
            HSL: ({hsl.h}°, {hsl.s}%, {hsl.l}%)
          </div>
          {inputFormat !== 'unknown' && (
            <div className={`text-xs px-2 py-1 rounded ${
              inputFormat === 'hex' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
            }`}>
              {inputFormat === 'hex' ? 'HEX Input' : 'HSL Input'}
            </div>
          )}
        </div>
      </div>
      
      {/* Color Swatch and Input */}
      <div className="flex gap-3 items-end">
        {/* Visual Color Swatch */}
        <div className="flex flex-col gap-1">
          <div
            className="w-12 h-10 rounded border-2 border-border cursor-pointer hover:border-primary transition-colors shadow-md"
            style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }}
            title={`Click to copy: ${hslString}`}
            onClick={() => copyToClipboard(hslString, 'hsl')}
          />
          <p className="text-xs text-muted-foreground text-center">Color Swatch</p>
        </div>

        {/* HSL Input */}
        <div className="flex-1 space-y-1">
          <Input
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="font-mono text-sm bg-background"
          />
          <p className="text-xs text-muted-foreground">Supports: HSL space format, #HEX, or hsl() function</p>
        </div>
      </div>

      {/* Format Info */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-muted rounded border border-border">
          <p className="text-muted-foreground mb-1">HSL (Saved)</p>
          <code className="block font-mono text-xs truncate">{hslString}</code>
        </div>
        <div className="p-2 bg-muted rounded border border-border">
          <p className="text-muted-foreground mb-1">HEX</p>
          <code className="block font-mono text-xs truncate">{hexString}</code>
        </div>
        <div className="p-2 bg-muted rounded border border-border">
          <p className="text-muted-foreground mb-1">HSL Function</p>
          <code className="block font-mono text-xs truncate">{hslFunctionString}</code>
        </div>
      </div>

      {/* Quick Copy Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={copiedClass === 'hsl' ? 'default' : 'outline'}
          size="sm"
          className={`text-xs h-8 transition-all ${copiedClass === 'hsl' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          onClick={() => copyToClipboard(hslString, 'hsl')}
        >
          {copiedClass === 'hsl' ? (
            <>
              <Check className="w-3 h-3 mr-1" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" /> Copy HSL
            </>
          )}
        </Button>
        <Button
          variant={copiedClass === 'hex' ? 'default' : 'outline'}
          size="sm"
          className={`text-xs h-8 transition-all ${copiedClass === 'hex' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          onClick={() => copyToClipboard(hexString, 'hex')}
        >
          {copiedClass === 'hex' ? (
            <>
              <Check className="w-3 h-3 mr-1" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" /> Copy #{hexString.replace('#', '')}
            </>
          )}
        </Button>
        <Button
          variant={copiedClass === 'hslFunc' ? 'default' : 'outline'}
          size="sm"
          className={`text-xs h-8 transition-all ${copiedClass === 'hslFunc' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          onClick={() => copyToClipboard(hslFunctionString, 'hslFunc')}
        >
          {copiedClass === 'hslFunc' ? (
            <>
              <Check className="w-3 h-3 mr-1" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" /> Copy hsl()
            </>
          )}
        </Button>
      </div>

      {/* Advanced Controls */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full text-xs"
      >
        {showAdvanced ? '▼ Hide Advanced' : '▶ Show Advanced'}
      </Button>

      {showAdvanced && (
        <div className="space-y-4 p-3 bg-muted rounded-lg border border-border">
          {/* Hue Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-medium">Hue</Label>
              <span className="text-sm font-mono font-semibold text-primary">{hsl.h}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={hsl.h}
              onChange={(e) => {
                setHsl({ ...hsl, h: Number(e.target.value) });
                const updated = { ...hsl, h: Number(e.target.value) };
                onChange(`${updated.h} ${updated.s}% ${updated.l}%`);
              }}
              className="w-full h-2 bg-gradient-to-r rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  hsl(0, 100%, 50%),
                  hsl(60, 100%, 50%),
                  hsl(120, 100%, 50%),
                  hsl(180, 100%, 50%),
                  hsl(240, 100%, 50%),
                  hsl(300, 100%, 50%),
                  hsl(360, 100%, 50%))`
              }}
            />
          </div>

          {/* Saturation Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-medium">Saturation</Label>
              <span className="text-sm font-mono font-semibold text-primary">{hsl.s}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={hsl.s}
              onChange={(e) => {
                setHsl({ ...hsl, s: Number(e.target.value) });
                const updated = { ...hsl, s: Number(e.target.value) };
                onChange(`${updated.h} ${updated.s}% ${updated.l}%`);
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  hsl(${hsl.h}, 0%, ${hsl.l}%),
                  hsl(${hsl.h}, 50%, ${hsl.l}%),
                  hsl(${hsl.h}, 100%, ${hsl.l}%))`
              }}
            />
          </div>

          {/* Lightness Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-medium">Lightness</Label>
              <span className="text-sm font-mono font-semibold text-primary">{hsl.l}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={hsl.l}
              onChange={(e) => {
                setHsl({ ...hsl, l: Number(e.target.value) });
                const updated = { ...hsl, l: Number(e.target.value) };
                onChange(`${updated.h} ${updated.s}% ${updated.l}%`);
                handleHslChange();
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  hsl(0, 0%, 0%),
                  hsl(${hsl.h}, ${hsl.s}%, 50%),
                  hsl(0, 0%, 100%))`
              }}
            />
          </div>

          {/* Color Preview Section */}
          <div className="space-y-2 pt-3 border-t border-border">
            <Label className="text-xs font-medium">Preview</Label>
            
            {/* Large Color Block */}
            <div className="grid grid-cols-1 gap-2">
              <div
                className="w-full h-24 rounded-lg border-2 border-border shadow-lg transition-all"
                style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }}
              />
            </div>

            {/* Preview on Different Backgrounds */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground text-center">On Light</p>
                <div className="p-4 bg-white rounded border border-border flex items-center justify-center min-h-20">
                  <div
                    className="w-12 h-12 rounded border-2 border-border"
                    style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground text-center">On Dark</p>
                <div className="p-4 bg-zinc-900 rounded border border-border flex items-center justify-center min-h-20">
                  <div
                    className="w-12 h-12 rounded border-2 border-zinc-700"
                    style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` }}
                  />
                </div>
              </div>
            </div>

            {/* Color Values Display */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">HSL Value</p>
                <code className="block font-mono text-xs bg-background p-2 rounded border border-border break-all whitespace-break-spaces">
                  hsl({hslString})
                </code>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">HEX Value</p>
                <code className="block font-mono text-xs bg-background p-2 rounded border border-border">
                  {previewColor.toUpperCase()}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
