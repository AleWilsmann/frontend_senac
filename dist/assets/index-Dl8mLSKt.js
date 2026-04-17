var e = (e, t) => () => (e && (t = e((e = 0))), t),
  t = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
async function n() {
  try {
    let e = await fetch(i);
    if (!e.ok) throw Error(`Erro ao carregar depoimentos`);
    return await e.json();
  } catch (e) {
    return (console.error(`Erro ao carregar depoimentos:`, e), []);
  }
}
async function r(e) {
  try {
    let t = await fetch(a, {
      method: `POST`,
      headers: { 'Content-type': `application/json` },
      body: JSON.stringify(e),
    });
    if (t.status === 201) return { success: !0 };
    throw Error(`Status ${t.status}`);
  } catch (e) {
    return (
      console.error(`Erro ao enviar formulário:`, e),
      { success: !1, error: e.message }
    );
  }
}
var i,
  a,
  o = e(() => {
    ((i = `https://jsonplaceholder.typicode.com/comments?_limit=3`),
      (a = `https://jsonplaceholder.typicode.com/posts`));
  });
function s(e, t) {
  ((t.innerHTML = ``),
    e.forEach((e) => {
      t.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${e.email}</h6>
                        <p class="card-text">${e.body}</p>
                    </div>
                </div>
            </div>
        `;
    }));
}
function c(e, t, n = `success`) {
  e.innerHTML = ``;
  let r = document.createElement(`div`);
  ((r.className = `alert alert-${n} alert-dismissible fade show`),
    (r.role = `alert`),
    (r.innerHTML = `
        ${t}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `),
    e.appendChild(r),
    setTimeout(() => {
      r.parentNode && r.remove();
    }, 5e3));
}
function l() {
  let e = (JSON.parse(localStorage.getItem(`carrinho`)) || []).reduce(
    (e, t) => e + Number(t.quantidade),
    0
  );
  document.querySelectorAll(`#contador-carrinho`).forEach((t) => {
    t.textContent = e;
  });
}
var u = e(() => {
    window.atualizarContadorCarrinho = l;
  }),
  d = e(() => {}),
  f = e(() => {}),
  p = e(() => {}),
  m = e(() => {}),
  h = e(() => {}),
  g = t(() => {
    (d(), f(), p(), m(), h());
  });
t(() => {
  (o(), u(), g());
  function e(e, t, n, r, i = null) {
    let a = Number(i);
    if (i === null) {
      let e = document.getElementById(`produto_${r}`);
      a = Number(e?.value || 1);
    }
    a < 1 && (a = 1);
    let o = JSON.parse(localStorage.getItem(`carrinho`)) || [],
      s = o.find((t) => t.nome === e);
    (s
      ? (s.quantidade += a)
      : o.push({ nome: e, preco: Number(t), descricao: n, quantidade: a }),
      localStorage.setItem(`carrinho`, JSON.stringify(o)),
      l());
    let c = document.getElementById(`produto_${r}`);
    c && (c.value = 1);
  }
  function t() {
    let e = document.querySelectorAll(`.item-produto`),
      t = document.querySelectorAll(`.qtd-produto`),
      n = 0,
      r = 0;
    (e.forEach((e, i) => {
      if (e.checked) {
        let a = parseFloat(e.value),
          o = parseInt(t[i].value) || 1;
        ((n += a * o), (r += o));
      }
    }),
      (JSON.parse(localStorage.getItem(`carrinho`)) || []).forEach((e) => {
        r += Number(e.quantidade);
      }));
    let i = document.getElementById(`valor-total`);
    (i &&
      (i.textContent = n.toLocaleString(`pt-BR`, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })),
      document.querySelectorAll(`#contador-carrinho`).forEach((e) => {
        e.textContent = r;
      }));
  }
  function i(e) {
    (document.body.classList.remove(`tema-dark`, `tema-ocean`, `tema-forest`),
      e && document.body.classList.add(e),
      localStorage.setItem(`tema-selecionado`, e));
  }
  function a() {
    let e = document.getElementById(`seletor-tema`);
    if ((console.log(`Seletor tema encontrado:`, e), !e)) {
      console.log(`Seletor de tema não encontrado nesta página`);
      return;
    }
    let t = localStorage.getItem(`tema-selecionado`) || ``;
    (console.log(`Tema salvo:`, t),
      (e.value = t),
      i(t),
      e.addEventListener(`change`, (e) => {
        (console.log(`Tema selecionado:`, e.target.value), i(e.target.value));
      }));
  }
  document.addEventListener(`DOMContentLoaded`, async () => {
    (l(), t(), a());
    let i = document.getElementById(`lista-depoimentos`);
    if ((console.log(`Elemento lista-depoimentos encontrado:`, i), i))
      try {
        console.log(`Carregando depoimentos...`);
        let e = await n();
        (console.log(`Depoimentos recebidos:`, e), s(e, i));
      } catch (e) {
        (console.error(`Erro ao carregar depoimentos:`, e),
          (i.innerHTML = `<div class="alert alert-warning">Não foi possível carregar os depoimentos.</div>`));
      }
    let o = document.getElementById(`form-contato`),
      u = document.getElementById(`area-alertas`);
    (o &&
      o.addEventListener(`submit`, async (e) => {
        e.preventDefault();
        let t = document.getElementById(`nome`)?.value.trim(),
          n = document.getElementById(`email`)?.value.trim(),
          i = document.getElementById(`mensagem`)?.value.trim();
        if (!t || !n || !i) {
          c(u, `Preencha todos os campos!`, `danger`);
          return;
        }
        (await r({ nome: t, email: n, body: i })).success
          ? (c(u, `✅ Mensagem enviada com sucesso!`, `success`), o.reset())
          : c(u, `❌ Erro ao enviar. Tente novamente.`, `danger`);
      }),
      document.querySelectorAll(`.adicionar-ao-carrinho`).forEach((t) => {
        t.addEventListener(`click`, () => {
          let n = t.dataset.nome,
            r = Number(t.dataset.preco),
            i = t.dataset.descricao,
            a = t.dataset.id;
          e(n, r, i, a);
        });
      }));
    let d = document.getElementById(`modalDetalheProduto`);
    d &&
      d.addEventListener(`show.bs.modal`, function (t) {
        let n = t.relatedTarget,
          r = n.getAttribute(`data-nome`),
          i = Number(n.getAttribute(`data-preco`)),
          a = n.getAttribute(`data-descricao`),
          o = n.getAttribute(`data-id`);
        ((d.querySelector(`.modal-title`).textContent = r),
          (d.querySelector(`.modal-body`).innerHTML = `
                <div class="text-center mb-3">
                    <img src="http://lorempixel.com.br/400/300" class="img-fluid rounded" alt="${r}">
                </div>
                <h5>Descrição</h5>
                <p>${a}</p>
                <h4 class="text-success mt-4">
                    ${i.toLocaleString(`pt-BR`, { style: `currency`, currency: `BRL` })}
                </h4>
                <div class="mt-3">
                    <label class="form-label">Quantidade:</label>
                    <input type="number" class="form-control w-25 d-inline-block" 
                           id="qtd-modal-${o}" value="1" min="1">
                </div>
            `));
        let s = d.querySelector(`.adicionar-ao-carrinho-modal`);
        (s.replaceWith(s.cloneNode(!0)),
          d
            .querySelector(`.adicionar-ao-carrinho-modal`)
            .addEventListener(`click`, () => {
              let t = document.getElementById(`qtd-modal-${o}`),
                n = Number(t?.value || 1);
              (n < 1 && (n = 1),
                e(r, i, a, o, n),
                bootstrap.Modal.getInstance(d).hide(),
                c(
                  document.body,
                  `✅ ${n} × ${r} adicionado(s) ao carrinho!`,
                  `success`
                ));
            }));
      });
  });
})();
