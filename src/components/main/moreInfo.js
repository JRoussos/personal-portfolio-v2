import React, { useEffect, useCallback, useRef } from 'react'
import { gsap } from 'gsap'

import spotify_logo from '../../assets/imgs/spotify-white.png'
import github_logo from '../../assets/imgs/github.png'

const MoreInfo = ({ repositories, track, isPlaying, setIsPlaying }) => {
    const audioRef      = useRef()
    const timeoutRef    = useRef()
    const infoTitleRef  = useRef()

    const getTimeLeft = useCallback(() => {
        let timeLeft = audioRef.current.duration - audioRef.current.currentTime
        return timeLeft < 1 ? timeLeft : 1
    }, [audioRef])

    const setTimedFadeOut = () => {
        timeoutRef.current = setTimeout(() => {
            gsap.to(audioRef.current, {id: 'outFade', duration: getTimeLeft(), volume: 0, onComplete: () => {
                audioRef.current.currentTime = audioRef.current.duration
            }})
        }, (audioRef.current.duration - getTimeLeft()) * 1000)
    }

    const clearPlayBtn = () => {
        gsap.to('#play-btn > div', { duration: 0.4, y: `${isPlaying ? 0 : -17}` })
        setIsPlaying(state => !state)
        // infoTitleRef.current.classList.toggle('marquee', false)
    }

    const handlePlayBtn = () => {
        if(isPlaying && !audioRef.current.paused) {
            clearTimeout(timeoutRef.current)

            gsap.getById('inFade')?.kill()
            gsap.to(audioRef.current, {id: 'outFade', duration: getTimeLeft(), volume: 0, onComplete: () => {
                audioRef.current.currentTime = audioRef.current.duration
            }})
        }else {
            audioRef.current.currentTime = 0
            audioRef.current.volume = 0.5
            audioRef.current.play()

            gsap.getById('outFade')?.kill()
            gsap.from(audioRef.current, {id: 'inFade', duration: 2, volume: 0})

            setTimedFadeOut()
        }

        clearPlayBtn()
    }

    const handleOnPlay = () => {
        if(isPlaying) return
        
        clearPlayBtn()
        setTimedFadeOut()
    }

    const handleOnPause = () => {
        if(!isPlaying) return

        clearTimeout(timeoutRef.current)
        audioRef.current.currentTime = 0
        clearPlayBtn()
    }

    useEffect(() => {
        if (!infoTitleRef.current || track.loading) return

        const parentWidth = infoTitleRef.current.parentElement.clientWidth
        const textWidth = infoTitleRef.current.clientWidth

        if(textWidth > parentWidth) {
            infoTitleRef.current.innerText += infoTitleRef.current.innerText
            infoTitleRef.current.classList.toggle('marquee', true)
        }

        return () => clearTimeout(timeoutRef.current)
    }, [track, infoTitleRef])

    return (
        <div id="more-info">
            <div className="sg-wrapper">
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none">
                    <path d="M19.2812 14.0938L25.75 20.1562L18.5312 25.0938L14.5 17.2812L10.4688 25.0312L3.21875 20.1562L9.6875 14.0938L0.90625 13.25L3.75 5.25L11.5938 8.96875L9.75 0.1875H19.2188L17.375 8.96875L25.25 5.25L28.0625 13.25L19.2812 14.0938Z" fill="white" fillOpacity="0.8"/>
                </svg>
                <div className="info-wrapper">
                    <p className="also">Also I enjoy exploring and learing new stuff, working out and I love coffee</p>
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="sg-wrapper">
                    <img src={spotify_logo} alt="spotify logo" width="24px" height="24px" />
                    <div className="info-wrapper">
                        <p>Some music I like from Spotify: <br />
                            <span ref={infoTitleRef} className="info-title">
                                {track.loading ? 'loading..' : track.error || `${track.artists.map(e => e.name).join(', ')} - ${track.name}\xa0\xa0\xa0\xa0`}
                            </span>
                        </p>
                        <audio ref={audioRef} autoPlay={false} controls={false}
                            src={track.loading ? null : track.preview_url} crossOrigin="anonymous"
                            onPlay={handleOnPlay}
                            onPause={handleOnPause}
                        />
                        <div className={track.error ? "link-wrapper error" : "link-wrapper"}>
                            <a className="link-element" target="_blank" rel="noopener noreferrer" href={track.loading ? "/" : track.external_urls.spotify}>link</a>
                            <div id="play-btn" onClick={track.loading ? null : handlePlayBtn}>
                                <div>
                                    <span className="link-element">play</span>
                                    <span className="link-element">stop</span>
                                </div>
                            </div>
                            <div className="audio-animation">
                                <span className={isPlaying ? "audio-bar playing" : "audio-bar"}></span>
                                <span className={isPlaying ? "audio-bar playing" : "audio-bar"}></span>
                                <span className={isPlaying ? "audio-bar playing" : "audio-bar"}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sg-wrapper">
                    <img src={github_logo} alt="github logo" width="24px" height="24px" />
                    <div className="info-wrapper">
                        <p>My lastest update on GitHub: <br />
                            <span className="info-title" >{repositories.loading ? 'loading..' : repositories.error || repositories.name}</span>
                        </p>
                        <div className={repositories.error ? "link-wrapper error" : "link-wrapper"}>
                            <a className="link-element" target="_blank" rel="noopener noreferrer" href={repositories.loading ? '/' : repositories.html_url}>link</a>
                            <a className="link-element" target="_blank" rel="noopener noreferrer" href='https://github.com/JRoussos'>more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreInfo
