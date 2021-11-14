import React from 'react'
import { useHistory } from 'react-router-dom'

import { useStore } from '../../contexts/store'
import './header-style.scss'

const Header = () => {
    const history = useHistory()
    const { socials } = useStore().state

    const handleContactClick = () => {
        if(history.location.pathname === '/contact') return
        history.push('/contact')
    }

    return (
        //  className="fadeIn" style={history.location.pathname !== '/' ? {display: 'none'} : {}}
        <header>
            <p className="underline line-hover keep-line-on-mobile link-element" onClick={handleContactClick}>contact</p> {/** className={history.location.pathname === '/contact' ? "active" : null} */}
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
