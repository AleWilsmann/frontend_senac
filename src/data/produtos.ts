import type { Produto } from '../lib/types';

export const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Caixa de Som Portátil',
    preco: 2500,
    descricao:
      'Caixa de som Bluetooth compacta com som potente, resistente à água e até 10 horas de reprodução.',
    imagem: 'https://lorempixel.com.br/300/200',
  },
  {
    id: '2',
    nome: 'Fone de Ouvido Bluetooth',
    preco: 500,
    descricao:
      'Fone sem fio com cancelamento de ruído, bateria de longa duração e conexão rápida com smartphone.',
    imagem: 'https://lorempixel.com.br/300/200',
  },
  {
    id: '3',
    nome: 'Smartwatch Fitness',
    preco: 650,
    descricao:
      'Relógio inteligente que monitora passos, batimentos cardíacos e qualidade do sono.',
    imagem: 'https://lorempixel.com.br/300/200',
  },
];
