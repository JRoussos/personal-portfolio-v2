import React from 'react'
import { Link } from 'react-router-dom'

import { useStore } from '../../contexts/store'
import './header-style.scss'

const Header = () => {
    const { socials } = useStore().state

    return (
        <header>
            <Link className="underline line-hover keep-line-on-mobile link-element" to="/contact">contact</Link>
            <div className="socials">
                {socials.map( profile => (
                    <React.Fragment key={profile.name}>
                        <span>|</span>
                        <a className="underline line-hover link-element" title={profile.title} target="_blank" rel="noopener noreferrer" href={profile.url}>{profile.name}</a>
                    </React.Fragment>
                ))}
            </div>
        </header>
    )
}

export default Header
