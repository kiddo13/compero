var images = document.getElementsByTagName('img');
var imageHandle = function() {
    chrome.extension.sendMessage({src: this.src});
}
for (var i = 0, len = images.length; i < len; i++) {
    images[i].onclick = imageHandle;
}
