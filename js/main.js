// MEI em Foco - JavaScript Principal
// Desenvolvido para o projeto de extensão da Universidade de Vassouras - Campus Maricá
// Criado por: Diogo Santana Cardoso

// Funcionalidade do menu mobile
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function() {
      mainMenu.classList.toggle('show');
      
      // Alterna o ícone do botão
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Inicializa o chatbot
  initChatbot();
});

// Função para inicializar o chatbot
function initChatbot() {
  const chatbot = document.getElementById('chatbot');
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotBody = document.getElementById('chatbot-body');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessage = document.getElementById('chatbot-message');
  
  if (chatbotToggle && chatbotBody) {
    // Minimizar/maximizar o chatbot
    chatbotToggle.addEventListener('click', function() {
      chatbotBody.classList.toggle('hidden');
      const icon = chatbotToggle.querySelector('i');
      
      if (icon.classList.contains('fa-minus')) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      } else {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    });
  }
  
  if (chatbotSend && chatbotMessage) {
    // Enviar mensagem ao pressionar Enter
    chatbotMessage.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Enviar mensagem ao clicar no botão
    chatbotSend.addEventListener('click', sendMessage);
  }
}

// Função para enviar mensagem do usuário para o chatbot
function sendMessage() {
  const chatbotBody = document.getElementById('chatbot-body');
  const chatbotMessage = document.getElementById('chatbot-message');
  const message = chatbotMessage.value.trim();
  
  if (message && chatbotBody) {
    // Adiciona a mensagem do usuário
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.textContent = message;
    chatbotBody.appendChild(userMessageDiv);
    
    // Limpa o campo de entrada
    chatbotMessage.value = '';
    
    // Simula resposta do bot (em uma aplicação real, isso seria uma chamada de API)
    setTimeout(function() {
      getBotResponse(message);
    }, 600);
    
    // Rola para a mensagem mais recente
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }
}

// Função para enviar mensagem predefinida
function sendPredefinedMessage(message) {
  const chatbotMessage = document.getElementById('chatbot-message');
  chatbotMessage.value = message;
  sendMessage();
}

// Função para obter resposta do bot
function getBotResponse(message) {
  const chatbotBody = document.getElementById('chatbot-body');
  let response = '';
  
  // Respostas simples baseadas em palavras-chave
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('abrir mei') || messageLower.includes('como ser mei')) {
    response = 'Para abrir seu MEI, acesse o Portal do Empreendedor (gov.br/mei), clique em "Quero ser MEI" e siga o passo a passo. É gratuito e leva apenas alguns minutos! Veja nosso guia completo na seção "Como Abrir um MEI".';
  } 
  else if (messageLower.includes('das') || messageLower.includes('boleto') || messageLower.includes('pagamento')) {
    response = 'O DAS é o boleto mensal do MEI. Em 2025, o valor é de R$ 75,90 (MEI geral) + R$ 1,00 (ICMS) para comércio ou R$ 5,00 (ISS) para serviços. O pagamento deve ser feito até o dia 20 de cada mês. Acesse a seção "Consultar Situação" para emitir seu boleto.';
  }
  else if (messageLower.includes('declaração') || messageLower.includes('dasn')) {
    response = 'A Declaração Anual do MEI (DASN-SIMEI) deve ser entregue até 31 de maio de cada ano. É uma obrigação simples que pode ser feita pelo Portal do Empreendedor. Não deixe de fazer para evitar multas!';
  }
  else if (messageLower.includes('nota fiscal') || messageLower.includes('nf')) {
    response = 'Como MEI, você é obrigado a emitir nota fiscal apenas nas vendas para outras empresas (PJ). Para pessoas físicas, a emissão é opcional. Consulte a prefeitura da sua cidade para saber como emitir suas notas fiscais.';
  }
  else if (messageLower.includes('limite') || messageLower.includes('faturamento')) {
    response = 'O limite de faturamento do MEI é de R$ 81.000,00 por ano (ou R$ 6.750,00 por mês). Se ultrapassar esse valor, você precisará migrar para ME (Microempresa).';
  }
  else if (messageLower.includes('funcionário') || messageLower.includes('contratar')) {
    response = 'O MEI pode contratar apenas 1 funcionário que receba o salário mínimo ou o piso da categoria. Você precisará pagar FGTS e INSS sobre o salário dele.';
  }
  else if (messageLower.includes('app') || messageLower.includes('aplicativo')) {
    response = 'Temos várias recomendações de aplicativos úteis para MEI! Confira nossa seção "Apps Úteis" para conhecer ferramentas que vão facilitar sua gestão financeira, emissão de notas fiscais e marketing.';
  }
  else if (messageLower.includes('olá') || messageLower.includes('oi') || messageLower.includes('bom dia') || messageLower.includes('boa tarde') || messageLower.includes('boa noite')) {
    response = 'Olá! Em que posso ajudar você hoje? Estou aqui para tirar suas dúvidas sobre o MEI.';
  }
  else {
    response = 'Não entendi sua pergunta. Pode reformular ou escolher um dos tópicos abaixo?';
    
    // Adiciona a resposta do bot
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.textContent = response;
    chatbotBody.appendChild(botMessageDiv);
    
    // Adiciona opções de mensagens predefinidas
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'message-options';
    optionsDiv.innerHTML = `
      <button class="message-option" onclick="sendPredefinedMessage('Como abrir MEI?')">Como abrir MEI?</button>
      <button class="message-option" onclick="sendPredefinedMessage('Valor do DAS')">Valor do DAS</button>
      <button class="message-option" onclick="sendPredefinedMessage('Declaração anual')">Declaração anual</button>
    `;
    chatbotBody.appendChild(optionsDiv);
    
    // Rola para a mensagem mais recente
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    return;
  }
  
  // Adiciona a resposta do bot
  const botMessageDiv = document.createElement('div');
  botMessageDiv.className = 'message bot';
  botMessageDiv.textContent = response;
  chatbotBody.appendChild(botMessageDiv);
  
  // Rola para a mensagem mais recente
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
