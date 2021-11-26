const express       = require("express")
const SpotifyWebApi = require("spotify-web-api-node")

const router = express.Router()
const creds = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}

const spotifyApi = new SpotifyWebApi(creds)

router.get('/', (req, res) => {
  const playlist_name = req.query.playlist_name

  spotifyApi.clientCredentialsGrant()
  .then((data) => {
    const access_token  = data.body['access_token']
    spotifyApi.setAccessToken(access_token)

    console.log('\x1b[32m%s\x1b[0m', 'access_token:', access_token)
    return spotifyApi.getUserPlaylists(process.env.USER_ID)
  }, (error) => {
    console.error('\x1b[41m%s\x1b[0m', 'Error getting Token:', error)
    res.status(error.statusCode).send({ error: error.body })
  })
  .then(playlist => {
    let selected_list
    
    if(playlist_name) {
      selected_list = spotifyApi.getPlaylistTracks(playlist.body.items.filter(list => list.name === playlist_name)[0].id)
    }else{ 
      selected_list = spotifyApi.getPlaylistTracks(playlist.body.items[0].id)
    }

    return selected_list
  })
  .then(data => {
    const filtered_list = data.body.items.filter(el => el.track.preview_url != null)
    const random_pick = Math.floor(Math.random() * filtered_list.length)
    const selected_track = filtered_list[random_pick].track

    res.json(selected_track)
  })
  .catch((error) => {
    console.error('\x1b[41m%s\x1b[0m', 'Something went wrong:', error)
    return res.status(error.statusCode || 500).send({ error: {
      error_body: error.body,
      error : "I couldn't get the song..",
      external_urls: { spotify: '/'},
      preview_url: '/'
    } })
  })
})

module.exports = router