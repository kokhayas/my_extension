'use strict';


require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

const threshold = 0.7;

toxicity.load(threshold).then(model => {
	let all_links = document.links;
	for (let i = 0; i < all_links.length; i++) {
		let link_text = all_links[i].textContent;
		link_text = link_text.toLowerCase();

		model.classify(link_text).then(predictions => {
			// console.log(link_text);
			let detection = [];
			for (let j = 0; j < predictions.length; j++) {
				if (predictions[j]['results'][0]['match']) {
					detection.push(predictions[j]['label'])
				}
			}
			if (link_text.includes("tennis") || detection.length) {
				all_links[i].textContent = detection.toString() + "is detected"; //ここまでは動いた
				console.log(link_text);
				console.log(detection.toString());
			}
		});
	}
});







// { label: 'identity_attack', results: [[Object]] },
// { label: 'insult', results: [[Object]] },
// { label: 'obscene', results: [[Object]] },
// { label: 'severe_toxicity', results: [[Object]] },
// { label: 'sexual_explicit', results: [[Object]] },
// { label: 'threat', results: [[Object]] },
// { label: 'toxicity', results: [[Object]] }

// {
// 	"label": "identity_attack",
// 		"results": [{
// 			"probabilities": [0.9659664034843445, 0.03403361141681671],
// 			"match": false
// 		}]
// },

// toxicity.load(tr)
// let all_links = document.links;
// for (let i = 0; i < all_links.length; i++) {
// 	let link_text = all_links[i].textContent;
// 	link_text = link_text.toLowerCase();
// 	// if (link_text.includes("tennis")) {
// 	// 	all_links[i].textContent = "word tennis was detected"; //ここまでは動いた

// 	model.classify(link_text).then(predictions => {
// 		console.log(link_text)
// 		console.log(predictions[j]['label']);
// 		console.log(predictions[j]['results']['probabilities']);
// 	});
// }

// const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
// console.log(
// 	`Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
// );

// // Communicate with background file by sending a message
// chrome.runtime.sendMessage(
// 	{
// 		type: 'GREETINGS',
// 		payload: {
// 			message: 'Hello, my name is Contentscript. I am from ContentScript.',
// 		},
// 	},
// 	response => {
// 		console.log(response.message);
// 	}
// );

// // Listen for message
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// 	if (request.type === 'COUNT') {
// 		console.log(`Current count is ${request.payload.count}`);
// 	}

// 	// Send an empty response
// 	// See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
// 	sendResponse({});
// 	return true;
// });
