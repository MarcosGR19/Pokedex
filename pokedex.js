
// -----------------GLOBAL VARIABLES-----------------
let screenPokemons = []; //Pokemons to show on screen
let currentPos = 1; //Position of selector in screen
let  firstPokemonId = 1; // Id of the first Pokemon in the screen

// -----------------FUNCTIONS-----------------
//GET POKEMON INFO
const getPokemonById = async (i) =>{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+i);
    const res = await response.json();

    const pokemon = {
        name: res.name,
        image: res.sprites['front_default'],
        type: res.types.map((type) => type.type.name).join(' - '),
        id: res.id,
        nGames: res.game_indices.length
    };

    return pokemon;
}

const showPokemons = async () =>{
    // ol-father
    const ol = document.querySelector('ol');
    
    for (i=1; i<=9;i++){
        const pokemon = await getPokemonById(i);
        // li-son
        const li = document.createElement('li');
        li.style.width = '96px';
        li.style.height = '96px';
        li.id = 'li-'+i;
        li.className = 'li-pokemon';
        //Get Information for 1st Pokemon
        if (i==1){
            //Get index
            li.style.border= '2px groove red';
            //Get Container
            const container2 =  document.querySelector('.pokedex-container-2');
            //Set name
            const nameContainer = document.querySelector('.pokedex-container-2__name')
            const name = document.createElement('span');
            name.id = 'pokemon-name';
            name.className = 'pokedex-container-2__name--value';
            name.innerHTML = pokemon.name.toUpperCase();
            name.style.color = 'white';
            nameContainer.appendChild(name);
            //Set Type
            const typeContainer = document.querySelector('.pokedex-container-2__type')
            const type = document.createElement('span');
            type.id = 'pokemon-type';
            type.className = 'pokedex-container-2__type--value';
            type.innerHTML = pokemon.type.toUpperCase();
            type.style.color = 'white';
            typeContainer.appendChild(type);
            //Set ID
            const idPokemonContainer = document.querySelector('.pokedex-container-2__id')
            const idPokemon = document.createElement('span');
            idPokemon.innerHTML = pokemon.id;
            idPokemon.style.color = 'white';
            idPokemon.id = 'pokemon-id';
            idPokemonContainer.appendChild(idPokemon);
            //Set nGames
            const nGamesContainer = document.querySelector('.pokedex-container-2__nGames')
            const nGames = document.createElement('span');
            nGames.innerHTML = pokemon.nGames;
            nGames.style.color = 'white';
            nGames.id = 'pokemon-nGames';
            nGamesContainer.appendChild(nGames);
        }
        //append to ol.father
        ol.appendChild(li);
        
        //Img
        const img = document.createElement('img');
        img.id = 'pokemon-img-'+i;
        img.src=`${pokemon.image}`;
        li.appendChild(img);
        // Type
        // const type = document.createElement('type');
        // type.innerHTML = pokemon.type;
        // li.appendChild(type);

        //Put pokemons in list
        screenPokemons.push(pokemon);
    }
}

// POKEMON LIST
// let currentPos = 1;
// const pokemonList = [];

// const createArrayPokemons150 = async () => {
//     for (i=1; i<=150; i++){
//         const pokemon = await getPokemonById(i);
//         pokemonList.push(pokemon);
//     }
// }

// const createArrayPokemons905 = async () => {
//     for (i=151; i<=905; i++){
//         const pokemon = await getPokemonById(i);
//         pokemonList.push(pokemon);
//     }
// }

// -----------------MOVE IN MENU-----------------
// CHANGE CURRENT POS
const drawIndex = (prevIndex, newIndex) => {
    //Delete prev index
    const prevItem = document.querySelector('#li-'+prevIndex);
    prevItem.style.border = 'None';

    //create new index
    const newItem = document.querySelector('#li-'+newIndex);
    newItem.style.border= '2px groove red';

}

