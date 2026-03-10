function calcularTotal() {

    const checkboxes = document.querySelectorAll(".item-produto");
    const quantidades = document.querySelectorAll(".qtd-produto");

    let total = 0;
    let totalItens = 0;

    checkboxes.forEach((checkbox, index) => {

        if (checkbox.checked) {

            const preco = parseFloat(checkbox.value);
            const quantidade = parseInt(quantidades[index].value);

            total += preco * quantidade;
            totalItens += quantidade;

        }

    });

     let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.forEach(produto => {
        totalItens += Number(produto.quantidade);
    });

    document.getElementById("valor-total").textContent =
        total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    document.getElementById("contador-carrinho").textContent = totalItens;
}


document.addEventListener("DOMContentLoaded", function () {



    const botoes = document.querySelectorAll(".adicionar-carrinho");
    const checkboxes = document.querySelectorAll(".item-produto");
    const quantidades = document.querySelectorAll(".qtd-produto");

    checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", calcularTotal);
});
   
    quantidades.forEach(input => {
    input.addEventListener("input", calcularTotal);
});

    botoes.forEach(function(botao, index){

        botao.addEventListener("click", function(){

            checkboxes[index].checked = true;

            calcularTotal();
        });
    });

});
//adiona no icone do carrinho


async function carregarDepoimentos() {
    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3"); //api externa, gera simulações
        const dados = await resposta.json(); //converte para json

        const lista = document.getElementById("lista-depoimentos");

        dados.forEach(depoimento => { //percorre os decpoimeitos
            lista.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${depoimento.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${depoimento.email}</h6>
                            <p class="card-text">${depoimento.body}</p>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (erro) {
        console.error("Erro ao carregar depoimentos:", erro);
    }
}

carregarDepoimentos();



function adicionarCarrinho(nome, preco, descricao, id){
   
    const quantidade = document.getElementById("produto_"+id);
    const valorquantidade = quantidade.value;
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push({
        nome: nome,
        preco: preco,
        descricao: descricao,
        quantidade: Number(valorquantidade)
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();

}

function atualizarContadorCarrinho() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let totalItens = 0;

    carrinho.forEach(produto => {
        totalItens += Number(produto.quantidade);
    });

    document.getElementById("contador-carrinho").textContent = totalItens;
}
atualizarContadorCarrinho();