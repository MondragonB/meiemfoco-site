/**
 * MEI em Foco - Calendário Fiscal Interativo
 * Projeto de extensão da Universidade de Vassouras - Campus Maricá
 * Desenvolvido por: Diogo Santana Cardoso
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o calendário fiscal
  inicializarCalendarioFiscal();
});

/**
 * Inicializa o calendário fiscal interativo
 */
function inicializarCalendarioFiscal() {
  // Verifica se está na página de calendário
  const calendarioContainer = document.getElementById('calendario-fiscal-container');
  if (!calendarioContainer) return;
  
  // Obtém a data atual
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();
  
  // Renderiza o calendário para o mês atual
  renderizarCalendario(mesAtual, anoAtual);
  
  // Adiciona eventos aos botões de navegação
  const btnAnterior = document.getElementById('calendario-anterior');
  const btnProximo = document.getElementById('calendario-proximo');
  const btnHoje = document.getElementById('calendario-hoje');
  
  if (btnAnterior) {
    btnAnterior.addEventListener('click', function() {
      const mesAtual = parseInt(calendarioContainer.dataset.mes);
      const anoAtual = parseInt(calendarioContainer.dataset.ano);
      
      let novoMes = mesAtual - 1;
      let novoAno = anoAtual;
      
      if (novoMes < 0) {
        novoMes = 11;
        novoAno--;
      }
      
      renderizarCalendario(novoMes, novoAno);
    });
  }
  
  if (btnProximo) {
    btnProximo.addEventListener('click', function() {
      const mesAtual = parseInt(calendarioContainer.dataset.mes);
      const anoAtual = parseInt(calendarioContainer.dataset.ano);
      
      let novoMes = mesAtual + 1;
      let novoAno = anoAtual;
      
      if (novoMes > 11) {
        novoMes = 0;
        novoAno++;
      }
      
      renderizarCalendario(novoMes, novoAno);
    });
  }
  
  if (btnHoje) {
    btnHoje.addEventListener('click', function() {
      const dataAtual = new Date();
      renderizarCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
    });
  }
  
  // Adiciona eventos aos botões de visualização
  const btnCalendario = document.getElementById('view-calendario');
  const btnLista = document.getElementById('view-lista');
  
  if (btnCalendario) {
    btnCalendario.addEventListener('click', function() {
      document.getElementById('calendario-grid-view').classList.add('active');
      document.getElementById('calendario-list-view').classList.remove('active');
      btnCalendario.classList.add('active');
      btnLista.classList.remove('active');
    });
  }
  
  if (btnLista) {
    btnLista.addEventListener('click', function() {
      document.getElementById('calendario-grid-view').classList.remove('active');
      document.getElementById('calendario-list-view').classList.add('active');
      btnCalendario.classList.remove('active');
      btnLista.classList.add('active');
    });
  }
}

/**
 * Renderiza o calendário para um mês e ano específicos
 */
