var started;
document.addEventListener('DOMContentLoaded', function () {
    var imageContainer = document.getElementById('images');
    var storage = chrome.storage.local;

    var getImages = function(callback) {
        var images;
        storage.get('images', function(items) {
            images = items.images || [];

            callback(images);
        });
    }

    var insertImage = function(src) {
        var image = document.createElement('img');
        image.src = src;
        image.className = 'image';
        imageContainer.appendChild(image);
    }

    var addImageToStorage = function(src) {
        getImages(function(images) {
            images.push(src);
            storage.set({images: images});
        });
    }

    var loadStorage = function() {
        getImages(function(images) {
            for (var i = 0, len = images.length; i < len; i++) {
                insertImage(images[i]);
            }
        });
    }

    loadStorage();
    if (started === undefined) {
        started = true;
        chrome.tabs.executeScript(null, {file: "content_script.js"});

        var onMessageListener = function(request, sender, sendResponse) {
            insertImage(request.src);
            addImageToStorage(request.src);
        }
        var clearClicked = function() {
            storage.clear();
            var images = document.getElementsByClassName('image');
            for (var i = 0, len = images.length; i < len; i++) {
                imageContainer.removeChild(images[i]);
            }
        }
        chrome.extension.onMessage.addListener(onMessageListener);
        document.getElementById('clear-images').onclick = clearClicked;
    }
});
