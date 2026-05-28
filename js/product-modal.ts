import type { CarrinhoItem } from './types';
import { adicionarCarrinho, parseNumber } from './cart-actions';
import { mostrarAlerta } from './ui';

declare const bootstrap: any;

function construirModalBody(
  modalBody: HTMLElement,
  nome: string,
  descricao: string,
  preco: number,
  id: string
): void {
  const divImagem = document.createElement('div');
  divImagem.className = 'text-center mb-3';

  const img = document.createElement('img');
  img.src = 'http://lorempixel.com.br/400/300';
  img.className = 'img-fluid rounded';
  img.alt = nome;

  const h5 = document.createElement('h5');
  h5.textContent = 'Descrição';

  const p = document.createElement('p');
  p.textContent = descricao;

  const h4 = document.createElement('h4');
  h4.className = 'text-success mt-4';
  h4.textContent = preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const divQuantidade = document.createElement('div');
  divQuantidade.className = 'mt-3';

  const label = document.createElement('label');
  label.className = 'form-label';
  label.textContent = 'Quantidade:';
  label.htmlFor = `qtd-modal-${id}`;

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'form-control w-25 d-inline-block';
  input.id = `qtd-modal-${id}`;
  input.value = '1';
  input.min = '1';

  divQuantidade.append(label, input);
  modalBody.replaceChildren(divImagem, h5, p, h4, divQuantidade);
}

export function setupProdutoModal(): void {
  const modalProduto = document.getElementById('modalDetalheProduto');
  if (!modalProduto) return;

  modalProduto.addEventListener('show.bs.modal', (event: Event) => {
    const botao = (event as any).relatedTarget as HTMLElement | null;
    if (!botao) return;

    const nome = botao.getAttribute('data-nome') ?? '';
    const preco = parseNumber(botao.getAttribute('data-preco'), 0);
    const descricao = botao.getAttribute('data-descricao') ?? '';
    const id = botao.getAttribute('data-id') ?? '';

    const modalTitle = modalProduto.querySelector<HTMLElement>('.modal-title');
    if (modalTitle) modalTitle.textContent = nome;

    const modalBody = modalProduto.querySelector<HTMLElement>('.modal-body');
    if (modalBody) {
      construirModalBody(modalBody, nome, descricao, preco, id);
    }

    const footer = modalProduto.querySelector<HTMLElement>('.modal-footer');
    if (!footer) return;

    const botaoOriginal = footer.querySelector<HTMLButtonElement>(
      '.adicionar-ao-carrinho-modal'
    );
    if (!botaoOriginal) return;

    const botaoNovo = botaoOriginal.cloneNode(true) as HTMLButtonElement;
    footer.replaceChild(botaoNovo, botaoOriginal);

    botaoNovo.addEventListener('click', () => {
      const qtdInput = document.getElementById(
        `qtd-modal-${id}`
      ) as HTMLInputElement | null;
      let qtd = parseNumber(qtdInput?.value, 1);
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
