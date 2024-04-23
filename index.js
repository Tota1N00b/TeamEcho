function openInsta() {
    window.open("https://www.instagram.com/teamecho.studio", "_blank");
}

function togglePowerParadox() {
    var powerParadoxElement = document.getElementById("powerParadox");
    var aboutUsElement = document.getElementById("aboutUs");

    // Check if 'aboutUs' is visible, hide it if yes
    if (aboutUsElement.classList.contains("toggled")) {
        aboutUsElement.classList.remove("toggled");
    }

    // Toggle 'powerParadox' visibility regardless of the current state
    powerParadoxElement.classList.toggle("toggled");
}

function toggleAboutUs() {
    var aboutUsElement = document.getElementById("aboutUs");
    var powerParadoxElement = document.getElementById("powerParadox");

    // Check if 'powerParadox' is visible, hide it if yes
    if (powerParadoxElement.classList.contains("toggled")) {
        powerParadoxElement.classList.remove("toggled");
    }

    // Toggle 'aboutUs' visibility regardless of the current state
    aboutUsElement.classList.toggle("toggled");
}

let isAudioOn = false;

function changeAudioButtonToOn() {
    document.getElementById("audio_off").style.opacity = "0";
    document.getElementById("audio_mute").style.opacity = "0";
    document.getElementById("audio_on").style.opacity = "1";
    document.getElementById("audio-tooltip").textContent = "TURN OFF THE SOUND";
    //console.log("audio on");
}

function changeAudioButtonToOff() {
    document.getElementById("audio_on").style.opacity = "0";
    document.getElementById("audio_mute").style.opacity = "0";
    document.getElementById("audio_off").style.opacity = "1";
    document.getElementById("audio-tooltip").textContent = "TURN ON THE SOUND";
    //console.log("audio off");
}

function toggleAudio() {
    isAudioOn = !isAudioOn;
    if (isAudioOn) {
        changeAudioButtonToOn();
        audioContext.resume();
    } else {
        changeAudioButtonToOff();
        audioContext.suspend();
    }
}