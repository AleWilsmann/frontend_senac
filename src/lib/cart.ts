import type { CarrinhoItem, Produto } from './types';

export function parseNumber(
  value: string | number | null | undefined,
  fallback = 1
): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function adicionarAoCarrinho(
  carrinho: CarrinhoItem[],
  produto: Produto,
  quantidade: number
): CarrinhoItem[] {
  const novoCarrinho = carrinho.map((item) => ({ ...item }));
  const existente = novoCarrinho.find((item) => item.id === produto.id);

  if (existente) {
    existente.quantidade += quantidade;
  } else {
    novoCarrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidade,
    });
  }

  return novoCarrinho;
}

export function atualizarQuantidade(
  carrinho: CarrinhoItem[],
  id: string,
  quantidade: number
): CarrinhoItem[] {
  return carrinho
    .map((item) =>
      item.id === id ? { ...item, quantidade: Math.max(1, quantidade) } : item
    )
    .filter((item) => item.quantidade > 0);
}

export function removerDoCarrinho(
  carrinho: CarrinhoItem[],
  id: string
): CarrinhoItem[] {
  return carrinho.filter((item) => item.id !== id);
}

export function calcularTotal(carrinho: CarrinhoItem[]): number {
  return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}
