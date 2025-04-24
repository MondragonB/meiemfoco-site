// JavaScript para melhorar o menu mobile e corrigir navegação
document.addEventListener('DOMContentLoaded', function() {
  // Menu de navegação responsivo
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  const navOverlay = document.getElementById('navOverlay');
  
  if (menuToggle && mainMenu && navOverlay) {
    // Abrir/fechar menu
    menuToggle.addEventListener('click', function() {
      mainMenu.classList.toggle('show');
      navOverlay.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
    
    // Fechar menu ao clicar no overlay
    navOverlay.addEventListener('click', function() {
      mainMenu.classList.remove('show');
      navOverlay.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainMenu.classList.remove('show');
        navOverlay.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Adicionar classe 'active' ao link de navegação atual
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
      link.classList.add('active');
    } else if ((currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) && linkPath === 'index.html') {
      link.classList.add('active');
    }
  });
  
  // Verificar links quebrados e corrigir
  const allLinks = document.querySelectorAll('a[href="#"]');
  allLinks.forEach(link => {
    // Se o link tem texto que indica uma página específica, corrigir o href
    const linkText = link.textContent.toLowerCase().trim();
    if (linkText.includes('início') || linkText.includes('home')) {
      link.setAttribute('href', 'index.html');
    } else if (linkText.includes('mei')) {
      link.setAttribute('href', 'o-que-e-mei.html');
    } else if (linkText.includes('abrir')) {
      link.setAttribute('href', 'como-abrir-mei.html');
    } else if (linkText.includes('consulta')) {
      link.setAttribute('href', 'consulta.html');
    } else if (linkText.includes('das') || linkText.includes('obrigações')) {
      link.setAttribute('href', 'das-obrigacoes.html');
    } else if (linkText.includes('calendário')) {
      link.setAttribute('href', 'calendario-fiscal.html');
    } else if (linkText.includes('modelos')) {
      link.setAttribute('href', 'modelos-documentos.html');
    } else if (linkText.includes('apps')) {
      link.setAttribute('href', 'apps.html');
    } else if (linkText.includes('dúvidas') || linkText.includes('faq')) {
      link.setAttribute('href', 'faq.html');
    } else if (linkText.includes('dicas')) {
      link.setAttribute('href', 'dicas.html');
    } else if (linkText.includes('blog')) {
      link.setAttribute('href', 'blog.html');
    } else if (linkText.includes('eventos')) {
      link.setAttribute('href', 'eventos.html');
    } else if (linkText.includes('glossário')) {
      link.setAttribute('href', 'glossario.html');
    } else if (linkText.includes('sobre')) {
      link.setAttribute('href', 'sobre.html');
    }
  });
  
  // Botão de voltar ao topo
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
