function reqRedirectListener() {
    console.log('entrou no redirect Listener')
    let obj = JSON.parse(this.responseText)
    if (isEmpty(obj.homepage)) {
        erroModal("O filme " + obj.original_title + " não possui página no DBMovies")
    } else {
        var win = window.open(obj.homepage, '_blank');
        win.focus();
    }
};

function isEmpty(val) {
    if (val === null || val === '') {
        return true
    } else {
        return false
    }
}

function redirectToMovieHomePage(movie) {
    console.log('redirect to id: ', movie)
    var oReq = new XMLHttpRequest();
    oReq.onload = reqRedirectListener;
    oReq.open("get", getApiPathByCode(movie), true);
    try {
        oReq.send();
    } catch (error) {
        console.log('error on api retriaving', error)
    }
}