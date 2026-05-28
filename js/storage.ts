import type { CarrinhoItem } from './types';

const CARRINHO_KEY = 'carrinho';
const TEMA_KEY = 'tema-selecionado';

export function loadCarrinho(): CarrinhoItem[] {
  const raw = localStorage.getItem(CARRINHO_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as CarrinhoItem[];
  } catch {
    return [];
  }
}

export function saveCarrinho(carrinho: CarrinhoItem[]): void {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
}

export function loadTemaSelecionado(): string {
  return localStorage.getItem(TEMA_KEY) ?? '';
}

export function saveTemaSelecionado(tema: string): void {
  localStorage.setItem(TEMA_KEY, tema);
}