// MOVE FUNCTIONS
const moveDown = async(currentPos, screenPokemons) => {
    const firstPokemonId = await screenPokemons[0].id;
    switch (currentPos) {
        case 1:
            drawIndex(1,4);
            return [4, screenPokemons];
        case 2:
            drawIndex(2,5);
            return [5, screenPokemons];
        case 3:
            drawIndex(3,6);
            return [6, screenPokemons];
        case 4:
            drawIndex(4,7);
            return [7, screenPokemons];
        case 5:
            drawIndex(5,8);
            return [8, screenPokemons];
        case 6:
            drawIndex(6,9);
            return [9, screenPokemons];
        case 7:
            if (firstPokemonId <895){
                screenPokemons = await updatePokemons(firstPokemonId+3);
            }
            return [7, screenPokemons];
        case 8:
            if (firstPokemonId <895){
                screenPokemons = await updatePokemons(firstPokemonId+3);
            }
            return [8, screenPokemons];
        case 9:
            if (firstPokemonId <895){
                screenPokemons = await updatePokemons(firstPokemonId+3);
            }
            return [9, screenPokemons];
    }
}

const moveUp = async (currentPos,screenPokemons) => {
    const firstPokemonId = screenPokemons[0].id;
    switch (currentPos) {
        case 1:
            if (firstPokemonId !== 1) {
                screenPokemons = await updatePokemons(firstPokemonId - 3);
            }
            return [1, screenPokemons];
        case 2:
            if (firstPokemonId !== 1) {
                screenPokemons = await updatePokemons(firstPokemonId - 3);
            }
            return [2, screenPokemons];
        case 3:
            if (firstPokemonId !== 1) {
                screenPokemons = await updatePokemons(firstPokemonId - 3);
            }
            return [3, screenPokemons];
        case 4:
            drawIndex(4,1);
            return [1, screenPokemons];
        case 5:
            drawIndex(5,2);
            return [2, screenPokemons];
        case 6:
            drawIndex(6,3);
            return [3, screenPokemons];
        case 7:
            drawIndex(7,4);
            return [4, screenPokemons];
        case 8:
            drawIndex(8,5);
            return [5, screenPokemons];
        case 9:
            drawIndex(9,6);
            return [6, screenPokemons];
    }
}

const moveRight = async(currentPos,screenPokemons) => {
    const firstPokemonId = screenPokemons[0].id;
    switch (currentPos) {
        case 1:
            drawIndex(1,2);
            return [2, screenPokemons];
        case 2:
            drawIndex(2,3);
            return [3, screenPokemons];
        case 3:
            drawIndex(3,4);
            return [4, screenPokemons];
        case 4:
            drawIndex(4,5);
            return [5, screenPokemons];
        case 5:
            drawIndex(5,6);
            return [6, screenPokemons];
        case 6:
            drawIndex(6,7);
            return [7, screenPokemons];
        case 7:
            drawIndex(7,8);
            return [8, screenPokemons];
        case 8:
            drawIndex(8,9);
            return [9, screenPokemons];
        case 9:
            if (firstPokemonId <895){
                screenPokemons = await updatePokemons(firstPokemonId + 3);
            }
            drawIndex(9,7); 
            return [7, screenPokemons];
    }
}

const moveLeft = async (currentPos,screenPokemons) => {
    const firstPokemonId = screenPokemons[0].id;
    switch (currentPos) {
        case 1:
            if (firstPokemonId !== 1){
                screenPokemons = await updatePokemons(firstPokemonId - 3);
            }
            drawIndex(1,3);
            return [3, screenPokemons];
        case 2:
            drawIndex(2,1);
            return [1, screenPokemons];
        case 3:
            drawIndex(3,2);
            return [2, screenPokemons];
        case 4:
            drawIndex(4,3);
            return [3, screenPokemons];
        case 5:
            drawIndex(5,4);
            return [4, screenPokemons];
        case 6:
            drawIndex(6,5);
            return [5, screenPokemons];
        case 7:
            drawIndex(7,6);
            return [6, screenPokemons];
        case 8:
            drawIndex(8,7);
            return [7, screenPokemons];
        case 9:
            drawIndex(9,8);
            return [8, screenPokemons];
    }
}

