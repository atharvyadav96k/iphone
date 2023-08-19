let x, y;
let prev_x, prev_y;
// left, right, up, down, back
let dir = 0;
// current page
let current_page = 0
// check blur is on or not
let blur_status = false
// setting password
let password = 1234
let user_input_pass = '';
// function to detect left , right , up , down swap
function change_page() {
    let page = document.getElementsByClassName('page');
    if (current_page == 0) {
        if (dir == 'up' && blur_status == false) {
            page[0].style.display = 'none'
            current_page = 1
        }
    }
    page[current_page].style.display = 'block'
}
function detect() {
    let angle = Math.atan2(prev_y - y, prev_x - x) * 180 / Math.PI;
    console.log(x, y);
    if (angle < 0) {
        angle = 360 + angle;
    }
    console.log(angle)
    if (prev_x == x && prev_y == y) {
        console.log('touch')
        dir = 0;
    }
    else if (angle > 45 && angle < 135) {
        console.log('down');
        dir = 'down';
        if (y < 90 && prev_y > 200) {

            if (current_page != 0) {
                blur_status = true
                document.getElementById('blur').className = 'blur';
                let page = document.getElementsByClassName('page')
                page[current_page].style.display = 'none'
            }

        }
    }
    else if (angle > 135 && angle < 225) {
        // console.log('left')
        if (x > document.getElementById('div').offsetWidth + 80) {
            console.log(document.getElementById('div').offsetWidth);
            dir = 'left';
            console.log('left')
        }
        else {
            dir = 'left'
        }
        if (dir == 'left' && current_page == 1) {
            current_page = 0
            let page = document.getElementsByClassName('page');
            user_input_pass = '';
            commit_pass(user_input_pass)
            page[1].style.display = 'none'
            page[0].style.display = 'block'
        }
    }
    else if (angle > 225 && angle < 315) {
        console.log('up');
        dir = 'up';
        if (current_page != 0) {
            blur_status = false
            document.getElementById('blur').className = 'blur-out';
            let page = document.getElementsByClassName('page');
            page[current_page].style.display = 'block'
        }
        else {
            change_page();
        }
    }
    else if (angle > 315 || angle < 45) {
        console.log('right')
        dir = 'right';
    }
}
// first on screen this helps to detect function
function ClickDown(e) {
    x = e.clientX;
    y = e.clientY;
    // console.log(x, y);
}
// last click on screen this helps to detect function
function ClickUp(e) {
    prev_x = e.clientX;
    prev_y = e.clientY;
    // console.log(prev_x, prev_y);
    detect();
}

// how app shoud behave when it get open 

// create your apps and and their code here in array 
let apps = ["<div id='main-movies'><img src='img/OPENHEIMER.png' class='movie-name'><div class='poster-container'> <img src='img/poster1.png' class='poster'><img src='img/poster2.png' class='poster'><img src='img/poster3.png' class='poster'></div></div>",
    "<div id='clock-main'><div class='sub-op'><h3>Clock</h3><h1 id='clock-time'>09:12</h1><div id='clock-body'> <div id='click-inter-body'> <div id='small-hand'> <div class='small-hand-design'></div> </div> <div id='min-hand'><div class='min-hand-design'></div> </div> <div id='hr-hand'> <div class='hr-hand-design'>  </div></div>  <div id='center'><div class='center'></div> </div> </div>    </div>    <h4 class='date_clock'>Friday, 5, Jul</h4></div></div>",
    "<div id='news-main'></div>",
    "<div id='todo' style=''></div>",
    "<div id='note'></div>",
    "<div id='main'><div id='music'><img src='img/musical-note.png' style='width: 100px;height: 100px;'></div><div style='margin: auto;width: 10px;height: 10px' class='music-button'> <audio id='mySound'><source src='audio/m1 (1).mp3' type='audio/mp3' id='music_path'> </audio></div><div id='audio-time-line'> <div id='audio-tim-line-fill'></div></div><button onclick='set_animation()' style='background-color: transparent; border-style: none;'><img src='img/pause-music.png' id='play_pause_button'></button></div><script src='musicplayer.js'></script>",
    "<div id='podcast-main'></div>",
    "<div id='main-store'> <img class='game-poster' src='img/g-posters.png'></img>    <img class='game' src='img/g-game.png'></div>",
    "<div id='phone-main'></div>"
]
// -------------------------------------------------------------
let app_icon_restore = [];
function openapp(index) {
    let app = document.getElementsByClassName('app');

    if (dir === 'left' && app[index].className === 'app app-open') {
        // unhiding main-app 
        document.getElementById('main-apps').style.display = 'block'
        // document.getElementById('weather').style.display = 'block'
        document.getElementById('date-day-work').style.display = 'block'
        document.getElementById('time').style.display = 'block'
        // unhiding hided apps
        for (let i = 0; i < app.length; i++) {
            app[i].innerHTML = app_icon_restore[i]
        }
        app_icon_restore = []
        app[index].className = 'app app-close';

    }
    // when app will open this activitys will done
    else if (app[index].className === 'app' || app[index].className === 'app app-close') {
        // hiding main-app 
        document.getElementById('main-apps').style.display = 'none'
        // document.getElementById('weather').style.display = 'none'
        document.getElementById('date-day-work').style.display = 'none'
        document.getElementById('time').style.display = 'none'
        // get apps insides code to hide apps
        for (let i = 0; i < app.length; i++) {
            app_icon_restore.push(app[i].innerHTML);
            console.log(app_icon_restore)
        }
        app[index].className = 'app app-open';
        // hiding apps and booting app
        for (let i = 0; i < app.length; i++) {
            if (i != index) {
                app[i].innerHTML = ''

            }
            else {
                app[i].innerHTML = apps[i];
            }

        }

    }
}

