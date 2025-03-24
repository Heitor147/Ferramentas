let inputCDI = document.getElementById("cdianual");
let CDIpercentual = document.getElementById("cdipercentual");
let Investimento = document.getElementById("investimento");
let Montante = document.getElementById("montante");
let Capital = document.getElementById("capital")
let divSaida = document.getElementById("saida");
let divSaida2 = document.getElementById("saida2");
let divSaida3 = document.getElementById("saida3");
let botaoCalcular = document.getElementById("calcular");
let botaoCalcular2 = document.getElementById("calcular2");
let botaoCalcular3 = document.getElementById("calcular3");

botaoCalcular.onclick = calculaCDI;
botaoCalcular2.onclick = calculaInvestimento;
botaoCalcular3.onclick = calculaTempo;

function calculaCDI() {
    let cdianual = Number(inputCDI.value);

    if (isNaN(cdianual) || cdianual <= 0) {
        divSaida.innerText = "Insira um valor válido para CDI Anual.";
        return;
    }

    let cdidecimal = cdianual / 100;
    let cdidiario = (1 + cdidecimal) ** (1 / 252) - 1;
    let cdipercentual = cdidiario * 100;

    CDIpercentual.value = cdipercentual.toFixed(5) + " %";
    divSaida.innerText = "CDI Diário: " + CDIpercentual.value;

    return cdipercentual;
}

function calculaInvestimento() {
    let investimento = Number(Investimento.value);
    let taxaDiaria = parseFloat(CDIpercentual.value.replace(' %', '')) / 100 || calculaCDI(); // Corrigido para tratar o símbolo %

    if (isNaN(investimento) || investimento <= 0) {
        divSaida2.innerText = "Insira um valor válido para o investimento.";
        return;
    }

    let rendimento = investimento * taxaDiaria;
    divSaida2.innerText = "Rendimento: R$ " + rendimento.toFixed(2);
}

function calculaTempo() {
    let montante = Number(Montante.value);
    let capital = Number(Capital.value);

    if (isNaN(montante) || montante <= capital) {
        divSaida3.innerText = "O montante deve ser maior que o capital inicial.";
        return;
    }

    // Certifica-se de que a CDI foi calculada antes de tentar usá-la
    if (!CDIpercentual.value) {
        calculaCDI();
    }

    let taxa = parseFloat(CDIpercentual.value.replace(' %', '')) / 100;

    // Verifica se a taxa é válida
    if (isNaN(taxa) || taxa <= 0) {
        divSaida3.innerText = "A taxa de CDI é inválida.";
        return;
    }

    let prazo = Math.log(montante / capital) / Math.log(1 + taxa);

    if (!isFinite(prazo) || prazo <= 0) {
        divSaida3.innerText = "O cálculo do tempo resultou em um valor inválido.";
        return;
    }

    divSaida3.innerText = "O tempo necessário será: " + prazo.toFixed(2) + " dias";
}
