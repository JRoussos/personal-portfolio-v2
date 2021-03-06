import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

import Home from '../pages/home/home'
import About from '../pages/about/about'
import Project from '../pages/project/project'

import SmoothScroll from '../utils/SmoothScroll'

import './routes-style.scss'

const Routes = ({ canvasReady }) => {
    const routerLocation = useLocation()

    const [currentLocation, setCurrentLocation] = useState(routerLocation)
    const [transitionState, setTransitionState] = useState("fadeIn")

    useEffect(() => {
        if (routerLocation !== currentLocation) {
            setTransitionState("fadeOut")
            gsap.to('#canvas-container', {duration: 1, opacity: 0, ease: 'sine.inOut'})
        }

    }, [routerLocation, currentLocation])

    const handleAnimationEnd = () => {
        if(transitionState === "fadeOut") {
            setTransitionState("fadeIn")
            setCurrentLocation(routerLocation)
        }
    }

    return (
        <SmoothScroll reload={[currentLocation, canvasReady]}>
            <div style={{ width: "min(90%, 1500px)" }} className={transitionState} onAnimationEnd={handleAnimationEnd}>
                <Switch location={currentLocation} key={currentLocation.key}>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/project/:id" component={Project}/>
                    <Route path="*">
                        <Redirect to="/"/>
                    </Route>
                </Switch>
            </div>
        </SmoothScroll>
    )
}

export default Routes
