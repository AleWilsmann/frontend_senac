import type { CarrinhoItem } from './types';
import { loadCarrinho, saveCarrinho } from './storage';

export function parseNumber(
  value: string | null | undefined,
  fallback = 1
): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function adicionarCarrinho(
  nome: string,
  preco: number,
  descricao: string,
  id: string,
  quantidade = 1
): void {
  const carrinho = loadCarrinho();
  const existente = carrinho.find((produto) => produto.id === id);

  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ id, nome, preco, descricao, quantidade });
  }

  saveCarrinho(carrinho);
}
