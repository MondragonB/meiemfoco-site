/**
 * MEI em Foco - Tutorial Interativo
 * Projeto de extensão da Universidade de Vassouras - Campus Maricá
 * Desenvolvido por: Diogo Santana Cardoso
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o tutorial interativo
  inicializarTutorial();
  
  // Adiciona o botão de ajuda em todas as páginas
  adicionarBotaoAjuda();
});

/**
 * Inicializa o tutorial interativo
 */
function inicializarTutorial() {
  // Verifica se é a primeira visita do usuário
  const primeiraVisita = localStorage.getItem('meiemfoco_primeira_visita') === null;
  
  // Se for a primeira visita, mostra o tutorial de boas-vindas
  if (primeiraVisita && window.location.pathname.includes('index.html')) {
    setTimeout(function() {
      mostrarTelaBoasVindas();
    }, 2000);
    
    // Marca que o usuário já visitou o site
    localStorage.setItem('meiemfoco_primeira_visita', 'false');
  }
  
  // Adiciona evento ao botão de tutorial no rodapé
  const botaoTutorial = document.querySelector('.tutorial-footer-button');
  if (botaoTutorial) {
    botaoTutorial.addEventListener('click', mostrarTelaBoasVindas);
  }
}

/**
 * Adiciona o botão de ajuda flutuante em todas as páginas
 */
function adicionarBotaoAjuda() {
  const botaoAjuda = document.createElement('div');
  botaoAjuda.className = 'tutorial-trigger';
  botaoAjuda.innerHTML = '<i class="fas fa-question-circle"></i>';
  botaoAjuda.setAttribute('aria-label', 'Abrir tutorial de ajuda');
  botaoAjuda.addEventListener('click', mostrarTelaBoasVindas);
  
  document.body.appendChild(botaoAjuda);
}

/**
 * Mostra a tela de boas-vindas do tutorial
 */
function mostrarTelaBoasVindas() {
  // Cria o overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  
  // Cria o container do tutorial
  const container = document.createElement('div');
  container.className = 'tutorial-container';
  
  // Conteúdo da tela de boas-vindas
  container.innerHTML = `
    <div class="tutorial-header">
      <div class="tutorial-title">Bem-vindo ao MEI em Foco!</div>
      <button class="tutorial-close" aria-label="Fechar tutorial"><i class="fas fa-times"></i></button>
    </div>
    <div class="tutorial-welcome">
      <div class="tutorial-welcome-icon">
        <i class="fas fa-hand-holding-heart"></i>
      </div>
      <h2 class="tutorial-welcome-title">Olá, Microempreendedor!</h2>
      <p class="tutorial-welcome-text">Gostaríamos de mostrar como navegar pelo nosso site e aproveitar ao máximo os recursos disponíveis para ajudar no seu negócio.</p>
      <div class="tutorial-welcome-buttons">
        <button class="tutorial-button tutorial-start">Iniciar Tour</button>
        <button class="tutorial-skip">Pular</button>
      </div>
    </div>
  `;
  
  // Adiciona os elementos ao DOM
  document.body.appendChild(overlay);
  document.body.appendChild(container);
  
  // Mostra os elementos com animação
  setTimeout(function() {
    overlay.style.display = 'block';
    container.style.display = 'block';
  }, 100);
  
  // Adiciona eventos aos botões
  container.querySelector('.tutorial-close').addEventListener('click', fecharTutorial);
  container.querySelector('.tutorial-skip').addEventListener('click', fecharTutorial);
  container.querySelector('.tutorial-start').addEventListener('click', function() {
    fecharTutorial();
    iniciarTour();
  });
}

/**
 * Fecha o tutorial
 */
function fecharTutorial() {
  const overlay = document.querySelector('.tutorial-overlay');
  const container = document.querySelector('.tutorial-container');
  
  if (overlay) {
    overlay.style.display = 'none';
    setTimeout(function() {
      overlay.remove();
    }, 300);
  }
  
  if (container) {
    container.style.display = 'none';
    setTimeout(function() {
      container.remove();
    }, 300);
  }
}

