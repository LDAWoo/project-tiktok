import { useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from './HomeVideo.module.scss'
import Button from "@/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faMusic, faPause, faPlay, faShare, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import Video from "@/components/Video";

const cx = classNames.bind(styles);
const volumeBottom = 5
const _volumePosition = 20

function HomeVideo({ data }) {
    const videoRef = useRef()
    const contentRef = useRef(null);
    const volumeControlRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true)
    const [isVolume, setIsVolume] = useState(true)
    const [visibleVideoId, setVisibleVideoId] = useState(true)
    const [volumePosition, setVolumePosition] = useState(_volumePosition)
    const [volumeHeight, setVolumeHeight] = useState(0)
    const [isDragging, setIsDragging] = useState(false)


    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const contentElement = contentRef.current;
        const rect = contentElement.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= windowHeight;

        if (isInView) {
            setVisibleVideoId(isInView)
        } else {
            setVisibleVideoId(isInView)
        }
    }


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const handlePlay = () => {
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleVolume = () => {
        if (isVolume) {
            videoRef.current.toggleVolume(isVolume)
        } else {
            videoRef.current.toggleVolume(isVolume)
        }
        setIsVolume(!isVolume)
    }

    const handleVideoEnded = () => {
        videoRef.current.play()
    }

    const handleVolumeDragStart = () => {
        setIsDragging(true)
    }

    const handleVolumeDragEnd = () => {
        setIsDragging(false)
    }

    const handleVolumeClick = (event) => {
        handleVolumeDrag(event)
    }

    useEffect(() => {
        const handleMouseMove = (event) => {
            handleVolumeDrag(event)
        }

        const handleMouseUp = () => {
            handleVolumeDragEnd()
        }

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

    }, [isDragging])

    useEffect(() => {
        if (isVolume) {
            setVolumeHeight(20)
            setVolumePosition(20)
            setVolumeCurrent(0.5)
        } else {
            setVolumeHeight(volumeBottom)
            setVolumePosition(volumeBottom)
            setVolumeCurrent(0)
        }

    }, [isVolume])

    const setVolumeCurrent = (volume) => {
        videoRef.current.volume(volume);
    }

    const handleVolumeDrag = (event) => {
        const volumeControlElement = volumeControlRef.current
        const thumbHeight = volumeControlElement.offsetHeight;
        const offsetY = event.clientY - volumeControlElement.getBoundingClientRect().top;
        let newPosition = Math.floor(thumbHeight - offsetY);

        if (newPosition <= volumeBottom) {
            newPosition = volumeBottom;
        } else if (newPosition >= thumbHeight) {
            newPosition = thumbHeight
        }

        setVolumeHeight(newPosition)
        setVolumePosition(newPosition)

        if (newPosition === volumeBottom) {
            newPosition = 0
            setIsVolume(false)
        } else {
            setIsVolume(true)
        }

        const volumeValue = newPosition / thumbHeight;
        setVolumeCurrent(volumeValue);

    }

    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={data.user.avatar}
                alt={data.user.nickname} />

            <div className={cx('header')}>
                <div className={cx('header-info')}>
                    <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                    <h4 className={cx('name')}>{data.user.first_name} {data.user.last_name}</h4>
                </div>
                <div className={cx('title')}>
                    <span>{data.user.bio}</span>
                </div>

                <div className={cx('mucsic-tiktok')}>
                    <h4>
                        <a href="https://www.tiktok.com/@hphuoc2003" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faMusic} />
                            <span className={cx('mucsic')}>{data.music}</span>
                        </a>
                    </h4>
                </div>


                <div className={cx('content')} ref={contentRef}>
                    <div className={cx('video-wrapper')}>
                        <Video src={data.file_url} className={cx('video')} ref={videoRef} isPlay={visibleVideoId} onEnded={handleVideoEnded} />

                        <div className={cx('volumeControl')}

                        >
                            <div className={cx('slider-runnable-track')}
                                onClick={handleVolumeClick}
                                ref={volumeControlRef}
                            >
                            </div>

                            <div className={cx('slider-up')}
                                onClick={handleVolumeClick}
                                style={{ height: volumeHeight + 'px' }}>

                            </div>

                            <div className={cx('slider-thumb')}
                                onMouseDown={handleVolumeDragStart}
                                style={{ bottom: volumePosition + 'px' }} ></div>

                        </div>

                        <div className={cx('action-play')}>
                            < FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={handlePlay} className={cx('action-btn')} />
                        </div>
                        <div className={cx('action-volume')}>
                            <FontAwesomeIcon icon={isVolume ? faVolumeHigh : faVolumeXmark} onClick={handleVolume} className={cx('action-btn')} />
                        </div>

                    </div>
                    <div className={cx('tiktok-btn')}>
                        <div className={cx('heart-btn')}>

                            <div className={cx('outline-btn')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('icon-btn')} />
                            </div>
                            <strong className={cx('title-btn')}>{data.likes_count}</strong>
                        </div>

                        <div className={cx('comment-btn')}>

                            <div className={cx('outline-btn')}>
                                <FontAwesomeIcon icon={faComment} className={cx('icon-btn')} />
                            </div>
                            <strong className={cx('title-btn')}>{data.comments_count}</strong>
                        </div>

                        <div className={cx('save-btn')}>

                            <div className={cx('outline-btn')}>
                                <FontAwesomeIcon icon={faComment} className={cx('icon-btn')} />
                            </div>
                            <strong className={cx('title-btn')}>{data.views_count}</strong>
                        </div>

                        <div className={cx('share-btn')}>

                            <div className={cx('outline-btn')}>
                                <FontAwesomeIcon icon={faShare} className={cx('icon-btn')} />
                            </div>
                            <strong className={cx('title-btn')}>{data.shares_count}</strong>
                        </div>

                    </div>
                </div>


                <Button className={cx('follow-btn')} outline small>Follow</Button>
            </div>
        </div>
    );
}

export default HomeVideo;