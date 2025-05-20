let index = 0;
let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-img");
let playPauseImg = document.querySelector("#play-pause");
let volumeRange = document.querySelector("#volume-range");
let volSvg = document.querySelector("#vol-svg");
let songRange = document.querySelector("#song-duration");
let musicanim = document.querySelector("#musicanim");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-song");
let volumeS = document.querySelector(".volume-img");
let disc = document.querySelector("#disc");
let playPauseDiv = document.querySelector(".play-pause");
let playingSong = false;
let track = document.createElement("audio");
let typewriterElement = document.querySelector("#typewriter");
let visualizer = document.querySelector("#visualizer");
let visualizerInterval;

// Typewriter text array
const typewriterTexts = [
    "Experience music like never before",
    "Immerse yourself in the rhythm",
    "Feel the beat, live the melody",
    "Your favorite tunes, always with you",
    "Music that touches your soul"
];

// Create audio visualizer bars
function createVisualizer() {
    for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${Math.random() * 50 + 5}px`;
        bar.style.animationDelay = `${Math.random() * 0.5}s`;
        visualizer.appendChild(bar);
    }
}
createVisualizer();

// Typewriter effect function
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        typewriterElement.innerHTML = text.substring(0, i + 1) + '<span class="blinking-cursor">|</span>';
        
        // Wait for a while before writing the next character
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback);
        }, 50);
    } else if (typeof fnCallback == 'function') {
        // Wait for a while before running the callback
        setTimeout(fnCallback, 2000);
    }
}

// Start a new typewriter animation
function startTypewriter(i) {
    if (i < typewriterTexts.length) {
        typeWriter(typewriterTexts[i], 0, function() {
            // Clear the text after it's been displayed
            setTimeout(function() {
                typewriterElement.innerHTML = '';
                startTypewriter((i + 1) % typewriterTexts.length);
            }, 1000);
        });
    }
}

// Start typewriter animation on page load
document.addEventListener('DOMContentLoaded', function() {
    startTypewriter(0);
    updateBackgroundAnimation();
});

// Update background animation based on song playing
function updateBackgroundAnimation() {
    const bars = document.querySelectorAll('.bar');
    
    if (playingSong) {
        bars.forEach(bar => {
            bar.style.animationPlayState = 'running';
            bar.style.height = `${Math.random() * 50 + 10}px`;
        });
        
        document.body.classList.add('music-playing');
        disc.classList.add('playing');
        playPauseDiv.classList.add('playing');
        
        // Add more dynamic visual elements
        updateVisualizerOnBeat();
    } else {
        bars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
        
        document.body.classList.remove('music-playing');
        disc.classList.remove('playing');
        playPauseDiv.classList.remove('playing');
        
        // Clear visualizer interval when music is paused
        if (visualizerInterval) {
            clearInterval(visualizerInterval);
            visualizerInterval = null;
        }
    }
}

// Create a simple beat detection simulation
function updateVisualizerOnBeat() {
    if (!playingSong) return;
    
    const bars = document.querySelectorAll('.bar');
    
    // Clear existing interval if any
    if (visualizerInterval) {
        clearInterval(visualizerInterval);
    }
    
    // Simulate beat detection
    visualizerInterval = setInterval(() => {
        if (!playingSong) return;
        
        bars.forEach(bar => {
            // Randomize heights for visual effect
            bar.style.height = `${Math.random() * 50 + 5}px`;
        });
        
        // Change background color slightly
        const hue = Math.floor(Math.random() * 60) + 220; // Blue hue range
        document.documentElement.style.setProperty('--dynamic-hue', hue);
    }, 300);
}

// Mark active song in playlist
function markActiveSong() {
    playlistSong.forEach((song, i) => {
        if (i === index) {
            song.classList.add('active-song');
        } else {
            song.classList.remove('active-song');
        }
    });
}

let songs = [
    {
        name: "Satranga",
        path: "firstsong.mp3",
        image: "https://c.saavncdn.com/415/Satranga-From-ANIMAL-Hindi-2023-20231027131032-500x500.jpg",
        singer: "Arijit Singh"
    },
    {
        name: "Zara Zara",
        path: "secondSong.mp3",
        image: "https://i.ytimg.com/vi/NeXbmEnpSz0/maxresdefault.jpg",
        singer: "JalRaj"
    },
    {
        name: "Suniyan Suniyan",
        path: "song3.mp3",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/da/fc/38/dafc38f4-8148-2d35-83ea-c160082dda81/8905285148121.jpg/1200x1200bf-60.jpg",
        singer: "Jass and MixSingh"
    },
    {
        name: "Safar",
        path: "song4.mp3",
        image: "https://mr-jat.in/siteuploads/generaltheme/thumb/files/sft11/5109/5109-2.webp",
        singer: "Jass"
    },
    {
        name: "Heeriye",
        path: "song5.mp3",
        image: "https://mr-jat.in/siteuploads/generaltheme/thumb/files/sft12/5934/5934-2.webp",
        singer: "Arijit Singh, Jasleen Royal"
    }
];

function loadTrack(index) {
    track.src = songs[index].path;
    songName.innerHTML = songs[index].name;
    songSinger.innerHTML = songs[index].singer;
    songImage.style = `background-image: url("${songs[index].image}");`;
    
    // Mark active song in playlist
    markActiveSong();
    
    // Add a rotation animation to the disc when playing
    if (playingSong) {
        disc.style.animation = "rotateDisc 8s linear infinite";
    }
    
    volume();
    duration();
    setInterval(() => {
        songRange.max = track.duration;
        songRange.value = track.currentTime;
    }, 1000);
    track.load();
}

loadTrack(index);

// Add disc rotation animation
function rotateDisc(play) {
    if (play) {
        disc.style.animation = "rotateDisc 8s linear infinite";
    } else {
        disc.style.animation = "none";
    }
}

function playPause() {
    if (playingSong == false) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    track.play();
    playingSong = true;
    playPauseImg.src = "pause.svg";
    musicanim.style.display = "block";
    rotateDisc(true);

    // Update animations when song plays
    updateBackgroundAnimation();
}

function pauseSong() {
    track.pause();
    playingSong = false;
    playPauseImg.src = "play.svg";
    musicanim.style.display = "none";
    rotateDisc(false);

    // Update animations when song pauses
    updateBackgroundAnimation();
}

function nextSong() {
    if (index < songs.length - 1) {
        index++;
        loadTrack(index);
        playSong();
    } else {
        index = 0;
        loadTrack(index);
        playSong();
    }
    
    // Add a particle effect on song change
    createParticleEffect();
}

function previousSong() {
    if (index > 0) {
        index--;
        loadTrack(index);
        playSong();
    } else {
        index = songs.length - 1;
        loadTrack(index);
        playSong();
    }
    
    // Add a particle effect on song change
    createParticleEffect();
}

// Create particle effect on song change
function createParticleEffect() {
    const container = document.querySelector('main');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * container.offsetWidth;
        const posY = Math.random() * container.offsetHeight;
        const rotation = Math.random() * 360;
        const hue = Math.random() * 360;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.8)`;
        
        container.appendChild(particle);
        
        // Animate and remove particle
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${rotation + 180}deg)`;
            
            setTimeout(() => {
                container.removeChild(particle);
            }, 500);
        }, 10);
    }
}

function volume() {
    track.volume = volumeRange.value / 100;
    if (volumeRange.value == 0) {
        volSvg.src = "mute.svg";
    } else {
        volSvg.src = "volume.svg";
    }

    // Add visual feedback for volume change
    volumeS.classList.add('pulsate');
    setTimeout(() => {
        volumeS.classList.remove('pulsate');
    }, 300);
}

function duration() {
    track.currentTime = songRange.value;
}

playlistImg.addEventListener("click", () => {
    playlist.classList.toggle("playlist-active");
    if (playlist.classList.contains("playlist-active")) {
        playlistImg.src = "cross.svg";
    } else {
        playlistImg.src = "playlist.svg";
    }
});

playlistSong.forEach((song, songIndex) => {
    song.addEventListener("click", () => {
        index = songIndex;
        loadTrack(index);
        playSong();
        playlist.classList.remove("playlist-active");
        playlistImg.src = "playlist.svg";
    });
});

let volumeMuted = false;
volSvg.addEventListener("click", () => {
    if (volumeMuted === false) {
        volSvg.src = "mute.svg";
        track.volume = 0;
        volumeMuted = true;
    } else {
        volSvg.src = "volume.svg";
        track.volume = volumeRange.value / 100;
        volumeMuted = false;
    }
});

// Add keyboard controls
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        playPause();
        e.preventDefault();
    }
    if (e.code === "ArrowRight") {
        nextSong();
    }
    if (e.code === "ArrowLeft") {
        previousSong();
    }
    if (e.code === "ArrowUp") {
        volumeRange.value = Math.min(100, parseInt(volumeRange.value) + 10);
        volume();
    }
    if (e.code === "ArrowDown") {
        volumeRange.value = Math.max(0, parseInt(volumeRange.value) - 10);
        volume();
    }
});

// Add this to handle end of song
track.addEventListener('ended', () => {
    nextSong();
});

// Initial music visualizer setup
updateBackgroundAnimation();

// Add CSS for new dynamic elements
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        transition: all 0.5s ease;
        z-index: 100;
    }
    
    @keyframes rotateDisc {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .pulsate {
        animation: pulsate 0.3s ease;
    }
    
    @keyframes pulsate {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
    
    .blinking-cursor {
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
        from, to {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);