function renderizarCalendario(mes, ano) {
  const calendarioContainer = document.getElementById('calendario-fiscal-container');
  const gridView = document.getElementById('calendario-grid-view');
  const listView = document.getElementById('calendario-list-view');
  const calendarioTitulo = document.getElementById('calendario-titulo');
  
  // Atualiza os atributos de data do container
  calendarioContainer.dataset.mes = mes;
  calendarioContainer.dataset.ano = ano;
  
  // Atualiza o título do calendário
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  calendarioTitulo.textContent = `${nomesMeses[mes]} de ${ano}`;
  
  // Obtém o primeiro dia do mês
  const primeiroDia = new Date(ano, mes, 1);
  const diaSemana = primeiroDia.getDay();
  
  // Obtém o último dia do mês
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  
  // Obtém o último dia do mês anterior
  const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
  
  // Obtém a data atual
  const dataAtual = new Date();
  const diaAtual = dataAtual.getDate();
  const mesAtual = dataAtual.getMonth();
  const anoAtual = dataAtual.getFullYear();
  
  // Limpa as visualizações
  gridView.innerHTML = '';
  listView.innerHTML = '';
  
  // Adiciona os dias da semana
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  diasSemana.forEach(dia => {
    const diaElement = document.createElement('div');
    diaElement.className = 'calendario-weekday';
    diaElement.textContent = dia;
    gridView.appendChild(diaElement);
  });
  
  // Adiciona os dias do mês anterior
  for (let i = diaSemana - 1; i >= 0; i--) {
    const diaElement = document.createElement('div');
    diaElement.className = 'calendario-day other-month';
    diaElement.innerHTML = `<div class="calendario-day-number">${ultimoDiaMesAnterior - i}</div>`;
    gridView.appendChild(diaElement);
  }
  
  // Adiciona os dias do mês atual
  for (let i = 1; i <= ultimoDia; i++) {
    const diaElement = document.createElement('div');
    diaElement.className = 'calendario-day';
    
    // Verifica se é o dia atual
    if (i === diaAtual && mes === mesAtual && ano === anoAtual) {
      diaElement.classList.add('today');
    }
    
    diaElement.innerHTML = `<div class="calendario-day-number">${i}</div>`;
    
    // Adiciona eventos para este dia
    const eventos = obterEventosDia(i, mes, ano);
    eventos.forEach(evento => {
      const eventoElement = document.createElement('div');
      eventoElement.className = `calendario-event ${evento.tipo}`;
      eventoElement.textContent = evento.titulo;
      
      // Adiciona detalhes do evento
      const detalhesElement = document.createElement('div');
      detalhesElement.className = 'calendario-event-details';
      detalhesElement.innerHTML = `
        <div class="calendario-event-title">${evento.titulo}</div>
        <div class="calendario-event-description">${evento.descricao}</div>
        ${evento.link ? `<a href="${evento.link}" class="calendario-event-link">Saiba mais</a>` : ''}
      `;
      
      eventoElement.appendChild(detalhesElement);
      diaElement.appendChild(eventoElement);
      
      // Adiciona o evento à visualização em lista
      adicionarEventoLista(i, mes, ano, evento, listView);
    });
    
    gridView.appendChild(diaElement);
  }
  
  // Adiciona os dias do próximo mês
  const diasRestantes = 42 - (diaSemana + ultimoDia);
  for (let i = 1; i <= diasRestantes; i++) {
    const diaElement = document.createElement('div');
    diaElement.className = 'calendario-day other-month';
    diaElement.innerHTML = `<div class="calendario-day-number">${i}</div>`;
    gridView.appendChild(diaElement);
  }
  
  // Adiciona alerta para o próximo prazo
  adicionarAlertaProximoPrazo();
}

/**
 * Adiciona um evento à visualização em lista
 */
function adicionarEventoLista(dia, mes, ano, evento, listView) {
  const dataFormatada = `${dia.toString().padStart(2, '0')}/${(mes + 1).toString().padStart(2, '0')}/${ano}`;
  
  const listItem = document.createElement('div');
  listItem.className = 'calendario-list-item';
  listItem.innerHTML = `
    <div class="calendario-list-date">${dataFormatada}</div>
    <div class="calendario-list-content">
      <div class="calendario-list-title">${evento.titulo}</div>
      <div class="calendario-list-description">${evento.descricao}</div>
    </div>
    <div class="calendario-list-type">
      <span class="${evento.tipo}">${tipoParaTexto(evento.tipo)}</span>
    </div>
  `;
  
  listView.appendChild(listItem);
}

/**
 * Adiciona alerta para o próximo prazo
 */
function adicionarAlertaProximoPrazo() {
  const dataAtual = new Date();
  const proximoPrazo = obterProximoPrazo(dataAtual);
  
  if (proximoPrazo) {
    const alertaContainer = document.getElementById('calendario-alerta');
    if (alertaContainer) {
      const diasRestantes = calcularDiasRestantes(dataAtual, proximoPrazo.data);
      
      alertaContainer.innerHTML = `
        <div class="calendario-alert-title">
          <i class="fas fa-exclamation-triangle"></i> Próximo Prazo: ${proximoPrazo.titulo}
        </div>
        <div class="calendario-alert-content">
          ${proximoPrazo.descricao} - <strong>${diasRestantes} dias restantes</strong>
        </div>
      `;
    }
  }
}

