const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail){
     const pokemon = new Pokemon()
     pokemon.name = pokemonDetail.name
     pokemon.number = pokemonDetail.id
     
     const status = pokemonDetail.stats.map((baseStat) => baseStat.base_stat)
     const [hp, attack, defense] = status

     pokemon.hp = hp
     pokemon.attack = attack
     pokemon.defense = defense

     pokemon.height = pokemonDetail.height
     pokemon.weight = pokemonDetail.weight

     
     const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
     const [type] = types

     pokemon.types = types
     pokemon.type = type

     pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

     return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url).then((response) => response.json()) 
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonInfo = (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url).then((response) => response.json()) 
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequets) => Promise.all(detailRequets))
        .then((pokemonDetails) => pokemonDetails)
}

