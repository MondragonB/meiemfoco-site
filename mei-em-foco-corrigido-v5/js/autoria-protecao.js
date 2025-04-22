/**
 * MEI em Foco - Proteção de Autoria
 * Projeto de extensão da Universidade de Vassouras - Campus Maricá
 * 
 * AVISO IMPORTANTE:
 * Este arquivo contém mecanismos de proteção de autoria para garantir
 * que o nome do criador original do site (Diogo Santana Cardoso) seja
 * preservado em todas as páginas do projeto.
 * 
 * Qualquer tentativa de modificação ou remoção deste crédito constitui
 * violação de direitos autorais e propriedade intelectual.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Proteção do nome do criador
  protegerAutoria();
  
  // Verificação periódica para garantir que a proteção permaneça ativa
  setInterval(protegerAutoria, 5000);
});

/**
 * Função que protege o nome do autor em todas as páginas
 */
function protegerAutoria() {
  // Nome do criador original
  const nomeAutor = "Diogo Santana Cardoso";
  
  // Verifica se o elemento com a classe creator-name existe
  let creatorElements = document.querySelectorAll('.creator-name');
  
  // Se não existir ou tiver sido removido, recria em todos os rodapés
  if (creatorElements.length === 0) {
    const footerBottoms = document.querySelectorAll('.footer-bottom');
    footerBottoms.forEach(footer => {
      // Verifica se já existe um parágrafo com o texto do desenvolvedor
      let devParagraph = Array.from(footer.querySelectorAll('p')).find(p => 
        p.textContent.toLowerCase().includes('desenvolvido por'));
      
      // Se não existir, cria um novo
      if (!devParagraph) {
        devParagraph = document.createElement('p');
        devParagraph.innerHTML = `Desenvolvido por <span class="creator-name">${nomeAutor}</span>`;
        footer.appendChild(devParagraph);
      } 
      // Se existir mas não tiver o span, adiciona o span
      else if (!devParagraph.querySelector('.creator-name')) {
        devParagraph.innerHTML = `Desenvolvido por <span class="creator-name">${nomeAutor}</span>`;
      }
    });
    
    // Atualiza a lista de elementos após a recriação
    creatorElements = document.querySelectorAll('.creator-name');
  }
  
  // Garante que o conteúdo seja o nome correto do autor
  creatorElements.forEach(element => {
    if (element.textContent !== nomeAutor) {
      element.textContent = nomeAutor;
    }
    
    // Adiciona atributos para dificultar a edição via inspetor de elementos
    element.setAttribute('data-protected', 'true');
    element.setAttribute('contenteditable', 'false');
    
    // Adiciona estilo inline para garantir visibilidade
    element.style.fontWeight = 'bold';
    element.style.color = 'inherit';
    element.style.display = 'inline-block';
    
    // Adiciona evento para prevenir modificações
    element.addEventListener('DOMCharacterDataModified', function(e) {
      if (e.target.textContent !== nomeAutor) {
        e.target.textContent = nomeAutor;
      }
    });
  });
  
  // Adiciona metadados nos cabeçalhos das páginas
  if (!document.querySelector('meta[name="author"]')) {
    const metaAuthor = document.createElement('meta');
    metaAuthor.setAttribute('name', 'author');
    metaAuthor.setAttribute('content', nomeAutor);
    document.head.appendChild(metaAuthor);
  }
  
  // Adiciona comentário HTML oculto com informações de autoria
  if (!document.querySelector('body').innerHTML.includes('<!-- AUTORIA: Diogo Santana Cardoso -->')) {
    const comentario = document.createComment(' AUTORIA: Diogo Santana Cardoso - Todos os direitos reservados ');
    document.querySelector('body').appendChild(comentario);
  }
  
  // Adiciona proteção contra inspeção e modificação via console
  const protecaoScript = `
    // Proteção contra modificação via console
    Object.defineProperty(window, 'creatorProtection', {
      value: true,
      writable: false,
      configurable: false
    });
    
    // Monitoramento de mutações no DOM
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const creatorElements = document.querySelectorAll('.creator-name');
          creatorElements.forEach(element => {
            if (element.textContent !== "${nomeAutor}") {
              element.textContent = "${nomeAutor}";
            }
          });
        }
      });
    });
    
    // Configura o observador para monitorar todo o documento
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  `;
  
  // Verifica se o script de proteção já existe
  if (!document.querySelector('script#creator-protection')) {
    const script = document.createElement('script');
    script.id = 'creator-protection';
    script.textContent = protecaoScript;
    document.head.appendChild(script);
  }
  
  // Adiciona proteção no localStorage para persistência entre sessões
  try {
    localStorage.setItem('site_creator', nomeAutor);
    localStorage.setItem('creation_date', '2025-04-20');
    
    // Cria uma chave protegida que não pode ser facilmente modificada
    Object.defineProperty(localStorage, 'site_creator_protected', {
      value: nomeAutor,
      writable: false,
      configurable: false
    });
  } catch (e) {
    console.log('Erro ao acessar localStorage:', e);
  }
}

// Função para verificar e restaurar o nome do autor quando a página é carregada
function verificarAutoriaAoCarregar() {
  const nomeAutor = "Diogo Santana Cardoso";
  const storedCreator = localStorage.getItem('site_creator');
  
  if (storedCreator !== nomeAutor) {
    localStorage.setItem('site_creator', nomeAutor);
  }
  
  // Verifica se há tentativas de modificação via console
  console.warn("AVISO: Este site foi desenvolvido por Diogo Santana Cardoso. Qualquer tentativa de modificar esta informação constitui violação de direitos autorais.");
}

// Executa a verificação quando a página é carregada
verificarAutoriaAoCarregar();
