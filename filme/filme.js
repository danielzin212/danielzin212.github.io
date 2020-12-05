const idFilm = new URLSearchParams(window.location.search).get('id');
const filmHtml = $('#film');

function getHomePage(homepage) {
    if(!homepage) return '';
    return `<a href="${homepage}" class="card-link">Ir para página do filme</a>`;
}

function mapGenres(genres) {
    if ( !(genres && genres.length) ) return '';
    const genresBadges = genres.map(g => 
            `<span class="badge badge-light mr-1">${g.name}</span>`
        ).reduce((s1, s2) => s1 + s2);
    return `<p>
                ${genresBadges}
            </p>`;
}


function mapMovie(movie) {
    console.log(mapGenres(movie.genres));
    const imgurl = movie.backdrop_path
                    ? `${BASE_URL_IMAGES}/${IMAGE_SIZE_W1280}/${movie.backdrop_path}`
                    : '' ;
    return `<div class="card bg-dark text-white">
                <img style="${!movie.backdrop_path ? 'min-height: 300px' : ''}" src="${imgurl}" class="card-img">
                <div class="card-img-overlay">
                    <h1 class="card-title">${movie.title}</h1>
                    ${mapGenres(movie.genres)}
                    <p class="card-text">${movie.overview}</p>
                    <p class="card-text">
                        ${ new Date(movie.release_date).toLocaleDateString()}
                    </p>
                    <p class="card-text">Avaliação: ${movie.vote_average} / 10</p>
                    ${getHomePage(movie.homepage)}
                </div>
            </div>`;
}

$(document).ready(
    async () => {
        const movie = await getMovie(idFilm);
        console.log(movie);
        filmHtml.html((mapMovie(movie)));
    }
);