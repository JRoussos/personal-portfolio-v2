import React, { useEffect, useRef, useCallback } from "react";
import useWindowSize from "./useWindowSize";

const parent_style = {
    position: 'fixed',
    overflow: 'hidden',
    top: 0, 
    left: 0,
    width: '100%',
    height: '100%'
}

const config = {
    velocity: 0.08,
    current: 0,
    previous: 0,
    requestScrollEvent: 0
}

export const getScrollValue = () => {
    return config.previous
}

const SmoothScroll = ({ children }) => {
    const SCROLL_ID  = useRef(null)

    const scrollableContainerRef = useRef();
    const size = useWindowSize();
    
    const setScrollerHeight = () => {
        document.body.style.height = `${scrollableContainerRef.current.getBoundingClientRect().height}px`
    }

    const smoothScrollingHandler = useCallback( () => {
        config.current = window.scrollY
        config.previous += (config.current - config.previous) * config.velocity

        if (Math.abs(config.current - config.previous) < 0.05) {
            config.previous = config.current
            config.requestScrollEvent = 0
        }

        scrollableContainerRef.current.style.transform = `translate3d(0, -${config.previous}px, 0)`

        SCROLL_ID.current = config.requestScrollEvent > 0 ? requestAnimationFrame(smoothScrollingHandler) : null
    }, [SCROLL_ID])
    
    const scrollHandler = useCallback(() => {
        config.requestScrollEvent++;
        if (!SCROLL_ID.current) SCROLL_ID.current = requestAnimationFrame(smoothScrollingHandler)
    }, [SCROLL_ID, smoothScrollingHandler])
    
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
    }, [scrollHandler]);

    useEffect(() => {
        setScrollerHeight();
    }, [size.height])

    return (
        <div style={parent_style}>
           <main id="scrollableContainer" ref={scrollableContainerRef}>{children}</main>
        </div>
    )
}

export default SmoothScroll;
