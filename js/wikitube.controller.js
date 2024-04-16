
import { wikiTubeService } from "./service/wikitube.service.js"
import { storageService } from "./service/storage.service.js"

window.onInit = onInit
window.onSearch = onSearch
window.onClearHistory = onClearHistory


function onInit() {
    onSearchValue()
}


function onSearchValue() {
    const value = document.querySelector('input').value
    wikiTubeService.getVideos(value)
        .then(renderVideo)
        .then(renderVideos)
        .then(renderHistory)
        .catch(err => alert(err))

    wikiTubeService.getWiki(value)
        .then(renderWiki)
        .catch(err => alert(err))
}


function renderVideo(videos) {
    const videoId = videos[0].id.videoId

    const strHtml = `<iframe width="400" height="300" src="https://www.youtube.com/embed/${videoId}"></iframe>`

    document.querySelector('.main-video').innerHTML = strHtml
    return videos
}


function renderVideos(videos) {
    const strHtml = videos.map(video =>
        `<div class="videos-list-item" >
            <iframe width="125" height="75" src="https://www.youtube.com/embed/${video.id.videoId}"></iframe>
            <h2>${video.snippet.title}</h2>
        </div>`).join('')

    document.querySelector('.videos-list').innerHTML = strHtml
    document.querySelector('input').value = ''

    return videos
}


function renderWiki(results) {
    const strHtml = results.map(result =>
        `<div class="text-item"> 
            <h2>${result.title}</h2>
            <p>${result.snippet}</p>
        </div>`).join('')

    document.querySelector('.main-text').innerHTML = strHtml
}


function renderHistory() {
    const history = wikiTubeService.getHistory()
    if (!history || history.length === 0) {
        document.querySelector('.main-history').innerHTML = ''
        return
    }
    const strHtml = history.map(item => `<div>${item}</div>`).join('')

    document.querySelector('.main-history').innerHTML = strHtml
}


function onSearch(ev) {
    ev.preventDefault()

    onSearchValue()
}

function onClearHistory() {
    wikiTubeService.clearHistory()
        .then(renderHistory)
}
