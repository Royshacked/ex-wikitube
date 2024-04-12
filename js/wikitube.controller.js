'use strict'

function onInit() {
    searchValue()
}

function onSearch(ev) {
    ev.preventDefault()

    searchValue()
}

function searchValue() {
    const value = document.querySelector('input').value
    getVideo(value)
        .then(renderVideo)
        .then(renderVideos)
        .catch(err=> alert(err))

    getWiki(value)
        .then(renderWiki)
        .catch(err=> alert(err))
}

function renderVideo(videos) {
    const videoId = videos[1].id.videoId
    const strHtml = `<iframe width="420" height="315" src="https://www.youtube.com/embed/${videoId}"></iframe>`

    document.querySelector('.main-video').innerHTML = strHtml

    return videos
}
 
function renderVideos(videos) {
    
}

function renderWiki(results) {
    const title = results[0].snippet
    const album = results[1].snippet
    
    const strHtml = `
        <p>${title}</p>
        <p>${album}</p>
    `
    document.querySelector('.main-video').innerHTML += strHtml
}
