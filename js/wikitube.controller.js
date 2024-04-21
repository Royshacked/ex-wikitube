
import { wikiTubeService } from "./service/wikitube.service.js"
import { storageService } from "./service/storage.service.js"

window.onInit = onInit
window.onSearch = onSearch
window.onClearHistory = onClearHistory
window.onRenderVideo = renderVideo


function onInit() {
    onSearchValue()
}


function onSearchValue() {
    const value = document.querySelector('input').value
    wikiTubeService.getVideos(value)
        .then(videos => {
            renderVideo(videos[0].id)
            return videos
        })
        .then(renderVideos)
        .then(renderHistory)
        .catch(err => alert(err))

    wikiTubeService.getWiki(value)
        .then(renderWiki)
        .catch(err => alert(err))
}


function renderVideo(id) {
    const strHtml = `<iframe width="400" height="300" src="https://www.youtube.com/embed/${id}"></iframe>`

    document.querySelector('.main-video').innerHTML = strHtml
}


function renderVideos(videos) {
    const strHtml = videos.map(video =>
        `<div class="videos-list-item" onclick="onRenderVideo('${video.id}')" >
            <img src="${video.img.url}">
            <h2>${video.title}</h2>
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
    const strHtml = history.map(item => `<div>${item.charAt(0).toUpperCase() + item.slice(1)}</div>`).join('')

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
