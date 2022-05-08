import React from 'react'
import { Link } from 'react-router-dom'

import Anchor from '../../../../components/anchor/anchor'
import data from '../../../../contexts/data'
import { useStore } from '../../../../contexts/store'

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
    const { socials } = useStore().state
    return (
        <React.Fragment>
            <div className='projects'>
                {data.map( (project, i) => <Post key={project.name} project={project} index={i+1}/> )}
            </div>
            <div className='projects-footer'>
                <div className='footer-wrapper'>
                    {/* <a target="_blank" rel="noopener noreferrer" href={socials.find( social => social.name === 'gh').url}>
                        <p>see more on github</p>
                    </a> */}
                    {/* <div> */}
                        <p>Find me anywhere,<br/> talk to me about anything.</p>
                        {/* <button onClick={() => window.scrollTo({top: 0})}>Top</button>
                    </div> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Projects;
