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
    //Create the inner container for the flip effect
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    card.appendChild(cardInner); //append the inner container to the card
    //front of the card (image)
    const front = document.createElement('div');
    front.classList.add('card-front');
    const image = document.createElement('img');
    image.src = pokemonData.sprites.front_default;
    image.alt = pokemonData.name;
    front.appendChild(image);
    cardInner.appendChild(front);
    //back of the card (data)
    const back = document.createElement('div');
    back.classList.add('card-back');
    back.innerHTML = `
        <h3>${pokemonData.name}</h3>
        <p>Types: ${pokemonData.types.map(t =>
            t.type.name).join(`, `)}</p>
        <p>HP: ${pokemonData.stats.find(s =>
            s.stat.name === 'attack' )?.base_stat ||
            'N/A' }</p>
        `;  
    cardInner.appendChild(back);
    //Add event listener to toggle the 'flipped' class on click
    card.addEventListener('click', () => {
        cardInner.classList.toggle('flipped');
    });
    return card;    
}

generateButton.addEventListener('click', async () => {
    if (!totalPokemonCount)
    return; // Don't proceed if count hasn't loaded
    pokemonContainer.innerHTML = ''; //Clear precious Pokemon

    const randomIds = new Set(); //Use a Set to ensure unique IDs
    while (randomIds.size < 10) { // why size?
        const randomId = Math.floor(Math.random() * totalPokemonCount) + 1;
    //why +1 here ???
        randomIds.add(randomId);
    }
//what? vvv
    for (const id of randomIds) {
        try {
            const pokemonData = await fetchPokemonData(id);
            const card = createPokemonCard(pokemonData);
            pokemonContainer.appendChild(card);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Failed to load Pokemon ID ${id}`;
            pokemonContainer.appendChild(errorMessage);
        }
    }
})

//Fetch the total Pokemon count when the script loads
getTotalPokemonCount();
