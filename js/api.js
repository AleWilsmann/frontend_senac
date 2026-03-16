const API_COMMENTS = "https://jsonplaceholder.typicode.com/comments?_limit=3";
const API_POSTS    = "https://jsonplaceholder.typicode.com/posts";

export async function carregarDepoimentos() {
    try {
        const resposta = await fetch(API_COMMENTS);
        if (!resposta.ok) throw new Error("Erro ao carregar depoimentos");
        return await resposta.json();
    } catch (erro) {
        console.error("Erro ao carregar depoimentos:", erro);
        return [];
    }
}

export async function enviarFormularioContato(dados) {
    try {
        const resposta = await fetch(API_POSTS, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (resposta.status === 201) {
            return { success: true };
        } else {
            throw new Error(`Status ${resposta.status}`);
        }
    } catch (erro) {
        console.error("Erro ao enviar formulário:", erro);
        return { success: false, error: erro.message };
    }
}