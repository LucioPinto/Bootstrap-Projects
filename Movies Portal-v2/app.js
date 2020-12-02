const API_KEY = '97cbc78ac527d77dd7337cd773d5236d';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
var modal = document.getElementById("myModal");

function exibeLancamento () {
    let divLancamento = document.getElementById('listagemDinamicaLancamento');
    let texto = ``;

    // Montar texto HTML das noticias
    let lancamento = JSON.parse(this.responseText);

    texto = texto + `     
        <div class="col-12">
            <div class="row lancamentos">   
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">                            
                    <img onclick="abrirFilme(${lancamento.id})" src="${IMG_URL}${lancamento.poster_path}" class="lacamento_imagem" alt="Poster não especificado" width="100%" height="400px">
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <h3>${lancamento.title ? lancamento.title : "Título não especificado"}</h3>
                    <p><strong>Sinopse: </strong> ${lancamento.overview ? lancamento.overview : "Overview não especificada"}
                        <br>
                        <br>
                        <strong>Gênero:</strong> ${lancamento.genres.length > 0 ? lancamento.genres[0].name : "Gênero não especificado"}
                        <br>
                        <strong>Status:</strong> ${lancamento.status ? lancamento.status : "Status não especificado"}
                        <br>
                        <strong>Data de Lançamento:</strong> ${lancamento.release_date ? lancamento.release_date : "Data não especificada"}
                        <br>
                        <strong>Avaliação:</strong> ${lancamento.vote_average}
                        <br>
                    </p>
                </div>
            </div>
        </div>
    `;    
    // Preencher a DIV com o texto HTML
    divLancamento.innerHTML = texto;

    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeDestaques;   
    xhr.open ('GET', `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`);
    xhr.send ();    
}

function exibeDestaques () {
    let divDestaques = document.getElementById('listagemDinamicaDestaques');
    let texto = ``;

    // Montar texto HTML das noticias
    let destaques = JSON.parse(this.responseText);
        
    texto = texto + `
            <div class="col-12">
                <div class="row destaque">
                    <div class="col-12 col-lg-6 col-xl-3">
                        <img onclick="abrirFilme(${destaques.results[0].id})" src="${IMG_URL}${destaques.results[0].poster_path}" class="destaque_imagem" alt="Poster não especificado">
                    </div>
                    <div class="col-12 col-lg-6 col-xl-3">
                        <img onclick="abrirFilme(${destaques.results[1].id})" src="${IMG_URL}${destaques.results[1].poster_path}" class="destaque_imagem" alt="Poster não especificado">
                    </div>
                    <div class="col-12 col-lg-6 col-xl-3">
                        <img onclick="abrirFilme(${destaques.results[2].id})" src="${IMG_URL}${destaques.results[2].poster_path}" class="destaque_imagem" alt="Poster não especificado">
                    </div>
                    <div class="col-12 col-lg-6 col-xl-3">
                        <img onclick="abrirFilme(${destaques.results[3].id})" src="${IMG_URL}${destaques.results[3].poster_path}" class="destaque_imagem" alt="Poster não especificado">
                    </div>
                </div>
            </div>          
    `;    
    // Preencher a DIV com o texto HTML
    divDestaques.innerHTML = texto;
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeNovidades;   
    xhr.open ('GET', `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`);
    xhr.send ();  
}

function exibeNovidades () {
    let divNovidades = document.getElementById('listagemDinamicaNovidades');
    let texto = ``;

    // Montar texto HTML das noticias
    let novidades = JSON.parse(this.responseText);

    texto = texto + `            
            <div class="novidades_title">
                <h2>Novidades</h2>
            </div>
            <div class="row com_borda">
                <div class="col-sm-3 col-md-3 col-lg-3">
                    <img onclick="abrirFilme(${novidades.results[0].id})" src="${IMG_URL}${novidades.results[0].poster_path}" alt="Poster não especificado" class="novidades_imagem">

                </div>
                <div class="col-12 col-sm-9 col-md-9 col-lg-9">
                    <h4>${novidades.results[0].title}</h4>
                    <p>${novidades.results[0].overview}</p>
                    <button onclick="abrirFilme(${novidades.results[0].id})" type="button" class="btn btn-sm">informações</button>
                </div>
            </div>
            <div class="row com_borda">
                <div class="col-sm-3 col-md-3 col-lg-3">
                    <img onclick="abrirFilme(${novidades.results[1].id})" src="${IMG_URL}${novidades.results[1].poster_path}" alt="Poster não especificado" class="novidades_imagem">

                </div>
                <div class="col-12 col-sm-9 col-md-9 col-lg-9">
                    <h4>${novidades.results[1].title}</h4>
                    <p>${novidades.results[1].overview}</p>
                    <button onclick="abrirFilme(${novidades.results[1].id})" type="button" class="btn btn-sm">informações</button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-3 col-md-3 col-lg-3">
                    <img onclick="abrirFilme(${novidades.results[2].id})" src="${IMG_URL}${novidades.results[2].poster_path}" alt="Poster não especificado" class="novidades_imagem">

                </div>
                <div class="col-12 col-sm-9 col-md-9 col-lg-9">
                    <h4>${novidades.results[2].title}</h4>
                    <p>${novidades.results[2].overview}</p>
                    <button onclick="abrirFilme(${novidades.results[2].id})" type="button" class="btn btn-sm">informações</button>
                </div>
            </div>
    `;    
    // Preencher a DIV com o texto HTML
    divNovidades.innerHTML = texto;
}

function carregaConteudo () {
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeLancamento;   
    xhr.open ('GET', `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US`);
    xhr.send ();    
}

function exibeFilme () {
    let divFilme = modal;
    let texto = ``;

    // Montar texto HTML das noticias
    let filme = JSON.parse(this.responseText);

    texto = texto + `     
        <div class="modal-content">
            <div class="modal-header">                
                <h2>${filme.title}</h2>
            </div>
            <div class="row modal-body">
                <div class="col-sm-3 col-md-3 col-lg-3">
                    <img src="${IMG_URL}${filme.poster_path}" class="modal_imagem" alt="Poster não especificado">
                </div>
                <div class="col-12 col-sm-9 col-md-9 col-lg-9">                
                    <p><strong>Sinopse: </strong> ${filme.overview}</p>
                    <a href="${filme.homepage}" target="_blank"><button type="button" class="btn btn-sm">assistir filme</button></a>
                </div>
            </div>
            <div class="modal-footer">
                <h3><strong>Avaliação: </strong> ${filme.vote_average}</h3>
            </div>                   
        </div>
    `;    
    // Preencher a DIV com o texto HTML
    divFilme.innerHTML = texto;
}

function abrirFilme(id){   
    modal.style.display = "block";
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeFilme;   
    xhr.open ('GET', `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
    xhr.send ();  
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        let divFilme = modal;
        divFilme.innerHTML = `
            <div id="myModal" class="modal"></div>
        `;
    }
}

window.addEventListener('load', carregaConteudo);