function window_handel(index) {
    let page = document.getElementsByClassName('page');
    for (i = 1; i < page.length; i++) {
        if (i != index) {
            page[i].style.display = 'none'
        }

    }
}
// set date 
setInterval(date, 10);
function date() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    let date_day = document.getElementsByClassName('lock_screen-day')[0];
    let time = document.getElementsByClassName('lock_screen-time')[0];
    // let clock_time = document.getElementById('clock_time');
    date_day.innerHTML = days[date.getDay()] + '&nbsp;,&nbsp;' + months[date.getMonth()] + '&nbsp;&nbsp;' + date.getDate()

    let number_hour = date.getHours()
    let numbermin = date.getMinutes()
    if (number_hour > 12) {
        number_hour = number_hour - 12;
    }
    if (number_hour < 10) {
        number_hour = '0' + '' + number_hour;
    }
    if (numbermin < 10) {
        numbermin = '0' + '' + numbermin;
    }
    time.innerHTML = number_hour + ':' + numbermin
    if (document.getElementsByClassName('time')[0] != null) {
        document.getElementsByClassName('time')[0].innerHTML = `${number_hour}:${numbermin}`
        console.log('Hello')
    }
    if (document.getElementById('clock-time') != null) {
        document.getElementById('clock-time').innerHTML = `${number_hour}:${numbermin}`
    }
    document.getElementById('day').innerHTML = days[date.getDay()]
    document.getElementById('date').innerHTML = date.getDate()
    if (document.getElementsByClassName('date_clock')[0] != null) {
        document.getElementsByClassName('date_clock')[0].innerHTML = days[date.getDay()] + ',' + date.getDate() + ' ' + months[date.getMonth()]
    }
    let hr_deg = (360 / 12) * date.getHours()
    console.log(hr_deg, date.getSeconds())
    if (document.getElementById('hr-hand') != null) {
        document.getElementById('hr-hand').style.transform = `rotate(${hr_deg}deg)`;;
    }
    min_deg = (360 / 60) * date.getMinutes()
    if (document.getElementById('min-hand') != null) {
        document.getElementById('min-hand').style.transform = `rotate(${min_deg}deg)`;;
    }
    let sec_deg = (360 / 60) * date.getSeconds()
    console.log(sec_deg, date.getSeconds())
    if (document.getElementById('small-hand') != null) {
        document.getElementById('small-hand').style.transform = `rotate(${sec_deg}deg)`;;
    }


}
function commit_pass(user_intput) {
    let star_pass = document.getElementById('start_pass')
    star_pass.innerHTML = user_intput
}
function pad_number_presses(number) {
    if (document.getElementById('start_pass').innerHTML == 'Wrong Password') {
        document.getElementById('start_pass').innerHTML = ''
    }
    user_input_pass += number
    console.log(user_input_pass)
    commit_pass(user_input_pass)
}
function backspace() {
    let new_user_input_pass = '';
    for (let i = 0; i < user_input_pass.length - 1; i++) {
        new_user_input_pass += user_input_pass[i];
    }
    user_input_pass = new_user_input_pass
    commit_pass(user_input_pass)
}
function check_pass() {
    if (user_input_pass == password) {
        current_page = 2;
        let page = document.getElementsByClassName('page');
        page[1].style.display = 'none';
        page[2].style.display = 'block'
    }
    else {
        document.getElementById('start_pass').innerHTML = 'Wrong Password'
        user_input_pass = ''
    }
}
function change_color(button_index) {
    if (button_index == 0) {
        if (document.getElementById('plane').className == 'circle-o') {
            document.getElementById('plane').className = 'circle-o b-blue';
            document.getElementById('podcast').className = 'circle-o';
            document.getElementById('wifi').className = 'circle-o';
        }
        else {
            document.getElementById('plane').className = 'circle-o';
        }
    }
    else if (button_index == 1) {
        if (document.getElementById('podcast').className == 'circle-o' && document.getElementById('plane').className != 'circle-o b-blue') {
            document.getElementById('podcast').className = 'circle-o b-blue';
        }
        else {
            document.getElementById('podcast').className = 'circle-o';
        }
    }
    else if (button_index == 2) {
        if (document.getElementById('wifi').className == 'circle-o' && document.getElementById('plane').className != 'circle-o b-blue') {
            document.getElementById('wifi').className = 'circle-o b-blue';
        }
        else {
            document.getElementById('wifi').className = 'circle-o';
        }
    }
    else if (button_index == 3) {
        if (document.getElementById('bluetooth').className == 'circle-o') {
            document.getElementById('bluetooth').className = 'circle-o b-blue';
        }
        else {
            document.getElementById('bluetooth').className = 'circle-o';
        }
    }
    else if (button_index == 4) {
        if (document.getElementById('auto-rotate').className == 'circle-o') {
            document.getElementById('auto-rotate').className = 'circle-o b-blue';
        }
        else {
            document.getElementById('auto-rotate').className = 'circle-o';
        }
    }
    else if (button_index == 5) {
        if (document.getElementById('sleep').className == 'circle-o') {
            document.getElementById('sleep').className = 'circle-o b-blue';
        }
        else {
            document.getElementById('sleep').className = 'circle-o';
        }
    }
}