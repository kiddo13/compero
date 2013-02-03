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

chrome.contextMenus.create({"title": "Add to Compero", "contexts": ["image"], "onclick": addImage});
