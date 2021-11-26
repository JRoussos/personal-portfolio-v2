import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import Header from '../header/header'
import MoreInfo from './moreInfo'

import { getRepos, getSpotify } from '../../helpers/getFunctions'
import useWindowSize from '../../utils/useWindowSize'

import './main-style.scss'

const Title = () => {
    const [ repositories, updateRespositories ] = useState({loading: true})
    const [ track, updateTrack ] = useState({loading: true})
    const [ isPlaying, setIsPlaying ] = useState(false)
    
    const centerRef = useRef()
    const { width, height } = useWindowSize()

    useEffect(() => {
        getRepos(updateRespositories, 2)
        getSpotify(updateTrack, 'in peace')
    }, [])

    useLayoutEffect(() => {
        centerRef.current.style.height = `${height}px`
    },[height])

    const infoProps = { repositories, track, isPlaying, setIsPlaying }

    return (
        <React.Fragment>
            <Header/>
            <div ref={centerRef} className="center">
                <div>
                    <h1>JOHN ROUSSOS</h1>
                    <p className="subtitle">I'm a front end developer, {width > 518 || <br/>}most of the time</p>
                </div>
                {width > 530 && <MoreInfo {...infoProps}/>}
            </div>
        </React.Fragment>
    )
}

export default Title
