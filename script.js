function calcularTotal() {

    const checkboxes = document.querySelectorAll(".item-produto");
    const quantidades = document.querySelectorAll(".qtd-produto");

    let total = 0;

    checkboxes.forEach((checkbox, index) => {

        if (checkbox.checked) {

            const preco = parseFloat(checkbox.value);
            const quantidade = parseInt(quantidades[index].value);

            total += preco * quantidade;

        }

    });

    document.getElementById("valor-total").textContent =
        total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

}

const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", calcularTotal);
});

quantidades.forEach(input => {
    input.addEventListener("change", calcularTotal);
});//marca e desmarca produtp