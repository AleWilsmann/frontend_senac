import { atualizarContadorCarrinho } from './ui';
import { loadCarrinho, saveCarrinho } from './storage';
import type { CarrinhoItem } from './types';

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function criarLinhaCarrinho(produto: CarrinhoItem): HTMLTableRowElement {
  const linha = document.createElement('tr');

  const colunaProduto = document.createElement('td');
  const strong = document.createElement('strong');
  strong.textContent = produto.nome;
  const small = document.createElement('small');
  small.textContent = produto.descricao;
  colunaProduto.append(strong, document.createElement('br'), small);

  const colunaPreco = document.createElement('td');
  colunaPreco.textContent = formatarMoeda(produto.preco);

  const colunaQuantidade = document.createElement('td');
  colunaQuantidade.textContent = produto.quantidade.toString();

  const colunaTotal = document.createElement('td');
  colunaTotal.textContent = formatarMoeda(produto.preco * produto.quantidade);

  const colunaAcao = document.createElement('td');
  const botaoRemover = document.createElement('button');
  botaoRemover.type = 'button';
  botaoRemover.className = 'btn btn-danger btn-sm';
  botaoRemover.textContent = 'Remover';
  botaoRemover.addEventListener('click', () => removerItemPorId(produto.id));
  colunaAcao.appendChild(botaoRemover);

  linha.append(
    colunaProduto,
    colunaPreco,
    colunaQuantidade,
    colunaTotal,
    colunaAcao
  );

  return linha;
}

function carregarCarrinho(): void {
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total-carrinho');
  if (!lista || !totalSpan) return;

  const carrinho = loadCarrinho();
  lista.innerHTML = '';

  const total = carrinho.reduce((acc, produto) => {
    lista.appendChild(criarLinhaCarrinho(produto));
    return acc + produto.preco * produto.quantidade;
  }, 0);

  totalSpan.textContent = formatarMoeda(total);
}

function removerItemPorId(id: string): void {
  const carrinho = loadCarrinho();
  const produto = carrinho.find((item) => item.id === id);
  if (!produto) return;

  if (
    !confirm(`Tem certeza que deseja remover "${produto.nome}" do carrinho?`)
  ) {
    return;
  }

  const atualizado = carrinho.filter((item) => item.id !== id);
  saveCarrinho(atualizado);

  carregarCarrinho();
  atualizarContadorCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho();
});
