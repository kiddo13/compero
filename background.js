var images = [];

var getImages = function() {
    return images;
}

var clearImages = function() {
    images = [];
}

var addImage = function(info, tab) {
    images.push(info.srcUrl);
}

chrome.contextMenus.create({"title": "add to compero", "contexts": ["image"], "onclick": addImage});
