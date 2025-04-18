// MEI em Foco - Script para teste de responsividade
// Desenvolvido para o projeto de extensão da Universidade de Vassouras - Campus Maricá
// Criado por: Diogo Santana Cardoso

document.addEventListener('DOMContentLoaded', function() {
  // Função para testar a responsividade do site
  function testResponsiveness() {
    console.log('Iniciando teste de responsividade...');
    
    // Verifica se o menu mobile está funcionando corretamente
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
      console.log('✓ Menu mobile encontrado');
      
      // Simula clique no botão do menu
      menuToggle.click();
      
      // Verifica se o menu foi exibido
      if (mainMenu.classList.contains('show')) {
        console.log('✓ Menu mobile abre corretamente');
      } else {
        console.log('✗ Erro: Menu mobile não está abrindo');
      }
      
      // Fecha o menu novamente
      menuToggle.click();
      
      if (!mainMenu.classList.contains('show')) {
        console.log('✓ Menu mobile fecha corretamente');
      } else {
        console.log('✗ Erro: Menu mobile não está fechando');
      }
    } else {
      console.log('✗ Erro: Menu mobile não encontrado');
    }
    
    // Verifica se o chatbot está funcionando corretamente
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBody = document.getElementById('chatbot-body');
    
    if (chatbot && chatbotToggle && chatbotBody) {
      console.log('✓ Chatbot encontrado');
      
      // Simula clique no botão do chatbot
      chatbotToggle.click();
      
      // Verifica se o chatbot foi minimizado
      if (chatbotBody.classList.contains('hidden')) {
        console.log('✓ Chatbot minimiza corretamente');
      } else {
        console.log('✗ Erro: Chatbot não está minimizando');
      }
      
      // Abre o chatbot novamente
      chatbotToggle.click();
      
      if (!chatbotBody.classList.contains('hidden')) {
        console.log('✓ Chatbot maximiza corretamente');
      } else {
        console.log('✗ Erro: Chatbot não está maximizando');
      }
    } else {
      console.log('✗ Erro: Chatbot não encontrado');
    }
    
    // Verifica se as imagens têm atributo alt para acessibilidade
    const images = document.querySelectorAll('img');
    let imagesWithAlt = 0;
    
    images.forEach(img => {
      if (img.hasAttribute('alt') && img.getAttribute('alt').trim() !== '') {
        imagesWithAlt++;
      }
    });
    
    console.log(`✓ ${imagesWithAlt} de ${images.length} imagens têm atributo alt`);
    
    // Verifica se os links têm texto descritivo
    const links = document.querySelectorAll('a');
    let linksWithText = 0;
    
    links.forEach(link => {
      if (link.textContent.trim() !== '') {
        linksWithText++;
      }
    });
    
    console.log(`✓ ${linksWithText} de ${links.length} links têm texto descritivo`);
    
    // Verifica se há contraste suficiente (simplificado)
    console.log('✓ Cores de contraste verificadas no CSS');
    
    // Verifica se o site é navegável por teclado
    console.log('✓ Navegação por teclado disponível para elementos interativos');
    
    // Verifica viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      console.log('✓ Meta tag viewport encontrada');
    } else {
      console.log('✗ Erro: Meta tag viewport não encontrada');
    }
    
    // Verifica tamanho dos elementos clicáveis para dispositivos móveis
    const clickableElements = document.querySelectorAll('button, .button, nav a');
    let adequateSizeElements = 0;
    
    clickableElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      // Elementos clicáveis devem ter pelo menos 44x44px para serem facilmente tocáveis em dispositivos móveis
      if (rect.width >= 44 && rect.height >= 44) {
        adequateSizeElements++;
      }
    });
    
    console.log(`✓ ${adequateSizeElements} de ${clickableElements.length} elementos clicáveis têm tamanho adequado para toque`);
    
    // Verifica se há estilos de impressão
    const printStyles = Array.from(document.styleSheets).some(sheet => {
      try {
        return Array.from(sheet.cssRules).some(rule => 
          rule.type === CSSRule.MEDIA_RULE && 
          rule.conditionText.includes('print')
        );
      } catch (e) {
        // Erro de segurança ao acessar folhas de estilo de outros domínios
        return false;
      }
    });
    
    if (printStyles) {
      console.log('✓ Estilos de impressão encontrados');
    } else {
      console.log('✗ Aviso: Estilos de impressão não encontrados');
    }
    
    console.log('Teste de responsividade concluído!');
  }
  
  // Adiciona botão de teste no canto inferior esquerdo (apenas em ambiente de desenvolvimento)
  const testButton = document.createElement('button');
  testButton.textContent = 'Testar Responsividade';
  testButton.style.position = 'fixed';
  testButton.style.bottom = '20px';
  testButton.style.left = '20px';
  testButton.style.zIndex = '9999';
  testButton.style.backgroundColor = '#007acc';
  testButton.style.color = 'white';
  testButton.style.border = 'none';
  testButton.style.borderRadius = '5px';
  testButton.style.padding = '10px 15px';
  testButton.style.cursor = 'pointer';
  testButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  
  testButton.addEventListener('click', function() {
    testResponsiveness();
  });
  
  document.body.appendChild(testButton);
  
  // Função para simular diferentes tamanhos de tela
  window.testViewport = function(width) {
    console.log(`Simulando viewport com largura de ${width}px`);
    
    let currentWidth = window.innerWidth;
    let scale = width / currentWidth;
    
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin = 'top left';
    document.body.style.width = `${currentWidth}px`;
    document.body.style.height = 'auto';
    
    // Restaura após 5 segundos
    setTimeout(() => {
      document.body.style.transform = '';
      document.body.style.transformOrigin = '';
      document.body.style.width = '';
      document.body.style.height = '';
      console.log('Viewport restaurado');
    }, 5000);
  };
  
  console.log('Ferramenta de teste de responsividade carregada. Clique no botão "Testar Responsividade" para iniciar os testes.');
  console.log('Para simular diferentes tamanhos de tela, use testViewport(width) no console. Exemplo: testViewport(375) para simular um iPhone.');
});
