const initialState = {
    isPlaying: false,
    canvasReady: false,
    email: 'jroussosdev@gmail.com',
    socials: [
        { name: 'tw', title: 'Twitter', url: 'https://twitter.com/giannhs_r' },
        { name: 'ig', title: 'Instagram', url: 'https://www.instagram.com/giannhs_r' },
        { name: 'fb', title: 'Facebook', url: 'https://facebook.com/giannhs.roussos.s' }
    ],
    imagesArray: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_CANVAS_LOADED':
            return { ...state, canvasReady: action.canvasReady }
        case 'CHANGE_PLAYING_STATUS':
            return { ...state, isPlaying: action.isPlaying }
        case 'CHANGE_IMAGES_ARRAY': 
            return { ...state, imagesArray: action.imagesArray }
        default:
            throw new Error('Reducer Error');
    }
}

export {initialState, reducer}