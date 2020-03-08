const app = document.getElementById('root'); // access our root div

const logo = document.createElement('img'); // create img element
logo.src = 'logo.png'; //set src attribute

const container = document.createElement('div'); // create div element and set class attribute to container
container.setAttribute('class', 'container');

app.appendChild(logo); // append logo image to app root
app.appendChild(container); // append container div to app root

// Create a request variable and assign a new XMLHttpRequest object to it
var request = new XMLHttpRequest();
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function() {
	// Access JSON data here
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
		data.forEach((movie) => {
			// create a div with a card class
			const card = document.createElement('div');
			card.setAttribute('class', 'card');

			// Create an h1 and set the text content to the film's title
			const h1 = document.createElement('h1');
			h1.textContent = movie.title;

			// Create a paragraph and set the text content to the film's description
			const p = document.createElement('p');
			movie.description = movie.description.substring(0, 300); // limit to 300 chars
			p.textContent = `${movie.description}...`; // End with ellipses

			// Append the cards to the container element
			container.appendChild(card);
			// Each card will contain an h1 and a p
			card.appendChild(h1);
			card.appendChild(p);
		});
	} else {
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Gah, it's not working!`;
		app.appendChild(errorMessage);
	}
};
// Send request
request.send();
