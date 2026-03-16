import { carregarDepoimentos, enviarFormularioContato } from './api.js';
import { renderizarDepoimentos, mostrarAlerta, atualizarContadorCarrinho } from './ui.js';

function adicionarCarrinho(nome, preco, descricao, id) {
    const inputQtd = document.getElementById("produto_" + id);
    let qtd = Number(inputQtd?.value || 1);
    if (qtd < 1) qtd = 1;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const existente = carrinho.find(p => p.nome === nome);
    if (existente) {
        existente.quantidade += qtd;
    } else {
        carrinho.push({ nome, preco, descricao, quantidade: qtd });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    inputQtd.value = 1;
    atualizarContadorCarrinho();
}

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


document.addEventListener('DOMContentLoaded', async () => {
    atualizarContadorCarrinho();

    // Depoimentos (index.html)
    const listaDepo = document.getElementById("lista-depoimentos");
    if (listaDepo) {
        const dados = await carregarDepoimentos();
        renderizarDepoimentos(dados, listaDepo);
    }
    console.log("Tentando carregar depoimentos...");
carregarDepoimentos().then(dados => {
    console.log("Depoimentos recebidos:", dados);
    if (listaDepo) renderizarDepoimentos(dados, listaDepo);
    else console.log("Elemento #lista-depoimentos não encontrado!");
});

    // Formulário de contato (contato.html)
    const formContato = document.getElementById('form-contato');
    const areaAlertas = document.getElementById('area-alertas');

    if (formContato) {
        formContato.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome     = document.getElementById('nome')?.value.trim();
            const email    = document.getElementById('email')?.value.trim();
            const mensagem = document.getElementById('mensagem')?.value.trim();

            if (!nome || !email || !mensagem) {
                mostrarAlerta(areaAlertas, 'Preencha todos os campos!', 'danger');
                return;
            }

            const dados = { nome, email, body: mensagem };

            const resultado = await enviarFormularioContato(dados);

            if (resultado.success) {
                mostrarAlerta(areaAlertas, '✅ Mensagem enviada com sucesso!', 'success');
                formContato.reset();
            } else {
                mostrarAlerta(areaAlertas, '❌ Erro ao enviar. Tente novamente.', 'danger');
            }
        });
    }


            document.querySelectorAll('.adicionar-ao-carrinho').forEach(botao => {
                botao.addEventListener('click', () => {
                    const nome      = botao.dataset.nome;
                    const preco     = Number(botao.dataset.preco);
                    const descricao = botao.dataset.descricao;
                    const id        = botao.dataset.id;

                    adicionarCarrinho(nome, preco, descricao, id);
                });
            });
            
        });
