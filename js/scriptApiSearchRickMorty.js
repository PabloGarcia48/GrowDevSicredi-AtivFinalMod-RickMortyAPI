const foundCharacter = document.getElementById('divCards')
const btn = document.getElementById('searchBTN');
const digitedSearch = document.getElementById('search')
let nameFilteredID = 0


btn.addEventListener("click", function(e) {
    e.preventDefault();

    console.log(digitedSearch.value);
    searchCharacter()
})

async function searchCharacter() {
    try {
      const characters = (await api.get('/character')).data.results //preparação da API

      function searchName() {
        const characterName = digitedSearch.value
    
        const nameFiltered = characters.filter(character => character.name === characterName)
        nameFilteredID = nameFiltered[0].id
        console.log(nameFilteredID);
        searchCharacter1()
    }
      searchName()
      

    } catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

  async function searchCharacter1() {
    try {
      const charactersFiltered = (await api.get(`/character/${nameFilteredID}`)).data //preparação da API

        console.log(charactersFiltered.name);
        console.log(charactersFiltered.status);
        console.log(charactersFiltered.species);
        console.log(charactersFiltered.location.name);
        console.log(charactersFiltered.image);

        foundCharacter.classList.add('divCard')
        foundCharacter.innerHTML += `
        <div class="card">
          <span>
            <img class="cardImage" src= "${charactersFiltered.image}" width= "100px">
          </span>
          
          <span>
            <h2 class="cardText cardTitle">${charactersFiltered.name}</h2>
              <p class="cardText infoCard" > ${charactersFiltered.status} - ${charactersFiltered.species}</p>
              <p class="cardText" >Última localização conhecida</p>
              <p class="cardText infoCard" >${charactersFiltered.location.name}</p>
              <p class="cardText" >Visto última vez em:</p>
              <p class="cardText infoCard" >Nome do capitulo</p>
          </span>
        </div>
        <div class="separator"></div>
      `

    } catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

