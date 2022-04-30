import React from 'react'
import { Link } from 'react-router-dom'

import Anchor from '../../../../components/anchor/anchor'
import data from '../../../../contexts/data'

import './projects-style.scss'

const Post = ({ project, index }) => {
    return (
        <Link className='post' to={`/project/${project.path}`}>
            <div className='title-header'>
                <p>{index.toLocaleString(undefined, { minimumIntegerDigits: 2 })}.</p>
                <h5>{project.name}</h5>
            </div>
            <div className='image-container'>
                <img src={project.media.picture} alt={project.name}/>
            </div>
            <div className='desc'>
                <Anchor as={'div'}>{project.desc}</Anchor>
            </div>
        </Link>
    )
}

const Projects = () => {
    return (
        <div className='projects'>
            {data.map( (project, i) => <Post key={project.name} project={project} index={i+1}/> )}
        </div>
    )
}

export default Projects;
