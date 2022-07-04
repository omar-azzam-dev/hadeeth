/* -------------------------------- Variables ------------------------------- */
const pageLoader = document.querySelector('.page-loader');
const hadeethLoader = document.querySelector('.hadeeth-loader');
const hadeethAudio = document.querySelector('.hadeeth-audio');
const hadeethText = document.querySelector('.hadeeth-text');
const newHadeeth = document.querySelector('.new-hadeeth');
const audioCreator = document.querySelector('.audio-creator');
const logo = document.querySelector('.logo');

const ahadeethCount = 1;
/* ------------------------------------ * ----------------------------------- */

/* --------------------------- Event Listiners --------------------------- */
document.addEventListener('hadeethLoaded', function (e) {
	hadeethLoader.classList.add('hide');
});

newHadeeth.addEventListener('click', function (e) {
	hadeethLoader.classList.remove('hide');
	hadeethText.innerText = '';
	hadeethAudio.src = '';
	setTimeout(function (e) {
		getNewHadeeth();
	}, 1000);
});

window.onload = function (e) {
	setTimeout(() => removePageLoader(), 1000);
};
/* ------------------------------------ * ----------------------------------- */

/* ---------------------------------- Code ---------------------------------- */
sessionStorage.setItem('watched', '');
getNewHadeeth();
/* ------------------------------------ * ----------------------------------- */

/* -------------------------------- Functions ------------------------------- */
function getNewHadeeth() {
	let randomNum;

	if (getNewHadeeth.erroredTextLoad !== undefined) {
		clearTimeout(getNewHadeeth.erroredTextLoad);
		getNewHadeeth.erroredTextLoad = undefined;
	}
	if (getNewHadeeth.erroredAudioLoad !== undefined) {
		clearTimeout(getNewHadeeth.erroredAudioLoad);
		getNewHadeeth.erroredAudioLoad = undefined;
	}

	function getUniqueRandomNum() {
		let unique = false;
		let readed = sessionStorage.getItem('watched').split(',');
		if (readed.length - 1 === ahadeethCount) {
			sessionStorage.setItem('watched', '');
			readed = [''];
		}
		while (!unique) {
			randomNum = Math.floor(Math.random() * ahadeethCount + 1);
			unique = true;
			for (num of readed) {
				if (randomNum == num) {
					unique = false;
				}
			}
		}
		sessionStorage.setItem('watched', sessionStorage.getItem('watched') + randomNum + ',');
	}
	function getHadeethAudio() {
		hadeethAudio.src = `./sounds/${randomNum}.mp3`;
		hadeethAudio.onerror = (e) => {
			getNewHadeeth.erroredAudioLoad = setTimeout(getHadeethAudio, 2000);
		};
	}
	function getHadeethText() {
		fetch(`/el-ahadeeth/${randomNum}.txt`)
			.then((resp) => {
				if (resp.ok) {
					return resp.text();
				}
			})
			.then((text) => {
				if (text !== undefined) {
					let lines = text.split('\n');
					let data = lines.shift().split(',');
					text = lines.join('\n');

					audioCreator.innerText = data[0];
					audioCreator.setAttribute('href', data[1]);

					hadeethText.innerText = text;
					document.dispatchEvent(new Event('hadeethLoaded'));
				} else {
					getNewHadeeth.erroredTextLoad = setTimeout(() => getHadeethText(), 2000);
				}
			});
	}

	getUniqueRandomNum();
	getHadeethAudio();
	getHadeethText();
}

function removePageLoader() {
	pageLoader.style.animation = 'hide 1s ease-out 0s 1 normal forwards';
	logo.classList.remove('page-loader-logo');
	hadeethLoader.classList.remove('page-loader-hadeeth-loader');
	setTimeout(function (e) {
		pageLoader.remove();
	}, 1000);
}
/* ------------------------------------ * ----------------------------------- */
