var moviesLoaded = 4
const api_key = "9f1afb0c0720b5f039007f83ce6b0938"
var genero = "Action"
function reqListener() {
    console.log('entrou no reg Listener')
    let obj = JSON.parse(this.responseText)
};

function erroModal(texto) {
    document.getElementById("modalBody").innerHTML = texto
    $("#modalSearchFailed").modal('show')
}

function genreListener() {
    let obj = JSON.parse(this.responseText)
    document.getElementById("genreId").innerHTML = ""
    obj.genres.forEach(el => {
        document.getElementById("genreId").innerHTML += "<option value=" + el.id + ">" + el.name + "</option>"
    })
}

function firstMoviesListener() {
    let obj = JSON.parse(this.responseText)

    document.getElementById("posteres").innerHTML = ""
    document.getElementById("posteres").innerHTML += createPosterSection(obj)
}

function createPosterSection(imgArray) {
    var imageBase = 'https://image.tmdb.org/t/p/w500/'
    var section = ''
    var imgs = ""
    let imgIndex = 0
    var numberSection = moviesLoaded / 4
    console.log('sections', numberSection)
    for (let sec = 0; sec < numberSection; sec++) {
        section += '<div class="d-flex justify-content-around m-top-16">'
        imgs = ""
        for (let index = 0; index < 4; index++) {
            const element = imgArray.results[imgIndex];
            
            imgs += "<div class=\"view overlay\"><img class=\"img-fluid\" src=" + imageBase + element.poster_path + " width=\"200px\"><div class=\"mask flex-center rgba-red-strong\"><p class=\"white-text\">Light overlay</p></div></div>"
            imgIndex++
        }
        section += imgs
        section += "</div>"
    }
    return section
}
function getGenrePathApi() {
    return 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=pt-BR'
}

function getGenrePathApi() {
    return 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key + '&language=pt-BR'
}

// este metodo retorna o link da api para retornar os dados dos filme via código
function getApiPathByCode(codFilme) {
    let apiBase = "https://api.themoviedb.org/3/movie/(cod_filme)?api_key=" + api_key;
    return apiBase.replace("(cod_filme)", codFilme)
}

function getApiPathForGenreId(genre) {
    return 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&page=1&include_adult=false&query=A&with_genres="' + genre
}

// função que executa a chamada rest para o link da busca do filme por id
function getApiData(movie) {
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", getApiPathByCode(movie), true);
    try {
        oReq.send();
    } catch (error) {
        console.log('error on api retriaving', error)
    }
}

function getMovieLink(movie) {
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", getApiPathByCode(movie), true);
    try {
        oReq.send();
    } catch (error) {
        console.log('error on api retriaving', error)
    }
}

function getGenres() {
    var oReq = new XMLHttpRequest();
    oReq.onload = genreListener;
    oReq.open("get", getGenrePathApi(), true);
    try {
        oReq.send();
    } catch (error) {
        console.log('error on api retriaving', error)
    }
}

function getFist4Movies() {
    var oReq = new XMLHttpRequest();
    oReq.onload = firstMoviesListener;
    oReq.open("get", getApiPathForGenreId(28), true);
    try {
        oReq.send();
    } catch (error) {
        console.log('error on api retriaving', error)
    }
}

function pageLoads() {
    getGenres()
    getFist4Movies()
}

window.onload = pageLoads