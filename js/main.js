// MEI em Foco - JavaScript Principal
// Projeto de extensão da Universidade de Vassouras - Campus Maricá
// Desenvolvido por: Diogo Santana Cardoso

document.addEventListener('DOMContentLoaded', function() {
  // Menu de navegação responsivo
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function() {
      mainMenu.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }
  
  // Adicionar classe 'active' ao link de navegação atual
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
      link.classList.add('active');
    } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
      link.classList.add('active');
    }
  });
  
  // Funcionalidade de acordeão para FAQ
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const target = document.querySelector(this.getAttribute('data-target'));
      
      if (!target) return;
      
      // Fechar todos os outros painéis
      const allPanels = document.querySelectorAll('.accordion-collapse');
      const allButtons = document.querySelectorAll('.accordion-button');
      
      allPanels.forEach(panel => {
        if (panel !== target) {
          panel.classList.remove('show');
        }
      });
      
      allButtons.forEach(btn => {
        if (btn !== this) {
          btn.classList.add('collapsed');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Alternar o painel atual
      target.classList.toggle('show');
      this.classList.toggle('collapsed');
      
      const isExpanded = target.classList.contains('show');
      this.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  });
  
  // Animação de rolagem suave para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Validação de formulários
  const forms = document.querySelectorAll('form.needs-validation');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    });
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
  
  // Inicializar tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  if (tooltipTriggerList.length > 0) {
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  // Inicializar popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  if (popoverTriggerList.length > 0) {
    popoverTriggerList.forEach(popoverTriggerEl => {
      new bootstrap.Popover(popoverTriggerEl);
    });
  }
  
  // Contador de estatísticas
  const statCounters = document.querySelectorAll('.stat-counter');
  
  if (statCounters.length > 0) {
    const options = {
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000; // 2 segundos
          const step = Math.ceil(target / (duration / 16)); // 60fps
          
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = current.toLocaleString();
            }
          }, 16);
          
          observer.unobserve(counter);
        }
      });
    }, options);
    
    statCounters.forEach(counter => {
      observer.observe(counter);
    });
  }
  
  // Filtro para galeria ou blog
  const filterButtons = document.querySelectorAll('.filter-button');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        const items = document.querySelectorAll('.filter-item');
        
        // Remover classe ativa de todos os botões
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Adicionar classe ativa ao botão clicado
        this.classList.add('active');
        
        // Filtrar itens
        items.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Pesquisa no FAQ
  const faqSearch = document.getElementById('faqSearch');
  
  if (faqSearch) {
    faqSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const faqItems = document.querySelectorAll('.accordion-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.accordion-button').textContent.toLowerCase();
        const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
  
  // Inicializar PWA se disponível
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(error => {
          console.log('Falha ao registrar Service Worker:', error);
        });
    });
  }
});

// Função para compartilhar conteúdo
function shareContent(title, text, url) {
  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url || window.location.href
    })
    .then(() => console.log('Conteúdo compartilhado com sucesso'))
    .catch(error => console.log('Erro ao compartilhar:', error));
  } else {
    // Fallback para navegadores que não suportam a API Web Share
    const shareDialog = document.getElementById('shareDialog');
    
    if (shareDialog) {
      const shareUrl = document.getElementById('shareUrl');
      if (shareUrl) {
        shareUrl.value = url || window.location.href;
        shareDialog.classList.add('show');
        
        // Copiar URL para a área de transferência
        shareUrl.select();
        document.execCommand('copy');
        
        // Mostrar mensagem de sucesso
        const copyMessage = document.getElementById('copyMessage');
        if (copyMessage) {
          copyMessage.classList.add('show');
          setTimeout(() => {
            copyMessage.classList.remove('show');
          }, 3000);
        }
      }
    }
  }
}

// Função para fechar diálogos
function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog) {
    dialog.classList.remove('show');
  }
}
