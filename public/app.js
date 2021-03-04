async function windowActions(){
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
    const restaurants = [];
    const request = await fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaurants.push(...data));
    
    function findMatches(wordToMatch, restaurants) {
        return restaurants.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.name.match(regex) || place.zip.match(regex) || place.category.match(regex)
        });
    }
    
    function displayMatches(event) {
        const matchArray = findMatches(document.getElementById("search").value, restaurants);
        console.log(document.getElementById("search").value);
        const html = matchArray.map(place => {
            return  `<li> 
            <span class="name">${place.name}</span>
            <span class="category">${place.category}</span>
            <address>${place.address_line_1}${place.city}${place.state}${place.zip}${place.type}${place.owner}</address>
            </li>`;
        }).join('');
        suggestions.innerHTML = html;
    }
    
    const searchInput = document.querySelector('.userform')
    const suggestions = document.querySelector('.RestaurantList')
    
    searchInput.addEventListener('submit', (evt) => { evt.preventDefault()
        displayMatches(evt) });
    }
    
    window.onload = windowActions;