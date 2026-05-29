import { useEffect, useState } from 'react';
import { carregarDepoimentos, Depoimento } from '../lib/api';

export default function Home() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarDepoimentos()
      .then(setDepoimentos)
      .catch((error) => {
        console.error(error);
        setErro('Não foi possível carregar os depoimentos.');
      });
  }, []);

  return (
    <section>
      <div className="row mb-4">
        <div className="col-12">
          <h1>O que nossos clientes dizem</h1>
          <p>Depoimentos reais para ajudar você a comprar com confiança.</p>
        </div>
      </div>

      {erro && (
        <div className="alert alert-warning" role="alert">
          {erro}
        </div>
      )}

      <div className="row" id="lista-depoimentos">
        {depoimentos.map((depo) => (
          <div className="col-md-4" key={depo.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{depo.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{depo.email}</h6>
                <p className="card-text">{depo.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
