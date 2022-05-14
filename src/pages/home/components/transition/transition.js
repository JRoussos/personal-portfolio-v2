import React, { useEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import { gsap } from 'gsap'

import './transition_style.scss'

const Transition = () => {
    const pathRef = useRef()
    
    useEffect(() => {
        const handleClick = () => {
            gsap.timeline()
                .to(pathRef.current, { duration: 0.8, attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" }, ease: 'power2.in'})
                .to(pathRef.current, { duration: 0.4, attr: { d: "M 0 100 V 0  Q 50 0 100 0  V 100 z" }, ease: 'power2.out'})
                .to(pathRef.current, { duration: 1.2, attr: { fill: '#e7e1e1'}}, '-=1.2')
        }

        window.addEventListener('dblclick', handleClick)
    }, [])

    return ReactDom.createPortal(
      <div className='transition'>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path ref={pathRef} d="M 0 100 V 100 Q 50 100 100 100 V 100 z" fill='#121212'/>
            </svg>
      </div>, document.body
    )
}

export default Transition