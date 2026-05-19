import { useEffect, useRef, useState } from 'react';

const POSTER = '/images/hero-construction.jpg';
const MP4 = '/videos/hero.mp4';

export default function HeroVideo() {
    const videoRef = useRef(null);
    const [showPosterOnly, setShowPosterOnly] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || showPosterOnly) return;

        const play = () => {
            video.play().catch(() => {});
        };

        play();
        video.addEventListener('loadeddata', play);
        return () => video.removeEventListener('loadeddata', play);
    }, [showPosterOnly]);

    return (
        <div className="absolute inset-0 -z-10 min-h-full w-full">
            {showPosterOnly ? (
                <img
                    src={POSTER}
                    alt=""
                    aria-hidden="true"
                    className="h-full min-h-[85vh] w-full object-cover"
                />
            ) : (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={POSTER}
                    aria-hidden="true"
                    onError={() => setShowPosterOnly(true)}
                    className="h-full min-h-[85vh] w-full object-cover"
                >
                    <source src={MP4} type="video/mp4" />
                </video>
            )}
            <div className="absolute inset-0 bg-[#1f2733]/80" aria-hidden="true" />
            <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(31,39,51,0.6) 100%)',
                }}
            />
        </div>
    );
}
