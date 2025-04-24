const generateButton = document.getElementById('generate-button');
const pokemonContainer = document.getElementById('pokemon-container');
let totalPokemonCount;
async function getTotalPokemonCount() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1');
    //Just get one to get the count
    const data = await response.json();
    totalPokemonCount = data.count;
}

async function fetchPokemonData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json();
    return data;
}

function createPokemonCard(pokemonData) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    //front of the card (image)
    const front = document.createElement('div');
    front.classList.add('card-front');
    const image = document.createElement('img');
    image.src = pokemonData.sprites.front_default;
    image.alt = pokemonData.name;
    front.appendChild(image);
    card.appendChild(front);
    //back of the card (data)
    const back = document.createElement('div');
    back.classList.add('card-back');
    back
}