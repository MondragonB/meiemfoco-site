/**
 * MEI em Foco - Modelos de Documentos
 * Projeto de extensão da Universidade de Vassouras - Campus Maricá
 * Desenvolvido por: Diogo Santana Cardoso
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa os modelos de documentos
  inicializarModelosDocumentos();
});

/**
 * Inicializa a funcionalidade de modelos de documentos
 */
function inicializarModelosDocumentos() {
  // Verifica se está na página de modelos
  const modelosContainer = document.getElementById('modelos-container');
  if (!modelosContainer) return;
  
  // Carrega os modelos
  carregarModelos();
  
  // Adiciona eventos aos filtros
  const filtroInput = document.getElementById('modelo-busca-input');
  if (filtroInput) {
    filtroInput.addEventListener('input', filtrarModelos);
  }
  
  // Adiciona eventos às categorias
  const categorias = document.querySelectorAll('.modelo-filtro-categoria');
  categorias.forEach(categoria => {
    categoria.addEventListener('click', function() {
      // Remove a classe active de todas as categorias
      categorias.forEach(cat => cat.classList.remove('active'));
      // Adiciona a classe active à categoria clicada
      this.classList.add('active');
      // Filtra os modelos pela categoria
      filtrarModelosPorCategoria(this.dataset.categoria);
    });
  });
  
  // Adiciona evento ao botão de reset
  const resetBtn = document.getElementById('modelo-filtros-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetarFiltros);
  }
}

/**
 * Carrega os modelos de documentos
 */
function carregarModelos() {
  const modelosGrid = document.getElementById('modelos-grid');
  if (!modelosGrid) return;
  
  // Aqui você pode carregar os modelos de uma API ou banco de dados
  // Por enquanto, vamos usar dados estáticos
  const modelos = [
    {
      id: 1,
      titulo: 'Contrato de Prestação de Serviços',
      categoria: 'contrato',
      descricao: 'Modelo de contrato para prestação de serviços como MEI, protegendo seus direitos e estabelecendo obrigações claras.',
      formato: 'DOCX, PDF',
      tamanho: '45 KB',
      atualizacao: '15/03/2025',
      downloads: 1250
    },
    {
      id: 2,
      titulo: 'Recibo de Pagamento',
      categoria: 'financeiro',
      descricao: 'Recibo profissional para comprovar pagamentos recebidos por serviços prestados como MEI.',
      formato: 'DOCX, PDF',
      tamanho: '32 KB',
      atualizacao: '10/02/2025',
      downloads: 2430
    },
    {
      id: 3,
      titulo: 'Orçamento Padrão',
      categoria: 'financeiro',
      descricao: 'Modelo de orçamento profissional para apresentar a clientes, com campos para detalhamento de serviços e valores.',
      formato: 'XLSX, PDF',
      tamanho: '38 KB',
      atualizacao: '05/04/2025',
      downloads: 1875
    },
    {
      id: 4,
      titulo: 'Termo de Confidencialidade',
      categoria: 'contrato',
      descricao: 'Documento para garantir a confidencialidade de informações compartilhadas durante a prestação de serviços.',
      formato: 'DOCX, PDF',
      tamanho: '40 KB',
      atualizacao: '20/01/2025',
      downloads: 950
    },
    {
      id: 5,
      titulo: 'Controle de Despesas',
      categoria: 'financeiro',
      descricao: 'Planilha para controle mensal de despesas e receitas do seu MEI, facilitando a organização financeira.',
      formato: 'XLSX',
      tamanho: '55 KB',
      atualizacao: '12/03/2025',
      downloads: 3120
    },
    {
      id: 6,
      titulo: 'Declaração de Prestação de Serviços',
      categoria: 'fiscal',
      descricao: 'Declaração formal de serviços prestados para fins de comprovação junto a órgãos públicos ou privados.',
      formato: 'DOCX, PDF',
      tamanho: '35 KB',
      atualizacao: '08/02/2025',
      downloads: 1340
    },
    {
      id: 7,
      titulo: 'Checklist de Obrigações Fiscais',
      categoria: 'fiscal',
      descricao: 'Lista de verificação com todas as obrigações fiscais do MEI organizadas por mês.',
      formato: 'PDF, XLSX',
      tamanho: '42 KB',
      atualizacao: '25/03/2025',
      downloads: 2780
    },
    {
      id: 8,
      titulo: 'Contrato de Fornecimento',
      categoria: 'contrato',
      descricao: 'Modelo de contrato para fornecimento contínuo de produtos ou serviços pelo MEI.',
      formato: 'DOCX, PDF',
      tamanho: '48 KB',
      atualizacao: '18/01/2025',
      downloads: 890
    },
    {
      id: 9,
      titulo: 'Procuração para Representação',
      categoria: 'juridico',
      descricao: 'Modelo de procuração para que terceiros possam representar o MEI em atos específicos.',
      formato: 'DOCX, PDF',
      tamanho: '36 KB',
      atualizacao: '05/02/2025',
      downloads: 720
    }
  ];
  
  // Renderiza os modelos
  modelos.forEach(modelo => {
    const modeloElement = criarElementoModelo(modelo);
    modelosGrid.appendChild(modeloElement);
  });
}

