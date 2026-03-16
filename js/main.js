import { carregarDepoimentos, enviarFormularioContato } from './api.js';
import { renderizarDepoimentos, mostrarAlerta, atualizarContadorCarrinho } from './ui.js';

function adicionarCarrinho(nome, preco, descricao, id, quantidade = null) {
    let qtd = Number(quantidade);

    
    if (quantidade === null) {
        const inputQtd = document.getElementById(`produto_${id}`);
        qtd = Number(inputQtd?.value || 1);
    }

    if (qtd < 1) qtd = 1;

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const existente = carrinho.find(p => p.nome === nome);
    if (existente) {
        existente.quantidade += qtd;
    } else {
        carrinho.push({
            nome,
            preco: Number(preco),
            descricao,
            quantidade: qtd
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();

    // Limpa o campo de quantidade na página
    const input = document.getElementById(`produto_${id}`);
    if (input) input.value = 1;
}

function calcularTotal() {
    const checkboxes = document.querySelectorAll(".item-produto");
    const quantidades = document.querySelectorAll(".qtd-produto");

    let total = 0;
    let totalItens = 0;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const preco = parseFloat(checkbox.value);
            const quantidade = parseInt(quantidades[index].value) || 1;
            total += preco * quantidade;
            totalItens += quantidade;
        }
    });

    // Soma qtd itens iguais nocarrinho 
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.forEach(produto => {
        totalItens += Number(produto.quantidade);
    });

    const valorTotalEl = document.getElementById("valor-total");
    if (valorTotalEl) {
        valorTotalEl.textContent = total.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    document.querySelectorAll("#contador-carrinho").forEach(el => {
        el.textContent = totalItens;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    atualizarContadorCarrinho();
    calcularTotal(); 

    // Depoimentos (index.html)
    const listaDepo = document.getElementById("lista-depoimentos");
    if (listaDepo) {
        try {
            const dados = await carregarDepoimentos();
            renderizarDepoimentos(dados, listaDepo);
        } catch (err) {
            console.error("Erro ao carregar depoimentos:", err);
        }
    }

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

    // Modal dinâmico de detalhes do produto
    const modalProduto = document.getElementById('modalDetalheProduto');

    if (modalProduto) {
        modalProduto.addEventListener('show.bs.modal', function (event) {
            const botao = event.relatedTarget;

            const nome      = botao.getAttribute('data-nome');
            const preco     = Number(botao.getAttribute('data-preco'));
            const descricao = botao.getAttribute('data-descricao');
            const id        = botao.getAttribute('data-id');

            // Título
            modalProduto.querySelector('.modal-title').textContent = nome;

            // Corpo
            modalProduto.querySelector('.modal-body').innerHTML = `
                <div class="text-center mb-3">
                    <img src="http://lorempixel.com.br/400/300" class="img-fluid rounded" alt="${nome}">
                </div>
                <h5>Descrição</h5>
                <p>${descricao}</p>
                <h4 class="text-success mt-4">
                    ${preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </h4>
                <div class="mt-3">
                    <label class="form-label">Quantidade:</label>
                    <input type="number" class="form-control w-25 d-inline-block" 
                           id="qtd-modal-${id}" value="1" min="1">
                </div>
            `;

            // Botão adicionar no modal
            const btnAdicionarModal = modalProduto.querySelector('.adicionar-ao-carrinho-modal');
            btnAdicionarModal.replaceWith(btnAdicionarModal.cloneNode(true)); // remove listeners antigos
            const novoBtn = modalProduto.querySelector('.adicionar-ao-carrinho-modal');

            novoBtn.addEventListener('click', () => {
                const qtdInput = document.getElementById(`qtd-modal-${id}`);
                let qtd = Number(qtdInput?.value || 1);
                if (qtd < 1) qtd = 1;

                adicionarCarrinho(nome, preco, descricao, id, qtd);

                bootstrap.Modal.getInstance(modalProduto).hide();

                mostrarAlerta(
                    document.body,
                    `✅ ${qtd} × ${nome} adicionado(s) ao carrinho!`,
                    'success'
                );
            });
        });
    }
});