import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/routes';
import Loading from './components/loading/loading'

import imagesloaded from 'imagesloaded';
import data from './contexts/data'
import { useStore } from './contexts/store';

const App = () => {
    const [loadedImages, setLoadedImages] = useState(false)
    const { canvasReady } = useStore().state

    useEffect(() => {
        const pictures = []

        data.forEach(project => {
            pictures.push(Object.defineProperties({}, {
                path: { value: project.path },
                pictures: {
                    value: Object.values(project.media).map(img => {
                        let image = new Image()
                        image.src = img

                        return image
                    })
                }
            }))
        })

        imagesloaded(pictures.map(pic => pic.pictures).flat(), () => setLoadedImages(true))
    }, [])

    return (
        <BrowserRouter>
            {!loadedImages && canvasReady && <Loading />}
            <Routes />
        </BrowserRouter>
    )
}

export default App;
