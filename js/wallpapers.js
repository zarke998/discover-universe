var nOfWallpapers;
var currentWallpaper;

var gallery;
var page;

var loadingCircleTimer;

$(document).ready(function () {
    $(".sidenav").sidenav();
    $("#loadingCircle").hide();

    nOfWallpapers = 23;
    page = 1;
    currentWallpaper = 1;
    gallery = document.getElementById("gallery");

    populateWallpaperGallery();

    $("body").scroll("scroll",checkIfEndOfGallery);
});

function populateWallpaperGallery() {

    var starIndex = currentWallpaper;
    var endIndex = page * 9 < nOfWallpapers ? page * 9 : nOfWallpapers;
    for (var i = starIndex; i <= endIndex; i++) {
        var wallpaperItem = createWallpaperItem(`wallpaper${i}.jpg`);
        gallery.appendChild(wallpaperItem);
    }

    currentWallpaper = i;
    page++;

}
function createWallpaperItem (image) {
    var imagePath = `images/wallpapers/${image}`;

    var wallpaperItem = document.createElement("div");
    wallpaperItem.classList.add("col-sm-6","col-md-4","mb-4");

    var wallpaperItemImage = document.createElement("img");
    wallpaperItemImage.src = imagePath;
    wallpaperItemImage.alt = "Wallpaper";

    wallpaperItem.appendChild(wallpaperItemImage);

    return wallpaperItem;
}
function checkIfEndOfGallery() {
    clearTimeout(loadingCircleTimer);
    if (elIsPassedWithOffset(gallery, 75) && currentWallpaper < nOfWallpapers)
        loadingCircleTimer = setTimeout(function () {
            var loadingCircle = $("#loadingCircle");
            $(gallery).append(loadingCircle);
            loadingCircle.show();

            setTimeout(function(){
                $(loadingCircle).hide();
                populateWallpaperGallery();
            },1000);
        }, 50);

}
function elIsPassedWithOffset(element,offset){
    var boundings = element.getBoundingClientRect();

    if(boundings.bottom + offset <= (window.innerHeight || document.documentElement.clientHeight))
        return true;
    else 
        return false;
}