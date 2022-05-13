import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import Topper from '../../components/topper/topper'
import Spotify from './components/spotify/spotify'
import Background from './components/background/background'

import { useStore } from '../../contexts/store' 

// import profile from '../../assets/imgs/profile-small-01.jpeg'
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
                        <h5 id="profile-header">Who Am I &ensp;[?]</h5>
                        <p>Dolore et pariatur sunt proident laboris officia consectetur. Occaecat sint reprehenderit adipisicing nostrud excepteur incididunt. Tempor enim nulla aute eiusmod aute labore cupidatat enim quis commodo eu fugiat consectetur Lorem. Proident commodo sunt sit mollit voluptate duis incididunt. Aliqua pariatur nulla excepteur officia exercitation amet do.</p>
                        <p>Duis labore ea dolore irure nostrud. Aliqua in pariatur nostrud qui occaecat deserunt fugiat nulla id ex. Proident fugiat pariatur reprehenderit esse et laborum do minim nulla occaecat est sit. Ex amet proident occaecat dolor incididunt officia anim dolor pariatur consequat proident cupidatat ad in.</p>
                    </div>
                    {/* <div className='image-container'>
                        <img src={profile} alt={'this is me btw'}/>
                        <div className='desc'>
                            <span>This is me by the way</span>
                        </div>
                    </div> */}
                    <div className='paragraph-wrapper'>
                        <h5>Hobbies</h5>
                        <p>Culpa ipsum nulla occaecat nostrud consequat consequat. Excepteur consequat tempor anim laborum sit amet. Labore aute sunt culpa qui minim quis aliquip sit. Occaecat nisi cupidatat veniam dolore qui nostrud officia laboris eu nulla velit.</p>
                        <p>Id do ex consequat commodo sit nostrud et ea. Cupidatat ex cupidatat elit sunt officia dolor amet amet Lorem nostrud. Mollit amet dolor culpa officia ad elit velit non deserunt adipisicing cillum eiusmod. Exercitation dolor in commodo et. Ea nostrud et pariatur ex fugiat aliqua tempor elit commodo.</p>
                        <Spotify/>
                    </div>
                </div>
            </div>
            <Background/>
        </Topper>
    )
}

export default About