// UPDATE POKEMONS
const updatePokemons= async(firstPokemonId)=>{
    for (i=1;i<=9;i++){       
        const img = document.querySelector('#pokemon-img-'+i);
        const index = firstPokemonId + i - 1;
        pokemon = await getPokemonById(index);
        img.src=`${pokemon.image}`;

        screenPokemons[i-1] = pokemon;
    }

    return screenPokemons;
}

const moveRules = async (event) => {
    console.log('BEFORE:\n' + obtainPokeMatrix(screenPokemons));
    // console.log('CurrentPos:' + currentPos);
    // console.log('First index:' + screenPokemons[0].id);

    switch(event.keyCode){
        case 37: // Izquierda
            [currentPos, screenPokemons] = await moveLeft(currentPos,screenPokemons);
            break;
        case 38: // Arriba
            [currentPos, screenPokemons] = await moveUp(currentPos,screenPokemons);
            break;
        case 39: // Derecha
            [currentPos, screenPokemons] = await moveRight(currentPos,screenPokemons);
            break;
        case 40: // Bajar
            [currentPos, screenPokemons] = await moveDown(currentPos,screenPokemons);
            break;
    }
}

const moveRulesPlusTop = async() => {
    [currentPos, screenPokemons] = await moveUp(currentPos,screenPokemons);
    console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
    console.log('CurrentPos:' + currentPos);
    console.log('First index:' + screenPokemons[0].id);
    console.log('---')
    getPokemonInfo(screenPokemons,currentPos);
}

const moveRulesPlusBot = async() => {
    [currentPos, screenPokemons] = await moveDown(currentPos,screenPokemons);
    console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
    console.log('CurrentPos:' + currentPos);
    console.log('First index:' + screenPokemons[0].id);
    console.log('---')
    getPokemonInfo(screenPokemons,currentPos);
}

const moveRulesPlusLeft = async() => {
    [currentPos, screenPokemons] = await moveLeft(currentPos,screenPokemons);
    console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
    console.log('CurrentPos:' + currentPos);
    console.log('First index:' + screenPokemons[0].id);
    console.log('---')
    getPokemonInfo(screenPokemons,currentPos);
}

const moveRulesPlusRight = async() => {
    [currentPos, screenPokemons] = await moveRight(currentPos,screenPokemons);
    console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
    console.log('CurrentPos:' + currentPos);
    console.log('First index:' + screenPokemons[0].id);
    console.log('---')
    getPokemonInfo(screenPokemons,currentPos);
}


// Get Pokemon Info
const getPokemonInfo = (screenPokemons,currentPos) => {
    const pokemon = screenPokemons[currentPos - 1]
    // Name
    const namePokemon = document.querySelector('#pokemon-name');
    namePokemon.innerHTML = pokemon.name.toUpperCase();
    // Type
    const typePokemon = document.querySelector('#pokemon-type');
    typePokemon.innerHTML = pokemon.type.toUpperCase();
    // ID
    const idPokemon = document.querySelector('#pokemon-id');
    idPokemon.innerHTML = pokemon.id;
    // nGames
    const nGames = document.querySelector('#pokemon-nGames');
    nGames.innerHTML = pokemon.nGames;
}

// Obtain showed Pokemons to names Matrix
const obtainPokeMatrix = (screenPokemons)=> {
    let list = [];
    screenPokemons.forEach((item)=>{
        list.push(item.name);
    });
    const result = `[${list[0]}  ${list[1]}  ${list[2]}]\n[${list[3]}  ${list[4]}  ${list[5]}]\n[${list[6]}  ${list[7]}  ${list[8]}]`
    return result;
}

window.onload = async () => {
    
    await showPokemons();

    let lockKey = false;
    document.body.onkeydown = async function(event){
        if(lockKey === false){
            lockKey = true;
            await moveRules(event);
            console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
            console.log('CurrentPos:' + currentPos);
            console.log('First index:' + screenPokemons[0].id);
            console.log('---')
            getPokemonInfo(screenPokemons,currentPos);
            lockKey= false;
        }
    }
    
}

