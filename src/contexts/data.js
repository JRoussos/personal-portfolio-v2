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
        info: [
            "A demo for splitting images into their pixels and animate each of them as a particle with its own attributes and mouse interactions using React and React Three Fiber.", 
            "For some reason I always find myself very attracted to the concept of particles and bringing them in life by animating them. And when I read that acticle by Bruno Imbrizi, I went on to try it myself."
        ],
        path: 'flowers',
        media: {
            picture: flowers,
            preview: flowers_preview,
        },
        links: [
            {   
                title: 'Visit website', 
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
        info: [
            "So I had a conversation with a friend about how cool the concept of generating mosaics from a set of photos is. And so I began this project as a proof of concept of sorts, to see how difficult would it be to make a tool like that.",
            "The basic idea is simple, we calculate the average rgb values of a certain area of the image. Then those average values are processed and for each value we find an image that is better matching that color."
        ],
        path: 'mosaica',
        media: {        
            picture: mosaic,
            preview: mosaic_preview,
        },
        links: [
            {   
                title: 'Visit website', 
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
        info: [
            "Some time ago I saw an example of a website using the webGL library, I was captivated. I was extremely intersted in learning this new thing and so I started researching it.",
            "I read about GLSL, Three.js and Shaders and now that I have a basic understanding of the concept, It's time to start practicing. This is a collection of cool ideas and stuff I wanted to try and learn as far as 3D web design goes."
        ],
        path: 'learning-three-js',        
        media: {        
            picture: stone,
            preview: null,
        },
        links: [
            {   
                title: 'Visit website', 
                url: "https://learning-three-js.netlify.app/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/learning-three-js"
            }
        ]
    },
    {
        name: "Lorenz Attractor",
        desc: "A visualization of the 'The Butterfly Effect'",
        info: [
            "So I have been reading this book lately by James Gleick, about Chaos theory and the science of unpredictable events. In it there is a chapter that describes the story of Edward Lorenz and his discovery of the butterfly effect, reading that inspired me to make my version of the famous lorenz attractor.",
            "Lorenz found that if you have a system with some initial values that are basically the same but only having the tiniest deviation from one another, as time passes those tiny differences scale up and that after a few iterations the values end up completely unrelated and with their own trajectory."
        ],
        path: 'lorenz-attractor',
        media: {        
            picture: github,
            preview: null,
        },
        links: [
            {   
                title: 'Visit website', 
                url: "https://lorenz-attractor-visualization.netlify.app/"
            },
            {
                title: 'Github repository',
                url: "https://github.com/JRoussos/lorenz-attractor"
            }
        ]
    }
]

export default data;
