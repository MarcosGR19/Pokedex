// -----------------GET POKEMON INFO-----------------
const getPokemonById = async (i) =>{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+i);
    const res = await response.json();
    const pokemon = {
        name: res.name,
        image: res.sprites['front_default'],
        type: res.types.map((type) => type.type.name).join(' - '),
        id: res.id,
        height: res.height,
        ps: res.stats[0].base_stat,
        atk: res.stats[1].base_stat,
        def: res.stats[2].base_stat,
        spAtk: res.stats[3].base_stat,
        spDef: res.stats[4].base_stat,
        speed: res.stats[5].base_stat
    };
    return pokemon;
}

// -----------------FUNTIONS FOR CREATING STAT BAR SYSTEM-----------------
const getNumBars = (pokemonStat) => {
    if (pokemonStat<=20){
        return 1;
    } else if (pokemonStat >20 && pokemonStat<=40){
        return 2;
    } else if (pokemonStat >40 && pokemonStat<=60){
        return 3;
    } else if (pokemonStat >60 && pokemonStat<=80){
        return 4;
    } else if (pokemonStat >80 && pokemonStat<=100){
        return 5;
    } else if (pokemonStat >100){
        return 6;
    } 
}// return int 1-6

const createLines = (container,n) => {
    for (i = 1; i <= n; i++){
        const child = document.createElement('div');
        child.className = 'white-box';
        container.appendChild(child)
    }
}

// -----------------PRINT POKEMON ON SCREEN-----------------
const printPokemon = async (index) => {
    // Select ol-father
    const ol = document.querySelector('ol');

    pokemon = await getPokemonById(index);
    //Put pokemons in list
    
    // Create li Element
    const li = document.createElement('li');
    li.style.width = '96px';
    li.style.height = '96px';
    li.id = 'li-'+index;
    li.className = 'li-pokemon';
    
    // -----------------SPECIAL CASE FOR WHEN ID = 1 > SHOW ON SCREEN INFO OF POKEMON-----------------
    if (index==1){
        //Put Border Select on findexrst li-item
        li.style.border= '2px groove red';
        //Set name on screen
        const nameContainer = document.querySelector('.pokedex-container-2__name')
        const name = document.createElement('span');
        name.id = 'pokemon-name';
        name.className = 'pokedex-container-2__name--value';
        name.innerHTML = pokemon.name.toUpperCase();
        name.style.color = 'white';
        nameContainer.appendChild(name);
        //Set Type on screen
        const typeContainer = document.querySelector('.pokedex-container-2__type')
        const type = document.createElement('span');
        type.id = 'pokemon-type';
        type.className = 'pokedex-container-2__type--value';
        type.innerHTML = pokemon.type.toUpperCase();
        type.style.color = 'white';
        typeContainer.appendChild(type);
        //Set ID on screen
        const idPokemonContainer = document.querySelector('.pokedex-container-2__id')
        const idPokemon = document.createElement('span');
        idPokemon.innerHTML = pokemon.id;
        idPokemon.style.color = 'white';
        idPokemon.id = 'pokemon-id';
        idPokemonContainer.appendChild(idPokemon);
        //Set height on screen
        const heightContainer = document.querySelector('.pokedex-container-2__height')
        const height = document.createElement('span');
        height.innerHTML = pokemon.height + ' dm';
        height.style.color = 'white';
        height.id = 'pokemon-height';
        heightContainer.appendChild(height);
        //Set Stats on screen
        const containerPS = document.querySelector('.PS');
        createLines(containerPS,getNumBars(pokemon.ps));
        const containerATK = document.querySelector('.ATK');
        createLines(containerATK,getNumBars(pokemon.atk));
        const containerDEF = document.querySelector('.DEF');
        createLines(containerDEF,getNumBars(pokemon.def));
        const containerSPATK = document.querySelector('.SP-ATK');
        createLines(containerSPATK,getNumBars(pokemon.spAtk));
        const containerSPDEF = document.querySelector('.SP-DEF');
        createLines(containerSPDEF,getNumBars(pokemon.spDef));
        const containerSPEED = document.querySelector('.SPEED');
        createLines(containerSPEED,getNumBars(pokemon.speed));
    }
    
    // Define image element
    const img = document.createElement('img');
    img.id = 'pokemon-img-'+index;
    img.src=`${pokemon.image}`;

    //append img to li-item
    li.appendChild(img);
    //append li-item to ol.father
    ol.appendChild(li);

    return pokemon;
}

