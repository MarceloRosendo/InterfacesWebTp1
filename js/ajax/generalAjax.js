var moviesLoaded = 4
const api_key = "9f1afb0c0720b5f039007f83ce6b0938"
var genero = "Action"
var imageBase = 'https://image.tmdb.org/t/p/w500/'

function reqListener() {
    console.log('entrou no reg Listener')
    let obj = JSON.parse(this.responseText)
};

function detailsListener() {
    let obj = JSON.parse(this.responseText)
    moreDetailsModal(obj)
};

// modais
function erroModal(texto) {
    document.getElementById("modalBody").innerHTML = texto
    $("#modalSearchFailed").modal('show')
}

function moreDetailsModal(obj) {
    let imgTagBuilder = '<img onclick="" class="img-responsive img-modal-detail" src="' + getImageLink(obj.poster_path) + '"/>'

    let textBuilder = '<p class="text-justify"><b>Descrição: </b>' + obj.overview + '</p>'
    textBuilder += '<p class="text-justify"><b>Data de lançamento: </b>' + obj.release_date + '</p>'

    let modalBodyContent = imgTagBuilder + textBuilder

    document.getElementById("movieTitle").innerHTML = obj.original_title
    document.getElementById("modal_body_2").innerHTML = modalBodyContent

    let footerContent = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>'
    footerContent += '<button onclick="redirectToMovieHomePage('+obj.id+')" type="button" class="btn btn-primary">Ir para a página do filme</button>'
    document.getElementById("modal_footer_2").innerHTML = footerContent

    $("#modalCentered").modal('show')
}

// modais
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

function getImageLink(imageHash) {
    return imageBase + imageHash
}

function createPosterSection(imgArray) {
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
            imgs += "<img class=\"zoom\" onclick=\"openModalWithDetails(" + element.id + ")\" src=" + getImageLink(element.poster_path) + " width=\"200px\">"
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

// este metodo retorna o link da api para retornar os dados dos filme via código
function getApiPathByCode(codFilme) {
    let apiBase = "https://api.themoviedb.org/3/movie/(cod_filme)?api_key=" + api_key + "&language=pt-BR";
    return apiBase.replace("(cod_filme)", codFilme)
}

function getApiPathForGenreId(genre) {
    return 'https://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&page=1&include_adult=false&language=pt-BR&query=A&with_genres="' + genre
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

function getMovieDetails(movie) {
    var oReq = new XMLHttpRequest();
    oReq.onload = detailsListener;
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