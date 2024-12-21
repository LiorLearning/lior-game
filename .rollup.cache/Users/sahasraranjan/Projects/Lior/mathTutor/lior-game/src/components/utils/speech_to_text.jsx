import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MicAnimation from './mic-animation';
const SpeechToText = ({ onRecordingStart, onRecordingStop }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    // Supported MIME types in order of preference
    const SUPPORTED_MIME_TYPES = [
        'audio/webm',
        'audio/mp4',
        'audio/mpeg',
        'audio/ogg',
        'audio/wav',
        'audio/x-wav'
    ];
    // Detect best MIME type with fallback
    const findSupportedMimeType = () => {
        for (const mimeType of SUPPORTED_MIME_TYPES) {
            if (MediaRecorder.isTypeSupported(mimeType)) {
                return mimeType;
            }
        }
        return 'audio/webm'; // Fallback
    };
    // Check device and browser compatibility
    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setIsSupported(false);
        }
    }, []);
    const startRecording = async () => {
        if (!isSupported) {
            alert('Audio recording is not supported on this device.');
            return;
        }
        try {
            let constraints = {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100,
                },
                video: false
            };
            let stream;
            try {
                // Try with the specified constraints
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                streamRef.current = stream;
            }
            catch (error) {
                console.warn('Failed with advanced constraints, trying simpler constraints:', error);
                // Fallback to simpler constraints
                constraints = {
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: false,
                        autoGainControl: false,
                        sampleRate: 16000,
                    },
                    video: false
                };
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                streamRef.current = stream;
            }
            const mimeType = findSupportedMimeType();
            // Try higher bitrate first, then fallback if issues are detected
            const tryRecording = (bitrate) => {
                try {
                    mediaRecorderRef.current = new MediaRecorder(stream, {
                        mimeType: mimeType,
                        audioBitsPerSecond: bitrate
                    });
                    return true;
                }
                catch (e) {
                    console.warn(`Failed to start recording with bitrate ${bitrate}:`, e);
                    return false;
                }
            };
            // Attempt to start recording with higher bitrate first
            const tryCount = 3;
            let workingBitRate = 256000;
            for (let i = 0; i < tryCount; i++) {
                if (tryRecording(workingBitRate)) {
                    break;
                }
                workingBitRate /= 2;
            }
            console.log(`Working bitrate: ${workingBitRate}`);
            // More conservative MediaRecorder configuration
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: mimeType,
                audioBitsPerSecond: workingBitRate // Lower bitrate for compatibility
            });
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            mediaRecorderRef.current.onerror = (event) => {
                console.error('MediaRecorder error:', event);
            };
            // Start recording with longer timeslice
            mediaRecorderRef.current.start(250);
            setIsRecording(true);
            onRecordingStart();
        }
        catch (err) {
            console.error('Microphone access error:', err);
            alert('Unable to access the microphone. Please check permissions and browser support.');
            setIsRecording(false);
        }
    };
    const stopRecording = (shouldSave) => {
        if (!isRecording || !mediaRecorderRef.current)
            return;
        try {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.onstop = () => {
                var _a;
                if (shouldSave && audioChunksRef.current.length > 0) {
                    const mimeType = ((_a = mediaRecorderRef.current) === null || _a === void 0 ? void 0 : _a.mimeType) || findSupportedMimeType();
                    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                    // Ensure blob has content before calling callback
                    if (audioBlob.size > 0) {
                        onRecordingStop(audioBlob);
                    }
                }
                // Clean up stream and tracks
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => {
                        var _a;
                        track.stop();
                        (_a = streamRef.current) === null || _a === void 0 ? void 0 : _a.removeTrack(track);
                    });
                }
                audioChunksRef.current = [];
            };
        }
        catch (err) {
            console.error('Recording stop error:', err);
            alert('Error stopping recording.');
        }
    };
    // Rest of the component remains the same as your original implementation
    return (<div className="relative flex flex-col items-center">
      {isSupported ? (<>
          <MicAnimation isRecording={isRecording}/>
          <div className="flex justify-center w-full space-x-2">
            <AnimatePresence mode="wait">
              {isRecording ? (<>
                  <motion.div key="cancel-recording" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="w-1/2">
                    <Button onClick={() => stopRecording(false)} className="w-full h-12 rounded-full flex items-center justify-center bg-destructive hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90" aria-label="Cancel recording">
                      <X className="w-6 h-6 text-destructive-foreground dark:text-destructive-foreground"/>
                    </Button>
                  </motion.div>
                  <motion.div key="stop-recording" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="w-1/2">
                    <Button onClick={() => stopRecording(true)} className="w-full h-12 rounded-full flex items-center justify-center bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90" aria-label="Stop recording">
                      <Send className="w-6 h-6 text-primary-foreground dark:text-primary-foreground"/>
                    </Button>
                  </motion.div>
                </>) : (<motion.div key="start-recording" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="w-full">
                  <Button onClick={startRecording} className="w-full h-12 rounded-full flex items-center justify-center bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90" aria-label="Start recording">
                    <Mic className="w-6 h-6 text-primary-foreground dark:text-primary-foreground"/>
                  </Button>
                </motion.div>)}
            </AnimatePresence>
          </div>
        </>) : (<div className="text-destructive">
          Audio recording is not supported on this device.
        </div>)}
    </div>);
};
export default SpeechToText;
//# sourceMappingURL=speech_to_text.jsx.map