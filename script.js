console.log("Welcome To Cancion");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgessBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Maan Meri Jaan", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "Dekha Hazaaro Dafa", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "Humsafar", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "Sakiyaan", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "Raataan Lambiyan", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName: "Kesariya", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName: "Phir Aur Kya Chaiye", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;

    // Check if the element with the class "songName" exists before setting its innerText
    const songNameElements = element.getElementsByClassName("songName");
    if (songNameElements.length > 0) {
        songNameElements[0].innerText = songs[i].songName;
    } else {
        console.error(`No element with class "songName" found for songItem ${i}.`);
    }
});

// Update master play button state based on audio element state
audioElement.addEventListener('play', () => {
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

audioElement.addEventListener('pause', () => {
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
});


//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgessBar.value =progress;
})

myProgessBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgessBar.value*audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Function to toggle play/pause for the master play button
const toggleMasterPlay = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        // Update the state of the small play button for the current song
        const currentPlayButton = document.getElementById(songIndex.toString());
        if (currentPlayButton) {
            currentPlayButton.classList.remove('fa-play-circle');
            currentPlayButton.classList.add('fa-pause-circle');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        // Update the state of the small play button for the current song
        const currentPlayButton = document.getElementById(songIndex.toString());
        if (currentPlayButton) {
            currentPlayButton.classList.remove('fa-pause-circle');
            currentPlayButton.classList.add('fa-play-circle');
        }
    }
};
masterPlay.addEventListener('click', toggleMasterPlay);


// Handle play/pause for individual small play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedPlayButton = e.target;

        // Check if the clicked play button is for the current song
        if (songIndex === parseInt(clickedPlayButton.id)) {
            toggleMasterPlay();
        } else {
            // If the clicked play button is for a different song, play that song
            makeAllPlays();
            songIndex = parseInt(clickedPlayButton.id);
            clickedPlayButton.classList.remove('fa-play-circle');
            clickedPlayButton.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});

// Function to play the next song
const playNextSong = () => {
    makeAllPlays();
    songIndex = (songIndex + 1) % songs.length;
    const nextPlayButton = document.getElementById(songIndex.toString());
    nextPlayButton.classList.remove('fa-play-circle');
    nextPlayButton.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

// Function to play the previous song
const playPreviousSong = () => {
    makeAllPlays();
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    const prevPlayButton = document.getElementById(songIndex.toString());
    prevPlayButton.classList.remove('fa-play-circle');
    prevPlayButton.classList.add('fa-pause-circle');
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

// Next song button click event
document.getElementById('next').addEventListener('click', playNextSong);

// Previous song button click event
document.getElementById('previous').addEventListener('click', playPreviousSong);

// Master play button click event
masterPlay.addEventListener('click', toggleMasterPlay);

