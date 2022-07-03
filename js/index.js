const pauseBtn = document.querySelector('.main__pause');
const stopBtn = document.querySelector('.main__stop');
const indicator = document.querySelector('.audio-loader__indicator');
const audio = document.querySelector('audio');
const playBtn = document.querySelector('.main__play');
const hadeeth = document.querySelector('.hadeeth');
const newHadeethBtn = document.querySelector('button');
const hadeethLoader = document.querySelector('.hadeeth-loader');

let watchedAhadeeth = [];

let randomNum = Math.floor(Math.random() * 11);

// random num is set manually for purpose of test
randomNum = 0;

watchedAhadeeth.push(randomNum);

let audioSrc = `/sounds/${randomNum}.mp3`;
let hadeethSrc = `/el-ahadeeth/${randomNum}.txt`;

fetch(hadeethSrc)
	.then((resp) => resp.text())
	.then((text) => {
		hadeeth.innerText = text;
	});

audio.src = audioSrc;

function pageLoaded(e) {
	let loader = document.querySelector('.loader');
	let loaderLogo = document.querySelector('.loader__logo');

	loader.style.animation = 'hide 1s ease-out 0s 1 normal forwards';
	hadeethLoader.classList.remove('hadeeth-loader-page');

	setTimeout(function (e) {
		loader.remove();
	}, 1000);

	indicator.style.animation = `move ${audio.duration}s linear 0s 1 normal forwards`;
	indicator.style.animationPlayState = 'paused';

	playBtn.addEventListener('mouseenter', function (e) {
		playBtn.src = '/imgs/play-hover.png';
	});
	playBtn.addEventListener('mouseleave', function (e) {
		playBtn.src = '/imgs/play.png';
	});
	playBtn.addEventListener('click', function (e) {
		playBtn.classList.add('hide');
		pauseBtn.classList.remove('hide');
		audio.play();
		indicator.style.animationPlayState = 'running';
	});
	pauseBtn.addEventListener('click', function (e) {
		pauseBtn.classList.add('hide');
		playBtn.classList.remove('hide');
		audio.pause();
		indicator.style.animationPlayState = 'paused';
	});
	stopBtn.addEventListener('click', function (e) {
		audio.currentTime = 0;
		audio.pause();
		pauseBtn.classList.add('hide');
		playBtn.classList.remove('hide');
		indicator.style.animation = '';
		setTimeout(function (e) {
			indicator.style.animation = `move ${audio.duration}s linear 0s 1 normal forwards`;
			indicator.style.animationPlayState = 'paused';
		}, 20);
	});
	newHadeethBtn.addEventListener('click', function (e) {
		hadeeth.style.display = 'none';
		hadeethLoader.style.display = 'flex';
	});
}

window.onload = pageLoaded;
