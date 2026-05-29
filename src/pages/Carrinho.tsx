import type { CarrinhoItem } from '../lib/types';
import { calcularTotal } from '../lib/cart';

interface CarrinhoProps {
  carrinho: CarrinhoItem[];
  onRemover: (id: string) => void;
  onAtualizarQuantidade: (id: string, quantidade: number) => void;
}

export default function Carrinho({ carrinho, onRemover, onAtualizarQuantidade }: CarrinhoProps) {
  const total = calcularTotal(carrinho);

  return (
    <section>
      <div className="row mb-4">
        <div className="col-12">
          <h1>Seu Carrinho</h1>
          <p>Confira os itens adicionados e finalize sua compra.</p>
        </div>
      </div>

      {carrinho.length === 0 ? (
        <div className="alert alert-info">Seu carrinho está vazio.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody id="lista-carrinho">
              {carrinho.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      value={item.quantidade}
                      onChange={(event) =>
                        onAtualizarQuantidade(item.id, Number(event.target.value) || 1)
                      }
                    />
                  </td>
                  <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={() => onRemover(item.id)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <h4>Total: R$ {total.toFixed(2)}</h4>
        </div>
        <button type="button" className="btn btn-success" disabled={carrinho.length === 0}>
          Finalizar compra
        </button>
      </div>
    </section>
  );
}
