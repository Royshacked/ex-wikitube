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
    const strHtml = `<iframe width="600" height="350" src="https://www.youtube.com/embed/${videoId}"></iframe>`

    document.querySelector('.main-video').innerHTML = strHtml

    return videos
}

function renderVideos(videos) {
    const strHtml = videos.map(video =>
        `
            <div class="videos-list-item">
                <iframe width="200" height="100" src="https://www.youtube.com/embed/${video.id.videoId}"></iframe>
                <h2>${video.snippet.title}</h2>
            </div>
    `).join('')

    document.querySelector('.videos-list').innerHTML = strHtml
}

function renderWiki(results) {
    const strHtml = results.map(result =>
        `
            <h2>${result.title}</h2>
            <p>${result.snippet}</p>
        `
    ).join('')

    document.querySelector('.main-text').innerHTML = strHtml
}
