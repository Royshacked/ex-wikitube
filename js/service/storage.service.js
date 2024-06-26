
export const storageService = {
  save: saveToStorage,
  load: loadFromStorage,
}


function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}