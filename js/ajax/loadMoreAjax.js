function loadMore() {
    const genreCod = parseInt(document.getElementById('genreId').value)
    if (moviesLoaded <= 12) {
        moviesLoaded += 4
        var oReq = new XMLHttpRequest();
        oReq.onload = firstMoviesListener;
        oReq.open("get", getApiPathForGenreId(genreCod), true);
        try {
            oReq.send();
        } catch (error) {
            console.log('error on api retriaving', error)
        }
    } else {
        erroModal("Não é possivel carregar mais informações nessa seção")
    }
}

function loadMinus() {
    const genreCod = parseInt(document.getElementById('genreId').value)

    if (moviesLoaded >= 8) {
        moviesLoaded -= 4
        var oReq = new XMLHttpRequest();
        oReq.onload = firstMoviesListener;
        oReq.open("get", getApiPathForGenreId(genreCod), true);
        try {
            oReq.send();
        } catch (error) {
            console.log('error on api retriaving', error)
        }
    } else {
        erroModal("Não é possivel carregar menos informações nessa seção")
    }
}