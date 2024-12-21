import React from 'react';
interface SpeechToTextProps {
    onRecordingStart: () => void;
    onRecordingStop: (blob: Blob) => void;
}
declare const SpeechToText: React.FC<SpeechToTextProps>;
export default SpeechToText;
