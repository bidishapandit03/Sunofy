//Initializing Variables
let index = 1;
let masterPlay = document.getElementById("masterPlay");
let masterSong = document.getElementById("masterSong");
let myProgressBar = document.getElementById("myProgressBar");
let audioElement = new Audio("songs/1.mp3");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songname: "Ankhiyan Milavanga",
    filePath: "songs/1.mp3",
    coverPath: "covers/bg-1.jpg",
  },
  {
    songname: "Jeena-Jeena",
    filePath: "songs/2.mp3",
    coverPath: "covers/bg-2.webp",
  },
  {
    songname: "Kaise",
    filePath: "songs/3.mp3",
    coverPath: "covers/bg-3.jpg",
  },
  {
    songname: "Khairiyat",
    filePath: "songs/4.mp3",
    coverPath: "covers/bg-4.jpg",
  },
  {
    songname: "Main Rang Sharbaton ka",
    filePath: "songs/5.mp3",
    coverPath: "covers/bg-5.jpg",
  },
  {
    songname: "Oo-antava",
    filePath: "songs/6.mp3",
    coverPath: "covers/bg-6.jpg",
  },
  {
    songname: "Tumko Paya Hai Toh",
    filePath: "songs/7.mp3",
    coverPath: "covers/bg-7.jpg",
  },
];

masterSong.innerHTML = songs[index - 1].songname;
songItems.forEach((ele, i) => {
  ele.getElementsByTagName("img")[0].src = songs[i].coverPath;
  ele.getElementsByClassName("songName")[0].textContent = songs[i].songname;
  let aud = new Audio(`songs/${i + 1}.mp3`);
  aud.addEventListener("loadedmetadata", function (_event) {
    var duration = parseInt(aud.duration);

    ele.getElementsByClassName("duration")[0].textContent =
      parseInt(duration / 60) + ":" + parseInt(duration % 60);
  });
});

//listening events from the user

//1.Handle play/pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    document
      .getElementsByClassName("playButton")
      [index - 1].classList.remove("fa-circle-play");
    document
      .getElementsByClassName("playButton")
      [index - 1].classList.add("fa-circle-pause");
    songItems[index - 1].style.backgroundColor = "#1db954";
  } else {
    audioElement.pause();
    songItems[index - 1].style.backgroundColor = "white";
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    document
      .getElementsByClassName("playButton")
      [index - 1].classList.remove("fa-circle-pause");
    document
      .getElementsByClassName("playButton")
      [index - 1].classList.add("fa-circle-play");
  }
});
//2.updating seek bar using timeupdate

audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );

  myProgressBar.value = progress;
  if (progress == 100) {
    let lastPlayed;
    if (index == 7) {
      index = 1;
      lastPlayed = 7;
    } else {
      lastPlayed = index;
      index += 1;
    }
    audioElement.src = `songs/${index}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSong.innerHTML = songs[index - 1].songname;
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    document
      .getElementsByClassName("playButton")
      [lastPlayed - 1].classList.remove("fa-circle-pause");
    document
      .getElementsByClassName("playButton")
      [lastPlayed - 1].classList.add("fa-circle-play");
    songItems[lastPlayed - 1].style.backgroundColor = "white";
    document
      .getElementsByClassName("playButton")
      [index - 1].classList.remove("fa-circle-play");
    document
      .getElementsByClassName("playButton")
      [index - 1].classList.add("fa-circle-pause");
    songItems[index - 1].style.backgroundColor = "#1db954";
  }
});

//3. Sliding thumb
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

//4.play button from the list
let prevIndex = 0;
let prevAction = "";
Array.from(document.getElementsByClassName("playButton")).forEach((ele) => {
  ele.addEventListener("click", (e) => {
    //making all the previously paused button to play
    Array.from(document.getElementsByClassName("playButton")).forEach(
      (element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
        songItems[index - 1].style.backgroundColor = "white";
      }
    );

    index = parseInt(e.target.id);
    if (prevIndex == index) {
      if (prevAction == "play") {
        audioElement.pause();
        prevAction = "pause";
        prevIndex = index;
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        songItems[index - 1].style.backgroundColor = "white";
        gif.style.opacity = 0;
      } else {
        audioElement.play();
        prevAction = "play";
        prevIndex = index;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        songItems[index - 1].style.backgroundColor = "#1db954";
        gif.style.opacity = 1;
      }
    } else {
      audioElement.pause();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");

      audioElement.src = `songs/${index}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      songItems[index - 1].style.backgroundColor = "#1db954";
      gif.style.opacity = 1;
      masterSong.innerHTML = songs[index - 1].songname;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      prevIndex = index;
      prevAction = "play";
    }
  });
});

//5.for the previous button
document.getElementById("prev").addEventListener("click", () => {
  let lastPlayed;
  if (index == 1) {
    lastPlayed = 1;
    index = 7;
  } else {
    lastPlayed = index;
    index -= 1;
  }
  audioElement.src = `songs/${index}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSong.innerHTML = songs[index - 1].songname;
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  document
    .getElementsByClassName("playButton")
    [lastPlayed - 1].classList.remove("fa-circle-pause");
  document
    .getElementsByClassName("playButton")
    [lastPlayed - 1].classList.add("fa-circle-play");
  songItems[lastPlayed - 1].style.backgroundColor = "white";
  document
    .getElementsByClassName("playButton")
    [index - 1].classList.remove("fa-circle-play");
  document
    .getElementsByClassName("playButton")
    [index - 1].classList.add("fa-circle-pause");
  songItems[index - 1].style.backgroundColor = "#1db954";
});
//6.for the next button
document.getElementById("next").addEventListener("click", () => {
  let lastPlayed;
  if (index == 7) {
    lastPlayed = 7;
    index = 1;
  } else {
    lastPlayed = index;
    index += 1;
  }
  audioElement.src = `songs/${index}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterSong.innerHTML = songs[index - 1].songname;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  document
    .getElementsByClassName("playButton")
    [lastPlayed - 1].classList.remove("fa-circle-pause");
  document
    .getElementsByClassName("playButton")
    [lastPlayed - 1].classList.add("fa-circle-play");
  songItems[lastPlayed - 1].style.backgroundColor = "white";
  document
    .getElementsByClassName("playButton")
    [index - 1].classList.remove("fa-circle-play");
  document
    .getElementsByClassName("playButton")
    [index - 1].classList.add("fa-circle-pause");
  songItems[index - 1].style.backgroundColor = "#1db954";
});