/**
 * Inicia o tour guiado pelo site
 */
function iniciarTour() {
  // Define as etapas do tour
  const etapas = [
    {
      elemento: '.logo',
      titulo: 'Navegação Principal',
      texto: 'Clique no logotipo a qualquer momento para voltar à página inicial.',
      posicao: 'bottom'
    },
    {
      elemento: '.nav-menu',
      titulo: 'Menu de Navegação',
      texto: 'Use este menu para acessar todas as seções do site.',
      posicao: 'bottom'
    },
    {
      elemento: '.hero-buttons',
      titulo: 'Ações Rápidas',
      texto: 'Estes botões permitem acessar rapidamente as funções mais importantes.',
      posicao: 'top'
    },
    {
      elemento: '.search-form',
      titulo: 'Busca',
      texto: 'Digite aqui para encontrar qualquer informação no site.',
      posicao: 'bottom'
    },
    {
      elemento: '.footer',
      titulo: 'Rodapé',
      texto: 'Aqui você encontra links úteis, informações de contato e redes sociais.',
      posicao: 'top'
    }
  ];
  
  // Inicia o tour pela primeira etapa
  mostrarEtapaTour(0, etapas);
}

/**
 * Mostra uma etapa específica do tour
 */
function mostrarEtapaTour(indice, etapas) {
  // Se chegou ao fim do tour, encerra
  if (indice >= etapas.length) {
    finalizarTour();
    return;
  }
  
  const etapa = etapas[indice];
  const elemento = document.querySelector(etapa.elemento);
  
  // Se o elemento não existir na página atual, pula para a próxima etapa
  if (!elemento) {
    mostrarEtapaTour(indice + 1, etapas);
    return;
  }
  
  // Rola a página para garantir que o elemento esteja visível
  // Verifica se o elemento está fora da área visível
  const rect = elemento.getBoundingClientRect();
  const isVisible = (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
  
  // Se o elemento não estiver visível, rola a página para ele
  if (!isVisible) {
    // Calcula a posição de rolagem ideal para centralizar o elemento
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const offset = 100; // Offset para não colar no topo/fundo da janela
    
    // Rolagem suave para o elemento
    window.scrollTo({
      top: elementTop - offset,
      behavior: 'smooth'
    });
    
    // Espera a rolagem terminar antes de mostrar o highlight
    setTimeout(() => {
      criarHighlightEToltip(elemento, etapa, indice, etapas);
    }, 500);
  } else {
    // Se já estiver visível, mostra o highlight imediatamente
    criarHighlightEToltip(elemento, etapa, indice, etapas);
  }
}

/**
 * Cria o highlight e tooltip para uma etapa do tour
 */
function criarHighlightEToltip(elemento, etapa, indice, etapas) {
  // Obtém a posição atualizada do elemento após a rolagem
  const rect = elemento.getBoundingClientRect();
  
  // Cria o overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  overlay.style.display = 'block';
  
  // Cria o highlight
  const highlight = document.createElement('div');
  highlight.className = 'tutorial-highlight';
  highlight.style.top = `${rect.top - 5}px`;
  highlight.style.left = `${rect.left - 5}px`;
  highlight.style.width = `${rect.width + 10}px`;
  highlight.style.height = `${rect.height + 10}px`;
  
  // Cria o tooltip
  const tooltip = document.createElement('div');
  tooltip.className = `tutorial-tooltip ${etapa.posicao}`;
  
  // Define a posição do tooltip
  switch (etapa.posicao) {
    case 'top':
      tooltip.style.bottom = `${window.innerHeight - rect.top + 15}px`;
      tooltip.style.left = `${rect.left + rect.width / 2 - 150}px`;
      break;
    case 'bottom':
      tooltip.style.top = `${rect.bottom + 15}px`;
      tooltip.style.left = `${rect.left + rect.width / 2 - 150}px`;
      break;
    case 'left':
      tooltip.style.top = `${rect.top + rect.height / 2 - 50}px`;
      tooltip.style.right = `${window.innerWidth - rect.left + 15}px`;
      break;
    case 'right':
      tooltip.style.top = `${rect.top + rect.height / 2 - 50}px`;
      tooltip.style.left = `${rect.right + 15}px`;
      break;
  }
  
  // Conteúdo do tooltip
  tooltip.innerHTML = `
    <h3>${etapa.titulo}</h3>
    <p>${etapa.texto}</p>
    <div class="tutorial-navigation">
      <button class="tutorial-button tutorial-prev" ${indice === 0 ? 'disabled' : ''}>Anterior</button>
      <div class="tutorial-progress">
        ${etapas.map((_, i) => `<div class="tutorial-dot ${i === indice ? 'active' : ''}"></div>`).join('')}
      </div>
      <button class="tutorial-button tutorial-next">${indice === etapas.length - 1 ? 'Finalizar' : 'Próximo'}</button>
    </div>
  `;
  
  // Adiciona os elementos ao DOM
  document.body.appendChild(overlay);
  document.body.appendChild(highlight);
  document.body.appendChild(tooltip);
  
  // Adiciona eventos aos botões
  const btnPrev = tooltip.querySelector('.tutorial-prev');
  const btnNext = tooltip.querySelector('.tutorial-next');
  
  if (btnPrev) {
    if (indice === 0) {
      btnPrev.classList.add('disabled');
    } else {
      btnPrev.addEventListener('click', function() {
        removerElementosTour();
        mostrarEtapaTour(indice - 1, etapas);
      });
    }
  }
  
  if (btnNext) {
    btnNext.addEventListener('click', function() {
      removerElementosTour();
      if (indice === etapas.length - 1) {
        finalizarTour();
      } else {
        mostrarEtapaTour(indice + 1, etapas);
      }
    });
  }
  
  // Adiciona eventos aos dots
  const dots = tooltip.querySelectorAll('.tutorial-dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', function() {
      removerElementosTour();
      mostrarEtapaTour(i, etapas);
    });
  });
  
  // Permite clicar fora para fechar
  overlay.addEventListener('click', function() {
    removerElementosTour();
  });
}