/**
 * Calcula os dias restantes entre duas datas
 */
function calcularDiasRestantes(dataInicial, dataFinal) {
  const diffTime = Math.abs(dataFinal - dataInicial);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Converte o tipo de evento para texto
 */
function tipoParaTexto(tipo) {
  switch (tipo) {
    case 'fiscal':
      return 'Fiscal';
    case 'prazo':
      return 'Prazo';
    case 'evento':
      return 'Evento';
    default:
      return tipo;
  }
}

/**
 * Obtém os eventos para um dia específico
 */
function obterEventosDia(dia, mes, ano) {
  // Aqui você pode conectar com uma API ou banco de dados
  // Por enquanto, vamos usar dados estáticos
  
  const eventos = [];
  
  // Eventos fiscais fixos
  if (dia === 20) {
    eventos.push({
      titulo: 'Pagamento DAS',
      descricao: 'Prazo para pagamento do Documento de Arrecadação do Simples Nacional (DAS).',
      tipo: 'fiscal',
      link: 'das-obrigacoes.html'
    });
  }
  
  // Declaração Anual (DASN-SIMEI)
  if (dia === 31 && mes === 4) {
    eventos.push({
      titulo: 'DASN-SIMEI',
      descricao: 'Prazo final para entrega da Declaração Anual do MEI referente ao ano anterior.',
      tipo: 'prazo',
      link: 'das-obrigacoes.html#dasn'
    });
  }
  
  // Eventos específicos
  if (ano === 2025) {
    // Eventos para 2025
    if (mes === 3 && dia === 15) {
      eventos.push({
        titulo: 'Workshop MEI',
        descricao: 'Workshop gratuito sobre gestão financeira para MEIs na Universidade de Vassouras.',
        tipo: 'evento',
        link: 'eventos.html'
      });
    }
    
    if (mes === 5 && dia === 5) {
      eventos.push({
        titulo: 'Dia do MEI',
        descricao: 'Evento especial com palestras e atendimento gratuito para microempreendedores.',
        tipo: 'evento',
        link: 'eventos.html'
      });
    }
  }
  
  return eventos;
}

/**
 * Obtém o próximo prazo a partir de uma data
 */
function obterProximoPrazo(dataReferencia) {
  const prazos = [
    {
      titulo: 'Pagamento DAS',
      descricao: 'Prazo para pagamento do Documento de Arrecadação do Simples Nacional (DAS).',
      data: new Date(dataReferencia.getFullYear(), dataReferencia.getMonth(), 20)
    },
    {
      titulo: 'DASN-SIMEI',
      descricao: 'Prazo final para entrega da Declaração Anual do MEI referente ao ano anterior.',
      data: new Date(dataReferencia.getFullYear(), 4, 31)
    }
  ];
  
  // Ajusta a data do DAS se já passou
  if (dataReferencia.getDate() > 20) {
    let proximoMes = dataReferencia.getMonth() + 1;
    let proximoAno = dataReferencia.getFullYear();
    
    if (proximoMes > 11) {
      proximoMes = 0;
      proximoAno++;
    }
    
    prazos[0].data = new Date(proximoAno, proximoMes, 20);
  }
  
  // Ajusta a data da DASN se já passou
  if (dataReferencia.getMonth() > 4 || (dataReferencia.getMonth() === 4 && dataReferencia.getDate() > 31)) {
    prazos[1].data = new Date(dataReferencia.getFullYear() + 1, 4, 31);
  }
  
  // Ordena os prazos por data
  prazos.sort((a, b) => a.data - b.data);
  
  // Retorna o próximo prazo
  return prazos[0];
}
