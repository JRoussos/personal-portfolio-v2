const initialState = {
    isPlaying: false,
    isBackgroundVisible: true,
    email: 'jroussosdev@gmail.com',
    socials: [
        { name: 'tw', title: 'Twitter', url: 'https://twitter.com/giannhs_r' },
        { name: 'ig', title: 'Instagram', url: 'https://www.instagram.com/giannhs_r' },
        { name: 'fb', title: 'Facebook', url: 'https://facebook.com/giannhs.roussos.s' }
    ]
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_PLAYING_STATUS':
            return { ...state, isPlaying: action.isPlaying }
        case 'CHANGE_BACKGROUND_VISIBILITY':
            return { ...state, isBackgroundVisible: action.isBackgroundVisible }
        default:
            throw new Error('Reducer Error');
    }
}

export {initialState, reducer}