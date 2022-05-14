import mosaica_0 from '../assets/imgs/projects/mosaica/mosaica.jpg'
import mosaica_1 from '../assets/imgs/projects/mosaica/mosaica (5).jpg'
import mosaica_2 from '../assets/imgs/projects/mosaica/mosaica (1).jpg'
import mosaica_3 from '../assets/imgs/projects/mosaica/mosaica (2).jpg'
import mosaica_4 from '../assets/imgs/projects/mosaica/mosaica (3).jpg'

import flowers_0 from '../assets/imgs/projects/flowers/flowers (3).png'
import flowers_1 from '../assets/imgs/projects/flowers/flowers (1).png'
import flowers_2 from '../assets/imgs/projects/flowers/flowers (4).jpg'
import flowers_5 from '../assets/imgs/projects/flowers/flowers (9).jpg'
import flowers_6 from '../assets/imgs/projects/flowers/flowers (2).png'
import flowers_7 from '../assets/imgs/projects/flowers/flowers (8).jpg'


import learning_0 from '../assets/imgs/projects/learning/learning.jpg'
import learning_1 from '../assets/imgs/projects/learning/learning (1).png'
import learning_2 from '../assets/imgs/projects/learning/learning (2).png'
import learning_3 from '../assets/imgs/projects/learning/learning (3).png'
import learning_4 from '../assets/imgs/projects/learning/learning (4).png'

import lorenz_0 from '../assets/imgs/projects/lorenz/lorenz.png'
import lorenz_1 from '../assets/imgs/projects/lorenz/lorenz (1).png'
import lorenz_2 from '../assets/imgs/projects/lorenz/lorenz (7).png'
import lorenz_3 from '../assets/imgs/projects/lorenz/lorenz (3).png'
import lorenz_5 from '../assets/imgs/projects/lorenz/lorenz (5).png'
import lorenz_6 from '../assets/imgs/projects/lorenz/lorenz (6).png'

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
            picture: flowers_0,
            l7: flowers_7,
            l2: flowers_2,
            l1: flowers_1,
            l6: flowers_6,
            l5: flowers_5,
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
            picture: mosaica_0,
            l1: mosaica_1,
            l2: mosaica_2,
            l3: mosaica_3,
            l4: mosaica_4,
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
            picture: learning_0,
            l1: learning_1,
            l2: learning_2,
            l3: learning_3,
            l4: learning_4,
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
            picture: lorenz_0,
            l2: lorenz_2,
            l3: lorenz_3,
            l1: lorenz_1,
            l5: lorenz_5,
            l6: lorenz_6,
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
