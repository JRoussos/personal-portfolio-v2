import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import Anchor from '../../components/anchor/anchor'
import Marquee from '../../components/marquee/marquee'
import Topper from '../../components/topper/topper'

import data from '../../contexts/data'
import './project-style.scss'

const Project = () => {
    const containerRef = useRef()
    const { id }       = useParams()

    const [ index ] = useState(data.findIndex(_ => _.path === id))
    const [ next ]  = useState((index+1)%data.length)
    const [ project ] = useState(data[index])

    useEffect(() => {
        const { x } = containerRef.current.getBoundingClientRect()
        containerRef.current.style.transform = `translate3d(-${x}px, 0, 0)`
    }, [])

    return (
        <Topper>
            <div className='project'>
                <div className='header'>
                    <div style={{display: 'inline-flex'}}>
                        <span>{(index+1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}.</span>
                        {/* <span>{`\xa0\xa0 — \xa0\xa0`}</span>
                        <span>
                            <Link to={data[next].path}>{(next+1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}.</Link>
                        </span> */}
                    </div>
                    <span><Link to={'/'} className='underline line-hover'>GO BACK</Link></span>
                </div>
                <div className='grid'>
                    <div className='title-description'>
                        <p>Enim officia ut minim dolor. Ea aliquip ipsum aute occaecat Lorem voluptate eiusmod ex nisi sit commodo. Et velit nulla esse proident qui nulla. Laboris aliqua mollit officia esse veniam aliquip consequat eiusmod in pariatur labore sunt.</p>
                    </div>
                    <div className='title-description'>
                        <p>Ut ad fugiat consequat in tempor quis reprehenderit elit. Velit aliqua tempor quis non deserunt fugiat. Culpa ipsum commodo cillum nulla dolore consequat anim aute proident dolor minim.</p>
                    </div>
                    <div className='title-description'>
                        {project.links.map(link => (
                            <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer">
                                <p>{link.title}</p>
                            </a>
                        ))}
                    </div>
                </div>
                <div ref={containerRef} className="offset-container">
                    <Marquee text={project.name}/>
                </div>
                <img src={project.media.picture} alt={project.name}/>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Link to={data[next].path} className="subtitle-wrapper">
                        <p>{data[next].name}</p>
                        <Anchor as='div' className='white'>Next Project</Anchor>
                    </Link>
                </div>
            </div>
        </Topper>
    )
}

export default Project