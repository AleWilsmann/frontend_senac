import 'bootstrap/dist/js/bootstrap.bundle';
import './styles';
import { carregarNavbar } from './navbar';
import { inicializarTema } from './tema';
import {
  carregarDepoimentos,
  enviarFormularioContato,
  ContatoDados,
} from './api';
import {
  renderizarDepoimentos,
  mostrarAlerta,
  atualizarContadorCarrinho,
} from './ui';
import { adicionarCarrinho, parseNumber } from './cart-actions';
import { setupProdutoModal } from './product-modal';

function obterValorInput(id: string): string {
  return (
    (document.getElementById(id) as HTMLInputElement | null)?.value.trim() ?? ''
  );
}

function obterQuantidadeProduto(id: string): number {
  const valor = (
    document.getElementById(`produto_${id}`) as HTMLInputElement | null
  )?.value;
  return parseNumber(valor, 1);
}

function initDepoimentos(): void {
  const listaDepo = document.getElementById('lista-depoimentos');
  if (!listaDepo) return;

  carregarDepoimentos()
    .then((dados) => {
      renderizarDepoimentos(dados, listaDepo);
    })
    .catch((err) => {
      console.error('Erro ao carregar depoimentos:', err);
      listaDepo.innerHTML =
        '<div class="alert alert-warning">Não foi possível carregar os depoimentos.</div>';
    });
}

function initContato(): void {
  const formContato = document.getElementById(
    'form-contato'
  ) as HTMLFormElement | null;
  const areaAlertas = document.getElementById('area-alertas');

  if (!formContato || !areaAlertas) return;

  formContato.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = obterValorInput('nome');
    const email = obterValorInput('email');
    const mensagem =
      (
        document.getElementById('mensagem') as HTMLTextAreaElement | null
      )?.value.trim() ?? '';

    if (!nome || !email || !mensagem) {
      mostrarAlerta(areaAlertas, 'Preencha todos os campos!', 'danger');
      return;
    }

    const dados: ContatoDados = { nome, email, body: mensagem };
    const resultado = await enviarFormularioContato(dados);

    if (resultado.success) {
      mostrarAlerta(areaAlertas, '✅ Mensagem enviada com sucesso!', 'success');
      formContato.reset();
    } else {
      mostrarAlerta(
        areaAlertas,
        '❌ Erro ao enviar. Tente novamente.',
        'danger'
      );
    }
  });
}

function initAddToCartButtons(): void {
  document
    .querySelectorAll<HTMLButtonElement>('.adicionar-ao-carrinho')
    .forEach((botao) => {
      botao.addEventListener('click', () => {
        const nome = botao.dataset.nome ?? '';
        const preco = parseNumber(botao.dataset.preco, 0);
        const descricao = botao.dataset.descricao ?? '';
        const id = botao.dataset.id ?? '';
        const quantidade = obterQuantidadeProduto(id);

        adicionarCarrinho(nome, preco, descricao, id, quantidade);
      });
    });
}

export function initApp(): void {
  document.addEventListener('DOMContentLoaded', () => {
    carregarNavbar();
    inicializarTema();
    atualizarContadorCarrinho();
    initDepoimentos();
    initContato();
    initAddToCartButtons();
    setupProdutoModal();
  });
}
