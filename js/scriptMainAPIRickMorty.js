let currentPage = 1
let page = 1
let totalPages = 1

const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')

function previousPageFunc() {
  page = currentPage - 1
  fetchCharacters(page)
  currentPage = page
  // window.scrollTo({top: 150, behavior: 'smooth'})
  nextPage.classList.remove('invisible')
  if (currentPage <= 1) {
    prevPage.classList.add('invisible')
  }
}

function nextPageFunc() {
  page = currentPage + 1
  fetchCharacters(page)
  currentPage = page
  // window.scrollTo({top: 150, behavior: 'smooth'})
  prevPage.classList.remove('invisible')
  if (currentPage >= totalPages) {
    nextPage.classList.add('invisible')
  }
}

async function countPages() {
  try {
     totalPages = (await api.get(`/character`)).data.info.pages
    }
  catch (error) {
    console.log('Erro ao carregar a API', error)
  }
}

async function fetchCharacters(page) {
  const busca = document.getElementById("search").value  
    try {
       const characters = (await api.get(`/character/?name=${busca}&page=${page}`)).data.results //resultado da busca
       cardBuilder(characters)
       console.log(characters);
       const pageNumbers = document.getElementById('pageNumbers')
       pageNumbers.innerHTML = `${currentPage} de ${totalPages}`
      }
    catch (error) {
      console.log('Erro ao carregar a API', error)
    }
  }

function cardBuilder(characters) {
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

        const lastEpisode = character.episode[character.episode.length - 1]
        funcLastEpisodeName(lastEpisode)
        let lastEpisodeName = "vazio"
        async function funcLastEpisodeName(lastEpisode) {
          try {
            lastEpisodeName = (await api.get(`${lastEpisode}`)).data.name //resultado da busca
            console.log(lastEpisodeName);
          } catch (error) {
            console.log('Erro ao carregar a API', error)
          }
        }

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
                <p class="cardText infoCard" >${lastEpisodeName}</p>
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
})}

// async function funcLastEpisodeName(characters) {
//   let lastEpisode = ""  
//   try {
//     characters.forEach(character => { //preenche a tela de novo
//       lastEpisode = character.episode[character.episode.length - 1]
//       teste(lastEpisode)
//       async function teste(lastEpisode) {
//         try {
//           lastEpisodeName = (await api.get(`${lastEpisode}`)).data.name //resultado da busca
//           console.log(lastEpisodeName);
//         } catch (error) {
//           console.log('Erro ao carregar a API', error)
//         }
//       }
//   })
//   }
//  catch (error) {
//    console.log('Erro ao carregar a API', error)
//  }

// }


fetchCharacters(page)
countPages()