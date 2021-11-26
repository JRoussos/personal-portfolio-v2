import React, { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

import { useStore } from '../../contexts/store'
import useWindowSize from '../../utils/useWindowSize'
import './contact-style.scss'

const Contact = () => {
    const { height } = useWindowSize()

    const { socials, email } = useStore().state
    const contactRef = useRef()

    useLayoutEffect(() => {
        contactRef.current.style.height = `${height}px`
    },[height])

    const github = { name: 'gh', title: 'GitHub', url: 'https://github.com/JRoussos' }

    return (
        <div ref={contactRef} className="contact">
            <Link className="back-btn underline line-hover keep-line-on-mobile link-element" to="/">Go Back</Link>
            <div className="mail_container">
                <p>Find me anywhere.<br/> Talk to me about anything.</p>
                <a id="send_mail" className="underline link-element" href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="social">
                {[github, ...socials].map( profile => (
                    <React.Fragment key={profile.name}>
                        <span>|</span>
                        <a className="underline line-hover link-element" title={profile.title} target="_blank" rel="noopener noreferrer" href={profile.url}>{profile.name}</a>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default Contact
