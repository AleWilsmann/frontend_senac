import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Contato from './pages/Contato';
import Carrinho from './pages/Carrinho';
import { loadCarrinho, loadTemaSelecionado, saveCarrinho, saveTemaSelecionado } from './lib/storage';
import { CarrinhoItem, Produto } from './lib/types';
import { adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade } from './lib/cart';

function App() {
  const [temaSelecionado, setTemaSelecionado] = useState('');
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);

  useEffect(() => {
    setTemaSelecionado(loadTemaSelecionado());
    setCarrinho(loadCarrinho());
  }, []);

  useEffect(() => {
    document.body.classList.remove('tema-dark', 'tema-ocean', 'tema-forest');
    if (temaSelecionado) document.body.classList.add(temaSelecionado);
    saveTemaSelecionado(temaSelecionado);
  }, [temaSelecionado]);

  const totalItens = useMemo(
    () => carrinho.reduce((acc, item) => acc + item.quantidade, 0),
    [carrinho]
  );

  const handleTemaChange = (tema: string) => {
    setTemaSelecionado(tema);
  };

  const handleAdicionarCarrinho = (produto: Produto, quantidade: number) => {
    const novoCarrinho = adicionarAoCarrinho(carrinho, produto, quantidade);
    setCarrinho(novoCarrinho);
    saveCarrinho(novoCarrinho);
  };

  const handleRemoverDoCarrinho = (id: string) => {
    const novoCarrinho = removerDoCarrinho(carrinho, id);
    setCarrinho(novoCarrinho);
    saveCarrinho(novoCarrinho);
  };

  const handleAtualizarQuantidade = (id: string, quantidade: number) => {
    const novoCarrinho = atualizarQuantidade(carrinho, id, quantidade);
    setCarrinho(novoCarrinho);
    saveCarrinho(novoCarrinho);
  };

  return (
    <BrowserRouter>
      <Navbar tema={temaSelecionado} totalItens={totalItens} onTemaChange={handleTemaChange} />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/produtos"
            element={<Produtos onAdicionarCarrinho={handleAdicionarCarrinho} />}
          />
          <Route
            path="/contato"
            element={<Contato />}
          />
          <Route
            path="/carrinho"
            element={
              <Carrinho
                carrinho={carrinho}
                onRemover={handleRemoverDoCarrinho}
                onAtualizarQuantidade={handleAtualizarQuantidade}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
