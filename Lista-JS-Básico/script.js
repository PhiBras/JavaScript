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

// ==========================================
// QUESTÃO 07 - CLASSIFICAÇÃO DE CONSUMO DE ENERGIA
// ==========================================
const secQ7 = document.getElementById('q7');
const campoConsumo = secQ7.querySelector('#consumo');
const btnClassificar = secQ7.querySelector('#classificar');
const resultadoQ7 = secQ7.querySelector('#resultado');

// Validação em tempo real (trava valores negativos e limite realista até 5000 kWh)
campoConsumo.addEventListener('input', function() {
    if (this.value > 5000) this.value = 5000;
    if (this.value < 0) this.value = 0;
});

btnClassificar.addEventListener('click', function() {
    if (campoConsumo.value === "") {
        resultadoQ7.innerText = "Por favor, informe o consumo de energia.";
        resultadoQ7.style.color = "black";
        return;
    }

    const consumo = Number(campoConsumo.value);

    if (consumo <= 100) {
        resultadoQ7.innerText = `Consumo baixo (${consumo} kWh).`;
        resultadoQ7.style.color = "#27ae60"; // Verde
    } else if (consumo <= 200) {
        resultadoQ7.innerText = `Consumo moderado (${consumo} kWh).`;
        resultadoQ7.style.color = "#e67e22"; // Laranja
    } else {
        resultadoQ7.innerText = `Consumo alto (${consumo} kWh).`;
        resultadoQ7.style.color = "#c0392b"; // Vermelho
    }
});

// ==========================================
// QUESTÃO 08 - VALIDAÇÃO DE SENHA
// ==========================================
const secQ8 = document.getElementById('q8');
const campoSenha = secQ8.querySelector('#senha');
const btnToggleSenha = secQ8.querySelector('#btnToggleSenha');
const btnValidarSenha = secQ8.querySelector('#validar');
const resultadoQ8 = secQ8.querySelector('#resultado');

// Alternar visibilidade da senha
btnToggleSenha.addEventListener('click', function() {
    if (campoSenha.type === 'password') {
        campoSenha.type = 'text';
        btnToggleSenha.innerText = 'Ocultar';
    } else {
        campoSenha.type = 'password';
        btnToggleSenha.innerText = 'Mostrar';
    }
});

btnValidarSenha.addEventListener('click', function() {
    const senha = campoSenha.value;

    if (senha === "") {
        resultadoQ8.innerText = "Por favor, digite uma senha.";
        resultadoQ8.style.color = "black";
        return;
    }

    if (senha.length >= 8) {
        resultadoQ8.innerText = `Senha válida! A senha atende ao requisito mínimo (possui ${senha.length} caracteres).`;
        resultadoQ8.style.color = "#27ae60"; // Verde
    } else {
        resultadoQ8.innerText = `Senha fraca. Possui apenas ${senha.length} caractere(s). O mínimo exigido é de 8 caracteres.`;
        resultadoQ8.style.color = "#c0392b"; // Vermelho
    }
});

// ==========================================
// QUESTÃO 09 - CÁLCULO DE FRETE
// ==========================================
const secQ9 = document.getElementById('q9');
const campoCompraQ9 = secQ9.querySelector('#compra');
const btnFrete = secQ9.querySelector('#frete');
const resultadoQ9 = secQ9.querySelector('#resultado');

// Validação em tempo real (bloqueia valores negativos e limite até R$ 100.000)
campoCompraQ9.addEventListener('input', function() {
    if (this.value > 100000) this.value = 100000;
    if (this.value < 0) this.value = 0;
});

