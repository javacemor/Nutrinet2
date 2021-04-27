import React, { useState } from 'react'

function BackgroundVideo() {
    const [trailerClass, setTrailerClass] = useState(true);

    function togglePlay() {
        var trailer = document.querySelector(".trailer");

        var video = document.querySelector('.video');
        trailer.classList.toggle("active");
        video.pause();
        video.currentTime = 0;
    };
    return (
        <>
            <section id="watch-demo">
                <div className="bg-hero">
                    <video autoPlay muted loop className="video-bg">
                        <source src="images/vid.mp4" type="video/mp4" />
                    </video>
                </div>
            </section>

           
        </>
    )
}

export default BackgroundVideo;
