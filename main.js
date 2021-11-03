import getData from "./dictionary.js"

const $ = document.querySelector.bind(document);
const data = await getData()
$("body > div").remove();
$(".container").style.display = "block";

$("#date").innerText = data.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
$("#word").innerText = data.word

$("#phonetic > p").innerText = `/${data.phonetic.text}/`
$("#phonetic > audio").setAttribute("src", data.phonetic.url)
$("#phonetic > audio").load()

$("#definition").innerText = `${data.type}: ${data.defintiion}`

let isPlaying = false;
const audioElement = $("#phonetic > audio");
const iconElement = $("#phonetic .material-icons")
function togglePlay() {
    if (isPlaying) {
        audioElement.pause();
        audioElement.currentTime = 0;

        iconElement.innerText = "play_arrow"
        isPlaying = false;
    } else {
        audioElement.play();
        iconElement.innerText = "pause"
        isPlaying = true;
    }
}

iconElement.addEventListener('click', togglePlay);
audioElement.addEventListener('ended', togglePlay);