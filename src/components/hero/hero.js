import React from 'react'
import './hero-style.scss'

const Hero = () => {
    return (
        <React.Fragment>
            <div className="hero">
                <div className="center">
                    <h1>JOHN ROUSSOS</h1>
                    <p className="subtitle">I'm a front end developer - most of the time</p>
                </div>
                <div className="top-right">
                    <p>contact</p>
                    <div className="socials">
                        <span>|</span> <p>tw</p> <span>|</span> <p>ig</p> <span>|</span> <p>fb</p> 
                    </div>
                </div>
                <div className="bottom-right">
                    <p>scroll</p>
                    <div className="scroll-bar"/>
                </div>
                <div className="bottom-left">
                    <div id="also">
                        <p>also I enjoy exploring and learing new stuff, working out and drinking coffe</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Hero
