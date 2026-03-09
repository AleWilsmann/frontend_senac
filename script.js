function calcularTotal() {

    const checkboxes = document.querySelectorAll(".item-produto");
    const quantidades = document.querySelectorAll(".qtd-produto");

    let total = 0;
    let totalItens = 0;

    checkboxes.forEach((checkbox, index) => {

        if (checkbox.checked) {

            const preco = parseFloat(checkbox.value);
            const quantidade = parseInt(quantidades[index].value);

            total += preco * quantidade;
            totalItens += quantidade;

        }

    });

    document.getElementById("valor-total").textContent =
        total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById("contador-carrinho").textContent = totalItens;

}


document.addEventListener("DOMContentLoaded", function () {



    const botoes = document.querySelectorAll(".adicionar-carrinho");
    const checkboxes = document.querySelectorAll(".item-produto");
    const quantidades = document.querySelectorAll(".qtd-produto");

    checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", calcularTotal);
});
   
    quantidades.forEach(input => {
    input.addEventListener("input", calcularTotal);
});

    botoes.forEach(function(botao, index){

        botao.addEventListener("click", function(){

            checkboxes[index].checked = true;

            calcularTotal();
        });
    });

});

//adiona no icone do carrinho