const API_KEY = '97cbc78ac527d77dd7337cd773d5236d';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_URL = 'https://www.themoviedb.org/movie/'

var modal = document.getElementById("myModalPesquisa");
var identificador = "";

function exibePesquisa () {
    let divPesquisa = document.getElementById('listagemDinamicaPesquisa');
    let texto = `
        <div class="col-12">            
    `;

    // Montar texto HTML das noticias
    let pesquisa = JSON.parse(this.responseText);

    for(let i = 0; i < pesquisa.results.length; i++){
        texto = texto + `   
            <div class="row com_borda">         
                <div class="col-sm-3 col-md-3 col-lg-3">
                    <img onclick="abrirFilme(${pesquisa.results[i].id})" src="${IMG_URL}${pesquisa.results[i].poster_path}" class="pesquisa_imagem" alt="Poster não especificado">
                </div>
                <div class="col-12 col-sm-9 col-md-9 col-lg-9 descricao">
                    <h4>${pesquisa.results[i].title}</h4>
                    <p>
                    <strong>Sinopse: </strong> ${pesquisa.results[i].overview}
                    <br>
                    <br>
                    <strong>Data de Lançamento:</strong> ${pesquisa.results[i].release_date ? pesquisa.results[i].release_date : "Data não especificada"}
                    <br>
                    <strong>Avaliação:</strong> ${pesquisa.results[i].vote_average}
                    <br>
                    <br>
                    <button onclick="abrirFilme(${pesquisa.results[i].id})" type="button" class="btn btn-sm">informações</button>
                    <br>
                    </p>
                </div>  
            </div>  
        `;
    }
        
    texto = texto + `                
            </div>          
    `;    
    // Preencher a DIV com o texto HTML
    divPesquisa.innerHTML = texto;    
}

function carregaConteudo () {
    let inputValue = document.getElementById('inputPesquisa').value;
    if(inputValue !== ""){
        let xhr = new XMLHttpRequest ();
        xhr.onload = exibePesquisa;   
        xhr.open ('GET', `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${inputValue}`);
        xhr.send (); 
    }else{
        alert("Pesquisa inválida");
    }
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
                    <a href="${TMDB_URL}${identificador}" target="_blank"><button type="button" class="btn btn-sm">veja mais</button></a>
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
    identificador = id;
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
            <div id="myModalPesquisa" class="modal"></div>
        `;
    }
}

document.getElementById('btnPesquisa').addEventListener('click', carregaConteudo);