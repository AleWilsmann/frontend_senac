import { useState } from 'react';
import type { Produto } from '../lib/types';
import { produtos } from '../data/produtos';
import ProductModal from '../components/ProductModal';

interface ProdutosProps {
  onAdicionarCarrinho: (produto: Produto, quantidade: number) => void;
}

export default function Produtos({ onAdicionarCarrinho }: ProdutosProps) {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  return (
    <section>
      <div className="row mb-4">
        <div className="col-12">
          <h1>Produtos</h1>
          <p>Escolha seus produtos favoritos e adicione ao carrinho.</p>
        </div>
      </div>

      <div className="row gy-4">
        {produtos.map((produto) => (
          <div className="col-md-4" key={produto.id}>
            <div className="card h-100">
              <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text flex-grow-1">{produto.descricao}</p>
                <p className="fw-bold">R$ {produto.preco.toFixed(2)}</p>
                <div className="d-grid gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onAdicionarCarrinho(produto, 1)}
                  >
                    <i className="bi bi-cart-plus" /> Adicionar ao carrinho
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={() => setProdutoSelecionado(produto)}
                  >
                    <i className="bi bi-search" /> Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        produto={produtoSelecionado}
        onFechar={() => setProdutoSelecionado(null)}
        onAdicionar={(quantidade) => {
          if (produtoSelecionado) onAdicionarCarrinho(produtoSelecionado, quantidade);
          setProdutoSelecionado(null);
        }}
      />
    </section>
  );
}
