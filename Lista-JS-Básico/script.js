// ==========================================
// SISTEMA DE NAVEGAÇÃO DO MENU LATERAL
// ==========================================
window.mostrarQuestao = function(idQuestao, botaoClicado) {
    const questoes = document.querySelectorAll('.card-questao');
    questoes.forEach(q => q.classList.remove('ativa'));

    const botoes = document.querySelectorAll('.btn-nav');
    botoes.forEach(b => b.classList.remove('ativo'));

    const questaoSelecionada = document.getElementById(idQuestao);
    if (questaoSelecionada) {
        questaoSelecionada.classList.add('ativa');
    }
    botaoClicado.classList.add('ativo');
};


// ==========================================
// BLOQUEIO E CORREÇÃO DE DIGITAÇÃO AO VIVO
// ==========================================
const campoNota1 = document.getElementById('nota1');
const campoNota2 = document.getElementById('nota2');
const campoIdade = document.getElementById('idade');

// Trava as notas entre 0 e 10 no momento da digitação
[campoNota1, campoNota2].forEach(campo => {
    campo.addEventListener('input', function() {
        if (this.value > 10) this.value = 10;
        if (this.value < 0) this.value = 0;
    });
});

// Trava a idade entre 0 e 120 no momento da digitação
campoIdade.addEventListener('input', function() {
    if (this.value > 120) this.value = 120;
    if (this.value < 0) this.value = 0;
});


// ==========================================
// QUESTÃO 01 - DESEMPENHO ACADÊMICO
// ==========================================
const btnCalcular = document.getElementById('btnCalcular');
const resultado = document.getElementById('resultado');

btnCalcular.addEventListener('click', function() {
    if (campoNota1.value === "" || campoNota2.value === "") {
        resultado.innerText = "Por favor, preencha ambas as notas.";
        resultado.style.color = "black";
        return;
    }

    const nota1 = Number(campoNota1.value);
    const nota2 = Number(campoNota2.value);
    const media = (nota1 + nota2) / 2;

    if (media >= 7) {
        resultado.innerText = "Média: " + media.toFixed(1) + " - Estudante Aprovado!";
        resultado.style.color = "green";
    } else {
        resultado.innerText = "Média: " + media.toFixed(1) + " - Estudante Não Aprovado.";
        resultado.style.color = "red";
    }
});


// ==========================================
// QUESTÃO 02 - VERIFICAÇÃO DE IDADE
// ==========================================
const btnVerificar = document.getElementById('verificar');
const mensagem = document.getElementById('mensagem');

btnVerificar.addEventListener('click', function() {
    if (campoIdade.value === "") {
        mensagem.innerText = "Por favor, informe a sua idade.";
        mensagem.style.color = "black";
        return;
    }

    const idade = Number(campoIdade.value);

    if (idade >= 18) {
        mensagem.innerText = "Acesso permitido. Maior de idade (" + idade + " anos).";
        mensagem.style.color = "green";
    } else {
        mensagem.innerText = "Acesso negado. Menor de idade (" + idade + " anos).";
        mensagem.style.color = "red";
    }
});

// ==========================================
// QUESTÃO 03 - MONITORAMENTO DE TEMPERATURA
// ==========================================
const campoTemperatura = document.getElementById('temperatura');
const btnAnalisar = document.getElementById('analisar');
const alerta = document.getElementById('alerta');

// Validação em tempo real para limitar temperaturas entre -50°C e 100°C
campoTemperatura.addEventListener('input', function() {
    if (this.value > 100) this.value = 100;
    if (this.value < -50) this.value = -50;
});

btnAnalisar.addEventListener('click', function() {
    if (campoTemperatura.value === "") {
        alerta.innerText = "Por favor, informe a temperatura.";
        alerta.style.color = "black";
        return;
    }

    const temp = Number(campoTemperatura.value);

    if (temp > 30) {
        alerta.innerText = "ALERTA CRÍTICO: Temperatura acima do limite! (" + temp + " °C)";
        alerta.style.color = "red";
    } else {
        alerta.innerText = "Temperatura normal. (" + temp + " °C)";
        alerta.style.color = "green";
    }
});

