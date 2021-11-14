import React, { useState, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import Title from '../main/main'
import Contact from '../contact/contact'

import { isMobile } from 'react-device-detect'
import { mouseListeners } from '../../utils/mouse'

import './content-style.scss'

const Contents = () => {
    const routerLocation = useLocation()

    const [currentLocation, setCurrentLocation] = useState(routerLocation)
    const [transitionState, setTransitionState] = useState("fadeIn")

    useEffect(() => {
        if (routerLocation !== currentLocation) setTransitionState("fadeOut")
        
        isMobile || mouseListeners('add')
        return () => mouseListeners('remove')
    }, [routerLocation, currentLocation])


    const handleAnimationEnd = () => {
        if(transitionState === "fadeOut") {
            setTransitionState("fadeIn")
            setCurrentLocation(routerLocation)
        }
    }

    return (
        <main>
            <div style={{ width: "100%" }} className={transitionState} onAnimationEnd={handleAnimationEnd}>
                <Switch location={currentLocation} key={currentLocation.key}>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/" component={Title}/>
                </Switch>
            </div>
        </main>
    )
}

export default Contents
