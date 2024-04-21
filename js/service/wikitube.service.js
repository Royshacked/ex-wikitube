
export const wikiTubeService = {
    getVideos,
    getWiki,
    getHistory,
    clearHistory,
}

import { storageService } from "./storage.service.js"


const YOUTUBE_KEY = 'AIzaSyAHYdeu4hKJj6S_nfyw1kBbOXX1pt4NUsc'
var gHistory = storageService.load('itemsHistory') || []


function getVideos(searchValue) {
    const value = searchValue.toLowerCase()
    const itemsMap = storageService.load('searchItems') || {}
    if (itemsMap[value]) {
        console.log('from storage')
        return Promise.resolve(itemsMap[value])
    }
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_KEY}&q=${value}`

    return axios.get(url)
        .then(results => results.data)
        .then(results => results.items)
        .then(items => items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            img: {
                url: item.snippet.thumbnails.default.url,
                height: item.snippet.thumbnails.default.height,
                width: item.snippet.thumbnails.default.width,
            }
        }))
        )
        .then(items => {
            console.log(value)
            itemsMap[value] = items
            storageService.save('searchItems', itemsMap)
            gHistory.push(value)
            storageService.save('itemsHistory', gHistory)
            return items
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


function getHistory() {
    return storageService.load('itemsHistory')
}


function clearHistory() {
    return Swal.fire({
        title: "Delete History?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('itemsHistory')
            Swal.fire({
                title: "Deleted!",
                text: "History has been deleted.",
                icon: "success"
            });
        }
    });
}
