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
        picture: flowers,
        preview: flowers_preview,
        links: {
            live: "https://some-flowers-for-you.netlify.app/",
            github: "https://github.com/JRoussos/a-reactive-particle-system"
        }
    },
    {
        name: "Mosaica",
        desc: "CLI to generate mosaics from a set of photos",
        picture: mosaic,
        preview: mosaic_preview,
        links: {
            live: "http://mosaica.netlify.com/",
            github: "https://github.com/JRoussos/mosaic-generator"
        }
    },
    {
        name: "Learning Three JS",
        desc: "A collection of small Three JS projects",
        picture: stone,
        preview: null,
        links: {
            live: "https://learning-three-js.netlify.com/",
            github: "https://github.com/JRoussos/mosaic-generator"
        }
    },
    {
        name: "Lorenz Attractor",
        desc: "A visualization of the 'The Butterfly Effect'",
        picture: github,
        preview: null,
        links: {
            live: "https://learning-three-js.netlify.com/",
            github: "https://github.com/JRoussos/mosaic-generator"
        }
    }
]

export default data;
