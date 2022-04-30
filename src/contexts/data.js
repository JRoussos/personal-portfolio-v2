import mosaic from '../assets/imgs/projects/mosaic-small.jpg'
import mosaic_preview from '../assets/imgs/projects/mosaic-preview.jpg'

import flowers from '../assets/imgs/projects/flowers-small.png'
import flowers_preview from '../assets/video/flowers-preview.mp4'

import stone from '../assets/imgs/projects/stone-small.jpg'
import github from '../assets/imgs/projects/lorenz.png'

const data = [
    {
        name: "Some Flowers For You",
        desc: "Splitting images into particles with React Three Fiber",
        path: 'flowers',
        media: {
            picture: flowers,
            preview: flowers_preview,
        },
        links: [
            {   
                title: 'Website', 
                url: "https://some-flowers-for-you.netlify.app/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/a-reactive-particle-system"
            }
        ]
    },
    {
        name: "Mosaica",
        desc: "CLI to generate mosaics from a set of photos",
        path: 'mosaica',
        media: {        
            picture: mosaic,
            preview: mosaic_preview,
        },
        links: [
            {   
                title: 'Website', 
                url: "http://mosaica.netlify.com/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/mosaic-generator"
            }
        ]
    },
    {
        name: "Learning Three JS",
        desc: "A collection of small Three JS projects",
        path: 'learning-three-js',        
        media: {        
            picture: stone,
            preview: null,
        },
        links: [
            {   
                title: 'Website', 
                url: "http://mosaica.netlify.com/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/mosaic-generator"
            }
        ]
    },
    {
        name: "Lorenz Attractor",
        desc: "A visualization of the 'The Butterfly Effect'",
        path: 'lorebz-attractor',
        media: {        
            picture: github,
            preview: null,
        },
        links: [
            {   
                title: 'Website', 
                url: "http://mosaica.netlify.com/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/mosaic-generator"
            }
        ]
    }
]

export default data;
