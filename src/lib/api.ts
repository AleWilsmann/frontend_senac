export interface Depoimento {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ContatoDados {
  nome: string;
  email: string;
  body: string;
}

const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments?_limit=3';
const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';

export async function carregarDepoimentos(): Promise<Depoimento[]> {
  const resposta = await fetch(API_COMMENTS);
  if (!resposta.ok) throw new Error('Erro ao carregar depoimentos');
  return (await resposta.json()) as Depoimento[];
}

export async function enviarFormularioContato(
  dados: ContatoDados
): Promise<{ success: true } | { success: false; error: string }> {
  const resposta = await fetch(API_POSTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (resposta.status === 201) {
    return { success: true };
  }

  return {
    success: false,
    error: `Erro ao enviar formulário: ${resposta.status}`,
  };
}
