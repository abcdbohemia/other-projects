const generateButton = document.getElementById('generate-button');
const pokemonContainer = document.getElementById('pokemon-container');
let totalPokemonCount;
async function getTotalPokemonCount() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1');
    //Just get one to get the count
    const speciesData = await response.json();
    totalPokemonCount = speciesData.count;
} //We turn the fetched data (response) from api into json

async function fetchPokemonData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemonData = await response.json();
    return pokemonData;
}
// async because this functin may have to pause its execution while waiting for api to respond 
//allowing other parts of js code to run in the meantime


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

generateButton.addEventListener('click', async () => { //async allows use of await
    if (!totalPokemonCount)
    return; // Don't proceed if count hasn't loaded
    pokemonContainer.innerHTML = ''; //Clear all previous Pokemon cards
    const randomIds = new Set(); //Use a Set to ensure unique random IDs (no repeats)
    while (randomIds.size < 10) { // use size not length for set
        const randomId = Math.floor(Math.random() * totalPokemonCount) + 1;
    // +1 here -because math random is 0 inclusive and totalPokemonCount exclusive
        randomIds.add(randomId);
    }

    //We use 'const id' in the for loop to create a new, block-scoped variable in each iteration, ensuring
    //that 'id' immutably refers to the current Pokemon ID from 'randomIds'. This prevents accidental reassignment
    //within the loop and maintains a clear, reliable reference to the specific ID being processed.
    for (const id of randomIds) { //for.. of works well with async/await in the loop
        try {  //try is part of error handling
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
