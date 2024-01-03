let paginaAtual = 0

async function buscador(page) {
  const busca = document.getElementById("search").value
  
    try {
       const characters = (await api.get(`/character/?name=${busca}&page=${page}`)).data.results //resultado da busca
       renderizador(characters)
      }
    catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

function renderizador(characters) {
  const allCharacters = document.getElementById('divCards')
  const separator1 = document.getElementById('separator')
  let cardIndex = 0
  allCharacters.innerHTML = "" // limpa tudo na tela
      characters.forEach(character => { //preenche a tela de novo
     
        const characterStatus = character.status
        switch (characterStatus) {
          case "Dead":
            trafficLight = "🔴";
            break;
          case "Alive":
            trafficLight = "🟢";
            break;
          case "unknown":
            trafficLight = "🟤";
            break;
        }

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
                <p class="cardText infoCard" >${trafficLight} ${character.status} - ${character.species}</p>
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
                <p class="cardText infoCard">${trafficLight} ${character.status} - ${character.species}</p>
                <p class="cardText" >Última localização conhecida</p>
                <p class="cardText infoCard" >${character.location.name}</p>
                <p class="cardText" >Visto última vez em:</p>
                <p class="cardText infoCard" >Nome do capitulo</p>
            </span>
          </div>
          `
        }
})

}
buscador()
