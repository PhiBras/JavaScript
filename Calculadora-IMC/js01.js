function calcularIMC() {
    let textoPeso = document.getElementById('peso').value.replace(',', '.');
    let textoAltura = document.getElementById('altura').value.replace(',', '.');

    let peso = parseFloat(textoPeso);
    let altura = parseFloat(textoAltura);


    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, preencha o peso e a altura corretamente!");
        return;
    }

    if (altura > 3) {
        altura = altura / 100;
    }

    let imc = peso / (altura * altura);
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Magreza";
    } else if (imc <= 24.9) {
        classificacao = "Peso normal (adequado)";
    } else if (imc <= 29.9) {
        classificacao = "Sobrepeso";
    } else if (imc <= 39.9) {
        classificacao = "Obesidade";
    } else {
        classificacao = "Obesidade grave";
    }

    document.getElementById('resultado').innerHTML = 
        "<strong>IMC:</strong> " + imc.toFixed(2) + "<br>" +
        "<strong>Classificação:</strong> " + classificacao;
}