// ==========================================
// QUESTÃO 04 - CÁLCULO DE DESCONTO
// ==========================================
const secQ4 = document.getElementById('q4');
const campoValorCompra = secQ4.querySelector('#valorCompra');
const btnCalcularDesconto = secQ4.querySelector('#calcular');
const resultadoQ4 = secQ4.querySelector('#resultado');

// Validação em tempo real (bloqueia valores negativos e acima de R$ 100.000)
campoValorCompra.addEventListener('input', function() {
    if (this.value > 100000) this.value = 100000;
    if (this.value < 0) this.value = 0;
});

btnCalcularDesconto.addEventListener('click', function() {
    if (campoValorCompra.value === "") {
        resultadoQ4.innerText = "Por favor, informe o valor da compra.";
        resultadoQ4.style.color = "black";
        return;
    }

    const valorCompra = Number(campoValorCompra.value);

    if (valorCompra >= 200) {
        const valorFinal = valorCompra * 0.90; // Aplica 10% de desconto
        resultadoQ4.innerText = "Desconto de 10% aplicado! Valor final: R$ " + valorFinal.toFixed(2).replace('.', ',');
        resultadoQ4.style.color = "green";
    } else {
        resultadoQ4.innerText = "Sem desconto aplicado. Valor final: R$ " + valorCompra.toFixed(2).replace('.', ',');
        resultadoQ4.style.color = "black";
    }
});

// ==========================================
// QUESTÃO 05 - SITUAÇÃO FINAL DO ESTUDANTE
// ==========================================
const secQ5 = document.getElementById('q5');
const campoMedia = secQ5.querySelector('#media');
const btnVerificarSituacao = secQ5.querySelector('#verificar');
const situacaoQ5 = secQ5.querySelector('#situacao');

// Validação em tempo real (trava média entre 0 e 10)
campoMedia.addEventListener('input', function() {
    if (this.value > 10) this.value = 10;
    if (this.value < 0) this.value = 0;
});

btnVerificarSituacao.addEventListener('click', function() {
    if (campoMedia.value === "") {
        situacaoQ5.innerText = "Por favor, informe a média.";
        situacaoQ5.style.color = "black";
        return;
    }

    const mediaVal = Number(campoMedia.value);

    if (mediaVal >= 6.0) {
        situacaoQ5.innerText = "Situação: Aprovado(a) (Média: " + mediaVal.toFixed(1) + ")";
        situacaoQ5.style.color = "green";
    } else {
        situacaoQ5.innerText = "Situação: Reprovado(a) (Média: " + mediaVal.toFixed(1) + ")";
        situacaoQ5.style.color = "red";
    }
});

// ==========================================
// QUESTÃO 06 - CONTROLE DE ACESSO
// ==========================================
const secQ6 = document.getElementById('q6');
const campoNome = secQ6.querySelector('#nome');
const campoIdadeQ6 = secQ6.querySelector('#idade');
const btnAcessar = secQ6.querySelector('#acessar');
const resultadoQ6 = secQ6.querySelector('#resultado');

// Validação em tempo real (trava idade entre 0 e 120 anos)
campoIdadeQ6.addEventListener('input', function() {
    if (this.value > 120) this.value = 120;
    if (this.value < 0) this.value = 0;
});

btnAcessar.addEventListener('click', function() {
    const nome = campoNome.value.trim();
    const campoIdadeVal = campoIdadeQ6.value;

    if (nome === "" || campoIdadeVal === "") {
        resultadoQ6.innerText = "Por favor, preencha o nome e a idade.";
        resultadoQ6.style.color = "black";
        return;
    }

    const idade = Number(campoIdadeVal);

    if (idade >= 18) {
        resultadoQ6.innerText = `Acesso PERMITIDO, ${nome}! Você tem ${idade} anos e pode acessar a área restrita.`;
        resultadoQ6.style.color = "green";
    } else {
        resultadoQ6.innerText = `Acesso NEGADO, ${nome}. Entrada permitida apenas para maiores de 18 anos (idade informada: ${idade} anos).`;
        resultadoQ6.style.color = "red";
    }
});