// ======================================================
// ÁREA DE PERSONALIZAÇÃO
// Para criar outros quizzes, altere apenas esta parte.
// ======================================================

const configuracaoQuiz = {
  paginaInicial: {
    titulo:
      "🍽️ SUA ALIMENTAÇÃO ESTÁ ADEQUADA DURANTE O TRATAMENTO COM TIRZEPATIDA?",

    texto:
      "Responda 5 perguntas rápidas e descubra se a sua rotina alimentar precisa de mais organização durante o tratamento.<br><br>Ao final, conheça um plano alimentar prático para ajudar você a fazer escolhas mais equilibradas no dia a dia.",

    imagem: "imagens/inicio.jpg",

    textoBotao: "👉 COMEÇAR O QUIZ"
  },

  perguntas: [
    {
      pergunta: "Como está o seu apetite durante o tratamento?",
      imagem: "imagens/pergunta-1.jpg",
      alternativas: [
        "Quase não sinto fome",
        "Sinto menos fome, mas consigo me alimentar",
        "Meu apetite varia bastante",
        "Ainda não comecei o tratamento"
      ]
    },

    {
      pergunta: "Como costuma ser sua alimentação ao longo do dia?",
      imagem: "imagens/pergunta-2.jpg",
      alternativas: [
        "Faço pequenas refeições bem distribuídas",
        "Passo muitas horas sem comer",
        "Como apenas quando sinto muita fome",
        "Não tenho uma rotina alimentar definida"
      ]
    },

    {
      pergunta: "Você sente algum desconforto depois de comer?",
      imagem: "imagens/pergunta-3.jpg",
      alternativas: [
        "Não sinto desconforto",
        "Sinto enjoo ou sensação de estômago muito cheio",
        "Tenho azia, gases ou má digestão",
        "Tenho vômitos, diarreia ou constipação frequente"
      ]
    },

    {
      pergunta: "O que mais dificulta sua alimentação atualmente?",
      imagem: "imagens/pergunta-4.jpg",
      alternativas: [
        "Não sei quais alimentos escolher",
        "Tenho dificuldade para preparar refeições",
        "Sinto pouca fome ou enjoo",
        "Acabo consumindo alimentos muito gordurosos ou industrializados"
      ]
    },

    {
      pergunta: "O que você procura em um plano alimentar?",
      imagem: "imagens/pergunta-5.jpg",
      alternativas: [
        "Refeições simples e fáceis de preparar",
        "Sugestões para os dias de pouco apetite",
        "Uma lista de compras organizada",
        "Todas as opções anteriores"
      ]
    }
  ],

  resultado: {
    titulo: "✅ SUA ALIMENTAÇÃO PRECISA ACOMPANHAR ESSA NOVA FASE",

    texto:
      "Durante o tratamento com tirzepatida, algumas pessoas podem sentir menos fome, maior saciedade ou desconfortos digestivos. Ter uma alimentação organizada pode facilitar a rotina e ajudar na ingestão adequada de líquidos e nutrientes.<br><br>Refeições menores e a redução de alimentos muito gordurosos podem ajudar algumas pessoas que apresentam náusea. Sintomas intensos ou persistentes devem ser comunicados ao profissional de saúde responsável pelo tratamento.",

    imagem: "imagens/resultado.jpg",

    tituloProduto:
      "🥗 Conheça o Plano Alimentar Durante o Tratamento com Tirzepatida",

    beneficios: [
      "Sugestões de refeições simples",
      "Opções para os dias de pouco apetite",
      "Organização das refeições",
      "Lista de compras",
      "Ideias de substituições",
      "Cuidados alimentares importantes"
    ],

    aviso:
      "Este material possui finalidade educativa e não substitui avaliação, diagnóstico, prescrição ou acompanhamento realizado por médico ou nutricionista. Cada pessoa pode ter necessidades alimentares diferentes.",

    textoBotao: "👉 QUERO CONHECER O PLANO ALIMENTAR",

    // COLE O LINK DO CHECKOUT ENTRE AS ASPAS:
    linkCheckout: "https://pay.cakto.com.br/fupjwct_1101552"
  }
};

// ======================================================
// FUNCIONAMENTO DO QUIZ
// Não é necessário alterar esta parte.
// ======================================================

const conteudoQuiz = document.getElementById("conteudo-quiz");
const progressoContainer = document.getElementById("progresso-container");
const barraProgresso = document.getElementById("progresso");
const numeroPergunta = document.getElementById("numero-pergunta");
const porcentagem = document.getElementById("porcentagem");

let perguntaAtual = 0;
let respostas = [];

function criarImagem(caminho, descricao) {
  if (!caminho) {
    return "";
  }

  return `
    <img
      class="imagem-quiz"
      src="${caminho}"
      alt="${descricao}"
      onerror="this.style.display='none'"
    >
  `;
}

function rolarParaTopo() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function mostrarPaginaInicial() {
  progressoContainer.classList.add("oculto");

  conteudoQuiz.innerHTML = `
    ${criarImagem(
      configuracaoQuiz.paginaInicial.imagem,
      "Ilustração sobre alimentação equilibrada"
    )}

    <h1 class="titulo">
      ${configuracaoQuiz.paginaInicial.titulo}
    </h1>

    <p class="texto">
      ${configuracaoQuiz.paginaInicial.texto}
    </p>

    <button
      type="button"
      class="botao-principal"
      id="botao-comecar"
    >
      ${configuracaoQuiz.paginaInicial.textoBotao}
    </button>
  `;

  document
    .getElementById("botao-comecar")
    .addEventListener("click", iniciarQuiz);
}

