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
        .catch(err => alert(err))

    getWiki(value)
        .then(renderWiki)
        .catch(err => alert(err))
}

function renderVideo(videos) {
    const videoId = videos[0].id.videoId

    const strHtml = `<iframe width="400" height="300" src="https://www.youtube.com/embed/${videoId}"></iframe>`

    document.querySelector('.main-video').innerHTML = strHtml
    // document.querySelector('input').value = ''
    return videos
}

function renderVideos(videos) {
    const strHtml = videos.map(video =>
        `
            <div class="videos-list-item">
                <iframe width="125" height="75" src="https://www.youtube.com/embed/${video.id.videoId}"></iframe>
                <iframe width="125" height="75" src="https://www.youtube.com/embed/${video.id.videoId}"></iframe>
                <h2>${video.snippet.title}</h2>
            </div>
    `).join('')

    document.querySelector('.videos-list').innerHTML = strHtml
    document.querySelector('input').value = ''
}

function renderWiki(results) {
    const strHtml = results.map(result =>
        `<div class="text-item"> 
        `<div class="text-item"> 
            <h2>${result.title}</h2>
            <p>${result.snippet}</p>
        </div>
        </div>
        `
    ).join('')

    document.querySelector('.main-text').innerHTML = strHtml
}
