'use strict'

const YOUTUBE_KEY = 'AIzaSyAHYdeu4hKJj6S_nfyw1kBbOXX1pt4NUsc'


function getVideos(value) {
    const items = loadFromStorage('searchItems')
    const item = getSearchItem(items, value)
    if (item) return Promise.resolve(item.videoIds)

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_KEY}&q=${value}`

    return axios.get(url)
        .then(results => {
            _saveSearchItem(items, value, results.data.items)
            return results.data.items
        })
        .catch(err => {
            console.log(err)
            throw err
        })
}

function getSearchItem(items, value) {
    if (!items) return
    return items.find(item => item.value.toLowerCase() === value.toLowerCase())
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
    return loadFromStorage('searchItems')
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
            localStorage.clear('searchItems')
            Swal.fire({
                title: "Deleted!",
                text: "History has been deleted.",
                icon: "success"
            });
        }
    });
}

function _saveSearchItem(items, value, videoIds) {
    items.push({ value, videoIds })
    saveToStorage('searchItems', items)
}