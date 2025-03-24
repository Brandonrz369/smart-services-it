'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { trackToolUsage } from '@/lib/analytics';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  ambiguous: boolean;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | 'very-strong'>('medium');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    ambiguous: false,
  });
  const [copied, setCopied] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Load password history from local storage
  useEffect(() => {
    // Track component initialization
    trackToolUsage('PasswordGenerator', 'init');
    
    const savedHistory = localStorage.getItem('passwordHistory');
    if (savedHistory) {
      try {
        setPasswordHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse password history:', error);
      }
    }
  }, []);

  const handleOptionChange = (option: keyof PasswordOptions, value: boolean | number) => {
    setOptions(prev => ({
      ...prev,
      [option]: value,
    }));
    
    // Track option changes
    trackToolUsage('PasswordGenerator', 'change_option', {
      option,
      value
    });
  };

  const generatePassword = useCallback(() => {
    // Character sets
    const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Excluding I, O
    const uppercaseAmbiguous = 'IO';
    const lowercaseChars = 'abcdefghijkmnpqrstuvwxyz'; // Excluding l, o
    const lowercaseAmbiguous = 'lo';
    const numberChars = '23456789'; // Excluding 0, 1
    const numberAmbiguous = '01';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Build character pool based on options
    let charPool = '';
    
    if (options.uppercase) {
      charPool += uppercaseChars;
      if (options.ambiguous) charPool += uppercaseAmbiguous;
    }
    
    if (options.lowercase) {
      charPool += lowercaseChars;
      if (options.ambiguous) charPool += lowercaseAmbiguous;
    }
    
    if (options.numbers) {
      charPool += numberChars;
      if (options.ambiguous) charPool += numberAmbiguous;
    }
    
    if (options.symbols) {
      charPool += symbolChars;
    }
    
    // Ensure at least one character set is selected
    if (charPool === '') {
      setOptions(prev => ({ ...prev, lowercase: true }));
      charPool = lowercaseChars;
    }
    
    // Generate password
    let newPassword = '';
    const length = options.length;
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    
    // Calculate strength
    let strength: 'weak' | 'medium' | 'strong' | 'very-strong' = 'weak';
    
    const entropy = calculateEntropy(newPassword);
    if (entropy < 45) {
      strength = 'weak';
    } else if (entropy < 60) {
      strength = 'medium';
    } else if (entropy < 80) {
      strength = 'strong';
    } else {
      strength = 'very-strong';
    }
    
    setPassword(newPassword);
    setPasswordStrength(strength);
    
    // Add to history
    if (newPassword) {
      const updatedHistory = [newPassword, ...passwordHistory.slice(0, 7)];
      setPasswordHistory(updatedHistory);
      localStorage.setItem('passwordHistory', JSON.stringify(updatedHistory));
      
      // Track password generation
      trackToolUsage('PasswordGenerator', 'generate_password', {
        length: options.length,
        strength: strength,
        hasUppercase: options.uppercase,
        hasLowercase: options.lowercase,
        hasNumbers: options.numbers,
        hasSymbols: options.symbols
      });
    }
    
    setCopied(false);
  }, [options, passwordHistory]);
  
  // Initialize password on component mount
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const calculateEntropy = (pass: string) => {
    let charsetSize = 0;
    
    if (/[A-Z]/.test(pass)) charsetSize += 26;
    if (/[a-z]/.test(pass)) charsetSize += 26;
    if (/[0-9]/.test(pass)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(pass)) charsetSize += 33;
    
    // Entropy formula: log2(charset size) * password length
    return Math.log2(charsetSize) * pass.length;
  };

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      
      // Or use the modern API
      navigator.clipboard.writeText(password).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        // Track password copy
        trackToolUsage('PasswordGenerator', 'copy_password', {
          passwordStrength: passwordStrength
        });
      });
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      case 'very-strong': return 'bg-green-700';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak';
      case 'medium': return 'Medium';
      case 'strong': return 'Strong';
      case 'very-strong': return 'Very Strong';
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Password
          </label>
          <div className="relative">
            <input
              ref={passwordRef}
              type="text"
              readOnly
              value={password}
              className="w-full py-2 pl-3 pr-14 border border-gray-300 rounded-md font-mono text-base focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
              aria-label="Copy password"
            >
              {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-grow bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${getStrengthColor()}`} style={{ width: `${(options.length / 30) * 100}%` }}></div>
            </div>
            <span className="text-xs font-medium text-gray-700">{getStrengthText()}</span>
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={generatePassword}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Generate New Password
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length: {options.length}
          </label>
          <input
            type="range"
            min="8"
            max="30"
            value={options.length}
            onChange={(e) => handleOptionChange('length', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8</span>
            <span>16</span>
            <span>24</span>
            <span>30</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="uppercase"
              checked={options.uppercase}
              onChange={(e) => handleOptionChange('uppercase', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="uppercase" className="ml-2 block text-sm text-gray-700">
              Include Uppercase Letters
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowercase"
              checked={options.lowercase}
              onChange={(e) => handleOptionChange('lowercase', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="lowercase" className="ml-2 block text-sm text-gray-700">
              Include Lowercase Letters
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="numbers"
              checked={options.numbers}
              onChange={(e) => handleOptionChange('numbers', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="numbers" className="ml-2 block text-sm text-gray-700">
              Include Numbers
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="symbols"
              checked={options.symbols}
              onChange={(e) => handleOptionChange('symbols', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="symbols" className="ml-2 block text-sm text-gray-700">
              Include Symbols
            </label>
          </div>
          
          <div className="flex items-center md:col-span-2">
            <input
              type="checkbox"
              id="ambiguous"
              checked={options.ambiguous}
              onChange={(e) => handleOptionChange('ambiguous', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="ambiguous" className="ml-2 block text-sm text-gray-700">
              Include Ambiguous Characters (I, l, O, 0, 1)
            </label>
          </div>
        </div>
        
        {passwordHistory.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Passwords</h3>
            <div className="border border-gray-200 rounded-md divide-y divide-gray-200 max-h-48 overflow-y-auto">
              {passwordHistory.map((pass, index) => (
                <div key={index} className="p-2 flex justify-between items-center hover:bg-gray-50">
                  <span className="font-mono text-sm truncate">{pass}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(pass);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                      
                      // Track history password copy
                      trackToolUsage('PasswordGenerator', 'copy_history_password');
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}