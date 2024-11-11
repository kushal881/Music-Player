let index = 0;
let songName=document.querySelector("#song-name")
let songSinger=document.querySelector("#song-singer")
let songImage=document.querySelector(".song-img")
let playPauseImg = document.querySelector("#play-pause")
let volumeRange = document.querySelector("#volume-range")
let volSvg=document.querySelector("#vol-svg")
let songRange=document.querySelector("#song-duration")
let musicanim=document.querySelector("#musicanim")
let playlistImg=document.querySelector("#playlist-img")
let playlist=document.querySelector(".playlist")
let playlistSong=document.querySelectorAll(".playlist-song")
let volumeS=document.querySelector(".volume-img")
let playingSong = false;
let track = document.createElement("audio")
let songs =[
    {
        name:"Satranga",
        path:"firstsong.mp3",
        image:"https://c.saavncdn.com/415/Satranga-From-ANIMAL-Hindi-2023-20231027131032-500x500.jpg",
        singer:"Arijit Singh"
    },
    {
        name:"Zara Zara",
        path:"secondSong.mp3",
        image:"https://i.ytimg.com/vi/NeXbmEnpSz0/maxresdefault.jpg",
        singer:"JalRaj"
    },
    {
        name:"Suniyan Suniyan",
        path:"song3.mp3",
        image:"https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/da/fc/38/dafc38f4-8148-2d35-83ea-c160082dda81/8905285148121.jpg/1200x1200bf-60.jpg",
        singer:"Jass and MixSingh"
    },
    {
        name:"Safar",
        path:"song4.mp3",
        image:"https://mr-jat.in/siteuploads/generaltheme/thumb/files/sft11/5109/5109-2.webp",
        singer:"Jass"
    },
    {
        name:"Heeriye",
        path:"song5.mp3",
        image:"https://mr-jat.in/siteuploads/generaltheme/thumb/files/sft12/5934/5934-2.webp",
        singer:"Arijit Singh, Jasleen Royal"
    }
]
function loadTrack(index){
    track.src=songs[index].path;
    songName.innerHTML=songs[index].name
    songSinger.innerHTML=songs[index].singer
    songImage.style=`background-image: url("${songs[index].image}");
`
volume()
duration()
setInterval(()=>{
    songRange.max=track.duration
    songRange.value=track.currentTime
},1000)
track.load()
}
loadTrack(index);
let b=1;
function playPause(){
    if(playingSong==false){
        playSong()
        
    }else{
        pauseSong()
    
    }
}
function playSong(){
    track.play();
    playingSong = true;
    playPauseImg.src="pause.svg"
    musicanim.style.display="block"
    b=0;
}
function pauseSong(){
    track.pause();
    playingSong = false;
    playPauseImg.src="play.svg"
    musicanim.style.display="none"
    b=1;
}
function nextSong(){
    if(index<songs.length-1){
        index++;
        loadTrack(index)
        playSong()
    }else{
        index=0;
        loadTrack(index)
        playSong()
    }
}
function previousSong(){
    if(index>0){
        index--;
        loadTrack(index)
        playSong()
    }else{
        index=songs.length-1;
        loadTrack(index)
        playSong()
    }
}

function volume(){
    track.volume=volumeRange.value/100;
    if(volumeRange.value==0){
        volSvg.src="mute.svg"
    }else{
        volSvg.src="volume.svg"
    }
}

function duration(){
    track.currentTime=songRange.value;
}

playlistImg.addEventListener("click",()=>{

    playlist.classList.toggle("playlist-active")
    if(playlist.classList.contains("playlist-active")){
    playlistImg.src="cross.svg";

}
else{
    playlistImg.src="playlist.svg"

}
})

playlistSong.forEach((songs,index)=>{
    songs.addEventListener("click",()=>{
        loadTrack(index);
        playSong();
        playlist.classList.remove("playlist-active")
    })
})

let a = false;
volSvg.addEventListener("click",()=>{
    if(a===false){
        volSvg.src="mute.svg"
        track.volume=0;
        a=true;
    }
    else{
        volSvg.src="volume.svg"
        track.volume=volumeRange.value/100;
        a=false;
    }
})

playPauseImg.addEventListener("keydown",(e)=>{
    if(e.key=="Spacebar"){
        playPause()
    }
    if(e.key=="Spacebar"){
        playPause()
    }
})