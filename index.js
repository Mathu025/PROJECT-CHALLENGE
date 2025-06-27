const baseUrl = "https://json-server-1-u08x.onrender.com/games";

const searchInput = document.getElementById('searchInput');
const platformFilter = document.getElementById('platformFilter');
const genreFilter = document.getElementById('genreFilter');
const gameList = document.getElementById('gameList')

let allGames = [];

function fetchGames() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            allGames = data;
            renderGames(data);
        })
        .catch(err => console.error('Failed to load games from the server!', err));
}

function renderGames(games = allGames) {
    gameList.innerHTML = '';

    if (games.length === 0) {
        const message = document.createElement('p')
        message.className = 'text-center text-red-400 text-xl col-span-full';
        message.textContent = 'No games found matching your criteria!'
        gameList.appendChild(message)
        return;
    }

    games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game-card border rounded-2xl p-4';
        div.setAttribute('data-genre', game.genre);
        div.setAttribute('data-platform', game.platform)

        div.innerHTML = `
            <img class="border rounded" src="${game.image}" alt="${game.title} width="350" height="250"><br>
            <h3 class="text-2xl mb-2"><strong>${game.title}</strong></h3>
            <p><strong>Genre:</strong> ${game.genre}</p>
            <p><strong>Platform:</strong> ${game.platform}</p>
            <p><strong>Rating:</strong> ${game.rating}</p>
        `;
        gameList.appendChild(div);
    })
}

function handleFilterorSearch() {
    const SelectedGenre = genreFilter.value.toLowerCase();
    const SelectedPlatform = platformFilter.value.toLowerCase();
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = allGames.filter(game => {
        const matchesSearch = game.title && game.title.toLowerCase().includes(searchTerm);
        const matchesGenre = SelectedGenre === '' || game.genre && game.genre.toLowerCase() === SelectedGenre;
        const matchesPlatform = SelectedPlatform === '' || game.platform && game.platform.toLowerCase() === SelectedPlatform;
        
        return matchesGenre && matchesPlatform && matchesSearch;
    });
    renderGames(filtered)
}

genreFilter.addEventListener('change', handleFilterorSearch);
platformFilter.addEventListener('change', handleFilterorSearch);
searchInput.addEventListener('input', handleFilterorSearch);

document.addEventListener('DOMContentLoaded', fetchGames);