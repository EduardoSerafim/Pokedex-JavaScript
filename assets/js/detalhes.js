const detalhes =  document.querySelector('.detalhesPokemon')


function convertPokemonHTML(pokemon){
    return `
    <h1>${pokemon.name}</h1>
    <div class="img ${pokemon.type}">
        <img class="img-pokemon " src="${pokemon.photo}" alt="pokemon">
        <span class="number">#${pokemon.number}</span>

    </div>


    <ul class="tipos">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    </ul>

    <div class="status">
        <ul class="info">
            <li>Peso</li>
            <li>Altura</li>
            <li>HP</li>
            <li>Ataque</li>
            <li>Defesa</li>
        </ul>
        <ul class="valores">
            <li>${pokemon.weight}</li>
            <li>${pokemon.height}</li>
            <li>${pokemon.hp}</li>
            <li>${pokemon.attack}</li>
            <li>${pokemon.defense}</li>
        </ul>
    </div>
        
    
    `
}


function detalhesPokemon(id){
    pokeApi.getPokemonInfo(id).then((pokemon)=>{
       const newHtml = convertPokemonHTML(pokemon)
       detalhes.innerHTML = newHtml
    })
}

detalhesPokemon(localStorage.getItem('id'))




