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
   
    const inputQuantidade = document.getElementById("produto_"+id);
    let qtdNova = Number(inputQuantidade.value);

    if (qtdNova < 1) return;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produtoExistente = carrinho.find(item => item.nome === nome);
    if (produtoExistente) {
        produtoExistente.quantidade += qtdNova;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: qtdNova
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    inputQuantidade.value = 1;
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


document.addEventListener('DOMContentLoaded', function () {

    const formContato = document.getElementById('form-contato');
    const areaAlertas = document.getElementById('area-alertas');

    if (!formContato) return; // evita erro

    formContato.addEventListener('submit', async function (e) {
        e.preventDefault(); // impede recarregar a página

        // Captura os valores
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação
        if (!nome || !email || !mensagem) {
            mostrarAlerta('Preencha todos os campos!', 'danger');
            return;
        }

        // Agrupa  e converte para JSON
        const dados = {
            nome: nome,
            email: email,
            mensagem: mensagem,
            data: new Date().toISOString()
        };

        const dadosJSON = JSON.stringify(dados);

        try {
            const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: dadosJSON
            });

            
            if (resposta.status === 201) {
                mostrarAlerta('✅ Mensagem enviada com sucesso! Obrigado.', 'success');
                formContato.reset(); 
            } else {
                throw new Error('Erro ao enviar');
            }

        } catch (erro) {
            console.error(erro);
            mostrarAlerta('❌ Erro ao enviar mensagem. Tente novamente.', 'danger');
        }
    });

    
    function mostrarAlerta(texto, tipo) {
        
        areaAlertas.innerHTML = '';

        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
        alerta.innerHTML = `
            ${texto}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        areaAlertas.appendChild(alerta);

        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            if (alerta) alerta.remove();
        }, 5000);
    }
});