// js/ui.js

export function renderizarDepoimentos(depoimentos, elementoLista) {
    elementoLista.innerHTML = "";

    depoimentos.forEach(depo => {
        elementoLista.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${depo.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${depo.email}</h6>
                        <p class="card-text">${depo.body}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

export function mostrarAlerta(area, mensagem, tipo = 'success') {
    // Limpa alertas anteriores
    area.innerHTML = '';

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    area.appendChild(alerta);

    // Auto-esconder após 5 segundos
    setTimeout(() => {
        if (alerta.parentNode) alerta.remove();
    }, 5000);
}

export function atualizarContadorCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let totalItens = carrinho.reduce((acc, prod) => acc + Number(prod.quantidade), 0);

    // Atualiza todos os contadores que existirem na página
    document.querySelectorAll('#contador-carrinho').forEach(el => {
        el.textContent = totalItens;
    });
}

window.atualizarContadorCarrinho = atualizarContadorCarrinho;