// -----------------MOVING FUNCTIONALITIES-----------------

// --------------------FUNTION TO MOVE RED CURSOR--------------------
const drawIndex = (prevIndex, newIndex) => {
    //Delete prev index
    const prevItem = document.querySelector('#li-'+prevIndex);
    prevItem.style.border = 'None';

    //create new index
    const newItem = document.querySelector('#li-'+newIndex);
    newItem.style.border= '2px groove red';
    
}

// --------------------WITH CLICK--------------------
const addClick = (click, currentPos) => {
    const prevItem = document.querySelector('#li-'+currentPos);
    prevItem.style.border = 'None';

    //Obtain index selected from click
    clickIndex = parseInt(click.target.id[click.target.id.length-1]);
    
     // create new index select
    const newItem = document.querySelector('#li-'+clickIndex);
    newItem.style.border= '2px groove red';
    
    return currentPos = clickIndex;
}

// --------------------WITH SCREEN KEYS (DOES NOT WORK ANYMORE--------------------
// const moveRulesPlusTop = async() => {
//     [currentPos, screenPokemons] = await moveUp();
//     console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
//     console.log('CurrentPos:' + currentPos);
//     console.log('First index:' + screenPokemons[0].id);
//     console.log('---')
//     getPokemonInfo(screenPokemons,currentPos);
// }

// const moveRulesPlusBot = async() => {
//     [currentPos, screenPokemons] = await moveDown();
//     console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
//     console.log('CurrentPos:' + currentPos);
//     console.log('First index:' + screenPokemons[0].id);
//     console.log('---')
//     getPokemonInfo(screenPokemons,currentPos);
// }

// const moveRulesPlusLeft = async() => {
//     [currentPos, screenPokemons] = await moveLeft();
//     console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
//     console.log('CurrentPos:' + currentPos);
//     console.log('First index:' + screenPokemons[0].id);
//     console.log('---')
//     getPokemonInfo(screenPokemons,currentPos);
// }

// const moveRulesPlusRight = async() => {
//     [currentPos, screenPokemons] = await moveRight();
//     console.log('AFTER:\n' + obtainPokeMatrix(screenPokemons));
//     console.log('CurrentPos:' + currentPos);
//     console.log('First index:' + screenPokemons[0].id);
//     console.log('---')
//     getPokemonInfo(screenPokemons,currentPos);
// }

// --------------------WITH KEYS--------------------
const moveDown = async(showedPokemons,currentPos) => {
    const firstPokemonId = showedPokemons[0].id;
    switch (currentPos) {
        case 1:
            drawIndex(1,4);
            return [showedPokemons,4];
        case 2:
            drawIndex(2,5);
            return [showedPokemons,5];
        case 3:
            drawIndex(3,6);
            return [showedPokemons,6];
        case 4:
            drawIndex(4,7);
            return [showedPokemons,7];
        case 5:
            drawIndex(5,8);
            return [showedPokemons,8];
        case 6:
            drawIndex(6,9);
            return [showedPokemons,9];
        case 7:
            if (firstPokemonId <895){
                showedPokemons = await updatePokemons(showedPokemons,firstPokemonId+3);
            }
            return [showedPokemons,7];
        case 8:
            if (firstPokemonId <895){
                showedPokemons = await updatePokemons(showedPokemons,firstPokemonId+3);
            }
            return [showedPokemons,8];
        case 9:
            if (firstPokemonId <895){
                showedPokemons = await updatePokemons(showedPokemons,firstPokemonId+3);
            }
            return [showedPokemons,9];
    }
}

