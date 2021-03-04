const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
const restaurants = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => restaurants.push(...data));

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.zip.match(regex) || place.zip.category(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
        return  `<li> 
        <span class="name">${place.name}</span>
        <span class="category">${place.category}</span>
        <address>${place.address_line1}${place.city}${place.state}${place.zip}${place.type}${place.owner}
        </li>`;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.Search')
const suggestions = document.querySelector('.RestaurantList')

searchInput.addEventListener('keyup', displayMatches);