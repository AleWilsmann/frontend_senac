import type { Produto } from '../lib/types';

interface ProductModalProps {
  produto: Produto | null;
  onFechar: () => void;
  onAdicionar: (quantidade: number) => void;
}

export default function ProductModal({ produto, onFechar, onAdicionar }: ProductModalProps) {
  if (!produto) return null;

  return (
    <div className="modal-backdrop show" style={{ display: 'block' }}>
      <div className="modal d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalhes do Produto</h5>
              <button type="button" className="btn-close" onClick={onFechar} aria-label="Fechar" />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-5">
                  <img src={produto.imagem} className="img-fluid rounded" alt={produto.nome} />
                </div>
                <div className="col-md-7">
                  <h5>{produto.nome}</h5>
                  <p>{produto.descricao}</p>
                  <p className="fw-bold">R$ {produto.preco.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onFechar}>
                Fechar
              </button>
              <button type="button" className="btn btn-primary" onClick={() => onAdicionar(1)}>
                <i className="bi bi-cart-plus" /> Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
