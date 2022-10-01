// variables
const setMinutesButton = document.querySelector('[data-set-minutes-button]');
const setSecondsButton = document.querySelector('[data-set-seconds-button]');
const timerButton = document.querySelector('[data-timer-button]');
const stopWatchButton = document.querySelector('[data-stop-watch-button]');
const stopButton = document.querySelector('[data-stop-button]');
const continueButton = document.querySelector('[data-continue-button]');
const clearhButton = document.querySelector('[data-clear-button]');
const input = document.querySelector('[data-input]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const audio = document.querySelector('[data-audio]');
const timeElements = document.querySelectorAll('.time');
let remainingMinutes = null;
let remainingSeconds = null;
let timerCounter = null;
let stopWatchCounter = null;




// click events
setMinutesButton.addEventListener('click', ()=>{ 
    checkMinutesAmount();
    remainingMinutes = input.value*60;
    setMinutes();
    timeFormat();
    clearInterval(stopWatchCounter);
    clearInterval(timerCounter);
    audio.pause();
})

setSecondsButton.addEventListener('click', ()=>{ 
    checkSecondsAmount();
    remainingSeconds = input.value*1;
    setSeconds();
    timeFormat();
    clearInterval(stopWatchCounter);
    clearInterval(timerCounter);
    audio.pause();
})

timerButton.addEventListener('click', ()=>{  
    if (remainingMinutes != null || remainingSeconds != null) {
        countdownTimer();
        stopWatchCounter = null;
    }
    input.value = '';
})

stopWatchButton.addEventListener('click', ()=>{ 
    remainingSeconds = 0;
    seconds.innerHTML = '00';
    minutes.innerHTML = '00';
    hours.innerHTML = '00';
    input.value = '';
    stopWatch();
    timerCounter = null;
})

stopButton.addEventListener('click', ()=>{ 
    if (timerCounter == null) {
        clearInterval(stopWatchCounter);
    } else if (stopWatchCounter == null) {
        clearInterval(timerCounter);
    }
    audio.pause();
})

continueButton.addEventListener('click', ()=>{ 
    if (timerCounter == null) {
        stopWatch();
    } else if (stopWatchCounter == null) {
        countdownTimer();
    }
    audio.play();
})

clearhButton.addEventListener('click', ()=>{ 
    clear();
})




// functions
function countdownTimer() { 
    clearInterval(timerCounter);
    clearInterval(stopWatchCounter);
    timerCounter = setInterval(()=>{
        calculateRemainingTime();
        timeFormat();
    }, 1000);
}

function calculateRemainingTime() {
    if (remainingSeconds != null) {
        remainingSeconds = remainingSeconds - 1;
        setSeconds();
    }
    if (remainingMinutes != null) {
        remainingMinutes = remainingMinutes - 1;
        setMinutes();
    }
    audio.play();
    checkEndOfTime();
}

function setMinutes() {
    hours.innerHTML = Math.floor(parseInt(remainingMinutes) / 3600) ;
    minutes.innerHTML = Math.floor((parseInt(remainingMinutes) % 3600) / 60);
    seconds.innerHTML = Math.floor((parseInt(remainingMinutes) % 60));
}

function setSeconds() {
    hours.innerHTML = Math.floor(parseInt(remainingSeconds) / 3600) ;
    minutes.innerHTML = Math.floor(parseInt(remainingSeconds) / 60);
    seconds.innerHTML = Math.floor(parseInt(remainingSeconds) % 60);
}

function timeFormat() {
    timeElements.forEach(timeElement =>{
        if (String(timeElement.innerHTML).length == 1) {
            timeElement.innerHTML = `0${timeElement.innerHTML}`
        }
    })
}

function checkMinutesAmount() {
    if (input.value >= 1440) {
        alert('Please enter a number less than 1440 minutes');
        input.value = '';
        return;
    }
}

function checkSecondsAmount() {
    if (input.value >= 86400) {
        alert('Please enter a number less than 86400 seconds');
        input.value = '';
        return;
    }
}

function checkEndOfTime() {
    if (hours.innerHTML === '0' && minutes.innerHTML === '0' && seconds.innerHTML === '0') {
        clearInterval(timerCounter);
        timerCounter = null;
        audio.pause();
        remainingSeconds = null;
        remainingMinutes = null;
    }
}

function stopWatch() {
    clearInterval(timerCounter);
    clearInterval(stopWatchCounter);
    audio.pause();
    stopWatchCounter = setInterval(()=>{
        remainingSeconds = remainingSeconds + 1;
        seconds.innerHTML = remainingSeconds;
        if (remainingSeconds == 60) {
            seconds.innerHTML = 0;
            minutes.innerHTML = parseInt(minutes.innerHTML) + 1;
            remainingSeconds = 0;
        }
        if (minutes.innerHTML == 60) {
            hours.innerHTML = parseInt(hours.innerHTML) + 1;
            minutes.innerHTML = 0;
        }
        if (hours.innerHTML == '23' && minutes.innerHTML == '59' && seconds.innerHTML == '59') {
            clearInterval(stopWatchCounter);
            stopWatchCounter = null;
            audio.pause();
        }
        timeFormat();
        audio.play();
    }, 1000)
}

function clear() {
    input.value = '';
    clearInterval(timerCounter);
    clearInterval(stopWatchCounter);
    seconds.innerHTML = '00';
    minutes.innerHTML = '00';
    hours.innerHTML = '00';
    timerCounter = null;
    stopWatchCounter = null;
    audio.pause();
}