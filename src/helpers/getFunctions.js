const areCookiesEnabled = navigator.cookieEnabled
export const getRepos = (updateState, number=7, sort='updated', order='desc') => {
    const url = `https://api.github.com/search/repositories?q=user:JRoussos${number ? ("&per_page="+number) : ""}&sort=${sort}&order=${order}`

    const restoredRepos = areCookiesEnabled ? JSON.parse(sessionStorage.getItem('repositories')) ?? [] : []
    if( restoredRepos.length ) {
        updateState(restoredRepos[0])
    }else{
        fetch(url).then(res => res.json())
        .then(data => {
            const returnedRepos = data.items.filter(repo => repo.name !== "JRoussos")

            areCookiesEnabled && sessionStorage.setItem('repositories', JSON.stringify(returnedRepos))
            updateState(returnedRepos[0])
        })
        .catch( error => {
            console.warn("Fetch Repositories Error: ", error)

            updateState({
                error : "I couldn't get the repo..",
                html_url: '/'
            })
        })
    }
}

export const getSpotify = (updateState, playlist='') => {
    const restoredTracks = areCookiesEnabled ? JSON.parse(sessionStorage.getItem('tracks')) ?? [] : []
    const url = `https://spotify-proxy-server.herokuapp.com/api${playlist ? ("?playlist_name"+playlist): ""}`
    
    if( restoredTracks && Object.keys(restoredTracks).length ) {
        updateState(restoredTracks)
    }else{
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const returnedTracks = data
    
            areCookiesEnabled && sessionStorage.setItem('tracks', JSON.stringify(returnedTracks))
            updateState(returnedTracks)
        })
        .catch( error => {
            console.warn("Fetch Repositories Error: ", error)
            updateState({
                error : "I couldn't get the song..",
                external_urls: { spotify: '/'},
                preview_url: '/'
            })
        })
    }
}