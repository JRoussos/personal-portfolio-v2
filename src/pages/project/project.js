import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import Marquee from '../../components/marquee/marquee'
import Topper from '../../components/topper/topper'

import data from '../../contexts/data'

import './project-style.scss'

const Project = () => {
    const containerRef = useRef()
    const { id }       = useParams()

    const [ index ] = useState(data.findIndex(_ => _.path === id))
    const [ project ] = useState(data[index])
    
    const [ next ]  = useState((index+1)%data.length)
    const [ prev ]  = useState((index < 1 ? data.length-1 : index-1 )%data.length)

    useEffect(() => {
        const setContainerPosition = () => {        
            const { x } = containerRef.current.getBoundingClientRect()
            containerRef.current.children[0].style.transform = `translate3d(-${Math.abs(x)}px, 0, 0)`
        }

        window.addEventListener('resize', setContainerPosition)
        setContainerPosition()

        return () => window.removeEventListener('resize', setContainerPosition)
    }, [])

    return (
        <Topper>
            <div className='project'>
                <div className='header'>
                    <div style={{display: 'inline-flex'}}>
                        <span>{(index+1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}.</span>
                    </div>
                    <span><Link to={'/'}>GO BACK</Link></span>
                </div>
                <div className='grid'>
                    {project.info.map( text => (
                        <div key={text.charAt(0)} className='title-description'>
                            <p>{text}</p>
                        </div>
                    ))}
                    <div className='title-description'>
                        <div className='links'>
                            {project.links.map(link => (
                                <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer">
                                    <p>{link.title}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div ref={containerRef} className="shadow-offset">
                    <div className="offset-container">
                        <Marquee text={project.name}/>
                    </div>
                </div>
                <div className='grid-images'>
                    {Object.values(project.media).map((img, i) => (
                        <img key={`${project.name} ${i}`} src={img} alt={`${project.name} ${i}`}/>
                    ))}
                </div>
                <div className='footer'>
                    <div className='footer-wrapper'>
                        <Link to={data[prev].path} className="subtitle-wrapper left">
                            <span className='arrow'></span>
                            <p>Previous</p>
                        </Link>
                        <Link to={data[next].path} className="subtitle-wrapper right">
                            <p>Next</p>
                            <span className='arrow'></span>
                        </Link>
                    </div>
                </div>
            </div>
        </Topper>
    )
}

export default Project