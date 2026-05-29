import { useState } from 'react';
import type { FormEvent } from 'react';
import { ContatoDados, enviarFormularioContato } from '../lib/api';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState<{ tipo: 'success' | 'danger'; mensagem: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nome || !email || !mensagem) {
      setStatus({ tipo: 'danger', mensagem: 'Preencha todos os campos!' });
      return;
    }

    const dados: ContatoDados = { nome, email, body: mensagem };
    const resultado = await enviarFormularioContato(dados);

    if (resultado.success) {
      setStatus({ tipo: 'success', mensagem: '✅ Mensagem enviada com sucesso!' });
      setNome('');
      setEmail('');
      setMensagem('');
    } else {
      setStatus({ tipo: 'danger', mensagem: '❌ Erro ao enviar. Tente novamente.' });
    }
  };

  return (
    <section>
      <div className="row mb-4">
        <div className="col-12">
          <h1>Contato</h1>
          <p>Envie sua mensagem e fale com o nosso atendimento.</p>
        </div>
      </div>

      {status && (
        <div className={`alert alert-${status.tipo}`} role="alert">
          {status.mensagem}
        </div>
      )}

      <form id="form-contato" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            className="form-control"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Seu nome"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Seu email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mensagem" className="form-label">
            Comentários
          </label>
          <textarea
            id="mensagem"
            className="form-control"
            rows={4}
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </section>
  );
}
