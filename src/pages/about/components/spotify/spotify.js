import React, { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'

import './spotify-style.scss'

const Spotify = () => {
    const [ playingStatus, updatePlayingStatus ] = useState(false)
    const [ playlist, updatePlaylist ] = useState({})

    const audioRef    = useRef()
    const titleRef    = useRef()
    const durationRef = useRef()

    const timeoutRef  = useRef()
    const intervalRef = useRef()

    const getTimeLeft = useCallback(() => {
        let timeLeft = audioRef.current.duration - audioRef.current.currentTime
        return timeLeft < 1 ? timeLeft : 1
    }, [audioRef])

    const setFadeOutTimer = () => {
        timeoutRef.current = setTimeout(() => {
            gsap.to(audioRef.current, {id: 'fade_out', duration: getTimeLeft(), volume: 0, onComplete: () => {
                audioRef.current.currentTime = audioRef.current.duration
            }})
        }, (audioRef.current.duration - getTimeLeft()) * 1000)
    }

    const setDurationCounter = () => {        
        intervalRef.current = setInterval(() => {
            const dur = Math.round((audioRef.current.duration - audioRef.current.currentTime))
            durationRef.current.innerText = (dur/100).toFixed(2).toString().replace('.', ':')
        }, 999)
    }

    const clearPlayBtn = () => {
        gsap.to('#play-btn > div', { duration: 0.4, y: `${playingStatus ? 0 : -15}` })
        updatePlayingStatus(status => !status)
    }

    const handlePlayBtn = () => {
        if(playingStatus && !audioRef.current.paused) {
            clearTimeout(timeoutRef.current)
            clearInterval(intervalRef.current)

            durationRef.current.innerText = '0:30'

            gsap.getById('fade_in')?.kill()
            gsap.to(audioRef.current, {id: 'fade_out', duration: getTimeLeft(), volume: 0, onComplete: () => {
                audioRef.current.currentTime = audioRef.current.duration
            }})
        }else {
            audioRef.current.currentTime = 0 
            audioRef.current.volume = 0.5
            
            audioRef.current.play()

            gsap.getById('fade_out')?.kill()
            gsap.from(audioRef.current, {id: 'fade_in', duration: 2, volume: 0})

            setFadeOutTimer()
            setDurationCounter()
        }
    
        clearPlayBtn()
    }

    const handleOnPlay = () => {
        if(playingStatus) return
        
        clearPlayBtn()
        setFadeOutTimer()
        setDurationCounter()
    }

    const handleOnPause = () => {
        if(!playingStatus) return

        audioRef.current.currentTime = 0
        durationRef.current.innerText = '0:30'

        clearTimeout(timeoutRef.current)
        clearInterval(intervalRef.current)
        
        clearPlayBtn()
    }

    /**
     *  Fetch data from server
     */
    useEffect(() => {
        const areCookiesEnabled = navigator.cookieEnabled
    
        const restoredPlaylist = areCookiesEnabled ? JSON.parse(sessionStorage.getItem('playlist')) ?? [] : []
        const url = "https://spotify-proxy-server.herokuapp.com/api?playlist_name=in%20peace"

        if( restoredPlaylist && Object.keys(restoredPlaylist).length ) updatePlaylist(restoredPlaylist)
        else {
            fetch(url)
                .then(res => res.json())
                .then(data => {    
                    areCookiesEnabled && sessionStorage.setItem('playlist', JSON.stringify(data))
                    updatePlaylist(data)
                    console.log(data);
                })
                .catch( error => {
                    console.warn("Fetch Repositories Error: ", error)
                })
        }

    }, [])

    /**
     *  When data are loaded
     */
    useEffect(() => {
        if(Object.keys(playlist).length > 0) {
            titleRef.current.innerText = `${playlist.artists.map(e => e.name).join(', ')} - ${playlist.name}`
            durationRef.current.innerText = '0:30'
        }

    }, [playlist])

    return (
        <div className='spotify-container'>
            <div className="info-wrapper">
                <p ref={titleRef} className="info-title ">Loading...</p>
                <a target="_blank" rel="noopener noreferrer" href={playlist?.external_urls?.spotify}>
                    <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
                        <path d="M40.7988 5.97753H2.43625V0.330078H50.4396V48.3334H44.7921V9.97088L4.43293 50.3301L0.439575 46.3367L40.7988 5.97753Z" fill="white" fillOpacity="0.8"/>
                    </svg>
                </a>
            </div>
            <audio ref={audioRef} autoPlay={false} controls={false} src={playlist?.preview_url} crossOrigin="anonymous"
                onPlay={handleOnPlay}
                onPause={handleOnPause}
            ></audio>
            <div className='audio-controls'>
                <button id="play-btn" onClick={handlePlayBtn}>
                    <div>
                        <span className="link-element">PLAY</span>
                        <span className="link-element">STOP</span>
                    </div>
                </button>
                <span ref={durationRef}>0:00</span>
            </div>
        </div>
    )
}

export default Spotify