const allCharacters = document.getElementById('divCards')
const separator1 = document.getElementById('separator')

async function bodyInformation() {
    try {
      const characters = (await api.get('/character')).data.results //preparação da API

      let cardIndex = 0

      characters.forEach(character => {
        // console.log(character.name);
        // console.log(character.status);
        // console.log(character.species);
        // console.log(character.location.name);
        // console.log(character.image);
        cardIndex += 1
        
        allCharacters.classList.add('divCard')

        if (cardIndex % 2 === 0) {
          allCharacters.innerHTML += `
          <div class="card">
            <span>
              <img class="cardImage" src= "${character.image}" width= "100px">
            </span>
            
            <span>
              <h2 class="cardText cardTitle">${character.name}</h2>
                <p class="cardText infoCard" >${character.status} - ${character.species}</p>
                <p class="cardText" >Última localização conhecida</p>
                <p class="cardText infoCard" >${character.location.name}</p>
                <p class="cardText" >Visto última vez em:</p>
                <p class="cardText infoCard" >Nome do capitulo</p>
            </span>
          </div>
          <div class="separator"></div>
        `
        } else {
          allCharacters.innerHTML += `
          <div class="card">
            <span>
              <img class="cardImage" src= "${character.image}" width= "100px">
            </span>
            
            <span>
              <h2 class="cardText cardTitle">${character.name}</h2>
                <p class="cardText infoCard" >${character.status} - ${character.species}</p>
                <p class="cardText" >Última localização conhecida</p>
                <p class="cardText infoCard" >${character.location.name}</p>
                <p class="cardText" >Visto última vez em:</p>
                <p class="cardText infoCard" >Nome do capitulo</p>
            </span>
          </div>
          `
        }

      });





    } catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

  bodyInformation()