/**
 * Cria um elemento HTML para um modelo de documento
 */
function criarElementoModelo(modelo) {
  const modeloElement = document.createElement('div');
  modeloElement.className = 'modelo-card';
  modeloElement.dataset.id = modelo.id;
  modeloElement.dataset.categoria = modelo.categoria;
  
  modeloElement.innerHTML = `
    <div class="modelo-header">
      <h3>${modelo.titulo}</h3>
      <div class="modelo-categoria">${categoriaParaTexto(modelo.categoria)}</div>
    </div>
    <div class="modelo-body">
      <div class="modelo-descricao">${modelo.descricao}</div>
      <div class="modelo-info">
        <div class="modelo-info-item">
          <i class="fas fa-file"></i>
          <span>${modelo.formato}</span>
        </div>
        <div class="modelo-info-item">
          <i class="fas fa-download"></i>
          <span>${modelo.downloads}</span>
        </div>
      </div>
      <div class="modelo-actions">
        <button class="btn btn-primary modelo-download-btn" data-id="${modelo.id}">
          <i class="fas fa-download"></i> Baixar
        </button>
      </div>
    </div>
  `;
  
  // Adiciona eventos aos botões
  const downloadBtn = modeloElement.querySelector('.modelo-download-btn');
  
  downloadBtn.addEventListener('click', function() {
    baixarModelo(modelo);
  });
  
  return modeloElement;
}

/**
 * Converte o código da categoria para texto legível
 */
function categoriaParaTexto(categoria) {
  switch (categoria) {
    case 'contrato':
      return 'Contrato';
    case 'financeiro':
      return 'Financeiro';
    case 'fiscal':
      return 'Fiscal';
    case 'juridico':
      return 'Jurídico';
    default:
      return categoria.charAt(0).toUpperCase() + categoria.slice(1);
  }
}

/**
 * Filtra os modelos com base no texto digitado
 */
function filtrarModelos() {
  const filtroInput = document.getElementById('modelo-busca-input');
  const modelos = document.querySelectorAll('.modelo-card');
  
  const textoBusca = filtroInput.value.toLowerCase();
  
  modelos.forEach(modelo => {
    const titulo = modelo.querySelector('h3').textContent.toLowerCase();
    const descricao = modelo.querySelector('.modelo-descricao').textContent.toLowerCase();
    
    if (titulo.includes(textoBusca) || descricao.includes(textoBusca)) {
      modelo.style.display = 'block';
    } else {
      modelo.style.display = 'none';
    }
  });
  
  verificarModelosVisiveis();
}

/**
 * Filtra os modelos por categoria
 */
