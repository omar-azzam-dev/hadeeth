let donationAmount = 0;

const chartLineReached = document.querySelector('.chart-line-reached');
const chartLine = document.querySelector('.chart-line');
const phases = document.querySelectorAll('.phase');
const info = document.querySelector('.info');
const donationInput = document.querySelector('#donation-amount');
const errMsg = document.querySelector('.err-msg');
const donateNow = document.querySelector('.donate-now');

let userDonateAmount;

function activateChart(donationAmount) {
	let chartLineRect = chartLine.getBoundingClientRect();

	let lineWidth = 100;

	if (donationAmount <= 40) {
		lineWidth += ((chartLineRect.width / 2 - 100) / 40) * donationAmount;
	} else if (donationAmount >= 500) {
		lineWidth = chartLineRect.width;
		chartLineReached.style.borderRadius = '50px';
	} else {
		lineWidth += ((chartLineRect.width / 2 - 100) / 40) * 40;
		let remainingDonation = donationAmount - 40;
		lineWidth += ((chartLineRect.width / 2 - 100) / 460) * remainingDonation;
	}

	if (donationAmount >= 0) {
		phases[0].classList.add('phase-completed');
	}
	if (donationAmount >= 40) {
		phases[1].classList.add('phase-completed');
	}
	if (donationAmount >= 500) {
		phases[2].classList.add('phase-completed');
	}

	chartLineReached.style.width = lineWidth + 'px';
}

function updateDonationInfo(donationAmount) {
	info.querySelector('.donated').children[1].innerText = donationAmount + '$';
	info.querySelector('.rest').children[1].innerText = 500 - donationAmount + '$';
}

activateChart(donationAmount);
updateDonationInfo(donationAmount);

window.addEventListener('resize', function (e) {
	activateChart(donationAmount);
});
donationInput.addEventListener('input', function (e) {
	if (isNaN(+donationInput.value)) {
		donationInput.classList.add('border-err');
		errMsg.classList.remove('hide');
		errMsg.innerText = 'يرجي كتابة ارقام فقط!';
	} else {
		donationInput.classList.remove('border-err');
		errMsg.classList.add('hide');
	}
});
donateNow.addEventListener('click', function (e) {
	if (donationInput.value === '') {
		errMsg.innerText = '!يرجي ادخال قيمه';
		donationInput.classList.add('border-err');
		errMsg.classList.remove('hide');
	} else if (!isNaN(+donationInput.value)) {
		document.querySelector('.paypal-btns').classList.remove('hide');
		userDonateAmount = donationInput.value;
	}
});
paypal
	.Buttons({
		// Sets up the transaction when a payment button is clicked
		createOrder: (data, actions) => {
			return actions.order.create({
				purchase_units: [
					{
						amount: {
							value: userDonateAmount, // Can also reference a variable or function
						},
					},
				],
			});
		},
		// Finalize the transaction after payer approval
		onApprove: (data, actions) => {
			return actions.order.capture().then(function (orderData) {
				// Successful capture! For dev/demo purposes:
				console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
				const transaction = orderData.purchase_units[0].payments.captures[0];
				alert(
					`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`
				);
				// When ready to go live, remove the alert and show a success message within this page. For example:
				// const element = document.getElementById('paypal-button-container');
				// element.innerHTML = '<h3>Thank you for your payment!</h3>';
				// Or go to another URL:  actions.redirect('thank_you.html');
			});
		},
	})
	.render('.paypal-btns');