/**
 * Remove os elementos do tour
 */
function removerElementosTour() {
  const overlay = document.querySelector('.tutorial-overlay');
  const highlight = document.querySelector('.tutorial-highlight');
  const tooltip = document.querySelector('.tutorial-tooltip');
  
  if (overlay) overlay.remove();
  if (highlight) highlight.remove();
  if (tooltip) tooltip.remove();
}

/**
 * Finaliza o tour mostrando uma mensagem de conclusão
 */
function finalizarTour() {
  // Cria o overlay
  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  
  // Cria o container do tutorial
  const container = document.createElement('div');
  container.className = 'tutorial-container';
  
  // Conteúdo da tela de conclusão
  container.innerHTML = `
    <div class="tutorial-header">
      <div class="tutorial-title">Tour Concluído!</div>
      <button class="tutorial-close" aria-label="Fechar tutorial"><i class="fas fa-times"></i></button>
    </div>
    <div class="tutorial-welcome">
      <div class="tutorial-welcome-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h2 class="tutorial-welcome-title">Parabéns!</h2>
      <p class="tutorial-welcome-text">Agora você conhece as principais funcionalidades do nosso site. Lembre-se que você pode acessar este tutorial novamente a qualquer momento clicando no botão de ajuda.</p>
      <div class="tutorial-welcome-buttons">
        <button class="tutorial-button tutorial-close-btn">Começar a Explorar</button>
      </div>
    </div>
  `;
  
  // Adiciona os elementos ao DOM
  document.body.appendChild(overlay);
  document.body.appendChild(container);
  
  // Mostra os elementos com animação
  setTimeout(function() {
    overlay.style.display = 'block';
    container.style.display = 'block';
  }, 100);
  
  // Adiciona eventos aos botões
  container.querySelector('.tutorial-close').addEventListener('click', fecharTutorial);
  container.querySelector('.tutorial-close-btn').addEventListener('click', fecharTutorial);
}
