// Base completa contendo a lógica e interface das 50 Questões
const exercises = [
  // ==================== BLOCO I: CONDICIONAIS (1 a 17) ====================
  {
    id: 1,
    title: "Ex 01: Consumo de Energia",
    desc: "Classifica residências conforme consumo mensal em kWh com mensagens de orientação.",
    inputs: [{ name: "kwh", label: "Consumo Mensal (kWh):", type: "number" }],
    run: (i) => {
      const k = parseFloat(i.kwh);
      if (isNaN(k) || k < 0) return "Erro: Entrada inválida. Digite um valor não negativo.";
      if (k <= 100) return `Consumo: ${k} kWh | Faixa: Baixo\nOrientação: Excelente consumo! Mantenha os bons hábitos.`;
      if (k <= 200) return `Consumo: ${k} kWh | Faixa: Moderado\nOrientação: Consumo dentro da média esperada para residências.`;
      if (k <= 400) return `Consumo: ${k} kWh | Faixa: Elevado\nOrientação: Atente-se ao tempo no banho e uso de ar-condicionado.`;
      return `Consumo: ${k} kWh | Faixa: Muito Alto (Crítico)\nOrientação: Recomendada revisão técnica das instalações e aparelhos.`;
    }
  },
  {
    id: 2,
    title: "Ex 02: Bolsa Acadêmica",
    desc: "Avalia elegibilidade baseada em Média Geral (>=8.0), Frequência (>=75%) e Renda per capita (<=R$1500).",
    inputs: [
      { name: "media", label: "Média Geral (0 a 10):", type: "number" },
      { name: "freq", label: "Frequência (%):", type: "number" },
      { name: "renda", label: "Renda Familiar Per Capita (R$):", type: "number" }
    ],
    run: (i) => {
      const m = parseFloat(i.media), f = parseFloat(i.freq), r = parseFloat(i.renda);
      if (isNaN(m) || isNaN(f) || isNaN(r) || m < 0 || m > 10 || f < 0 || f > 100 || r < 0) return "Erro: Dados de entrada inválidos.";
      
      let impedimentos = [];
      if (m < 8.0) impedimentos.push("Média inferior a 8.0");
      if (f < 75) impedimentos.push("Frequência abaixo de 75%");
      if (r > 1500) impedimentos.push("Renda per capita superior a R$ 1.500,00");

      if (impedimentos.length === 0) return "Resultado: ELEGÍVEL PARA A BOLSA ACADÊMICA.";
      if (impedimentos.length === 1 && m >= 7.5 && f >= 75) return "Resultado: NECESSITA DE ANÁLISE COMPLEMENTAR.";
      return `Resultado: NÃO ELEGÍVEL.\nCausas do indeferimento:\n- ` + impedimentos.join("\n- ");
    }
  },
  {
    id: 3,
    title: "Ex 03: Triagem de Atendimento",
    desc: "Define a prioridade (Alta, Média ou Baixa) com base na idade e condição prioritária.",
    inputs: [
      { name: "idade", label: "Idade (0 a 120):", type: "number" },
      { name: "pref", label: "Possui condição prioritária declarada? (sim/nao):", type: "text" }
    ],
    run: (i) => {
      const id = parseInt(i.idade);
      const cond = i.pref?.toLowerCase() === "sim";
      if (isNaN(id) || id < 0 || id > 120) return "Erro: Idade fora dos limites plausíveis.";

      if (id >= 80 || (id >= 60 && cond)) return "Prioridade: ALTA (Atendimento Imediato)";
      if (id >= 60 || cond) return "Prioridade: MÉDIA (Atendimento Preferencial)";
      return "Prioridade: BAIXA (Fila Geral)";
    }
  },
  {
    id: 4,
    title: "Ex 04: Acesso ao Laboratório",
    desc: "Valida acesso verificando Matrícula Ativa, Treinamento Concluído e Horário (08h às 22h).",
    inputs: [
      { name: "mat", label: "Matrícula ativa? (sim/nao):", type: "text" },
      { name: "trein", label: "Treinamento de Segurança realizado? (sim/nao):", type: "text" },
      { name: "hora", label: "Horário atual (0 a 23h):", type: "number" }
    ],
    run: (i) => {
      const m = i.mat?.toLowerCase() === "sim";
      const t = i.trein?.toLowerCase() === "sim";
      const h = parseInt(i.hora);

      if (isNaN(h) || h < 0 || h > 23) return "Erro: Horário inválido.";
      if (m && t && h >= 8 && h <= 22) return "ACESSO AUTORIZADO AO LABORATÓRIO.";

      let recusas = [];
      if (!m) recusas.push("Recusa por pendência cadastral: Matrícula inativa.");
      if (!t) recusas.push("Recusa por pendência cadastral: Treinamento não realizado.");
      if (h < 8 || h > 22) recusas.push("Recusa por horário: Fora do expediente (08h às 22h).");

      return "ACESSO NEGADO:\n- " + recusas.join("\n- ");
    }
  },
  {
    id: 5,
    title: "Ex 05: Estacionamento",
    desc: "Calcula valor da permanência considerando tolerância e categorias.",
    inputs: [{ name: "horas", label: "Horas de permanência:", type: "number" }],
    run: (i) => {
      const h = parseFloat(i.horas);
      if (isNaN(h) || h < 0) return "Erro: Tempo de permanência não pode ser negativo.";
      if (h <= 0.25) return "Categoria: Tolerância Inicial (Até 15 min)\nValor a Pagar: R$ 0,00";
      if (h <= 2) return `Categoria: Curta Permanência (${h}h)\nValor a Pagar: R$ ${(h * 10).toFixed(2)}`;
      return `Categoria: Longa Permanência (${h}h)\nValor a Pagar: R$ ${(20 + (h - 2) * 5).toFixed(2)}`;
    }
  },
  {
    id: 6,
    title: "Ex 06: Desconto Progressivo",
    desc: "Calcula desconto conforme valor da compra e plano de fidelidade.",
    inputs: [
      { name: "valor", label: "Valor Total da Compra (R$):", type: "number" },
      { name: "fid", label: "Participa do Programa de Fidelidade? (sim/nao):", type: "text" }
    ],
    run: (i) => {
      const v = parseFloat(i.valor);
      const f = i.fid?.toLowerCase() === "sim";
      if (isNaN(v) || v < 0) return "Erro: Valor total inválido.";

      let desc = 0;
      if (v >= 500) desc = f ? 0.20 : 0.15;
      else if (v >= 200) desc = f ? 0.12 : 0.08;
      else desc = f ? 0.05 : 0;

      const vFinal = v - (v * desc);
      return `Valor Bruto: R$ ${v.toFixed(2)}\nDesconto: ${desc * 100}%\nValor Final a Pagar: R$ ${vFinal.toFixed(2)}`;
    }
  },
  {
    id: 7,
    title: "Ex 07: Situação Acadêmica",
    desc: "Classifica aluno em Aprovado, Recuperação ou Reprovado conforme nota e frequência.",
    inputs: [
      { name: "nota", label: "Nota Final (0 a 10):", type: "number" },
      { name: "freq", label: "Frequência (%):", type: "number" }
    ],
    run: (i) => {
      const n = parseFloat(i.nota), f = parseFloat(i.freq);
      if (isNaN(n) || n < 0 || n > 10 || isNaN(f) || f < 0 || f > 100) return "Erro: Dados fora dos intervalos permitidos.";
      
      if (f < 75) return `Situação: REPROVADO POR FREQUÊNCIA (Frequência de ${f}%).`;
      if (n >= 7.0) return `Situação: APROVADO com nota ${n.toFixed(1)}.`;
      if (n >= 4.0) return `Situação: RECUPERAÇÃO com nota ${n.toFixed(1)}.`;
      return `Situação: REPROVADO POR NOTA com nota ${n.toFixed(1)}.`;
    }
  },
  {
    id: 8,
    title: "Ex 08: Escolha de Plano",
    desc: "Recomenda plano de internet combinando GB consumidos e quantidade de dispositivos.",
    inputs: [
      { name: "gb", label: "Consumo Mensal (GB):", type: "number" },
      { name: "disp", label: "Qtd. de Dispositivos Conectados:", type: "number" }
    ],
    run: (i) => {
      const g = parseFloat(i.gb), d = parseInt(i.disp);
      if (isNaN(g) || g < 0 || isNaN(d) || d < 0) return "Erro: Consumo e dispositivos devem ser maiores ou iguais a zero.";

      if (g > 500 || d > 8) return "Plano Recomendado: FIBRA PREMIUM (1 Gbps)\nMotivo: Demanda intensa de dados e/ou alta densidade de aparelhos.";
      if (g > 200 || d > 4) return "Plano Recomendado: FIBRA INTERMEDIÁRIO (500 Mbps)\nMotivo: Consumo moderado com múltiplos dispositivos simultâneos.";
      return "Plano Recomendado: FIBRA BÁSICO (200 Mbps)\nMotivo: Uso trivial diário com poucos conexões concorrentes.";
    }
  },
  {
    id: 9,
    title: "Ex 09: Alerta de Estoque",
    desc: "Classifica estoque em Crítico, Adequado ou Excesso comparando atual e mínimo.",
    inputs: [
      { name: "atual", label: "Estoque Atual:", type: "number" },
      { name: "min", label: "Estoque Mínimo:", type: "number" }
    ],
    run: (i) => {
      const a = parseInt(i.atual), m = parseInt(i.min);
      if (isNaN(a) || isNaN(m) || a < 0 || m < 0) return "Erro: O estoque não pode possuir valores negativos.";

      if (a < m) return `Situação: CRÍTICO (${a} unidades)\nMensagem: Necessária solicitação imediata de reposição.`;
      if (a > m * 3) return `Situação: EXCESSO (${a} unidades)\nMensagem: Atenção! Há capital parado em estoque elevado.`;
      return `Situação: ADEQUADO (${a} unidades)\nMensagem: Nível operacional estável.`;
    }
  },
  {
    id: 10,
    title: "Ex 10: Conversor de Temp.",
    desc: "Valida faixas operacionais em Celsius e calcula equivalência em Fahrenheit.",
    inputs: [{ name: "celsius", label: "Temperatura (°C):", type: "number" }],
    run: (i) => {
      const c = parseFloat(i.celsius);
      if (isNaN(c)) return "Erro: Digite um número válido.";
      const f = (c * 9/5) + 32;

      let faixa = "";
      if (c < 0) faixa = "Fora de Faixa (Congelante)";
      else if (c <= 35) faixa = "Faixa Operacional Esperada";
      else faixa = "Fora de Faixa (Superaquecimento)";

      return `Celsius: ${c.toFixed(1)}°C | Fahrenheit: ${f.toFixed(1)}°F\nClassificação: ${faixa}`;
    }
  },
  {
    id: 11,
    title: "Ex 11: Aprovação de Crédito",
    desc: "Determina aprovação de crédito com base no comprometimento de renda e histórico.",
    inputs: [
      { name: "renda", label: "Renda Mensal (R$):", type: "number" },
      { name: "parcela", label: "Valor da Parcela (R$):", type: "number" },
      { name: "hist", label: "Possui Histórico Limpo? (sim/nao):", type: "text" }
    ],
    run: (i) => {
      const r = parseFloat(i.renda), p = parseFloat(i.parcela);
      const h = i.hist?.toLowerCase() === "sim";
      if (isNaN(r) || isNaN(p) || r <= 0 || p <= 0) return "Erro: Renda e parcela devem ser maiores que zero.";

      const comp = (p / r) * 100;
      if (h && comp <= 30) return `Decisão: CRÉDITO APROVADO\nFatores: Histórico limpo e comprometimento de ${comp.toFixed(1)}% (<= 30%).`;
      if (h && comp <= 40) return `Decisão: PENDENTE DE ANÁLISE COMPLEMENTAR\nFatores: Comprometimento de ${comp.toFixed(1)}% acima do ideal.`;
      return `Decisão: CRÉDITO RECUSADO\nFatores: ${!h ? "Restrição no histórico. " : ""}${comp > 40 ? `Comprometimento alto (${comp.toFixed(1)}%).` : ""}`;
    }
  },
  {
    id: 12,
    title: "Ex 12: Controle de Velocidade",
    desc: "Avalia velocidade registrada contra limite da via e enquadra excessos em níveis.",
    inputs: [
      { name: "vel", label: "Velocidade Medida (km/h):", type: "number" },
      { name: "limite", label: "Limite da Via (km/h):", type: "number" }
    ],
    run: (i) => {
      const v = parseFloat(i.vel), l = parseFloat(i.limite);
      if (isNaN(v) || isNaN(l) || v < 0 || l <= 0) return "Erro: Parâmetros de velocidade inválidos.";

      if (v <= l) return `Velocidade: ${v} km/h | Situação: REGULAR (Dentro do limite de ${l} km/h).`;
      const diff = ((v - l) / l) * 100;

      if (diff <= 20) return `Excesso: +${diff.toFixed(1)}% | Enquadramento: EXCESSO LEVE (Infração Média).`;
      if (diff <= 50) return `Excesso: +${diff.toFixed(1)}% | Enquadramento: EXCESSO GRAVE (Infração Grave).`;
      return `Excesso: +${diff.toFixed(1)}% | Enquadramento: EXCESSO GRAVÍSSIMO (Suspensão da CNH).`;
    }
  },
  {
    id: 13,
    title: "Ex 13: Desempenho Servidor",
    desc: "Avalia uso de CPU e Memória (0 a 100%) e emite alerta operacional.",
    inputs: [
      { name: "cpu", label: "Uso de CPU (%):", type: "number" },
      { name: "ram", label: "Uso de Memória RAM (%):", type: "number" }
    ],
    run: (i) => {
      const c = parseFloat(i.cpu), r = parseFloat(i.ram);
      if (isNaN(c) || isNaN(r) || c < 0 || c > 100 || r < 0 || r > 100) return "Erro: Percentuais devem estar entre 0% e 100%.";

      if (c > 85 && r > 85) return "Estado: CRÍTICO\nJustificativa: CPU e RAM em sobrecarga simultânea extrema.";
      if (c > 85 || r > 85) return `Estado: ATENÇÃO\nJustificativa: Pico isolado no recurso (${c > 85 ? "CPU" : "RAM"}).`;
      return "Estado: NORMAL\nJustificativa: Processamento e memória com níveis operacionais estáveis.";
    }
  },
  {
    id: 14,
    title: "Ex 14: Validação de Triângulo",
    desc: "Aplica desigualdade triangular e classifica em Equilátero, Isósceles ou Escaleno.",
    inputs: [
      { name: "a", label: "Lado A:", type: "number" },
      { name: "b", label: "Lado B:", type: "number" },
      { name: "c", label: "Lado C:", type: "number" }
    ],
    run: (i) => {
      const a = parseFloat(i.a), b = parseFloat(i.b), c = parseFloat(i.c);
      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) return "Erro: Todos os lados devem ser números estritamente positivos.";

      if (a + b > c && a + c > b && b + c > a) {
        if (a === b && b === c) return "Forma um Triângulo: EQUILÁTERO (3 lados iguais).";
        if (a === b || a === c || b === c) return "Forma um Triângulo: ISÓSCELES (2 lados iguais).";
        return "Forma um Triângulo: ESCALENO (3 lados distintos).";
      }
      return "Resultado: As medidas informadas NÃO ATENDEM à desigualdade triangular.";
    }
  },
  {
    id: 15,
    title: "Ex 15: Imposto Progressivo",
    desc: "Determina imposto progressivo fictício por alíquotas em 4 faixas.",
    inputs: [{ name: "renda", label: "Renda Mensal (R$):", type: "number" }],
    run: (i) => {
      const r = parseFloat(i.renda);
      if (isNaN(r) || r < 0) return "Erro: Renda não pode ser negativa.";

      let imp = 0, faixa = "", alic = "";
      if (r <= 2000) { faixa = "Faixa 1 (Isento)"; alic = "0%"; imp = 0; }
      else if (r <= 4000) { faixa = "Faixa 2"; alic = "7.5%"; imp = (r - 2000) * 0.075; }
      else if (r <= 7000) { faixa = "Faixa 3"; alic = "15%"; imp = (2000 * 0.075) + (r - 4000) * 0.15; }
      else { faixa = "Faixa 4"; alic = "22.5%"; imp = (2000 * 0.075) + (3000 * 0.15) + (r - 7000) * 0.225; }

      return `Renda Bruta: R$ ${r.toFixed(2)}\nFaixa Aplicada: ${faixa}\nAlíquota Máxima: ${alic}\nImposto a Recolher: R$ ${imp.toFixed(2)}`;
    }
  },
  {
    id: 16,
    title: "Ex 16: Índice de Qualidade",
    desc: "Classifica índice de 0 a 100 em 5 níveis com marcação de limites exatos.",
    inputs: [{ name: "iq", label: "Índice de Qualidade (0 a 100):", type: "number" }],
    run: (i) => {
      const q = parseFloat(i.iq);
      if (isNaN(q) || q < 0 || q > 100) return "Erro: O índice deve ser um valor entre 0 e 100.";

      let notaLimite = (q % 20 === 0) ? " [ALERTA: Valor exatamente no limite da faixa!]" : "";
      let cat = "";

      if (q < 20) cat = "Crítico / Péssimo";
      else if (q < 40) cat = "Insatisfatório / Ruim";
      else if (q < 60) cat = "Aceitável / Regular";
      else if (q < 80) cat = "Bom / Elevado";
      else cat = "Excelência";

      return `Índice Registrado: ${q}\nClassificação: ${cat}${notaLimite}`;
    }
  },
  {
    id: 17,
    title: "Ex 17: Regras de Frete",
    desc: "Calcula valor do frete combinando valor da compra, região e plano de benefícios.",
    inputs: [
      { name: "v", label: "Valor da Compra (R$):", type: "number" },
      { name: "reg", label: "Região (Sudeste/Sul/Outros):", type: "text" },
      { name: "ben", label: "Cliente Benefício/VIP? (sim/nao):", type: "text" }
    ],
    run: (i) => {
      const v = parseFloat(i.v);
      const r = i.reg?.trim().toLowerCase();
      const b = i.ben?.toLowerCase() === "sim";

      if (isNaN(v) || v < 0) return "Erro: Valor da compra inválido.";
      let fBase = r === "sudeste" ? 20 : (r === "sul" ? 35 : 50);

      if (b || v >= 300) return `Política: FRETE GRÁTIS!\nJustificativa: ${b ? "Benefício VIP ativo." : "Compra superior a R$ 300,00."}\nFrete Final: R$ 0,00`;
      if (v >= 150) return `Política: FRETE COM 50% DESCONTO\nFrete Final: R$ ${(fBase / 2).toFixed(2)}`;
      return `Política: FRETE INTEGRAL\nFrete Final: R$ ${fBase.toFixed(2)}`;
    }
  },

  // ==================== BLOCO II: ESTRUTURAS DE REPETIÇÃO (18 a 34) ====================
  {
    id: 18,
    title: "Ex 18: Consumo Semanal",
    desc: "Processa 7 consumos diários, calculando total, média, dias acima da meta e extremos (sem Math.max/min).",
    inputs: [{ name: "dias", label: "Informe 7 valores em kWh (separados por vírgula):", type: "text" }],
    run: (i) => {
      const arr = i.dias?.split(",").map(v => parseFloat(v.trim()));
      if (!arr || arr.length !== 7 || arr.some(isNaN)) return "Erro: Forneça exatamente 7 números válidos.";

      let total = 0, meta = 50, acima = 0;
      let maior = arr[0], menor = arr[0];

      for (let j = 0; j < arr.length; j++) {
        let v = arr[j];
        total += v;
        if (v > meta) acima++;
        if (v > maior) maior = v;
        if (v < menor) menor = v;
      }

      return `Consumo Total: ${total.toFixed(1)} kWh\nMédia Diária: ${(total/7).toFixed(1)} kWh\nDias acima da meta (${meta} kWh): ${acima}\nMaior Consumo: ${maior} kWh | Menor Consumo: ${menor} kWh`;
    }
  },
  {
    id: 19,
    title: "Ex 19: Tabuada Personalizada",
    desc: "Gera a tabuada de um número até um limite configurado via laço `for`.",
    inputs: [
      { name: "num", label: "Multiplicando:", type: "number" },
      { name: "lim", label: "Limite da Tabuada:", type: "number" }
    ],
    run: (i) => {
      const n = parseInt(i.num), lim = parseInt(i.lim);
      if (isNaN(n) || isNaN(lim) || lim <= 0) return "Erro: Forneça números inteiros válidos.";

      let out = `--- TABUADA DO ${n} (Até ${lim}) ---\n`;
      for (let k = 1; k <= lim; k++) {
        out += `${n} x ${k} = ${n * k}\n`;
      }
      return out;
    }
  },
  {
    id: 20,
    title: "Ex 20: Contagem Regressiva",
    desc: "Exibe sequência regressiva a partir de um valor positivo até 0.",
    inputs: [{ name: "inicio", label: "Valor Inicial:", type: "number" }],
    run: (i) => {
      const s = parseInt(i.inicio);
      if (isNaN(s) || s <= 0) return "Erro: Digite um inteiro maior que zero.";

      let nums = [];
      for (let k = s; k >= 0; k--) nums.push(k);
      return nums.join(" -> ") + "\n🚀 OPERAÇÃO INICIADA COM SUCESSO!";
    }
  },
  {
    id: 21,
    title: "Ex 21: Soma até Sentinela",
    desc: "Acumula vendas digitadas (separadas por vírgula) até encontrar a sentinela -1.",
    inputs: [{ name: "vendas", label: "Sequência de vendas (ex: 50, 100, 20, -1, 80):", type: "text" }],
    run: (i) => {
      const lista = i.vendas?.split(",").map(v => parseFloat(v.trim()));
      if (!lista) return "Erro: Digite a sequência de números.";

      let total = 0, qtd = 0, idx = 0;
      while (idx < lista.length) {
        let v = lista[idx];
        if (v === -1) break;
        if (!isNaN(v) && v >= 0) {
          total += v;
          qtd++;
        }
        idx++;
      }
      const media = qtd > 0 ? (total / qtd).toFixed(2) : "0.00";
      return `Vendas Registradas: ${qtd}\nSoma Total: R$ ${total.toFixed(2)}\nMédia por Venda: R$ ${media}`;
    }
  },
  {
    id: 22,
    title: "Ex 22: Autenticação",
    desc: "Simula controle com no máximo 3 tentativas (Senha padrão: 1234).",
    inputs: [{ name: "tent", label: "Tentativas digitadas (separadas por vírgula):", type: "text" }],
    run: (i) => {
      const t = i.tent?.split(",").map(s => s.trim()) || [];
      const correta = "1234";
      let count = 0, ok = false;

      while (count < t.length && count < 3) {
        if (t[count] === correta) { ok = true; count++; break; }
        count++;
      }

      if (ok) return `ACESSO CONCEDIDO na tentativa ${count} de 3.`;
      return `SISTEMA BLOQUEADO! Superado o limite de 3 tentativas falhas.`;
    }
  },
  {
    id: 23,
    title: "Ex 23: Pares e Ímpares",
    desc: "Percorre intervalo numérico contabilizando e somando pares e ímpares.",
    inputs: [
      { name: "ini", label: "Limite Inicial:", type: "number" },
      { name: "fim", label: "Limite Final:", type: "number" }
    ],
    run: (i) => {
      let ini = parseInt(i.ini), fim = parseInt(i.fim);
      if (isNaN(ini) || isNaN(fim)) return "Erro: Limites inválidos.";
      if (ini > fim) { let aux = ini; ini = fim; fim = aux; } // Corrige inversão

      let cP = 0, sP = 0, cI = 0, sI = 0;
      for (let k = ini; k <= fim; k++) {
        if (k % 2 === 0) { cP++; sP += k; }
        else { cI++; sI += k; }
      }

      return `Intervalo: [${ini} a ${fim}]\nPares: ${cP} ocorrências | Soma = ${sP}\nÍmpares: ${cI} ocorrências | Soma = ${sI}`;
    }
  },
  {
    id: 24,
    title: "Ex 24: Fatorial Validado",
    desc: "Calcula o fatorial de um inteiro não negativo sem funções prontas.",
    inputs: [{ name: "n", label: "Número (N >= 0):", type: "number" }],
    run: (i) => {
      const n = parseInt(i.n);
      if (isNaN(n) || n < 0) return "Erro de Processamento: O número deve ser um inteiro não negativo.";
      if (n === 0) return "0! = 1 (Por definição matemática)";

      let fat = 1;
      for (let k = n; k >= 1; k--) fat *= k;
      return `Cálculo de Fatorial:\n${n}! = ${fat}`;
    }
  },
  {
    id: 25,
    title: "Ex 25: Levantamento de Turma",
    desc: "Resumo de notas sem usar vetores: média geral, contagem de faixas e extremos.",
    inputs: [{ name: "notas", label: "Notas dos Alunos (separadas por vírgula):", type: "text" }],
    run: (i) => {
      const arr = i.notas?.split(",").map(n => parseFloat(n.trim()));
      if (!arr || arr.length === 0 || arr.some(isNaN)) return "Erro: Digite notas válidas.";

      let soma = 0, ap = 0, rec = 0, rep = 0;
      let mai = arr[0], men = arr[0];

      for (let k = 0; k < arr.length; k++) {
        let nota = arr[k];
        if (nota < 0 || nota > 10) return `Erro: A nota ${nota} está fora dos limites (0 a 10).`;
        soma += nota;
        if (nota >= 7) ap++;
        else if (nota >= 4) rec++;
        else rep++;

        if (nota > mai) mai = nota;
        if (nota < men) men = nota;
      }

      return `Total de Alunos: ${arr.length}\nMédia Geral: ${(soma/arr.length).toFixed(2)}\nAprovados (>=7): ${ap} | Recuperação: ${rec} | Reprovados: ${rep}\nMaior Nota: ${mai.toFixed(1)} | Menor Nota: ${men.toFixed(1)}`;
    }
  },
  {
    id: 26,
    title: "Ex 26: Crescimento de Investimento",
    desc: "Simula rendimento fixo por período usando `while` até atingir valor-alvo.",
    inputs: [
      { name: "ini", label: "Valor Inicial (R$):", type: "number" },
      { name: "taxa", label: "Taxa por Período (%):", type: "number" },
      { name: "alvo", label: "Valor Alvo (R$):", type: "number" }
    ],
    run: (i) => {
      let saldo = parseFloat(i.ini);
      const taxa = parseFloat(i.taxa) / 100;
      const alvo = parseFloat(i.alvo);

      if (isNaN(saldo) || isNaN(taxa) || isNaN(alvo) || saldo <= 0 || alvo <= saldo || taxa <= 0) {
        return "Erro: Parâmetros inválidos. Certifique-se de que o saldo e a taxa são maiores que zero e o alvo é superior ao inicial.";
      }

      let periodo = 0;
      let log = `Saldo Inicial: R$ ${saldo.toFixed(2)}\n`;
      while (saldo < alvo && periodo < 500) { // Limite de segurança de 500 períodos
        periodo++;
        saldo += saldo * taxa;
        log += `Período ${periodo}: R$ ${saldo.toFixed(2)}\n`;
      }

      return `${log}Goal Atingido em ${periodo} períodos com Saldo Final de R$ ${saldo.toFixed(2)}`;
    }
  },
  {
    id: 27,
    title: "Ex 27: Sequência de Fibonacci",
    desc: "Gera iterativamente os N primeiros termos de Fibonacci.",
    inputs: [{ name: "n", label: "Quantidade de termos:", type: "number" }],
    run: (i) => {
      const n = parseInt(i.n);
      if (isNaN(n) || n <= 0) return "Erro: A quantidade de termos deve ser um número inteiro positivo.";

      let seq = [];
      let a = 0, b = 1;
      for (let k = 1; k <= n; k++) {
        seq.push(`Posição ${k}: ${a}`);
        let temp = a + b;
        a = b;
        b = temp;
      }
      return seq.join("\n");
    }
  },
  {
    id: 28,
    title: "Ex 28: Verificação de Primo",
    desc: "Verifica se um número possui exatamente 2 divisores utilizando laço e `break`.",
    inputs: [{ name: "num", label: "Número Inteiro:", type: "number" }],
    run: (i) => {
      const n = parseInt(i.num);
      if (isNaN(n)) return "Erro: Informe um valor numérico inteiro.";
      if (n < 2) return `O número ${n} NÃO É PRIMO (números primos são inteiros maiores ou iguais a 2).`;

      let ehPrimo = true;
      for (let k = 2; k <= Math.sqrt(n); k++) {
        if (n % k === 0) {
          ehPrimo = false;
          break;
        }
      }
      return ehPrimo ? `O número ${n} É PRIMO.` : `O número ${n} NÃO É PRIMO (possui divisores além de 1 e dele mesmo).`;
    }
  },
  {
    id: 29,
    title: "Ex 29: Pesquisa de Satisfação",
    desc: "Mapeia notas de 1 a 5 com laço indeterminado até receber marcador -1.",
    inputs: [{ name: "resp", label: "Respostas (1 a 5, separadas por vírgula, ex: 5,4,2,9,5,-1):", type: "text" }],
    run: (i) => {
      const entradas = i.resp?.split(",").map(v => parseInt(v.trim()));
      if (!entradas) return "Erro: Digite os dados.";

      let freq = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let totalValidos = 0, soma = 0, idx = 0;

      while (idx < entradas.length) {
        let nota = entradas[idx];
        if (nota === -1) break; // Marcador de encerramento
        idx++;
        
        if (isNaN(nota) || nota < 1 || nota > 5) continue; // Ignora notas fora da faixa 1-5

        freq[nota]++;
        soma += nota;
        totalValidos++;
      }

      if (totalValidos === 0) return "Nenhuma resposta válida registrada na pesquisa.";

      let res = `--- RESULTADO DA PESQUISA ---\nTotal de Respostas Válidas: ${totalValidos}\nMédia da Satisfação: ${(soma/totalValidos).toFixed(2)}\n\nFrequência por Nota:\n`;
      for (let k = 1; k <= 5; k++) {
        res += `Nota ${k}: ${freq[k]} voto(s) (${((freq[k]/totalValidos)*100).toFixed(1)}%)\n`;
      }
      return res;
    }
  },
  {
    id: 30,
    title: "Ex 30: Controle de Caixa Diário",
    desc: "Acumula entradas (E) e saídas (S) com sinalização de saldo negativo final.",
    inputs: [{ name: "ops", label: "Operações (ex: E:100, S:30, E:50, S:-10, SAIR):", type: "text" }],
    run: (i) => {
      const ops = i.ops?.split(",").map(s => s.trim());
      if (!ops) return "Erro: Digite as operações.";

      let saldo = 0, cEntradas = 0, cSaidas = 0;
      let idx = 0;

      while (idx < ops.length) {
        let op = ops[idx].toUpperCase();
        if (op === "SAIR") break;
        idx++;

        let partes = op.split(":");
        if (partes.length !== 2) continue;
        let tipo = partes[0];
        let valor = parseFloat(partes[1]);

        if (isNaN(valor) || valor <= 0) continue; // Impede valores negativos ou inválidos

        if (tipo === "E") {
          saldo += valor;
          cEntradas++;
        } else if (tipo === "S") {
          saldo -= valor;
          cSaidas++;
        }
      }

      let statusSaldo = saldo < 0 ? "⚠️ ALERTA: SALDO FINAL NEGATIVO!" : "STATUS: Saldo positivo ou zerado.";
      return `--- RESUMO FINANCEIRO DO CAIXA ---\nTotal de Entradas: ${cEntradas}\nTotal de Saídas: ${cSaidas}\nSaldo Final Acumulado: R$ ${saldo.toFixed(2)}\n${statusSaldo}`;
    }
  },
  {
    id: 31,
    title: "Ex 31: Jogo de Adivinhação",
    desc: "Compara palpites contra número secreto (padrão: 42) com limite de tentativas.",
    inputs: [{ name: "palpites", label: "Seus palpites (separados por vírgula, ex: 20, 50, 42):", type: "text" }],
    run: (i) => {
      const lista = i.palpites?.split(",").map(n => parseInt(n.trim()));
      if (!lista) return "Erro: Digite seus palpites.";

      const secreto = 42;
      const maxTentativas = 5;
      let tent = 0, acertou = false, log = "";

      for (let k = 0; k < lista.length && k < maxTentativas; k++) {
        tent++;
        let p = lista[k];
        if (isNaN(p)) continue;

        if (p === secreto) {
          log += `Tentativa ${tent}: Palpite ${p} -> ACERTOU!\n`;
          acertou = true;
          break;
        } else if (p < secreto) {
          log += `Tentativa ${tent}: Palpite ${p} -> Muito BAIXO.\n`;
        } else {
          log += `Tentativa ${tent}: Palpite ${p} -> Muito ALTO.\n`;
        }
      }

      if (acertou) return `${log}\n🎉 PARABÉNS! Você adivinhou em ${tent} tentativa(s).`;
      return `${log}\n❌ FIM DE JOGO! Você esgotou o limite de ${maxTentativas} tentativas. O número secreto era ${secreto}.`;
    }
  },
  {
    id: 32,
    title: "Ex 32: Múltiplos em Intervalo",
    desc: "Encontra múltiplos simultâneos de dois divisores em um intervalo determinado via `for`.",
    inputs: [
      { name: "ini", label: "Início do Intervalo:", type: "number" },
      { name: "fim", label: "Fim do Intervalo:", type: "number" },
      { name: "d1", label: "Divisor 1:", type: "number" },
      { name: "d2", label: "Divisor 2:", type: "number" }
    ],
    run: (i) => {
      const ini = parseInt(i.ini), fim = parseInt(i.fim);
      const d1 = parseInt(i.d1), d2 = parseInt(i.d2);

      if (isNaN(ini) || isNaN(fim) || isNaN(d1) || isNaN(d2)) return "Erro: Insira dados numéricos válidos.";
      if (d1 === 0 || d2 === 0) return "Erro: Divisores não podem ser iguais a zero.";

      let achados = [];
      for (let k = ini; k <= fim; k++) {
        if (k % d1 === 0 && k % d2 === 0) achados.push(k);
      }

      return `Múltiplos simultâneos de ${d1} e ${d2} no intervalo [${ini}, ${fim}]:\n` +
             (achados.length > 0 ? achados.join(", ") : "Nenhum múltiplo encontrado.") +
             `\nTotal encontrado: ${achados.length}`;
    }
  },
  {
    id: 33,
    title: "Ex 33: Padrão com Laços Aninhados",
    desc: "Desenha triângulo textual utilizando laços aninhados (sem `.repeat()`).",
    inputs: [
      { name: "linhas", label: "Quantidade de Linhas:", type: "number" },
      { name: "char", label: "Caractere do Padrão:", type: "text" }
    ],
    run: (i) => {
      const n = parseInt(i.linhas);
      const c = i.char || "*";
      if (isNaN(n) || n <= 0) return "Erro: Informe um número de linhas válido.";

      let padrao = "";
      for (let r = 1; r <= n; r++) {
        let linhaStr = "";
        for (let col = 1; col <= r; col++) {
          linhaStr += c;
        }
        padrao += linhaStr + "\n";
      }
      return padrao;
    }
  },
  {
    id: 34,
    title: "Ex 34: Processamento de Sensor",
    desc: "Filtra 20 leituras descarta valores fora da faixa [0, 100] usando `continue` e calcula média.",
    inputs: [{ name: "leituras", label: "20 Leituras do Sensor (separadas por vírgula):", type: "text" }],
    run: (i) => {
      const arr = i.leituras?.split(",").map(v => parseFloat(v.trim()));
      if (!arr || arr.length !== 20 || arr.some(isNaN)) return "Erro: Informe exatamente 20 leituras numéricas válidas.";

      let descartes = 0, validos = 0, soma = 0;
      for (let k = 0; k < arr.length; k++) {
        let val = arr[k];
        if (val < 0 || val > 100) { // Filtro da faixa operacional [0, 100]
          descartes++;
          continue;
        }
        soma += val;
        validos++;
      }

      const media = validos > 0 ? (soma / validos).toFixed(2) : "0.00";
      return `Total de Leituras Recebidas: 20\nLeituras Válidas Aceitas: ${validos}\nLeituras Descartadas (Fora da Faixa): ${descartes}\nMédia Operacional Válida: ${media}`;
    }
  },

  // ==================== BLOCO III: VETORES (ARRAYS) E INTEGRAÇÃO (35 a 50) ====================
  {
    id: 35,
    title: "Ex 35: Cadastro e Análise em Vetor",
    desc: "Armazena notas em vetor, calculando média, maior/menor e posições acima da média.",
    inputs: [{ name: "notas", label: "Notas da Turma (separadas por vírgula):", type: "text" }],
    run: (i) => {
      const v = i.notas?.split(",").map(n => parseFloat(n.trim()));
      if (!v || v.length === 0 || v.some(isNaN)) return "Erro: Entrada inválida.";

      let soma = 0, mai = v[0], men = v[0];
      for (let k = 0; k < v.length; k++) {
        soma += v[k];
        if (v[k] > mai) mai = v[k];
        if (v[k] < men) men = v[k];
      }
      const media = soma / v.length;

      let posAcima = [];
      for (let k = 0; k < v.length; k++) {
        if (v[k] > media) posAcima.push(`Índice ${k} (Nota: ${v[k]})`);
      }

      return `Array de Notas: [${v.join(", ")}]\nMédia da Turma: ${media.toFixed(2)}\nMaior Nota: ${mai} | Menor Nota: ${men}\nNotas acima da média nas posições:\n- ` + posAcima.join("\n- ");
    }
  },
  {
    id: 36,
    title: "Ex 36: Consumo Mensal (12 Meses)",
    desc: "Mapeia 12 consumos em array, descobrindo maior/menor mês e meses acima da média.",
    inputs: [{ name: "meses", label: "12 Consumos Mensais em kWh (separados por vírgula):", type: "text" }],
    run: (i) => {
      const v = i.meses?.split(",").map(n => parseFloat(n.trim()));
      const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      if (!v || v.length !== 12 || v.some(isNaN)) return "Erro: Forneça exatamente 12 consumos.";

      let total = 0, iMaior = 0, iMenor = 0;
      for (let k = 0; k < 12; k++) {
        total += v[k];
        if (v[k] > v[iMaior]) iMaior = k;
        if (v[k] < v[iMenor]) iMenor = k;
      }
      const media = total / 12;

      let acima = [];
      for (let k = 0; k < 12; k++) {
        if (v[k] > media) acima.push(`${nomesMeses[k]} (${v[k]} kWh)`);
      }

      return `Consumo Total Anual: ${total.toFixed(1)} kWh\nMédia Mensal: ${media.toFixed(1)} kWh\n` +
             `Mês de Maior Consumo: ${nomesMeses[iMaior]} (${v[iMaior]} kWh)\n` +
             `Mês de Menor Consumo: ${nomesMeses[iMenor]} (${v[iMenor]} kWh)\n` +
             `Meses acima da média mensal:\n- ` + acima.join("\n- ");
    }
  },
  {
    id: 37,
    title: "Ex 37: Busca Manual de Produto",
    desc: "Realiza busca linear em array sem usar `.indexOf()`, `.includes()` ou `.find()`.",
    inputs: [
      { name: "lista", label: "Lista de Códigos de Produtos (separados por vírgula):", type: "text" },
      { name: "alvo", label: "Código a Buscar:", type: "text" }
    ],
    run: (i) => {
      const v = i.lista?.split(",").map(s => s.trim());
      const alvo = i.alvo?.trim();
      if (!v || !alvo) return "Erro: Preencha a lista e o código alvo.";

      let pos = -1;
      for (let k = 0; k < v.length; k++) {
        if (v[k] === alvo) {
          pos = k;
          break; // Interrompe no primeiro resultado
        }
      }

      return pos !== -1 ? `Sucesso: Código "${alvo}" encontrado no índice ${pos}.` : `Resultado: Código "${alvo}" NÃO cadastrado no sistema.`;
    }
  },
  {
    id: 38,
    title: "Ex 38: Ocorrências em Vetor",
    desc: "Mapeia contagem e todas as posições de um valor de referência sem métodos prontos.",
    inputs: [
      { name: "vetor", label: "Vetor de Números (separados por vírgula):", type: "text" },
      { name: "ref", label: "Valor de Referência:", type: "number" }
    ],
    run: (i) => {
      const v = i.vetor?.split(",").map(n => parseInt(n.trim()));
      const ref = parseInt(i.ref);
      if (!v || isNaN(ref)) return "Erro: Preencha o vetor e o valor numérico de referência.";

      let pos = [];
      for (let k = 0; k < v.length; k++) {
        if (v[k] === ref) pos.push(k);
      }

      if (pos.length === 0) return `O valor ${ref} não aparece nenhuma vez no vetor.`;
      return `Valor ${ref} encontrado ${pos.length} vez(es).\nPosições (índices): [${pos.join(", ")}]`;
    }
  },
  {
    id: 39,
    title: "Ex 39: Separação de Pares e Ímpares",
    desc: "Distribui elementos de um vetor original para dois novos vetores (Pares e Ímpares).",
    inputs: [{ name: "nums", label: "Números inteiros (separados por vírgula):", type: "text" }],
    run: (i) => {
      const orig = i.nums?.split(",").map(n => parseInt(n.trim()));
      if (!orig || orig.some(isNaN)) return "Erro: Vetor de entradas inválido.";

      let pares = [], impares = [];
      for (let k = 0; k < orig.length; k++) {
        if (orig[k] % 2 === 0) pares.push(orig[k]);
        else impares.push(orig[k]);
      }

      return `Vetor Original: [${orig.join(", ")}]\nVetor de Pares: [${pares.join(", ")}]\nVetor de Ímpares: [${impares.join(", ")}]`;
    }
  },
  {
    id: 40,
    title: "Ex 40: Remoção Lógica de Duplicados",
    desc: "Gera novo vetor mantendo apenas a primeira aparição de cada item sem usar `Set`.",
    inputs: [{ name: "itens", label: "Lista de Itens (ex: A, B, A, C, B, D):", type: "text" }],
    run: (i) => {
      const orig = i.itens?.split(",").map(s => s.trim());
      if (!orig) return "Erro: Forneça a lista de itens.";

      let unicos = [];
      for (let k = 0; k < orig.length; k++) {
        let existe = false;
        for (let j = 0; j < unicos.length; j++) {
          if (unicos[j] === orig[k]) { existe = true; break; }
        }
        if (!existe) unicos.push(orig[k]);
      }

      return `Lista Original: [${orig.join(", ")}]\nLista sem Duplicados: [${unicos.join(", ")}]`;
    }
  },
  {
    id: 41,
    title: "Ex 41: Inversão Manual de Vetor",
    desc: "Inverte ordem dos elementos em novo vetor sem utilizar o método `.reverse()`.",
    inputs: [{ name: "itens", label: "Elementos do vetor (separados por vírgula):", type: "text" }],
    run: (i) => {
      const orig = i.itens?.split(",").map(s => s.trim());
      if (!orig) return "Erro: Entrada inválida.";

      let invertido = [];
      for (let k = orig.length - 1; k >= 0; k--) {
        invertido.push(orig[k]);
      }

      return `Vetor Original: [${orig.join(", ")}]\nVetor Invertido: [${invertido.join(", ")}]`;
    }
  },
  {
    id: 42,
    title: "Ex 42: Ordenação Simples (Bubble Sort)",
    desc: "Ordena números em ordem crescente sem utilizar `.sort()` via laços aninhados.",
    inputs: [{ name: "nums", label: "Números para ordenar (separados por vírgula):", type: "text" }],
    run: (i) => {
      let v = i.nums?.split(",").map(n => parseFloat(n.trim()));
      if (!v || v.some(isNaN)) return "Erro: Digite números válidos.";

      let orig = [...v];
      for (let a = 0; a < v.length - 1; a++) {
        for (let b = 0; b < v.length - 1 - a; b++) {
          if (v[b] > v[b + 1]) {
            let temp = v[b];
            v[b] = v[b + 1];
            v[b + 1] = temp;
          }
        }
      }

      return `Vetor Desordenado: [${orig.join(", ")}]\nVetor Ordenado: [${v.join(", ")}]`;
    }
  },
  {
    id: 43,
    title: "Ex 43: Ranking de Desempenho",
    desc: "Mapeia as 3 maiores pontuações em um vetor, tratando possíveis empates.",
    inputs: [{ name: "scores", label: "Pontuações da equipe (separadas por vírgula):", type: "text" }],
    run: (i) => {
      let v = i.scores?.split(",").map(n => parseFloat(n.trim()));
      if (!v || v.some(isNaN)) return "Erro: Digite pontuações válidas.";

      // Ordenação manual simples em cópia
      let arr = [...v];
      for (let a = 0; a < arr.length; a++) {
        for (let b = a + 1; b < arr.length; b++) {
          if (arr[b] > arr[a]) { let aux = arr[a]; arr[a] = arr[b]; arr[b] = aux; }
        }
      }

      let ranking = [];
      for (let k = 0; k < arr.length && k < 3; k++) {
        ranking.push(`${k + 1}º Lugar: ${arr[k]} pontos`);
      }

      return `Pontuações Registradas: [${v.join(", ")}]\n--- TOP 3 RANKING ---\n` + ranking.join("\n");
    }
  },
  {
    id: 44,
    title: "Ex 44: Temperaturas Semanais (14 Dias)",
    desc: "Analisa 14 temperaturas com faixa de conforto [18°C a 26°C] e detecta sequências de calor.",
    inputs: [{ name: "temps", label: "14 Temperaturas em °C (separadas por vírgula):", type: "text" }],
    run: (i) => {
      const v = i.temps?.split(",").map(n => parseFloat(n.trim()));
      if (!v || v.length !== 14 || v.some(isNaN)) return "Erro: Forneça exatamente 14 leituras numéricas.";

      let soma = 0, abaixo = 0, conforto = 0, acima = 0;
      let seqAtual = 0, maxSeq = 0;

      for (let k = 0; k < 14; k++) {
        let t = v[k];
        soma += t;

        if (t < 18) abaixo++;
        else if (t <= 26) conforto++;
        else acima++;

        if (t > 26) {
          seqAtual++;
          if (seqAtual > maxSeq) maxSeq = seqAtual;
        } else {
          seqAtual = 0;
        }
      }

      return `Média das 2 Semanas: ${(soma/14).toFixed(1)}°C\n` +
             `Dias Abaixo do Conforto (<18°C): ${abaixo}\n` +
             `Dias na Faixa de Conforto (18-26°C): ${conforto}\n` +
             `Dias Acima do Conforto (>26°C): ${acima}\n` +
             `Maior Sequência Consecutiva de Dias Quentes: ${maxSeq} dia(s)`;
    }
  },
  {
    id: 45,
    title: "Ex 45: Arrays Paralelos",
    desc: "Integra vetor de Nomes de Produtos com vetor de Preços na mesma posição.",
    inputs: [
      { name: "prods", label: "Nomes dos Produtos (ex: Arroz, Feijão, Leite):", type: "text" },
      { name: "precos", label: "Preços Respectivos (ex: 25.50, 8.00, 5.20):", type: "text" },
      { name: "busca", label: "Consultar Produto por Nome:", type: "text" }
    ],
    run: (i) => {
      const p = i.prods?.split(",").map(s => s.trim());
      const pr = i.precos?.split(",").map(n => parseFloat(n.trim()));
      const b = i.busca?.trim().toLowerCase();

      if (!p || !pr || p.length !== pr.length || pr.some(isNaN)) return "Erro: Os vetores devem ter o mesmo tamanho e conter dados válidos.";

      let total = 0, iCaro = 0, iBarato = 0;
      let buscaRes = "Produto não consultado ou não encontrado no carrinho.";

      for (let k = 0; k < p.length; k++) {
        total += pr[k];
        if (pr[k] > pr[iCaro]) iCaro = k;
        if (pr[k] < pr[iBarato]) iBarato = k;
        if (b && p[k].toLowerCase() === b) {
          buscaRes = `Item Consultado: "${p[k]}" -> Preço: R$ ${pr[k].toFixed(2)} (Posição ${k})`;
        }
      }

      return `--- RESUMO DO CARRINHO ---\nTotal da Compra: R$ ${total.toFixed(2)}\nItem Mais Caro: ${p[iCaro]} (R$ ${pr[iCaro].toFixed(2)})\nItem Mais Barato: ${p[iBarato]} (R$ ${pr[iBarato].toFixed(2)})\n\n${buscaRes}`;
    }
  },
  {
    id: 46,
    title: "Ex 46: Fila de Atendimento",
    desc: "Simula controle de Fila com inserção no fim (`push`) e remoção no início (`shift`).",
    inputs: [{ name: "ops", label: "Comandos (ex: ENTRAR:Ana, ENTRAR:Beto, ATENDER, ENTRAR:Carla):", type: "text" }],
    run: (i) => {
      const ops = i.ops?.split(",").map(s => s.trim());
      if (!ops) return "Erro: Digite os comandos da fila.";

      let fila = [];
      let log = "";

      for (let k = 0; k < ops.length; k++) {
        let cmd = ops[k];
        if (cmd.startsWith("ENTRAR:")) {
          let nome = cmd.split(":")[1];
          fila.push(nome);
          log += `+ Entrou na Fila: ${nome}\n`;
        } else if (cmd === "ATENDER") {
          if (fila.length === 0) {
            log += `⚠️ Impossível Atender: A Fila está VAZIA!\n`;
          } else {
            let atendido = fila.shift();
            log += `- Atendimento Realizado: ${atendido}\n`;
          }
        }
      }

      return `${log}\nFila Final Atual: [${fila.length > 0 ? fila.join(", ") : "Fila Vazia"}]`;
    }
  },
  {
    id: 47,
    title: "Ex 47: Pesquisa com Filtro Explícito",
    desc: "Filtra medições acima de um limite sem `.filter()`, exibindo quantidade e percentual.",
    inputs: [
      { name: "med", label: "Medições (separadas por vírgula):", type: "text" },
      { name: "limite", label: "Limite de Corte:", type: "number" }
    ],
    run: (i) => {
      const v = i.med?.split(",").map(n => parseFloat(n.trim()));
      const lim = parseFloat(i.limite);
      if (!v || isNaN(lim) || v.some(isNaN)) return "Erro: Dados de entrada inválidos.";

      let selecionados = [];
      for (let k = 0; k < v.length; k++) {
        if (v[k] > lim) selecionados.push(v[k]);
      }

      const perc = ((selecionados.length / v.length) * 100).toFixed(1);
      return `Total de Medições: ${v.length}\nValores que superam ${lim}: [${selecionados.join(", ")}]\nQuantidade Selecionada: ${selecionados.length} (${perc}% do total)`;
    }
  },
  {
    id: 48,
    title: "Ex 48: Comparação Entre Dois Vetores",
    desc: "Compara dados de duas turmas posição por posição e confronta médias globais.",
    inputs: [
      { name: "t1", label: "Pontuações Turma 1 (separadas por vírgula):", type: "text" },
      { name: "t2", label: "Pontuações Turma 2 (mesmo número de alunos):", type: "text" }
    ],
    run: (i) => {
      const v1 = i.t1?.split(",").map(n => parseFloat(n.trim()));
      const v2 = i.t2?.split(",").map(n => parseFloat(n.trim()));

      if (!v1 || !v2 || v1.length !== v2.length || v1.some(isNaN) || v2.some(isNaN)) {
        return "Erro: Os dois vetores precisam ter exatamente o mesmo número de elementos válidos.";
      }

      let t1Maior = 0, t2Maior = 0, empates = 0;
      let s1 = 0, s2 = 0;

      for (let k = 0; k < v1.length; k++) {
        s1 += v1[k];
        s2 += v2[k];
        if (v1[k] > v2[k]) t1Maior++;
        else if (v2[k] > v1[k]) t2Maior++;
        else empates++;
      }

      const m1 = s1 / v1.length, m2 = s2 / v2.length;
      let com = m1 > m2 ? "Turma 1 obteve maior média global." : (m2 > m1 ? "Turma 2 obteve maior média global." : "Empate na média global.");

      return `Confronto Posição por Posição:\n- Turma 1 superou Turma 2: ${t1Maior} vezes\n- Turma 2 superou Turma 1: ${t2Maior} vezes\n- Empates em posições: ${empates}\n\nMédia Turma 1: ${m1.toFixed(2)} | Média Turma 2: ${m2.toFixed(2)}\nConclusão: ${com}`;
    }
  },
  {
    id: 49,
    title: "Ex 49: Matriz de Consumo",
    desc: "Analisa matriz 3x5 (3 Setores x 5 Dias), calculando totais de cada dimensão e pico absoluto.",
    inputs: [
      { name: "s1", label: "5 Consumos Setor A (separados por vírgula):", type: "text" },
      { name: "s2", label: "5 Consumos Setor B (separados por vírgula):", type: "text" },
      { name: "s3", label: "5 Consumos Setor C (separados por vírgula):", type: "text" }
    ],
    run: (i) => {
      const a1 = i.s1?.split(",").map(n => parseFloat(n.trim()));
      const a2 = i.s2?.split(",").map(n => parseFloat(n.trim()));
      const a3 = i.s3?.split(",").map(n => parseFloat(n.trim()));

      if (!a1 || !a2 || !a3 || a1.length !== 5 || a2.length !== 5 || a3.length !== 5 || a1.some(isNaN) || a2.some(isNaN) || a3.some(isNaN)) {
        return "Erro: Forneça exatamente 5 consumos para cada um dos 3 setores.";
      }

      const matriz = [a1, a2, a3];
      const nomesSetores = ["Setor A", "Setor B", "Setor C"];

      let totalSetor = [0, 0, 0];
      let totalDia = [0, 0, 0, 0, 0];
      let maiConsumo = matriz[0][0], setMai = 0, diaMai = 0;

      for (let s = 0; s < 3; s++) {
        for (let d = 0; d < 5; d++) {
          let val = matriz[s][d];
          totalSetor[s] += val;
          totalDia[d] += val;

          if (val > maiConsumo) {
            maiConsumo = val;
            setMai = s;
            diaMai = d;
          }
        }
      }

      return `Totais por Setor:\n- Setor A: ${totalSetor[0]} kWh\n- Setor B: ${totalSetor[1]} kWh\n- Setor C: ${totalSetor[2]} kWh\n\n` +
             `Totais por Dia:\n- Dia 1: ${totalDia[0]} | Dia 2: ${totalDia[1]} | Dia 3: ${totalDia[2]} | Dia 4: ${totalDia[3]} | Dia 5: ${totalDia[4]} kWh\n\n` +
             `Maior Consumo Individual: ${maiConsumo} kWh no ${nomesSetores[setMai]}, Dia ${diaMai + 1}`;
    }
  },
  {
    id: 50,
    title: "Ex 50: Painel Integrador de Eficiência",
    desc: "Desafio Integrador: Processa 10 residências em array, categoriza em faixas, emite estatísticas coletivas e alerta os casos críticos.",
    inputs: [{ name: "unidades", label: "10 Consumos Mensais (kWh, separados por vírgula):", type: "text" }],
    run: (i) => {
      const v = i.unidades?.split(",").map(n => parseFloat(n.trim()));
      if (!v || v.length < 10 || v.some(isNaN)) return "Erro: Forneça pelo menos 10 consumos numéricos válidos.";

      let soma = 0, mai = v[0], men = v[0];
      let f1 = 0, f2 = 0, f3 = 0, f4 = 0;

      for (let k = 0; k < v.length; k++) {
        let val = v[k];
        if (val < 0) return `Erro: Consumo negativo detectado na unidade ${k+1}.`;
        soma += val;

        if (val > mai) mai = val;
        if (val < men) men = val;

        if (val <= 100) f1++;
        else if (val <= 200) f2++;
        else if (val <= 400) f3++;
        else f4++;
      }

      const media = soma / v.length;
      let acimaMedia = [];
      let criticas = [];

      for (let k = 0; k < v.length; k++) {
        if (v[k] > media) acimaMedia.push(`Unidade ${k+1} (${v[k]} kWh)`);
        if (v[k] > 400) criticas.push(`Unidade ${k+1} (${v[k]} kWh)`);
      }

      return `==========================================\n` +
             ` PAINEL INTEGRADOR DE EFICIÊNCIA ENERGÉTICA\n` +
             `==========================================\n` +
             `Total de Unidades Avaliadas: ${v.length}\n` +
             `Consumo Médio Geral: ${media.toFixed(2)} kWh\n` +
             `Maior Consumo Registrado: ${mai} kWh | Menor: ${men} kWh\n\n` +
             `Distribuição por Faixas de Consumo:\n` +
             `- Faixa 1 (Baixo <= 100 kWh): ${f1} unidade(s)\n` +
             `- Faixa 2 (Moderado 101-200 kWh): ${f2} unidade(s)\n` +
             `- Faixa 3 (Elevado 201-400 kWh): ${f3} unidade(s)\n` +
             `- Faixa 4 (Crítico > 400 kWh): ${f4} unidade(s)\n\n` +
             `Unidades com consumo ACIMA da média coletiva:\n- ` + (acimaMedia.length > 0 ? acimaMedia.join("\n- ") : "Nenhuma") + `\n\n` +
             `⚠️ UNIDADES EM SITUAÇÃO CRÍTICA (Intervenção Necessária):\n- ` + (criticas.length > 0 ? criticas.join("\n- ") : "Nenhuma unidade em situação crítica");
    }
  }
];