btnFrete.addEventListener('click', function() {
    if (campoCompraQ9.value === "") {
        resultadoQ9.innerText = "Por favor, informe o valor da compra.";
        resultadoQ9.style.color = "black";
        return;
    }

    const valorCompra = Number(campoCompraQ9.value);

    if (valorCompra >= 150) {
        resultadoQ9.innerText = `Parabéns! Sua compra tem FRETE GRÁTIS. Valor final: R$ ${valorCompra.toFixed(2).replace('.', ',')}`;
        resultadoQ9.style.color = "#27ae60"; // Verde
    } else {
        const valorTotal = valorCompra + 25;
        resultadoQ9.innerText = `Frete: R$ 25,00. Valor total da compra com frete: R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        resultadoQ9.style.color = "#e67e22"; // Laranja
    }
});

// ==========================================
// QUESTÃO 10 - CONVERSÃO DE TEMPERATURA
// ==========================================
const secQ10 = document.getElementById('q10');
const campoCelsius = secQ10.querySelector('#celsius');
const btnConverter = secQ10.querySelector('#converter');
const resultadoQ10 = secQ10.querySelector('#resultado');

// Validação em tempo real (limita entre -100°C e 100°C)
campoCelsius.addEventListener('input', function() {
    if (this.value > 100) this.value = 100;
    if (this.value < -100) this.value = -100;
});

btnConverter.addEventListener('click', function() {
    if (campoCelsius.value === "") {
        resultadoQ10.innerText = "Por favor, informe a temperatura em Celsius.";
        resultadoQ10.style.color = "black";
        return;
    }

    const celsius = Number(campoCelsius.value);
    const fahrenheit = (celsius * 1.8) + 32;

    if (fahrenheit > 86) {
        resultadoQ10.innerText = `${celsius}°C equivale a ${fahrenheit.toFixed(1)}°F. A temperatura está acima de 86°F.`;
        resultadoQ10.style.color = "#c0392b"; // Vermelho
    } else {
        resultadoQ10.innerText = `${celsius}°C equivale a ${fahrenheit.toFixed(1)}°F. A temperatura está dentro do limite (<= 86°F).`;
        resultadoQ10.style.color = "#27ae60"; // Verde
    }
});

// ==========================================
// QUESTÃO 11 - CONTROLE DE ESTOQUE
// ==========================================
const secQ11 = document.getElementById('q11');
const campoEstoque = secQ11.querySelector('#estoque');
const btnVerificarEstoque = secQ11.querySelector('#verificar');
const resultadoQ11 = secQ11.querySelector('#resultado');

// Validação em tempo real (bloqueia valores negativos e limite até 100.000 unidades)
campoEstoque.addEventListener('input', function() {
    if (this.value > 100000) this.value = 100000;
    if (this.value < 0) this.value = 0;
});

btnVerificarEstoque.addEventListener('click', function() {
    if (campoEstoque.value === "") {
        resultadoQ11.innerText = "Por favor, informe a quantidade em estoque.";
        resultadoQ11.style.color = "black";
        return;
    }

    const qtdEstoque = Number(campoEstoque.value);

    if (qtdEstoque < 10) {
        resultadoQ11.innerText = `ALERTA: Estoque baixo! Restam apenas ${qtdEstoque} unidade(s). Necessário reabastecer.`;
        resultadoQ11.style.color = "#c0392b"; // Vermelho
    } else {
        resultadoQ11.innerText = `Estoque adequado (${qtdEstoque} unidades cadastradas).`;
        resultadoQ11.style.color = "#27ae60"; // Verde
    }
});

// ==========================================
// QUESTÃO 12 - VOTAÇÃO ELETRÔNICA
// ==========================================
const secQ12 = document.getElementById('q12');
const campoIdadeQ12 = secQ12.querySelector('#idade');
const btnParticipar = secQ12.querySelector('#participar');
const resultadoQ12 = secQ12.querySelector('#resultado');

// Validação em tempo real (trava idade entre 0 e 120 anos)
campoIdadeQ12.addEventListener('input', function() {
    if (this.value > 120) this.value = 120;
    if (this.value < 0) this.value = 0;
});

btnParticipar.addEventListener('click', function() {
    if (campoIdadeQ12.value === "") {
        resultadoQ12.innerText = "Por favor, informe a idade.";
        resultadoQ12.style.color = "black";
        return;
    }

    const idade = Number(campoIdadeQ12.value);

    if (idade < 16) {
        resultadoQ12.innerText = `Participação não permitida. Idade: ${idade} anos (idade mínima para votar: 16 anos).`;
        resultadoQ12.style.color = "#c0392b"; // Vermelho
    } else if ((idade >= 16 && idade < 18) || idade >= 70) {
        resultadoQ12.innerText = `Participação permitida (Voto Facultativo). Idade informada: ${idade} anos.`;
        resultadoQ12.style.color = "#e67e22"; // Laranja
    } else {
        resultadoQ12.innerText = `Participação permitida (Voto Obrigatório). Idade informada: ${idade} anos.`;
        resultadoQ12.style.color = "#27ae60"; // Verde
    }
});

// ==========================================
// QUESTÃO 13 - AVALIAÇÃO DO CLIENTE
// ==========================================
const secQ13 = document.getElementById('q13');
const campoNota = secQ13.querySelector('#nota');
const btnAvaliar = secQ13.querySelector('#avaliar');
const resultadoQ13 = secQ13.querySelector('#resultado');

// Validação em tempo real (restringe notas entre 1 e 5)
campoNota.addEventListener('input', function() {
    if (this.value > 5) this.value = 5;
    if (this.value < 1 && this.value !== "") this.value = 1;
});

btnAvaliar.addEventListener('click', function() {
    if (campoNota.value === "") {
        resultadoQ13.innerText = "Por favor, informe uma nota de 1 a 5.";
        resultadoQ13.style.color = "black";
        return;
    }

    const nota = Number(campoNota.value);

    if (nota < 1 || nota > 5) {
        resultadoQ13.innerText = "Nota inválida! Por favor, insira um valor de 1 a 5.";
        resultadoQ13.style.color = "#c0392b"; // Vermelho
        return;
    }

    if (nota >= 4) {
        resultadoQ13.innerText = `Obrigado! Sua nota (${nota}) representa uma AVALIAÇÃO POSITIVA.`;
        resultadoQ13.style.color = "#27ae60"; // Verde
    } else {
        resultadoQ13.innerText = `Sua nota (${nota}) foi registrada. Trata-se de uma avaliação que será analisada pela equipe.`;
        resultadoQ13.style.color = "#e67e22"; // Laranja
    }
});

// ==========================================
// QUESTÃO 14 - CÁLCULO SALARIAL COM DESCONTO DE 8%
// ==========================================
const secQ14 = document.getElementById('q14');
const campoSalario = secQ14.querySelector('#salario');
const btnCalcularSalario = secQ14.querySelector('#calcular');
const resultadoQ14 = secQ14.querySelector('#resultado');

campoSalario.addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
});

btnCalcularSalario.addEventListener('click', function() {
    if (campoSalario.value === "") {
        resultadoQ14.innerText = "Por favor, informe o valor do salário bruto.";
        resultadoQ14.style.color = "black";
        return;
    }

    const salarioBruto = Number(campoSalario.value);
    const desconto = salarioBruto * 0.08;
    const salarioLiquido = salarioBruto - desconto;

    resultadoQ14.innerText = `Salário Bruto: R$ ${salarioBruto.toFixed(2).replace('.', ',')} | Desconto (8%): R$ ${desconto.toFixed(2).replace('.', ',')} | Salário Final: R$ ${salarioLiquido.toFixed(2).replace('.', ',')}`;
    resultadoQ14.style.color = "#27ae60";
});

// ==========================================
// QUESTÃO 15 - MONITORAMENTO DE VELOCIDADE
// ==========================================
const secQ15 = document.getElementById('q15');
const campoVelocidade = secQ15.querySelector('#velocidade');
const btnVerificarVelocidade = secQ15.querySelector('#verificar');
const resultadoQ15 = secQ15.querySelector('#resultado');

campoVelocidade.addEventListener('input', function() {
    if (this.value > 300) this.value = 300;
    if (this.value < 0) this.value = 0;
});

btnVerificarVelocidade.addEventListener('click', function() {
    if (campoVelocidade.value === "") {
        resultadoQ15.innerText = "Por favor, informe a velocidade do veículo.";
        resultadoQ15.style.color = "black";
        return;
    }

    const vel = Number(campoVelocidade.value);

    if (vel <= 60) {
        resultadoQ15.innerText = `Velocidade informada: ${vel} km/h - Velocidade permitida.`;
        resultadoQ15.style.color = "#27ae60";
    } else {
        resultadoQ15.innerText = `Atenção! Velocidade informada: ${vel} km/h - Velocidade ACIMA do limite permitido (60 km/h).`;
        resultadoQ15.style.color = "#c0392b";
    }
});

// ==========================================
// QUESTÃO 16 - FREQUÊNCIA ESCOLAR
// ==========================================
const secQ16 = document.getElementById('q16');
const campoFrequencia = secQ16.querySelector('#frequencia');
const btnVerificarFreq = secQ16.querySelector('#verificar');
const resultadoQ16 = secQ16.querySelector('#resultado');

campoFrequencia.addEventListener('input', function() {
    if (this.value > 100) this.value = 100;
    if (this.value < 0) this.value = 0;
});

btnVerificarFreq.addEventListener('click', function() {
    if (campoFrequencia.value === "") {
        resultadoQ16.innerText = "Por favor, informe a porcentagem de frequência.";
        resultadoQ16.style.color = "black";
        return;
    }

    const freq = Number(campoFrequencia.value);

    if (freq >= 75) {
        resultadoQ16.innerText = `Frequência de ${freq}%: Aprovado por frequência.`;
        resultadoQ16.style.color = "#27ae60";
    } else {
        resultadoQ16.innerText = `Frequência de ${freq}%: Reprovado por frequência (Mínimo exigido: 75%).`;
        resultadoQ16.style.color = "#c0392b";
    }
});

// ==========================================
// QUESTÃO 17 - CLASSIFICAÇÃO DE PONTUAÇÃO
// ==========================================
const secQ17 = document.getElementById('q17');
const campoPontuacao = secQ17.querySelector('#pontuacao');
const btnClassificarPontos = secQ17.querySelector('#classificar');
const resultadoQ17 = secQ17.querySelector('#resultado');

campoPontuacao.addEventListener('input', function() {
    if (this.value > 100) this.value = 100;
    if (this.value < 0) this.value = 0;
});

btnClassificarPontos.addEventListener('click', function() {
    if (campoPontuacao.value === "") {
        resultadoQ17.innerText = "Por favor, informe a pontuação.";
        resultadoQ17.style.color = "black";
        return;
    }

    const pontos = Number(campoPontuacao.value);

    if (pontos < 50) {
        resultadoQ17.innerText = `Pontuação: ${pontos} pts - Nível Inicial.`;
        resultadoQ17.style.color = "#e67e22";
    } else if (pontos <= 79) {
        resultadoQ17.innerText = `Pontuação: ${pontos} pts - Nível Intermediário.`;
        resultadoQ17.style.color = "#2980b9";
    } else {
        resultadoQ17.innerText = `Pontuação: ${pontos} pts - Nível Avançado. Parabéns!`;
        resultadoQ17.style.color = "#27ae60";
    }
});

// ==========================================
// QUESTÃO 18 - VALIDAÇÃO DE CAMPO OBRIGATÓRIO
// ==========================================
const secQ18 = document.getElementById('q18');
const campoNomeQ18 = secQ18.querySelector('#nome');
const btnEnviarQ18 = secQ18.querySelector('#enviar');
const mensagemQ18 = secQ18.querySelector('#mensagem');

btnEnviarQ18.addEventListener('click', function() {
    const nome = campoNomeQ18.value.trim();

    if (nome === "") {
        mensagemQ18.innerText = "Por favor, preencha seu nome antes de enviar o formulário.";
        mensagemQ18.style.color = "#c0392b";
    } else {
        mensagemQ18.innerText = `Obrigado, ${nome}! Seu cadastro pode prosseguir com sucesso.`;
        mensagemQ18.style.color = "#27ae60";
    }
});

// ==========================================
// QUESTÃO 19 - CÁLCULO DE IDADE E MAIORIDADE
// ==========================================
const secQ19 = document.getElementById('q19');
const campoAnoNasc = secQ19.querySelector('#anoNascimento');
const btnCalcIdade = secQ19.querySelector('#calcular');
const resultadoQ19 = secQ19.querySelector('#resultado');

const anoAtual = 2026; // Ano fixado conforme contexto da aplicação

campoAnoNasc.addEventListener('input', function() {
    if (this.value > anoAtual) this.value = anoAtual;
    if (this.value < 1900 && this.value !== "") this.value = 1900;
});

btnCalcIdade.addEventListener('click', function() {
    if (campoAnoNasc.value === "") {
        resultadoQ19.innerText = "Por favor, informe o ano de nascimento.";
        resultadoQ19.style.color = "black";
        return;
    }

    const anoNasc = Number(campoAnoNasc.value);
    const idadeAprox = anoAtual - anoNasc;

    if (idadeAprox >= 18) {
        resultadoQ19.innerText = `Idade aproximada: ${idadeAprox} anos. Situação: Maior de idade.`;
        resultadoQ19.style.color = "#27ae60";
    } else {
        resultadoQ19.innerText = `Idade aproximada: ${idadeAprox} anos. Situação: Menor de idade.`;
        resultadoQ19.style.color = "#e67e22";
    }
});

// ==========================================
// QUESTÃO 20 - SEMÁFORO VIRTUAL
// ==========================================
const secQ20 = document.getElementById('q20');
const btnVermelho = secQ20.querySelector('#vermelho');
const btnAmarelo = secQ20.querySelector('#amarelo');
const btnVerde = secQ20.querySelector('#verde');
const orientacaoQ20 = secQ20.querySelector('#orientacao');

btnVermelho.addEventListener('click', function() {
    orientacaoQ20.innerText = "Sinal VERMELHO: Pare! Não ultrapasse.";
    orientacaoQ20.style.color = "#c0392b";
});

btnAmarelo.addEventListener('click', function() {
    orientacaoQ20.innerText = "Sinal AMARELO: Atenção! Reduza a velocidade e prepare-se para parar.";
    orientacaoQ20.style.color = "#d35400";
});

btnVerde.addEventListener('click', function() {
    orientacaoQ20.innerText = "Sinal VERDE: Siga em frente com segurança.";
    orientacaoQ20.style.color = "#27ae60";
});

// ==========================================
// QUESTÃO 21 - ALTERNADOR DE TEMA (CLARO/ESCURO)
// ==========================================
const secQ21 = document.getElementById('q21');
const btnTema = secQ21.querySelector('#tema');
const caixaPagina = secQ21.querySelector('#pagina');

let modoEscuro = false;

btnTema.addEventListener('click', function() {
    modoEscuro = !modoEscuro;

    if (modoEscuro) {
        caixaPagina.style.backgroundColor = "#2c3e50";
        caixaPagina.style.color = "#ecf0f1";
        caixaPagina.style.borderColor = "#34495e";
        btnTema.innerText = "Mudar para Tema Claro";
    } else {
        caixaPagina.style.backgroundColor = "#ffffff";
        caixaPagina.style.color = "#333333";
        caixaPagina.style.borderColor = "#ccc";
        btnTema.innerText = "Mudar para Tema Escuro";
    }
});

// ==========================================
// QUESTÃO 22 - SAUDAÇÃO POR PERÍODO DO DIA
// ==========================================
const secQ22 = document.getElementById('q22');
const selectPeriodo = secQ22.querySelector('#periodo');
const btnMsgPeriodo = secQ22.querySelector('#mensagem');
const resultadoQ22 = secQ22.querySelector('#resultado');

btnMsgPeriodo.addEventListener('click', function() {
    const periodo = selectPeriodo.value;

    if (periodo === "manha") {
        resultadoQ22.innerText = "Bom dia! Desejamos um ótimo aprendizado neste período da manhã.";
        resultadoQ22.style.color = "#f39c12";
    } else if (periodo === "tarde") {
        resultadoQ22.innerText = "Boa tarde! Que sua tarde de estudos seja muito produtiva.";
        resultadoQ22.style.color = "#e67e22";
    } else if (periodo === "noite") {
        resultadoQ22.innerText = "Boa noite! Bons estudos durante este período noturno.";
        resultadoQ22.style.color = "#2c3e50";
    }
});

// ==========================================
// QUESTÃO 23 - CÁLCULO DE IMC
// ==========================================
const secQ23 = document.getElementById('q23');
const campoPeso = secQ23.querySelector('#peso');
const campoAltura = secQ23.querySelector('#altura');
const btnCalcIMC = secQ23.querySelector('#calcular');
const resultadoQ23 = secQ23.querySelector('#resultado');

campoPeso.addEventListener('input', function() {
    if (this.value > 300) this.value = 300;
    if (this.value < 0) this.value = 0;
});

campoAltura.addEventListener('input', function() {
    if (this.value > 2.5) this.value = 2.5;
    if (this.value < 0) this.value = 0;
});

btnCalcIMC.addEventListener('click', function() {
    if (campoPeso.value === "" || campoAltura.value === "") {
        resultadoQ23.innerText = "Por favor, informe o peso e a altura.";
        resultadoQ23.style.color = "black";
        return;
    }

    const peso = Number(campoPeso.value);
    const altura = Number(campoAltura.value);

    if (altura <= 0) {
        resultadoQ23.innerText = "A altura deve ser maior que zero.";
        resultadoQ23.style.color = "#c0392b";
        return;
    }

    const imc = peso / (altura * altura);
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
        resultadoQ23.style.color = "#e67e22";
    } else if (imc < 25) {
        classificacao = "Peso normal";
        resultadoQ23.style.color = "#27ae60";
    } else if (imc < 30) {
        classificacao = "Sobrepeso";
        resultadoQ23.style.color = "#e67e22";
    } else {
        classificacao = "Obesidade";
        resultadoQ23.style.color = "#c0392b";
    }

    resultadoQ23.innerText = `IMC: ${imc.toFixed(2)} - Classificação: ${classificacao}.`;
});

// ==========================================
// QUESTÃO 24 - HORÁRIO DA BIBLIOTECA
// ==========================================
const secQ24 = document.getElementById('q24');
const campoHorario = secQ24.querySelector('#horario');
const btnVerifHorario = secQ24.querySelector('#verificar');
const resultadoQ24 = secQ24.querySelector('#resultado');

campoHorario.addEventListener('input', function() {
    if (this.value > 23) this.value = 23;
    if (this.value < 0) this.value = 0;
});

btnVerifHorario.addEventListener('click', function() {
    if (campoHorario.value === "") {
        resultadoQ24.innerText = "Por favor, informe o horário atual.";
        resultadoQ24.style.color = "black";
        return;
    }

    const hora = Number(campoHorario.value);

    if (hora >= 8 && hora <= 22) {
        resultadoQ24.innerText = `Horário informado: ${hora}h. A biblioteca está ABERTA (Horário de funcionamento: 8h às 22h).`;
        resultadoQ24.style.color = "#27ae60";
    } else {
        resultadoQ24.innerText = `Horário informado: ${hora}h. A biblioteca está FECHADA no momento.`;
        resultadoQ24.style.color = "#c0392b";
    }
});

// ==========================================
// QUESTÃO 25 - MÉDIA E SITUAÇÃO ESCOLAR
// ==========================================
const secQ25 = document.getElementById('q25');
const campoMediaQ25 = secQ25.querySelector('#media');
const btnVerifMedia = secQ25.querySelector('#verificar');
const resultadoQ25 = secQ25.querySelector('#resultado');

campoMediaQ25.addEventListener('input', function() {
    if (this.value > 10) this.value = 10;
    if (this.value < 0) this.value = 0;
});

btnVerifMedia.addEventListener('click', function() {
    if (campoMediaQ25.value === "") {
        resultadoQ25.innerText = "Por favor, informe a média do estudante.";
        resultadoQ25.style.color = "black";
        return;
    }

    const media = Number(campoMediaQ25.value);

    if (media >= 7) {
        resultadoQ25.innerText = `Média ${media.toFixed(1)}: Estudante APROVADO!`;
        resultadoQ25.style.color = "#27ae60";
    } else if (media >= 5) {
        resultadoQ25.innerText = `Média ${media.toFixed(1)}: Estudante em RECUPERAÇÃO.`;
        resultadoQ25.style.color = "#e67e22";
    } else {
        resultadoQ25.innerText = `Média ${media.toFixed(1)}: Estudante REPROVADO.`;
        resultadoQ25.style.color = "#c0392b";
    }
});

// ==========================================
// QUESTÃO 26 - TOTAL DA COMPRA E FRETE GRÁTIS
// ==========================================
const secQ26 = document.getElementById('q26');
const campoPreco = secQ26.querySelector('#preco');
const campoQtdCompra = secQ26.querySelector('#quantidade');
const btnCalcTotal = secQ26.querySelector('#calcular');
const resultadoQ26 = secQ26.querySelector('#resultado');

campoPreco.addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
});

campoQtdCompra.addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
});

btnCalcTotal.addEventListener('click', function() {
    if (campoPreco.value === "" || campoQtdCompra.value === "") {
        resultadoQ26.innerText = "Por favor, informe o preço e a quantidade.";
        resultadoQ26.style.color = "black";
        return;
    }

    const preco = Number(campoPreco.value);
    const qtd = Number(campoQtdCompra.value);
    const total = preco * qtd;

    if (total >= 300) {
        resultadoQ26.innerText = `Valor total: R$ ${total.toFixed(2).replace('.', ',')} - Você ganhou FRETE GRÁTIS!`;
        resultadoQ26.style.color = "#27ae60";
    } else {
        resultadoQ26.innerText = `Valor total: R$ ${total.toFixed(2).replace('.', ',')} - O frete será cobrado (Compras a partir de R$ 300,00 ganham frete grátis).`;
        resultadoQ26.style.color = "#e67e22";
    }
});

// ==========================================
// QUESTÃO 27 - NÍVEL DE BATERIA
// ==========================================
const secQ27 = document.getElementById('q27');
const campoBateria = secQ27.querySelector('#bateria');
const btnVerifBateria = secQ27.querySelector('#verificar');
const resultadoQ27 = secQ27.querySelector('#resultado');

campoBateria.addEventListener('input', function() {
    if (this.value > 100) this.value = 100;
    if (this.value < 0) this.value = 0;
});

btnVerifBateria.addEventListener('click', function() {
    if (campoBateria.value === "") {
        resultadoQ27.innerText = "Por favor, informe o nível de bateria.";
        resultadoQ27.style.color = "black";
        return;
    }

    const pct = Number(campoBateria.value);

    if (pct <= 20) {
        resultadoQ27.innerText = `Bateria em ${pct}%: Nível CRÍTICO! Conecte o carregador.`;
        resultadoQ27.style.color = "#c0392b";
    } else if (pct <= 50) {
        resultadoQ27.innerText = `Bateria em ${pct}%: Nível MODERADO.`;
        resultadoQ27.style.color = "#e67e22";
    } else {
        resultadoQ27.innerText = `Bateria em ${pct}%: Nível SUFICIENTE.`;
        resultadoQ27.style.color = "#27ae60";
    }
});

// ==========================================
// QUESTÃO 28 - FORMULÁRIO DE INSCRIÇÃO
// ==========================================
const secQ28 = document.getElementById('q28');
const campoNomeQ28 = secQ28.querySelector('#nome');
const campoEmailQ28 = secQ28.querySelector('#email');
const btnCadastrarQ28 = secQ28.querySelector('#cadastrar');
const resultadoQ28 = secQ28.querySelector('#resultado');

btnCadastrarQ28.addEventListener('click', function() {
    const nome = campoNomeQ28.value.trim();
    const email = campoEmailQ28.value.trim();

    if (nome === "" || email === "") {
        resultadoQ28.innerText = "Atenção: Tanto o nome quanto o e-mail devem estar preenchidos para prosseguir.";
        resultadoQ28.style.color = "#c0392b";
    } else {
        resultadoQ28.innerText = `Inscrição realizada com sucesso! Bem-vindo(a), ${nome} (${email}).`;
        resultadoQ28.style.color = "#27ae60";
    }
});

// ==========================================
// QUESTÃO 29 - CLASSIFICAÇÃO DE ESTOQUE
// ==========================================
const secQ29 = document.getElementById('q29');
const campoQtdQ29 = secQ29.querySelector('#quantidade');
const btnClassifProd = secQ29.querySelector('#classificar');
const resultadoQ29 = secQ29.querySelector('#resultado');

campoQtdQ29.addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
});

btnClassifProd.addEventListener('click', function() {
    if (campoQtdQ29.value === "") {
        resultadoQ29.innerText = "Por favor, informe a quantidade do produto.";
        resultadoQ29.style.color = "black";
        return;
    }

    const qtd = Number(campoQtdQ29.value);

    if (qtd === 0) {
        resultadoQ29.innerText = "Produto INDISPONÍVEL no momento.";
        resultadoQ29.style.color = "#c0392b";
    } else if (qtd <= 5) {
        resultadoQ29.innerText = `Estoque BAIXO (restam ${qtd} unidade(s)).`;
        resultadoQ29.style.color = "#e67e22";
    } else {
        resultadoQ29.innerText = `Estoque DISPONÍVEL (${qtd} unidades em estoque).`;
        resultadoQ29.style.color = "#27ae60";
    }
});

// ==========================================
// QUESTÃO 30 - ANÁLISE INICIAL DE CRÉDITO
// ==========================================
const secQ30 = document.getElementById('q30');
const campoRenda = secQ30.querySelector('#renda');
const btnAnalisarCredito = secQ30.querySelector('#analisar');
const resultadoQ30 = secQ30.querySelector('#resultado');

campoRenda.addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
});

btnAnalisarCredito.addEventListener('click', function() {
    if (campoRenda.value === "") {
        resultadoQ30.innerText = "Por favor, informe o valor da renda mensal.";
        resultadoQ30.style.color = "black";
        return;
    }

    const renda = Number(campoRenda.value);

    if (renda < 2000) {
        resultadoQ30.innerText = `Renda declarada: R$ ${renda.toFixed(2).replace('.', ',')} - Análise NÃO APROVADA.`;
        resultadoQ30.style.color = "#c0392b";
    } else if (renda < 5000) {
        resultadoQ30.innerText = `Renda declarada: R$ ${renda.toFixed(2).replace('.', ',')} - Requer ANÁLISE COMPLEMENTAR.`;
        resultadoQ30.style.color = "#e67e22";
    } else {
        resultadoQ30.innerText = `Renda declarada: R$ ${renda.toFixed(2).replace('.', ',')} - Análise inicial APROVADA!`;
        resultadoQ30.style.color = "#27ae60";
    }
});
