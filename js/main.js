window.onload = () => {
	'use strict'

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js').then(() => {
			console.log('Service worker registered successfully.')
		}).catch(error => {
			console.error('Service worker registration failed:', error);
		});
	}
}
