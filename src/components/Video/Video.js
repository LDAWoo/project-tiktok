import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Video({ src, className, isPlay, onEnded }, ref) {
    const videoRef = useRef();
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        if (isPlay) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isPlay]);


    useImperativeHandle(ref, () => ({
        play() {
            if (videoRef.current) {
                videoRef.current.play();
            }
        },
        pause() {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        },
        toggleVolume(isVolume) {
            if (videoRef.current) {
                videoRef.current.muted = setIsMuted(isVolume);
            }
        },
        volume(volumeValue) {
            videoRef.current.volume = volumeValue
        }
    }));

    return (
        <video ref={videoRef} src={src} className={className} muted={isMuted} onEnded={onEnded} />

    );
}

export default forwardRef(Video);
