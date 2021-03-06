const pauseBtn = document.querySelector('.main__pause');
const stopBtn = document.querySelector('.main__stop');
const indicator = document.querySelector('.audio-loader__indicator');
const audio = document.querySelector('audio');
const playBtn = document.querySelector('.main__play');
const plaayBtnNormal = document.querySelector('.main__play-normal')
const playBtnHover = document.querySelector('.main__play-hover')
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
		playBtnHover.classList.remove('hide');
		plaayBtnNormal.classList.add('hide');
	});
	playBtn.addEventListener('mouseleave', function (e) {
		plaayBtnNormal.classList.remove('hide');
		playBtnHover.classList.add('hide');
	});
	playBtn.addEventListener('click', function (e) {
		audio.play();
	});
	audio.addEventListener('play', function(e){
		indicator.style.animationPlayState = 'running';
		playBtn.classList.add('hide');
		pauseBtn.classList.remove('hide');
	})
	pauseBtn.addEventListener('click', function (e) {
		audio.pause();
	});
	audio.addEventListener('pause', function(e){
		indicator.style.animationPlayState = 'paused';
		pauseBtn.classList.add('hide');
		playBtn.classList.remove('hide');
	})
	audio.addEventListener('waiting', function(e){
		indicator.style.animationPlayState = 'paused';
		pauseBtn.classList.add('hide');
		playBtn.classList.remove('hide');
	})
	audio.addEventListener('playing', function(e){
		indicator.style.animationPlayState = 'running';
		playBtn.classList.add('hide');
		pauseBtn.classList.remove('hide');
	})
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