// Gerenciador de Estado e Interface da Aplicação
let currentExercise = exercises[0];

document.addEventListener("DOMContentLoaded", () => {
  renderNavButtons();
  loadExercise(currentExercise.id);

  // Alternador de Tema (Claro / Escuro)
  const themeBtn = document.getElementById("theme-toggle-btn");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    const isDark = document.body.classList.contains("dark-theme");
    themeBtn.textContent = isDark ? "☀️ Tema Claro" : "🌙 Tema Escuro";
  });

  // Botão de Execução
  document.getElementById("run-btn").addEventListener("click", executeCurrentExercise);
});

function renderNavButtons() {
  const navContainer = document.getElementById("exercise-nav");
  navContainer.innerHTML = "";

  exercises.forEach(ex => {
    const btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.textContent = ex.title;
    btn.dataset.id = ex.id;
    btn.onclick = () => loadExercise(ex.id);
    navContainer.appendChild(btn);
  });
}

function loadExercise(id) {
  currentExercise = exercises.find(e => e.id === id);

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.id) === id);
  });

  document.getElementById("exercise-title").textContent = currentExercise.title;
  document.getElementById("exercise-description").textContent = currentExercise.desc;
  document.getElementById("output-display").textContent = "Aguardando execução...";

  const inputContainer = document.getElementById("input-container");
  inputContainer.innerHTML = "";

  currentExercise.inputs.forEach(inp => {
    const wrapper = document.createElement("div");
    wrapper.className = "input-field";

    const label = document.createElement("label");
    label.textContent = inp.label;

    const input = document.createElement("input");
    input.type = inp.type;
    input.id = `input-${inp.name}`;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    inputContainer.appendChild(wrapper);
  });
}

function executeCurrentExercise() {
  const inputsVal = {};
  currentExercise.inputs.forEach(inp => {
    const el = document.getElementById(`input-${inp.name}`);
    inputsVal[inp.name] = el ? el.value : "";
  });

  const result = currentExercise.run(inputsVal);
  document.getElementById("output-display").textContent = result;
}
