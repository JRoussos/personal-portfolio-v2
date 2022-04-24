import mosaic from '../assets/imgs/projects/mosaic-small.jpg'
import mosaic_preview from '../assets/imgs/projects/mosaic-preview.jpg'

import flowers from '../assets/imgs/projects/flowers-small.png'
import flowers_preview from '../assets/video/flowers-preview.mp4'

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
        desc: "Generating mosaics from a set of photos",
        picture: mosaic,
        preview: mosaic_preview,
        links: {
            live: "http://mosaica.netlify.com/",
            github: "https://github.com/JRoussos/mosaic-generator"
        }
    }
]

export default data;
