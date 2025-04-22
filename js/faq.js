// MEI em Foco - JavaScript para FAQ
// Projeto de extensão da Universidade de Vassouras - Campus Maricá
// Desenvolvido por: Diogo Santana Cardoso

document.addEventListener('DOMContentLoaded', function() {
  // Funcionalidade de acordeão para FAQ
  const accordionButtons = document.querySelectorAll('.faq-question');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obter o elemento de resposta associado
      const answer = this.nextElementSibling;
      
      // Verificar se a resposta está visível
      const isVisible = answer.style.maxHeight;
      
      // Fechar todas as outras respostas
      const allAnswers = document.querySelectorAll('.faq-answer');
      const allQuestions = document.querySelectorAll('.faq-question');
      
      allAnswers.forEach(item => {
        item.style.maxHeight = null;
      });
      
      allQuestions.forEach(item => {
        item.classList.remove('active');
      });
      
      // Abrir apenas a resposta clicada
      if (!isVisible) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        this.classList.add('active');
      }
    });
  });
  
  // Pesquisa no FAQ
  const faqSearch = document.getElementById('faqSearch');
  
  if (faqSearch) {
    faqSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const faqItems = document.querySelectorAll('.faq-item');
      let resultsFound = false;
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
          resultsFound = true;
          
          // Destacar os termos de pesquisa
          if (searchTerm.length > 2) {
            highlightText(item, searchTerm);
          } else {
            // Remover destaques anteriores
            removeHighlights(item);
          }
        } else {
          item.style.display = 'none';
        }
      });
      
      // Mostrar mensagem quando não há resultados
      const noResultsMessage = document.getElementById('faqNoResults');
      if (noResultsMessage) {
        if (!resultsFound && searchTerm.length > 0) {
          noResultsMessage.style.display = 'block';
        } else {
          noResultsMessage.style.display = 'none';
        }
      }
      
      // Resetar destaques se o campo de pesquisa estiver vazio
      if (searchTerm.length === 0) {
        document.querySelectorAll('.faq-item').forEach(item => {
          removeHighlights(item);
        });
      }
    });
  }
  
  // Filtro por categorias no FAQ
  const categoryFilters = document.querySelectorAll('.faq-category-filter');
  
  if (categoryFilters.length > 0) {
    categoryFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const faqItems = document.querySelectorAll('.faq-item');
        
        // Remover classe ativa de todos os filtros
        categoryFilters.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Adicionar classe ativa ao filtro clicado
        this.classList.add('active');
        
        // Filtrar itens por categoria
        faqItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
        
        // Resetar campo de pesquisa
        if (faqSearch) {
          faqSearch.value = '';
        }
        
        // Esconder mensagem de "nenhum resultado"
        const noResultsMessage = document.getElementById('faqNoResults');
        if (noResultsMessage) {
          noResultsMessage.style.display = 'none';
        }
      });
    });
  }
  
  // Função para destacar texto
  function highlightText(element, term) {
    // Primeiro, remova destaques anteriores
    removeHighlights(element);
    
    // Função recursiva para percorrer nós de texto
    function searchAndHighlight(node) {
      if (node.nodeType === 3) { // Nó de texto
        const content = node.nodeValue;
        const lowerContent = content.toLowerCase();
        let position = lowerContent.indexOf(term);
        
        if (position !== -1) {
          // Criar um elemento span para destacar
          const highlightSpan = document.createElement('span');
          highlightSpan.className = 'highlight';
          
          // Dividir o nó de texto
          const before = document.createTextNode(content.substring(0, position));
          const highlight = document.createTextNode(content.substring(position, position + term.length));
          const after = document.createTextNode(content.substring(position + term.length));
          
          highlightSpan.appendChild(highlight);
          
          // Substituir o nó de texto original
          const parent = node.parentNode;
          parent.insertBefore(before, node);
          parent.insertBefore(highlightSpan, node);
          parent.insertBefore(after, node);
          parent.removeChild(node);
          
          // Continuar procurando no texto restante
          searchAndHighlight(after);
        }
      } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
        // Elemento: percorrer filhos
        for (let i = 0; i < node.childNodes.length; i++) {
          searchAndHighlight(node.childNodes[i]);
        }
      }
    }
    
    // Procurar na pergunta e na resposta
    const question = element.querySelector('.faq-question');
    const answer = element.querySelector('.faq-answer');
    
    searchAndHighlight(question);
    searchAndHighlight(answer);
  }
  
  // Função para remover destaques
  function removeHighlights(element) {
    const highlights = element.querySelectorAll('.highlight');
    
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      const textNode = document.createTextNode(highlight.textContent);
      parent.replaceChild(textNode, highlight);
      parent.normalize(); // Mesclar nós de texto adjacentes
    });
  }
  
  // Expandir a primeira pergunta por padrão
  const firstQuestion = document.querySelector('.faq-question');
  if (firstQuestion) {
    firstQuestion.click();
  }
});
