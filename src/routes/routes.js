import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Home from '../pages/home/home'
import Contact from '../pages/contact/contact'
import About from '../pages/about/about'
import Project from '../pages/project/project'

import SmoothScroll from '../utils/SmoothScroll'

import './routes-style.scss'

const Routes = ({ canvasReady }) => {
    const routerLocation = useLocation()

    const [currentLocation, setCurrentLocation] = useState(routerLocation)
    const [transitionState, setTransitionState] = useState("fadeIn")

    useEffect(() => {
        if (routerLocation !== currentLocation) setTransitionState("fadeOut")

    }, [routerLocation, currentLocation])

    const handleAnimationEnd = () => {
        if(transitionState === "fadeOut") {
            setTransitionState("fadeIn")
            setCurrentLocation(routerLocation)
        }
    }

    return (
        <SmoothScroll reload={[currentLocation, canvasReady]}>
            <div style={{ width: "min(80%, 1500px)" }} className={transitionState} onAnimationEnd={handleAnimationEnd}> {/** , maxWidth: Math.max(Math.min(width * 0.8, 1500), 1000) */}
                <Switch location={currentLocation} key={currentLocation.key}>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/contact" component={Contact}/>
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
