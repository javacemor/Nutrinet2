// LOGIC FOR THE HERO/SLIDER SECTION
var slideImg = document.getElementById('slideImg');
    var images = new Array(
            "assets/images/bg1.jpg",
            "assets/images/bg2.jpg",
            "assets/images/bg3.jpg"
        );
    var len = images.length;
    var i = 0;

    function slider() {
        if (i > len-1) {
            i = 0;
        }
        slideImg.src = images[i];
        i++;

        setTimeout('slider()', 5000);
    }
    
slider();

// POP UP VIDEO LOGIC
function togglePlay() {
    var trailer = document.querySelector(".trailer");

    var video = document.querySelector('.video');
    trailer.classList.toggle("active");
    video.pause();
    video.currentTime = 0;
};