// requisiçao javascript
// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById('btn-buscar-cep').addEventListener('click', function(){
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        
//         xhttp.open('GET', endpoint);
//         xhttp.send();
//     })
// })

$(document).ready(function(){
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(function(){
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;
        const botao = $(this);
        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        // requisição jquery
        // $.ajax(endpoint).done(function(resposta){
        //     const logradouro = resposta.logradouro;
        //     const bairro = resposta.bairro;
        //     const cidade = resposta.localidade;
        //     const estado = resposta.uf;
        //     const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
        //     $('#endereco').val(endereco);

        //     setTimeout(function(){
        //         $(botao).find('i').removeClass('d-none');
        //         $(botao).find('span').addClass('d-none');
        //     }, 4000)
        // });


        setTimeout(function(){
            fetch(endpoint)
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(json) {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;

                $('#endereco').val(logradouro);
                $('#bairro').val(bairro);
                $('#cidade').val(cidade);
                $('#estado').val(estado);

                if(estado == "SP"){
                    $('#valor-frete').val('R$10,00')
                } else{
                    $('#valor-frete').val('R$20,00')
                }
            })
            .catch(function(erro) {
                alert('Ocorreu um erro ao buscar o endereço, tente novamente mais tarde')
            })
            .finally(function(){
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            })
        }, 1000)
    })

    $('#formulario-pedido').submit(function(evento){
        evento.preventDefault();
        if($('#nome').val() == '' ){
            throw new Error('Digite o nome');
        }
    })
})