function iniciarQuiz() {
  perguntaAtual = 0;
  respostas = [];
  progressoContainer.classList.remove("oculto");
  mostrarPergunta();
}

function atualizarProgresso() {
  const total = configuracaoQuiz.perguntas.length;
  const percentual = Math.round(
    ((perguntaAtual + 1) / total) * 100
  );

  numeroPergunta.textContent =
    `Pergunta ${perguntaAtual + 1} de ${total}`;

  porcentagem.textContent = `${percentual}%`;
  barraProgresso.style.width = `${percentual}%`;
}

function mostrarPergunta() {
  atualizarProgresso();

  const dados = configuracaoQuiz.perguntas[perguntaAtual];
  const letras = ["A", "B", "C", "D", "E", "F"];

  const botoesAlternativas = dados.alternativas
    .map((alternativa, indice) => {
      const selecionada =
        respostas[perguntaAtual] === indice
          ? "selecionada"
          : "";

      return `
        <button
          type="button"
          class="alternativa ${selecionada}"
          data-indice="${indice}"
        >
          <strong>${letras[indice]})</strong>
          ${alternativa}
        </button>
      `;
    })
    .join("");

  conteudoQuiz.innerHTML = `
    ${criarImagem(
      dados.imagem,
      `Ilustração da pergunta ${perguntaAtual + 1}`
    )}

    <h2 class="subtitulo">
      ${dados.pergunta}
    </h2>

    <div class="alternativas">
      ${botoesAlternativas}
    </div>

    ${
      perguntaAtual > 0
        ? `
          <button
            type="button"
            class="botao-voltar"
            id="botao-voltar"
          >
            ← Voltar
          </button>
        `
        : ""
    }
  `;

  document
    .querySelectorAll(".alternativa")
    .forEach((botao) => {
      botao.addEventListener("click", selecionarResposta);
    });

  const botaoVoltar = document.getElementById("botao-voltar");

  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", voltarPergunta);
  }

  rolarParaTopo();
}

function selecionarResposta(evento) {
  const botaoEscolhido = evento.currentTarget;
  const indiceEscolhido = Number(
    botaoEscolhido.dataset.indice
  );

  respostas[perguntaAtual] = indiceEscolhido;

  document
    .querySelectorAll(".alternativa")
    .forEach((botao) => {
      botao.classList.remove("selecionada");
      botao.disabled = true;
    });

  botaoEscolhido.classList.add("selecionada");

  setTimeout(() => {
    const ultimaPergunta =
      perguntaAtual === configuracaoQuiz.perguntas.length - 1;

    if (ultimaPergunta) {
      mostrarCarregamento();
    } else {
      perguntaAtual++;
      mostrarPergunta();
    }
  }, 450);
}

function voltarPergunta() {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    mostrarPergunta();
  }
}

function mostrarCarregamento() {
  progressoContainer.classList.add("oculto");

  conteudoQuiz.innerHTML = `
    <h2 class="subtitulo">
      Estamos analisando suas respostas…
    </h2>

    <div class="carregamento"></div>

    <p class="texto" id="texto-analise">
      Preparando seu resultado…
    </p>
  `;

  rolarParaTopo();

  setTimeout(() => {
    mostrarResultado();
  }, 3000);
}

function mostrarResultado() {
  const resultado = configuracaoQuiz.resultado;

  const listaBeneficios = resultado.beneficios
    .map((beneficio) => `<li>${beneficio}</li>`)
    .join("");

  conteudoQuiz.innerHTML = `
    ${criarImagem(
      resultado.imagem,
      "Ilustração do plano alimentar"
    )}

    <h1 class="titulo">
      ${resultado.titulo}
    </h1>

    <p class="texto">
      ${resultado.texto}
    </p>

    <h2 class="subtitulo">
      ${resultado.tituloProduto}
    </h2>

    <ul class="lista-beneficios">
      ${listaBeneficios}
    </ul>

    <p class="aviso">
      <strong>Aviso importante:</strong><br>
      ${resultado.aviso}
    </p>

    <button
      type="button"
      class="botao-checkout"
      id="botao-checkout"
    >
      ${resultado.textoBotao}
    </button>

    <button
      type="button"
      class="botao-voltar"
      id="botao-refazer"
    >
      ↻ Refazer o quiz
    </button>
  `;

  document
    .getElementById("botao-checkout")
    .addEventListener("click", abrirCheckout);

  document
    .getElementById("botao-refazer")
    .addEventListener("click", iniciarQuiz);

  rolarParaTopo();
}

function abrirCheckout() {
  const link = configuracaoQuiz.resultado.linkCheckout.trim();

  if (link === "") {
    alert("O link de compra será disponibilizado em breve.");
    return;
  }

  window.open(link, "_blank", "noopener,noreferrer");
}

// Abre o site mostrando a primeira página.
mostrarPaginaInicial();