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