const moveUp = async (showedPokemons, currentPos) => {
    const firstPokemonId = showedPokemons[0].id;
    switch (currentPos) {
        case 1:
            if (firstPokemonId !== 1) {
                showedPokemons = await updatePokemons(showedPokemons,firstPokemonId - 3);
            }
            return [showedPokemons,1];
        case 2:
            if (firstPokemonId !== 1) {
                showedPokemons = await updatePokemons(showedPokemons,firstPokemonId - 3);
            }
            return [showedPokemons,2];
        case 3:
            if (firstPokemonId !== 1) {
                showedPokemons = await updatePokemons(showedPokemons,firstPokemonId - 3);
            }
            return [showedPokemons,3];
        case 4:
            drawIndex(4,1);
            return [showedPokemons,1];
        case 5:
            drawIndex(5,2);
            return [showedPokemons,2];
        case 6:
            drawIndex(6,3);
            return [showedPokemons,3];
        case 7:
            drawIndex(7,4);
            return [showedPokemons,4];
        case 8:
            drawIndex(8,5);
            return [showedPokemons,5];
        case 9:
            drawIndex(9,6);
            return [showedPokemons,6];
    }
}

const moveRight = async(showedPokemons, currentPos) => {
    const firstPokemonId = showedPokemons[0].id;
    switch (currentPos) {
        case 1:
            drawIndex(1,2);
            return [showedPokemons,2];
        case 2:
            drawIndex(2,3);
            return [showedPokemons,3];
        case 3:
            drawIndex(3,4);
            return [showedPokemons,4];
        case 4:
            drawIndex(4,5);
            return [showedPokemons,5];
        case 5:
            drawIndex(5,6);
            return [showedPokemons,6];
        case 6:
            drawIndex(6,7);
            return [showedPokemons,7];
        case 7:
            drawIndex(7,8);
            return [showedPokemons,8];
        case 8:
            drawIndex(8,9);
            return [showedPokemons,9];
        case 9:
            if (firstPokemonId <895){
                showedPokemons = await updatePokemons(showedPokemons,firstPokemonId + 3);
            }
            drawIndex(9,7); 
            return [showedPokemons,7];
    }
}

const moveLeft = async (showedPokemons, currentPos) => {
    const firstPokemonId = showedPokemons[0].id;
    switch (currentPos) {
        case 1:
            if (firstPokemonId !== 1){
                showedPokemons = await updatePokemons(showedPokemons, firstPokemonId - 3);
            }
            drawIndex(1,3);
            return [showedPokemons, 3];
        case 2:
            drawIndex(2,1);
            return [showedPokemons, 1];
        case 3:
            drawIndex(3,2);
            return [showedPokemons, 2];
        case 4:
            drawIndex(4,3);
            return [showedPokemons, 3];
        case 5:
            drawIndex(5,4);
            return [showedPokemons, 4];
        case 6:
            drawIndex(6,5);
            return [showedPokemons, 5];
        case 7:
            drawIndex(7,6);
            return [showedPokemons, 6];
        case 8:
            drawIndex(8,7);
            return [showedPokemons, 7];
        case 9:
            drawIndex(9,8);
            return [showedPokemons, 8];
    }
}

// UPDATE POKEMONS
const updatePokemons= async(showedPokemons, currentFirstPokemonId)=>{//currentFirstPokemonId is the id of the pokemon in pos li-1
    for (i=1;i<=9;i++){       
        const img = document.querySelector('#pokemon-img-'+i);
        const newIndex = currentFirstPokemonId + i - 1;
        pokemon = await getPokemonById(newIndex);
        img.src=`${pokemon.image}`;
        
        //Update showedPokemons
        showedPokemons[i-1] = pokemon;
    }

    return showedPokemons;
}


// Get Pokemon Info
const getPokemonInfo = (showedPokemons, currentPos) => {
    const pokemon = showedPokemons[currentPos - 1]
    // Name
    const namePokemon = document.querySelector('#pokemon-name');
    namePokemon.innerHTML = pokemon.name.toUpperCase();
    // Type
    const typePokemon = document.querySelector('#pokemon-type');
    typePokemon.innerHTML = pokemon.type.toUpperCase();
    // ID
    const idPokemon = document.querySelector('#pokemon-id');
    idPokemon.innerHTML = pokemon.id;
    // height
    const height = document.querySelector('#pokemon-height');
    height.innerHTML = pokemon.height + ' dm';

    //bars
    const containerPS = document.querySelector('.PS');
    containerPS.innerHTML = '';
    createLines(containerPS,getNumBars(pokemon.ps));
    const containerATK = document.querySelector('.ATK');
    containerATK.innerHTML = '';
    createLines(containerATK,getNumBars(pokemon.atk));
    const containerDEF = document.querySelector('.DEF');
    containerDEF.innerHTML = '';
    createLines(containerDEF,getNumBars(pokemon.def));
    const containerSPATK = document.querySelector('.SP-ATK');
    containerSPATK.innerHTML = '';
    createLines(containerSPATK,getNumBars(pokemon.spAtk));
    const containerSPDEF = document.querySelector('.SP-DEF');
    containerSPDEF.innerHTML = '';
    createLines(containerSPDEF,getNumBars(pokemon.spDef));
    const containerSPEED = document.querySelector('.SPEED');
    containerSPEED.innerHTML = '';
    createLines(containerSPEED,getNumBars(pokemon.speed));
}

