async function windowActions() {

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
const restaurants = [];

const request = await fetch(endpoint)
.then(blob => blob.json())
.then(data => restaurants.push(...data));

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.zip.match(regex) || place.category.match(regex) || place.city.match(regex)
    });
}

function displayMatches(event) {
    const matchArray = findMatches(document.getElementById("search").value, restaurants);
    console.log(document.getElementById("search").value);
    const html = matchArray.map(place => {
        return  `<li> 
        <span class="name">${place.name}</span>
        <br/>
        <span class="category">${place.category}</span>
        <br/>
        <address>${place.address_line_1} 
        <br/>${place.city}, ${place.state} ${place.zip}</address>
        </li>`;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.RestaurantList')

searchInput.addEventListener('keyup', (evt) => { evt.preventDefault()
    displayMatches(evt) });
}

window.onload = windowActions;