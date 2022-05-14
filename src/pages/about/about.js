import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import Topper from '../../components/topper/topper'
import Spotify from './components/spotify/spotify'
import Background from './components/background/background'

import { useStore } from '../../contexts/store' 

import profile from '../../assets/imgs/profile-small-01.jpeg'
import './about-style.scss'

const Email = ({ mail }) => {
    const [ useDefault, setDefault ] = useState(false)
    const pRef = useRef()

    const handleMailClick = () => {
        navigator.clipboard.writeText(mail)
            .then(() => pRef.current.innerText = 'Mail copied')
            .catch(() => setDefault(true))
    }

    return isMobile || useDefault ? 
        <a className='mail-container' href={`mailto:${mail}`}>{mail}</a> :
        <div className='mail-container' onClick={handleMailClick} onTransitionEnd={() => {pRef.current.innerText = 'Copy mail?'}}>
            <div>
                <p>Email</p>
                <p ref={pRef}>Copy mail?</p>
            </div>
        </div>
}

const About = () => {
    const { socials, email } = useStore().state

    return (
        <Topper>
            <div className='about'>
                <div className='title-wrapper'>
                    <h1>About</h1>
                    <Link to={'/'}>GO BACK</Link>
                </div>
                <div className='grid'>
                    <div className='paragraph-wrapper'>
                        <h5>Contact</h5>
                        <div className='contact-wrapper'>
                            <Email mail={email}/>
                            <div className='socials'>
                                {socials.map( profile => (
                                    <div key={profile.name} className='social-container'>
                                        <p>
                                            <a title={profile.title} target="_blank" rel="noopener noreferrer" href={profile.url}>{profile.title}</a>
                                            <a title={profile.title} target="_blank" rel="noopener noreferrer" href={profile.url}>{profile.title}</a>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='paragraph-wrapper'>
                        <h5 id="profile-header" className={!isMobile ? 'question' : ''}>Who Am I</h5>
                        <p>I'm a Greek fron-end developer. I was born and raised on a small Cycladic island called Syros. Currently studying at the University of Thessaly at the department of computer science and telecommunications.</p>
                        <p>I have always loved programming and creating cool stuff through code. I started web development almost {new Date().getFullYear() - 2018} years ago and since then I have learned so much, went from basic static sites, to animating the web with React JS, to WebGL and 3D effects. But still I know that they are always more to learn and I couldn't be more excited about it.</p>
                    </div>
                    {isMobile && <div className='image-container'>
                        <img src={profile} alt={'this is me btw'}/>
                        <div className='desc'>
                            <span>This is me by the way</span>
                        </div>
                    </div>}
                    <div className='paragraph-wrapper'>
                        <h5>Hobbies</h5>
                        <p>I am a pretty chill guy. I like going to the gym and the whole fit lifestyle, being in nature, going on adventures like climbing mountains, getting lost in a newly visited place. I'm realy intersted in space, stuff like wormholes, black holes and super novas, I have a natural curiosity in finding out how things work.</p>
                        <p>Music is a big part of my daily life, I love rock, folk, indie pop, blues, jazz, 60s, 70s.. and the list goes on. I do believe that music can have a huge impact on someones mood and you can learn a lot by listening to someones playlist, so take a peak at mine.</p>
                        <Spotify/>
                    </div>
                </div>
            </div>
            {!isMobile && <Background/>}
        </Topper>
    )
}

export default About