// Obtain showed Pokemons to names Matrix (only for LOGS)
const obtainPokeMatrix = (showedPokemons)=> {
    let list = [];
    showedPokemons.forEach((item)=>{
        list.push(item.name);
    });
    const result = `[${list[0]}  ${list[1]}  ${list[2]}]\n[${list[3]}  ${list[4]}  ${list[5]}]\n[${list[6]}  ${list[7]}  ${list[8]}]`
    return result;
}

// ----------------------MAIN FLOW----------------------//
const main = async ()=> {
    let showedPokemons = []; //Pokemons to show on screen
    let currentPos = 1; //Position of selector in screen

    //----------CHARGE----------
    // Print first pokemon (takes more time)
    let pokemon = await printPokemon(1);
    showedPokemons.push(pokemon);

    // Get rest of pokemons
    for (i=2; i<=9; i++){
        pokemon = await printPokemon(i) ;
        showedPokemons.push(pokemon);
    }

    //----------MOVING FUNCTIONALITIES----------
    let lockKey = false; //var to lock the move funcitonality while we await

    // ----------Add onclick functionality (DOES NOT WORK WITH MOVING KEYS)----------
    for (i=1; i<=9; i++){
        const item = document.querySelector('#li-'+i);
        item.onclick = (click) =>{
            currentPos = addClick(click, currentPos);
            getPokemonInfo(showedPokemons, currentPos);
        } 
    }

    // ----------Add moving in screen keys - WITH EVENT LISTENERS (DOES NOT WORK WITH MOVING KEYS)----------
    const topContainer = document.querySelector('.pokedex-container-2__move--top')
    topContainer.onclick = async (click) => {
        [showedPokemons, currentPos] = await moveUp(showedPokemons,currentPos);
        getPokemonInfo(showedPokemons,currentPos);
    }

    const downContainer = document.querySelector('.pokedex-container-2__move--bot')
    downContainer.onclick = async (click) => {
        [showedPokemons, currentPos] = await moveDown(showedPokemons,currentPos);
        getPokemonInfo(showedPokemons,currentPos);
    }

    // WITH EVENT LISTENER
    // downContainer.addEventListener('click', async(click) => {
    //     [showedPokemons, currentPos] = await moveDown(showedPokemons,currentPos);
    //     getPokemonInfo(showedPokemons,currentPos);
    // })

    const leftContainer = document.querySelector('.pokedex-container-2__move--left')
    leftContainer.onclick = async (click) => {
        [showedPokemons, currentPos] = await moveLeft(showedPokemons,currentPos);
        getPokemonInfo(showedPokemons,currentPos);
    }

    const rightContainer = document.querySelector('.pokedex-container-2__move--right')
    rightContainer.onclick = async (click) => {
        [showedPokemons, currentPos] = await moveRight(showedPokemons,currentPos);
        getPokemonInfo(showedPokemons,currentPos);
    }

    // ----------Add moving keys----------
    document.addEventListener('keydown', async(event) => {
        if (lockKey ===false){
            lockKey = true;
            switch(event.keyCode){
                case 37: // Left
                    [showedPokemons, currentPos] = await moveLeft(showedPokemons,currentPos);
                    break;
                case 38: // Up
                    [showedPokemons, currentPos] = await moveUp(showedPokemons,currentPos);
                    break;
                case 39: // Right
                    [showedPokemons, currentPos] = await moveRight(showedPokemons,currentPos);
                    break;
                case 40: // Down
                    [showedPokemons, currentPos] = await moveDown(showedPokemons,currentPos);
                    break;
            }
            getPokemonInfo(showedPokemons,currentPos);
        }
        lockKey = false;
    });

}

main();


