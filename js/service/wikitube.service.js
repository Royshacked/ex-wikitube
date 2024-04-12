'use strict'

const YOUTUBE_KEY = 'AIzaSyAHYdeu4hKJj6S_nfyw1kBbOXX1pt4NUsc'

// const YOUTUBE_URL = `
// https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_KEY}&q=${value}`

// const WIKI_URL = `
// https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${value}&format=json`

function getVideo(value) {
    const videos = loadFromStorage(`${value}`)
    if (videos) return Promise.resolve(videos)

    const url = `
    https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_KEY}&q=${value}`

    return axios.get(url)
        .then(results => {
            saveToStorage(`${value}`, results.data.items)
            return results.data.items
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

function getWiki(value) {
    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${value}&format=json`
    return axios.get(url)
        .then(results => results.data.query.search)
        .catch(err => {
            console.log(err)
            throw err
        })
}