const inputSearch = document.getElementById('search');
const pokedexContainer = document.getElementById('pokedex');
const buttonSearch = document.getElementById('btn');
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokeName = document.querySelector('.pokemon-name');
const pokeImg = document.querySelector('.pokemon-img');
const pokeId = document.querySelector('.pokemon-id')
const pokeType = document.querySelector('.pokemon-type');

//Colores de los types
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

//Funcion que llama a la api
async function getPokemon() {
    //Searcher
    const searchedPokemon = inputSearch.value.toLowerCase();
    
    //Llamado a la api
    const api = await fetch(URL + searchedPokemon);

    if (api.status === 200) {
        const data = await api.json()
        return data;
    }

}

//Funcion que renderiza datos de la api
async function renderPokemon() {

    //Llamado a la funcion con los datos de la api
    const data = await getPokemon();

    //Renderizar datos
    if (data) {
        pokeName.innerHTML = data.name.toUpperCase();
        pokeImg.src = data.sprites.front_default;
        pokeId.innerHTML = data.id;
        pokeType.innerHTML = data.types.map(type => type.type.name);

        const types = data.types.map(type => type.type.name);
        pokeType.innerHTML = types.map(type => {
            const color = typeColors[type] || typeColors['default'];
            return `<span style="background-color: ${color}; color: black; padding: 4px 8px; border-radius: 5px; margin-right: 5px;">${type}</span>`;
        }).join('');

    } else {
        pokeName.innerHTML = 'Not found';
        pokeImg.innerHTML = '';
        pokeId.innerHTML = '?';
        pokeType.innerHTML = '';
    }
}


buttonSearch.addEventListener("click", renderPokemon);

inputSearch.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        renderPokemon();
    }
});