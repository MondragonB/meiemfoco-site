/**
 * MEI em Foco - Glossário Interativo
 * Projeto de extensão da Universidade de Vassouras - Campus Maricá
 * Desenvolvido por: Diogo Santana Cardoso
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o glossário interativo
  inicializarGlossario();
  
  // Tooltips foram removidos conforme solicitação do usuário
});

/**
 * Inicializa o glossário interativo na página de glossário
 */
function inicializarGlossario() {
  // Verifica se está na página de glossário
  const glossarioContainer = document.getElementById('glossario-container');
  if (!glossarioContainer) return;
  
  // Adiciona eventos aos filtros
  const filtroInput = document.getElementById('glossario-filtro-input');
  if (filtroInput) {
    filtroInput.addEventListener('input', filtrarTermos);
  }
  
  // Adiciona eventos às categorias
  const categorias = document.querySelectorAll('.glossario-categoria');
  categorias.forEach(categoria => {
    categoria.addEventListener('click', function() {
      // Remove a classe active de todas as categorias
      categorias.forEach(cat => cat.classList.remove('active'));
      // Adiciona a classe active à categoria clicada
      this.classList.add('active');
      // Filtra os termos pela categoria
      filtrarTermosPorCategoria(this.dataset.categoria);
    });
  });
  
  // Adiciona eventos às letras do alfabeto
  const letras = document.querySelectorAll('.glossario-letra');
  letras.forEach(letra => {
    letra.addEventListener('click', function() {
      // Remove a classe active de todas as letras
      letras.forEach(l => l.classList.remove('active'));
      // Adiciona a classe active à letra clicada
      this.classList.add('active');
      // Filtra os termos pela letra
      filtrarTermosPorLetra(this.textContent);
    });
  });
}

/**
 * Filtra os termos do glossário com base no texto digitado
 */
function filtrarTermos() {
  const filtroInput = document.getElementById('glossario-filtro-input');
  const termos = document.querySelectorAll('.glossario-item');
  
  const textoBusca = filtroInput.value.toLowerCase();
  
  termos.forEach(termo => {
    const tituloTermo = termo.querySelector('h3').textContent.toLowerCase();
    const descricaoTermo = termo.querySelector('p').textContent.toLowerCase();
    
    if (tituloTermo.includes(textoBusca) || descricaoTermo.includes(textoBusca)) {
      termo.style.display = 'block';
    } else {
      termo.style.display = 'none';
    }
  });
}

/**
 * Filtra os termos do glossário por categoria
 */
function filtrarTermosPorCategoria(categoria) {
  const termos = document.querySelectorAll('.glossario-item');
  
  if (categoria === 'todas') {
    termos.forEach(termo => {
      termo.style.display = 'block';
    });
    return;
  }
  
  termos.forEach(termo => {
    if (termo.dataset.categoria === categoria) {
      termo.style.display = 'block';
    } else {
      termo.style.display = 'none';
    }
  });
}

/**
 * Filtra os termos do glossário pela letra inicial
 */
function filtrarTermosPorLetra(letra) {
  const termos = document.querySelectorAll('.glossario-item');
  
  if (letra === 'Todos') {
    termos.forEach(termo => {
      termo.style.display = 'block';
    });
    return;
  }
  
  termos.forEach(termo => {
    const tituloTermo = termo.querySelector('h3').textContent;
    if (tituloTermo.charAt(0).toUpperCase() === letra) {
      termo.style.display = 'block';
    } else {
      termo.style.display = 'none';
    }
  });
}

// Funções de tooltip foram removidas conforme solicitação do usuário
