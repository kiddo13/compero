var storage, bg, imageContainer;
var getImages = function(callback) {
    var images;
    storage.get('images', function(items) {
        images = items.images || [];

        callback(images);
    });
}

var insertImage = function(src) {
    var image = $('<img>');
    image.addClass('image');
    image.attr('src', src);
    image.appendTo(imageContainer);
}

var addImageToStorage = function(src) {
    getImages(function(images) {
        images.push(src);
        storage.set({images: images});
    });
}

var loadBackgroundImages = function() {
    var bgImages = bg.getImages();
    for (var i = 0, len = bgImages.length; i < len; i++) {
        insertImage(bgImages[i]); 
        addImageToStorage(bgImages[i]);
    }
    bg.clearImages();
}

var loadStorage = function() {
    getImages(function(images) {
        for (var i = 0, len = images.length; i < len; i++) {
            insertImage(images[i]);
        }
    });
}

var loadImages = function() {
    loadBackgroundImages();
    loadStorage();
}

var onMessageListener = function(request, sender, sendResponse) {
    insertImage(request.src);
    addImageToStorage(request.src);
}

var clearClicked = function() {
    storage.clear();
    $('.image').remove();
}

document.addEventListener('DOMContentLoaded', function () {
    bg = chrome.extension.getBackgroundPage();
    storage = chrome.storage.local;
    imageContainer = $('#images');
    var slider = $('#slider');
    $('#clear-images').click(clearClicked);
    slider.slider({
        min: 200,
        max: 800,
        step: 10,
        value: 200,
        slide: function(event, ui) {
            var images = $('.image');
            images.width(slider.slider('value')+"px");
            images.height(slider.slider('value')+"px");
        }
    });
    loadImages();
});
