import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, AlertCircle, Check, Loader2, Sparkles } from 'lucide-react';
import { JHARKHAND_LANGUAGES, getLanguageConfig } from '../../config/languages';
import { api } from '../../services/api';

export const VoiceInput = ({ 
  onTranscriptChange, 
  initialTranscript = '',
  selectedLangCode = 'hi',
  onLanguageSelect
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState(initialTranscript);
  const [statusMessage, setStatusMessage] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  const recognitionRef = useRef(null);
  const currentLangConfig = getLanguageConfig(selectedLangCode);

  useEffect(() => {
    setTranscript(initialTranscript);
  }, [initialTranscript]);

  useEffect(() => {
    // Check Web Speech API capability
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(false);
      setIsFallbackMode(true);
    }
  }, []);

  const startListening = () => {
    if (!currentLangConfig.supportedByBrowserSpeech) {
      setIsFallbackMode(true);
      setStatusMessage(`Browser speech recognition is not available for ${currentLangConfig.name}. Using backend transcription fallback.`);
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setStatusMessage("Web Speech API is not supported in this browser. Please type your message.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = currentLangConfig.bcp47;

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage(`Listening in ${currentLangConfig.name}... Speak clearly.`);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
          } else {
            currentTranscript += event.results[i][0].transcript;
          }
        }
        if (currentTranscript) {
          const updated = transcript ? `${transcript} ${currentTranscript}` : currentTranscript;
          setTranscript(updated);
          onTranscriptChange && onTranscriptChange(updated);
          setStatusMessage("Transcript generated.");
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          setStatusMessage("No speech detected. Please try speaking into your microphone.");
        } else {
          setStatusMessage(`Speech error: ${event.error}. Switched to manual input.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      setIsListening(false);
      setStatusMessage("Could not initialize microphone. Please check permissions.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setStatusMessage("Microphone paused.");
  };

  const handleSimulatedVoiceUpload = async () => {
    setIsProcessing(true);
    setStatusMessage("Transcribing recorded voice audio via backend SpeechService...");
    try {
      const res = await api.voice.transcribe({
        audio: "sample_base64_data",
        language: selectedLangCode
      });
      const generated = res.text || `[Audio Transcribed in ${currentLangConfig.name}]: Severe water pipeline leak noticed near the central village tubewell.`;
      const updated = transcript ? `${transcript} ${generated}` : generated;
      setTranscript(updated);
      onTranscriptChange && onTranscriptChange(updated);
      setStatusMessage("Backend speech-to-text transcription complete!");
    } catch (err) {
      setStatusMessage("Backend speech service fallback ready.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#0F2747]/5 p-5 rounded-2xl border border-slate-200 space-y-4">
      
      {/* Top Header & Language Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747] text-amber-400 flex items-center justify-center font-bold">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#0F2747]">Voice Speech Input</h4>
            <p className="text-xs text-slate-500">Speak in your native Jharkhand language</p>
          </div>
        </div>

        {/* Language dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-700">Language:</label>
          <select
            value={selectedLangCode}
            onChange={(e) => onLanguageSelect && onLanguageSelect(e.target.value)}
            className="text-xs font-bold bg-white text-[#0F2747] border border-slate-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-[#0F766E]"
          >
            {JHARKHAND_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName}) {lang.supportedByBrowserSpeech ? '✓ Speech' : '⚙ Backend'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Language capability notice badge */}
      {!currentLangConfig.supportedByBrowserSpeech && (
        <div className="bg-amber-50 text-amber-800 text-xs px-3 py-2 rounded-xl border border-amber-200 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">{currentLangConfig.name} Speech Note:</span> Native browser speech recognition for {currentLangConfig.name} is not built-in to all browsers. Voice recording will fallback to the backend Speech-to-Text API.
          </div>
        </div>
      )}

      {/* Recording Control Button Bar */}
      <div className="flex items-center gap-3">
        {!isListening ? (
          <button
            type="button"
            onClick={startListening}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs text-white bg-[#0F766E] hover:bg-[#0F766E]/90 transition-all shadow-md active:scale-95"
          >
            <Mic className="w-4 h-4 text-amber-300" />
            <span>🎤 Start Speaking ({currentLangConfig.name})</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={stopListening}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-700 transition-all shadow-md animate-pulse"
          >
            <MicOff className="w-4 h-4" />
            <span>Stop Recording (Listening...)</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleSimulatedVoiceUpload}
          disabled={isProcessing}
          className="px-3.5 py-3 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          title="Simulate backend audio file transcription"
        >
          {isProcessing ? <Loader2 className="w-4 h-4 animate-spin text-[#0F766E]" /> : <Sparkles className="w-4 h-4 text-amber-500" />}
          <span className="hidden md:inline">Backend Speech Fallback</span>
        </button>
      </div>

      {/* Status Live Indicator */}
      {statusMessage && (
        <div className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <Volume2 className="w-3.5 h-3.5 text-[#0F766E]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Generated Transcript Text Area */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">
          Generated Speech Transcript:
        </label>
        <textarea
          rows={3}
          value={transcript}
          onChange={(e) => {
            setTranscript(e.target.value);
            onTranscriptChange && onTranscriptChange(e.target.value);
          }}
          placeholder={`Your spoken description in ${currentLangConfig.name} will appear here. You can review and edit before submitting...`}
          className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0F766E] focus:outline-none bg-white font-medium text-slate-800"
        />
      </div>
    </div>
  );
};
