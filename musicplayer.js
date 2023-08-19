let play = false;
function set_animation() {
    var audio_duration = document.getElementById("mySound").duration;
        let audio_time_line = document.getElementById('audio-time-line-fill');
    if (!play) {
        
        document.getElementById("mySound").play()
        document.getElementById('audio-tim-line-fill').className = 'animation';
        document.getElementsByClassName('animation')[0].style.animationDuration = ` ${audio_duration}s `;
        pause_play(true)
        play = true
        document.getElementById('play_pause_button').src = 'img/pause (1).png'
    }
    else {
        document.getElementById("mySound").pause()
        document.getElementById('audio-tim-line-fill').className = 'animation';
        document.getElementsByClassName('animation')[0].style.animationDuration = ` ${audio_duration}s `;
        pause_play(false)
        play = false
        document.getElementById('play_pause_button').src = 'img/pause-music.png'
    }

}
function pause_play(play_animation) {
    if (play_animation) {
        document.getElementsByClassName('animation')[0].style.webkitAnimationPlayState = "running";
    }
    else {
        document.getElementsByClassName('animation')[0].style.webkitAnimationPlayState = "paused";
    }
}