const pokemonOl =  document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 10
let offset = 0


function convertPokemonHTML(pokemon){
    
    return `
    <a class="link" href="detalhes.html" onclick="armazenarValor(${pokemon.number})">
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    </a>
        
    
    `
}

function armazenarValor(id){
    localStorage.setItem('id',id)
}


function loadMoreItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newLista = pokemons.map((pokemon) => convertPokemonHTML(pokemon))
        console.log(pokemons);
        const newHtml = newLista.join('')
        pokemonOl.innerHTML += newHtml
    
    })
}



loadMoreItens(offset, limit)

loadMoreButton.addEventListener('click', () =>{
    offset += limit
    const qtdRecords = offset + limit
    if(qtdRecords >= maxRecords){
        const newLimit = maxRecords - offset
        loadMoreItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadMoreItens(offset, limit)
    }
})