function filtrarModelosPorCategoria(categoria) {
  const modelos = document.querySelectorAll('.modelo-card');
  
  if (categoria === 'todos') {
    modelos.forEach(modelo => {
      modelo.style.display = 'block';
    });
  } else {
    modelos.forEach(modelo => {
      if (modelo.dataset.categoria === categoria) {
        modelo.style.display = 'block';
      } else {
        modelo.style.display = 'none';
      }
    });
  }
  
  verificarModelosVisiveis();
}

/**
 * Verifica se há modelos visíveis e mostra mensagem caso não haja
 */
function verificarModelosVisiveis() {
  const modelos = document.querySelectorAll('.modelo-card');
  const modelosGrid = document.getElementById('modelos-grid');
  let modelosVisiveis = 0;
  
  modelos.forEach(modelo => {
    if (modelo.style.display !== 'none') {
      modelosVisiveis++;
    }
  });
  
  // Remove mensagem de vazio se existir
  const mensagemVazio = document.querySelector('.modelo-empty');
  if (mensagemVazio) {
    mensagemVazio.remove();
  }
  
  // Adiciona mensagem se não houver modelos visíveis
  if (modelosVisiveis === 0) {
    const mensagemVazio = document.createElement('div');
    mensagemVazio.className = 'modelo-empty';
    mensagemVazio.innerHTML = `
      <div class="modelo-empty-icon">
        <i class="fas fa-search"></i>
      </div>
      <div class="modelo-empty-text">
        Nenhum modelo encontrado com os filtros atuais.
      </div>
      <button class="btn btn-primary" id="modelo-empty-reset">
        Limpar Filtros
      </button>
    `;
    
    modelosGrid.appendChild(mensagemVazio);
    
    // Adiciona evento ao botão de reset
    document.getElementById('modelo-empty-reset').addEventListener('click', resetarFiltros);
  }
}

/**
 * Reseta todos os filtros
 */
function resetarFiltros() {
  // Limpa o campo de busca
  const filtroInput = document.getElementById('modelo-busca-input');
  if (filtroInput) {
    filtroInput.value = '';
  }
  
  // Reseta as categorias
  const categorias = document.querySelectorAll('.modelo-filtro-categoria');
  categorias.forEach(cat => cat.classList.remove('active'));
  
  const categoriaTodos = document.querySelector('.modelo-filtro-categoria[data-categoria="todos"]');
  if (categoriaTodos) {
    categoriaTodos.classList.add('active');
  }
  
  // Mostra todos os modelos
  const modelos = document.querySelectorAll('.modelo-card');
  modelos.forEach(modelo => {
    modelo.style.display = 'block';
  });
  
  // Remove mensagem de vazio se existir
  const mensagemVazio = document.querySelector('.modelo-empty');
  if (mensagemVazio) {
    mensagemVazio.remove();
  }
}

/**
 * Baixa um modelo de documento
 */
function baixarModelo(modelo) {
  // Aqui você implementaria a lógica real de download
  // Por enquanto, vamos apenas simular
  
  // Mostra feedback visual no botão
  const downloadBtn = document.querySelector(`.modelo-download-btn[data-id="${modelo.id}"]`);
  
  if (downloadBtn) {
    const textoOriginal = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Baixando...';
    downloadBtn.disabled = true;
    
    // Simula o download
    setTimeout(() => {
      downloadBtn.innerHTML = '<i class="fas fa-check"></i> Baixado!';
      downloadBtn.classList.add('btn-success-feedback');
      
      // Restaura o botão após alguns segundos
      setTimeout(() => {
        downloadBtn.innerHTML = textoOriginal;
        downloadBtn.disabled = false;
        downloadBtn.classList.remove('btn-success-feedback');
      }, 2000);
      
      // Aqui você redirecionaria para o arquivo real
      // window.location.href = `documentos/modelos/${modelo.id}.zip`;
      
      // Por enquanto, apenas mostra uma mensagem
      alert(`O download do modelo "${modelo.titulo}" seria iniciado em um ambiente de produção.`);
    }, 1500);
  }
}
