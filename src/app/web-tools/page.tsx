'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Import common components
import FadeIn from '@/components/FadeIn';
import ParallaxEffect from '@/components/ParallaxEffect';

const WebTools = () => {
  const [activeTab, setActiveTab] = useState('password');

  // IP Address Tool
  const [ipInfo, setIpInfo] = useState<{
    ip: string;
    network: string;
    version: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    isp: string;
    timezone: string;
    asn: string;
  } | null>(null);
  const [isLoadingIp, setIsLoadingIp] = useState(false);

  // Speed Test Tool
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [speedResults, setSpeedResults] = useState<{
    download: string | null;
    upload: string | null;
    ping: number | null;
    testProgress: number;
  }>({
    download: null,
    upload: null,
    ping: null,
    testProgress: 0
  });

  // Password Generator Tool
  const [passwordSettings, setPasswordSettings] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordCopied, setPasswordCopied] = useState(false);

  // Text Case Converter Tool  
  const [inputText, setInputText] = useState('');
  const [convertedText, setConvertedText] = useState('');
  const [selectedCase, setSelectedCase] = useState('upper');

  // Color Converter Tool
  const [colorInput, setColorInput] = useState('#3b82f6');
  const [colorFormat, setColorFormat] = useState('hex');
  const [convertedColor, setConvertedColor] = useState({ hex: '#3b82f6', rgb: 'rgb(59, 130, 246)', hsl: 'hsl(217, 91%, 60%)' });

  // Password Generator Functions
  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=<>?/[]{}|';
    
    let validChars = '';
    if (passwordSettings.includeUppercase) validChars += uppercaseChars;
    if (passwordSettings.includeLowercase) validChars += lowercaseChars;
    if (passwordSettings.includeNumbers) validChars += numberChars;
    if (passwordSettings.includeSymbols) validChars += symbolChars;
    
    if (validChars === '') {
      setGeneratedPassword('Please select at least one character type');
      return;
    }
    
    let password = '';
    for (let i = 0; i < passwordSettings.length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }
    
    setGeneratedPassword(password);
  };

  const copyToClipboard = () => {
    if (generatedPassword && generatedPassword !== 'Please select at least one character type') {
      navigator.clipboard.writeText(generatedPassword);
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    }
  };

  const handlePasswordSettingChange = (
    setting: string, 
    value: boolean | number
  ) => {
    setPasswordSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Text Case Converter Functions
  const convertTextCase = () => {
    let result = '';
    
    switch (selectedCase) {
      case 'upper':
        result = inputText.toUpperCase();
        break;
      case 'lower':
        result = inputText.toLowerCase();
        break;
      case 'title':
        result = inputText
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'sentence':
        result = inputText.split('. ')
          .map(sentence => {
            if (sentence.length === 0) return '';
            return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
          })
          .join('. ');
        break;
      case 'camel':
        result = inputText
          .toLowerCase()
          .split(' ')
          .map((word, index) => {
            return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join('');
        break;
      default:
        result = inputText;
    }
    
    setConvertedText(result);
  };

  // Color Converter Functions
  const hexToRgb = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  const hexToHsl = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      
      h /= 6;
    }
    
    const hDegrees = Math.round(h * 360);
    const sPercent = Math.round(s * 100);
    const lPercent = Math.round(l * 100);
    
    return `hsl(${hDegrees}, ${sPercent}%, ${lPercent}%)`;
  };

  const convertColor = () => {
    try {
      if (colorFormat === 'hex') {
        // Make sure it's a valid hex code
        if (/^#[0-9A-F]{6}$/i.test(colorInput)) {
          const rgb = hexToRgb(colorInput);
          const hsl = hexToHsl(colorInput);
          
          setConvertedColor({
            hex: colorInput,
            rgb,
            hsl
          });
        }
      }
    } catch (error) {
      console.error('Error converting color:', error);
    }
  };

  // IP Address Info Functions
  const fetchIpInfo = () => {
    setIsLoadingIp(true);
    setIpInfo(null);
    
    // Mock IP information for display purposes only
    // In a real implementation, you would call an API like:
    // fetch('https://ipapi.co/json/')
    setTimeout(() => {
      setIpInfo({
        ip: "192.168.1.137",
        network: "192.168.1.0/24",
        version: "IPv4",
        city: "Los Angeles",
        region: "California",
        country: "US",
        loc: "34.0522,-118.2437",
        isp: "Spectrum",
        timezone: "America/Los_Angeles",
        asn: "AS7922"
      });
      setIsLoadingIp(false);
    }, 1500);
  };

  // Speed Test Functions
  const runSpeedTest = () => {
    setIsRunningTest(true);
    setSpeedResults({
      download: null,
      upload: null,
      ping: null,
      testProgress: 0
    });
    
    // Simulate progress
    const interval = setInterval(() => {
      setSpeedResults(prev => {
        const newProgress = prev.testProgress + 5;
        
        // Set stages of the test
        let download = prev.download;
        let upload = prev.upload;
        let ping = prev.ping;
        
        if (newProgress >= 20 && !ping) {
          ping = Math.floor(Math.random() * 30) + 10; // 10-40ms
        }
        
        if (newProgress >= 60 && !download) {
          download = (Math.random() * 100 + 50).toFixed(2); // 50-150 Mbps
        }
        
        if (newProgress >= 100) {
          upload = (Math.random() * 50 + 10).toFixed(2); // 10-60 Mbps
          clearInterval(interval);
          setIsRunningTest(false);
        }
        
        return {
          download,
          upload,
          ping,
          testProgress: Math.min(newProgress, 100)
        };
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="py-16 bg-blue-600 text-white relative overflow-hidden">
        <ParallaxEffect speed={0.2} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-70"></div>
          <div className="absolute inset-0 bg-[url('/images/background-pattern.png')] bg-repeat opacity-10"></div>
        </ParallaxEffect>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn direction="down" delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Web Tools</h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <p className="text-lg md:text-xl text-blue-100">
                Helpful online utilities to make your digital life easier. No sign-up required.
              </p>
            </FadeIn>
            
            <div className="mt-8 flex justify-center">
              <nav className="flex flex-wrap space-x-1 bg-blue-700/50 backdrop-blur-md p-1 rounded-lg border border-blue-500/50">
                {[
                  { id: 'password', label: 'Password Generator' },
                  { id: 'textcase', label: 'Text Case Converter' },
                  { id: 'color', label: 'Color Converter' },
                  { id: 'ip', label: 'IP Lookup' },
                  { id: 'speedtest', label: 'Speed Test' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors m-1 ${
                      activeTab === tab.id 
                        ? 'bg-white text-blue-700' 
                        : 'text-white hover:bg-blue-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    
      {/* Tools Container */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="mb-6">
            <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to IT Services
            </Link>
          </div>
        
          {/* Password Generator */}
          {activeTab === 'password' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Strong Password Generator</h2>
                <p className="text-gray-600">
                  Create secure, random passwords to keep your accounts safe from hackers and data breaches.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password Length: {passwordSettings.length}
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={passwordSettings.length}
                      onChange={(e) => handlePasswordSettingChange('length', parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>8</span>
                      <span>32</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700">Character Types:</h3>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="uppercase"
                        checked={passwordSettings.includeUppercase}
                        onChange={(e) => handlePasswordSettingChange('includeUppercase', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700">
                        Include Uppercase Letters (A-Z)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lowercase"
                        checked={passwordSettings.includeLowercase}
                        onChange={(e) => handlePasswordSettingChange('includeLowercase', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="lowercase" className="ml-2 block text-sm text-gray-700">
                        Include Lowercase Letters (a-z)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="numbers"
                        checked={passwordSettings.includeNumbers}
                        onChange={(e) => handlePasswordSettingChange('includeNumbers', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="numbers" className="ml-2 block text-sm text-gray-700">
                        Include Numbers (0-9)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="symbols"
                        checked={passwordSettings.includeSymbols}
                        onChange={(e) => handlePasswordSettingChange('includeSymbols', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="symbols" className="ml-2 block text-sm text-gray-700">
                        Include Symbols (!@#$%&*())
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      onClick={generatePassword}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
                    >
                      Generate Password
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Secure Password:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={generatedPassword}
                        readOnly
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-md px-4 py-3 font-mono"
                      />
                      {generatedPassword && generatedPassword !== 'Please select at least one character type' && (
                        <button
                          onClick={copyToClipboard}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                          title="Copy to clipboard"
                        >
                          {passwordCopied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="font-medium text-gray-900 mb-2">Password Tips:</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Use a different password for each account</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Longer passwords are more secure (12+ characters recommended)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Consider using a password manager to store your credentials securely</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 mt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Note: Passwords are generated locally in your browser and are never sent to our servers or stored anywhere.
                </p>
              </div>
            </motion.div>
          )}
          
          {/* Text Case Converter */}
          {activeTab === 'textcase' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Text Case Converter</h2>
                <p className="text-gray-600">
                  Quickly transform your text to different cases: upper case, lower case, title case, and more.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Your Text:
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type or paste your text here..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {[
                    { id: 'upper', label: 'UPPERCASE' },
                    { id: 'lower', label: 'lowercase' },
                    { id: 'title', label: 'Title Case' },
                    { id: 'sentence', label: 'Sentence case' },
                    { id: 'camel', label: 'camelCase' }
                  ].map((caseType) => (
                    <button
                      key={caseType.id}
                      onClick={() => setSelectedCase(caseType.id)}
                      className={`py-2 px-3 text-sm font-medium rounded ${
                        selectedCase === caseType.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {caseType.label}
                    </button>
                  ))}
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={convertTextCase}
                    disabled={!inputText}
                    className={`w-full font-medium py-2 px-4 rounded-md shadow-sm transition-colors ${
                      !inputText
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Convert Text
                  </button>
                </div>
                
                {convertedText && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Result:
                    </label>
                    <div className="relative">
                      <textarea
                        value={convertedText}
                        readOnly
                        rows={5}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2"
                      ></textarea>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(convertedText);
                        }}
                        className="absolute right-2 top-2 text-gray-500 hover:text-blue-600 bg-gray-50 p-1 rounded"
                        title="Copy to clipboard"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                          <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Color Converter */}
          {activeTab === 'color' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Color Format Converter</h2>
                <p className="text-gray-600">
                  Convert between different color formats: HEX, RGB, and HSL.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Format:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'hex', label: 'HEX' },
                        { id: 'rgb', label: 'RGB' },
                        { id: 'hsl', label: 'HSL' }
                      ].map((format) => (
                        <button
                          key={format.id}
                          onClick={() => setColorFormat(format.id)}
                          className={`py-2 px-3 text-sm font-medium rounded ${
                            colorFormat === format.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {format.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter {colorFormat.toUpperCase()} Color:
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={colorFormat === 'hex' ? '#3b82f6' : colorFormat === 'rgb' ? 'rgb(59, 130, 246)' : 'hsl(217, 91%, 60%)'}
                      />
                      <input
                        type="color"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        className="w-14 h-auto border-t border-r border-b border-gray-300 rounded-r-md"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      onClick={convertColor}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
                    >
                      Convert Color
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Color Preview:
                    </label>
                    <div 
                      className="h-32 rounded-md border border-gray-200 shadow-sm"
                      style={{ backgroundColor: convertedColor.hex }}
                    ></div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">HEX:</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={convertedColor.hex}
                          readOnly
                          className="flex-grow bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2 text-sm font-mono"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(convertedColor.hex)}
                          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 border-l-0 rounded-r-md px-3 py-2"
                          title="Copy to clipboard"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">RGB:</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={convertedColor.rgb}
                          readOnly
                          className="flex-grow bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2 text-sm font-mono"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(convertedColor.rgb)}
                          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 border-l-0 rounded-r-md px-3 py-2"
                          title="Copy to clipboard"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">HSL:</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={convertedColor.hsl}
                          readOnly
                          className="flex-grow bg-gray-50 border border-gray-300 rounded-l-md px-3 py-2 text-sm font-mono"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(convertedColor.hsl)}
                          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 border-l-0 rounded-r-md px-3 py-2"
                          title="Copy to clipboard"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* IP Address Lookup */}
          {activeTab === 'ip' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">IP Address Lookup</h2>
                <p className="text-gray-600">
                  Get detailed information about your current IP address location and network.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-600 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>
                  This is a demo tool that displays simulated IP information. In an actual implementation, this would show real information about your IP address.
                </span>
              </div>
              
              <div className="flex justify-center my-6">
                <button
                  onClick={fetchIpInfo}
                  disabled={isLoadingIp}
                  className={`inline-flex items-center py-3 px-6 rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoadingIp 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isLoadingIp ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Looking up IP Information...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Show My IP Information
                    </>
                  )}
                </button>
              </div>
              
              {ipInfo && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="bg-blue-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">IP Address Information</h3>
                      <div className="bg-blue-500 rounded-full px-3 py-1 text-sm">
                        {ipInfo.version}
                      </div>
                    </div>
                    <p className="text-2xl font-mono mt-2 text-blue-100">{ipInfo.ip}</p>
                  </div>
                  
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Location:</h4>
                          <p className="font-medium text-gray-900">{ipInfo.city}, {ipInfo.region}</p>
                          <p className="text-gray-600">{ipInfo.country}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Network:</h4>
                          <p className="font-medium text-gray-900 font-mono">{ipInfo.network}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">ISP:</h4>
                          <p className="font-medium text-gray-900">{ipInfo.isp}</p>
                          <p className="text-gray-600 text-sm">{ipInfo.asn}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Timezone:</h4>
                          <p className="font-medium text-gray-900">{ipInfo.timezone}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Coordinates:</h4>
                          <p className="font-medium text-gray-900">{ipInfo.loc}</p>
                        </div>
                        
                        <div className="flex justify-end pt-3">
                          <button
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            onClick={() => window.open(`https://www.google.com/maps?q=${ipInfo.loc}`, "_blank")}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                            </svg>
                            View on Map
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-medium text-gray-900 mb-3">Why Use IP Lookup?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h4 className="font-medium text-gray-900 mb-1">Security Verification</h4>
                    <p className="text-sm text-gray-600">Check your IP address to verify you&apos;re not exposing sensitive information online.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="font-medium text-gray-900 mb-1">VPN Verification</h4>
                    <p className="text-sm text-gray-600">Confirm your VPN is working correctly by checking your apparent location.</p>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h4 className="font-medium text-gray-900 mb-1">Network Diagnosis</h4>
                    <p className="text-sm text-gray-600">Identify potential issues with your internet connection and ISP configuration.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Speed Test */}
          {activeTab === 'speedtest' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Internet Speed Test</h2>
                <p className="text-gray-600">
                  Test your internet connection speed, including download, upload, and ping.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-600 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>
                  This is a demo tool that simulates a speed test. In an actual implementation, this would perform a real test of your internet connection speed.
                </span>
              </div>
              
              <div className="flex justify-center my-6">
                <button
                  onClick={runSpeedTest}
                  disabled={isRunningTest}
                  className={`inline-flex items-center py-3 px-8 rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isRunningTest 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isRunningTest ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Running Test...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Start Speed Test
                    </>
                  )}
                </button>
              </div>
              
              {(isRunningTest || speedResults.download !== null) && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">Test Results</h3>
                      {isRunningTest && (
                        <span className="text-sm text-gray-500">Testing... {speedResults.testProgress}%</span>
                      )}
                    </div>
                    
                    {isRunningTest && (
                      <div className="mt-2 relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                          <div 
                            style={{ width: `${speedResults.testProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-0">
                    <div className="grid grid-cols-3 divide-x divide-gray-200">
                      <div className="p-6 text-center">
                        <div className="text-sm font-medium text-gray-500 mb-1 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Download
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {speedResults.download ? speedResults.download : '—'}
                          <span className="text-base font-normal text-gray-500 ml-1">Mbps</span>
                        </div>
                      </div>
                      
                      <div className="p-6 text-center">
                        <div className="text-sm font-medium text-gray-500 mb-1 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          Upload
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {speedResults.upload ? speedResults.upload : '—'}
                          <span className="text-base font-normal text-gray-500 ml-1">Mbps</span>
                        </div>
                      </div>
                      
                      <div className="p-6 text-center">
                        <div className="text-sm font-medium text-gray-500 mb-1 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                          Ping
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                          {speedResults.ping ? speedResults.ping : '—'}
                          <span className="text-base font-normal text-gray-500 ml-1">ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-6 mt-4">
                <h3 className="font-medium text-gray-900 mb-3">Understanding Your Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="font-medium text-green-600 flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Download Speed
                    </div>
                    <p className="text-sm text-gray-600">
                      Measures how quickly data is transferred from the internet to your device. Higher speeds mean faster downloads and smoother streaming.
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      <p><span className="font-medium">Good:</span> 25+ Mbps</p>
                      <p><span className="font-medium">Excellent:</span> 100+ Mbps</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="font-medium text-blue-600 flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Upload Speed
                    </div>
                    <p className="text-sm text-gray-600">
                      Measures how quickly data is transferred from your device to the internet. Important for video calls and posting content online.
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      <p><span className="font-medium">Good:</span> 5+ Mbps</p>
                      <p><span className="font-medium">Excellent:</span> 20+ Mbps</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="font-medium text-purple-600 flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      Ping (Latency)
                    </div>
                    <p className="text-sm text-gray-600">
                      Measures the time it takes for data to travel between your device and the server. Lower ping means more responsive connections.
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      <p><span className="font-medium">Good:</span> Below 50ms</p>
                      <p><span className="font-medium">Excellent:</span> Below 20ms</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Additional Tools Teasers */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">More Helpful Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Network Troubleshooter",
                description: "A guide to solve common network issues, with step-by-step instructions and diagnostic tools.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                ),
                comingSoon: true
              },
              {
                title: "Windows Help Center",
                description: "Find solutions to common Windows problems with our curated collection of fixes and tips.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                comingSoon: true
              },
              {
                title: "Tech Support Chatbot",
                description: "Get quick answers to common tech questions with our AI-powered support assistant.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                ),
                comingSoon: true
              }
            ].map((tool, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-md bg-blue-50 mb-4 mx-auto">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{tool.title}</h3>
                <p className="text-gray-600 text-center mb-4">{tool.description}</p>
                {tool.comingSoon ? (
                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Coming Soon
                    </span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Use Now →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="max-w-6xl mx-auto mt-16 bg-blue-600 rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Personalized IT Support?</h2>
              <p className="mb-6">
                Our team of expert technicians are ready to help solve your technology problems. From computer repairs to network setup, we&apos;ve got you covered.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Contact Our IT Team
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-blue-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-white opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebTools;