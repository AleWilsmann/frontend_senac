import type { Depoimento } from './api';
import { loadCarrinho } from './storage';

export type AlertaTipo = 'success' | 'danger' | 'warning' | 'info';

export function renderizarDepoimentos(
  depoimentos: Depoimento[],
  elementoLista: HTMLElement
): void {
  elementoLista.innerHTML = '';

  depoimentos.forEach((depo) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card mb-4 shadow-sm';

    const body = document.createElement('div');
    body.className = 'card-body';

    const titulo = document.createElement('h5');
    titulo.className = 'card-title';
    titulo.textContent = depo.name;

    const subtitulo = document.createElement('h6');
    subtitulo.className = 'card-subtitle mb-2 text-muted';
    subtitulo.textContent = depo.email;

    const texto = document.createElement('p');
    texto.className = 'card-text';
    texto.textContent = depo.body;

    body.append(titulo, subtitulo, texto);
    card.appendChild(body);
    col.appendChild(card);
    elementoLista.appendChild(col);
  });
}

export function mostrarAlerta(
  area: HTMLElement,
  mensagem: string,
  tipo: AlertaTipo = 'success'
): void {
  area.innerHTML = '';

  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
  alerta.role = 'alert';
  const texto = document.createTextNode(mensagem);
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'btn-close';
  botao.setAttribute('data-bs-dismiss', 'alert');
  botao.setAttribute('aria-label', 'Close');

  alerta.append(texto, botao);

  area.appendChild(alerta);

  setTimeout(() => {
    if (alerta.parentNode) alerta.remove();
  }, 5000);
}

export function atualizarContadorCarrinho(): void {
  const carrinho = loadCarrinho();

  const totalItens = carrinho.reduce((acc, prod) => acc + prod.quantidade, 0);

  document.querySelectorAll<HTMLElement>('.contador-carrinho').forEach((el) => {
    el.textContent = `${totalItens}`;
  });
}
