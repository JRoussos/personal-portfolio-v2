import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Home from '../pages/home/home'
import Contact from '../pages/contact/contact'

import { isMobile } from 'react-device-detect'
import { mouseListeners } from '../utils/mouse'

import SmoothScroll from '../utils/SmoothScroll'
import useWindowSize from '../utils/useWindowSize'

import './routes-style.scss'

const Routes = ({ imagesLoadedState }) => {
    const routerLocation = useLocation()
    const { width } = useWindowSize()

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
        <SmoothScroll reload={[currentLocation, imagesLoadedState]}>
            <div style={{ width: "100%", maxWidth: Math.max(Math.min(width * 0.8, 1500), 1000) }} className={transitionState} onAnimationEnd={handleAnimationEnd}>
                <Switch location={currentLocation} key={currentLocation.key}>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route path="*">
                        <Redirect to="/"/>
                    </Route>
                </Switch>
            </div>
        </SmoothScroll>
    )
}

export default Routes
