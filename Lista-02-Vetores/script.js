const exercicios = [
  {
    id: 1,
    titulo: "1. Números de 1 a 10",
    descricao: "Exibe os números de 1 até 10 em ordem crescente usando a estrutura 'for'.",
    codigo: `let resultado = [];\nfor (let i = 1; i <= 10; i++) {\n  resultado.push(i);\n}\nconsole.log(resultado.join(", "));`,
    executar: () => {
      let res = [];
      for (let i = 1; i <= 10; i++) {
        res.push(i);
      }
      return res.join(", ");
    }
  },
  {
    id: 2,
    titulo: "2. Tabuada Automática",
    descricao: "Gera a tabuada de 1 a 10 de um número definido.",
    hasInput: true,
    codigo: `const numero = 7;\nlet tabuada = "";\nfor (let i = 1; i <= 10; i++) {\n  tabuada += \`\${numero} x \${i} = \${numero * i}\\n\`;\n}`,
    executar: (num = 7) => {
      let tabuada = "";
      for (let i = 1; i <= 10; i++) {
        tabuada += `${num} x ${i} = ${num * i}\n`;
      }
      return tabuada;
    }
  },
  {
    id: 3,
    titulo: "3. Soma Acumulada (1 a 100)",
    descricao: "Calcula e exibe a soma dos números sequenciais de 1 a 100 utilizando 'while'.",
    codigo: `let soma = 0;\nlet i = 1;\nwhile (i <= 100) {\n  soma += i;\n  i++;\n}\nconsole.log("Soma total: " + soma);`,
    executar: () => {
      let soma = 0;
      let i = 1;
      while (i <= 100) {
        soma += i;
        i++;
      }
      return `Soma total de 1 a 100 = ${soma}`;
    }
  },
  {
    id: 4,
    titulo: "4. Números Pares de 0 a 20",
    descricao: "Exibe todos os números pares no intervalo de 0 a 20 usando 'while'.",
    codigo: `let num = 0;\nlet pares = [];\nwhile (num <= 20) {\n  if (num % 2 === 0) {\n    pares.push(num);\n  }\n  num++;\n}`,
    executar: () => {
      let num = 0;
      let pares = [];
      while (num <= 20) {
        if (num % 2 === 0) {
          pares.push(num);
        }
        num++;
      }
      return pares.join(", ");
    }
  },
  {
    id: 5,
    titulo: "5. Contagem Regressiva (10 a 1)",
    descricao: "Exibe números de 10 até 1 utilizando 'do...while'.",
    codigo: `let contador = 10;\nlet resultado = [];\ndo {\n  resultado.push(contador);\n  contador--;\n} while (contador >= 1);`,
    executar: () => {
      let contador = 10;
      let resultado = [];
      do {
        resultado.push(contador);
        contador--;
      } while (contador >= 1);
      return resultado.join(" ... ") + " ... FOGO! 🚀";
    }
  },
  {
    id: 6,
    titulo: "6. Propriedades de Objeto",
    descricao: "Percorre as propriedades e valores de um objeto de usuário usando 'for...in'.",
    codigo: `const usuario = {\n  nome: "Ana Silva",\n  idade: 28,\n  cargo: "Desenvolvedora",\n  ativo: true\n};\n\nfor (let prop in usuario) {\n  console.log(\`\${prop}: \${usuario[prop]}\`);\n}`,
    executar: () => {
      const usuario = {
        nome: "Ana Silva",
        idade: 28,
        cargo: "Desenvolvedora",
        ativo: true
      };
      let saida = "";
      for (let prop in usuario) {
        saida += `${prop}: ${usuario[prop]}\n`;
      }
      return saida;
    }
  },
  {
    id: 7,
    titulo: "7. Média de Notas de um Array",
    descricao: "Calcula a média das notas armazenadas em um array.",
    codigo: `const notas = [8.5, 7.0, 9.5, 6.0];\nlet somaNotas = 0;\n\nfor (let i = 0; i < notas.length; i++) {\n  somaNotas += notas[i];\n}\nconst media = somaNotas / notas.length;`,
    executar: () => {
      const notas = [8.5, 7.0, 9.5, 6.0];
      let somaNotas = 0;
      for (let i = 0; i < notas.length; i++) {
        somaNotas += notas[i];
      }
      const media = somaNotas / notas.length;
      return `Notas: [${notas.join(", ")}]\nSoma total: ${somaNotas}\nMédia final: ${media.toFixed(2)}`;
    }
  },
  {
    id: 8,
    titulo: "8. Números Ímpares de 1 a 50",
    descricao: "Exibe apenas os números ímpares de 1 a 50.",
    codigo: `let impares = [];\nfor (let i = 1; i <= 50; i++) {\n  if (i % 2 !== 0) {\n    impares.push(i);\n  }\n}`,
    executar: () => {
      let impares = [];
      for (let i = 1; i <= 50; i++) {
        if (i % 2 !== 0) {
          impares.push(i);
        }
      }
      return impares.join(", ");
    }
  },
  {
    id: 9,
    titulo: "9. Contagem Regressiva (10 a 0)",
    descricao: "Simula um contador regressivo de 10 até 0.",
    codigo: `let contagem = [];\nfor (let i = 10; i >= 0; i--) {\n  contagem.push(i);\n}`,
    executar: () => {
      let contagem = [];
      for (let i = 10; i >= 0; i--) {
        contagem.push(i);
      }
      return contagem.join(" -> ") + " (Encerrado)";
    }
  }
];

const menuEl = document.getElementById('menu-exercicios');
const tituloEl = document.getElementById('ex-titulo');
const descricaoEl = document.getElementById('ex-descricao');
const resultadoEl = document.getElementById('ex-resultado');
const codigoEl = document.getElementById('ex-codigo');
const interactiveAreaEl = document.getElementById('interactive-area');

function renderizarMenu() {
  exercicios.forEach((ex, index) => {
    const li = document.createElement('li');
    li.textContent = ex.titulo;
    li.onclick = () => selecionarExercicio(index);
    menuEl.appendChild(li);
  });
}

function selecionarExercicio(index) {
  const items = menuEl.querySelectorAll('li');
  items.forEach(item => item.classList.remove('active'));
  items[index].classList.add('active');

  const ex = exercicios[index];
  tituloEl.textContent = ex.titulo;
  descricaoEl.textContent = ex.descricao;
  codigoEl.textContent = ex.codigo;
  interactiveAreaEl.innerHTML = '';

  if (ex.hasInput) {
    interactiveAreaEl.innerHTML = `
      <div class="input-group">
        <label for="numInput"><strong>Escolha o número da tabuada:</strong></label>
        <input type="number" id="numInput" value="7" min="1" max="100">
      </div>
    `;
    const input = document.getElementById('numInput');
    resultadoEl.textContent = ex.executar(Number(input.value));
    input.oninput = () => {
      resultadoEl.textContent = ex.executar(Number(input.value));
    };
  } else {
    resultadoEl.textContent = ex.executar();
  }
}

renderizarMenu();
selecionarExercicio(0);