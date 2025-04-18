// MEI em Foco - JavaScript do Chatbot
// Desenvolvido para o projeto de extensão da Universidade de Vassouras - Campus Maricá
// Criado por: Diogo Santana Cardoso

// Banco de dados de perguntas e respostas para o chatbot
const chatbotResponses = {
  // Perguntas sobre abertura de MEI
  "abrir mei": "Para abrir seu MEI, acesse o Portal do Empreendedor (gov.br/mei), clique em \"Quero ser MEI\" e siga o passo a passo. É gratuito e leva apenas alguns minutos! Veja nosso guia completo na seção \"Como Abrir um MEI\".",
  "como ser mei": "Para se tornar MEI, você precisa: 1) Ter mais de 18 anos; 2) Não ser sócio de outra empresa; 3) Ter atividade permitida para MEI; 4) Faturar até R$ 81.000,00 por ano. Acesse o Portal do Empreendedor para fazer seu cadastro gratuitamente.",
  "quanto custa abrir mei": "Abrir um MEI é TOTALMENTE GRATUITO! Não pague para terceiros fazerem seu cadastro. Todo o processo pode ser feito online pelo Portal do Empreendedor (gov.br/mei).",
  
  // Perguntas sobre DAS e pagamentos
  "das": "O DAS é o boleto mensal do MEI. Em 2025, o valor é de R$ 75,90 (MEI geral) + R$ 1,00 (ICMS) para comércio ou R$ 5,00 (ISS) para serviços. O pagamento deve ser feito até o dia 20 de cada mês. Acesse a seção \"Consultar Situação\" para emitir seu boleto.",
  "boleto": "O boleto mensal do MEI (DAS) deve ser pago até o dia 20 de cada mês. Em 2025, o valor varia de R$ 75,90 a R$ 81,90, dependendo da sua atividade. Você pode emitir o boleto pelo Portal do Empreendedor ou pelo app MEI Fácil.",
  "pagamento": "O pagamento do DAS (boleto mensal do MEI) deve ser feito até o dia 20 de cada mês, mesmo que você não tenha tido faturamento. Manter os pagamentos em dia é essencial para garantir seus direitos previdenciários.",
  "valor das": "Em 2025, o valor do DAS é: R$ 75,90 (5% do salário mínimo) para contribuição ao INSS + R$ 1,00 de ICMS (para comércio/indústria) + R$ 5,00 de ISS (para serviços). O valor total varia de R$ 75,90 a R$ 81,90.",
  
  // Perguntas sobre declaração anual
  "declaração": "A Declaração Anual do MEI (DASN-SIMEI) deve ser entregue até 31 de maio de cada ano. É uma obrigação simples que pode ser feita pelo Portal do Empreendedor. Não deixe de fazer para evitar multas!",
  "dasn": "A DASN-SIMEI é a declaração anual obrigatória do MEI. O prazo de entrega é até 31 de maio do ano seguinte. Você informa seu faturamento anual e se teve ou não empregado. É simples e pode ser feita pelo Portal do Empreendedor.",
  "prazo declaração": "O prazo para entregar a Declaração Anual do MEI (DASN-SIMEI) é até 31 de maio do ano seguinte ao exercício. Por exemplo, a declaração referente a 2025 deve ser entregue até 31 de maio de 2026.",
  
  // Perguntas sobre notas fiscais
  "nota fiscal": "Como MEI, você é obrigado a emitir nota fiscal apenas nas vendas para outras empresas (PJ). Para pessoas físicas, a emissão é opcional. Consulte a prefeitura da sua cidade para saber como emitir suas notas fiscais.",
  "nf": "Para emitir notas fiscais como MEI, você precisa se cadastrar no sistema da sua prefeitura (para serviços) ou estado (para produtos). Veja nossa seção de Apps Úteis para conhecer ferramentas que facilitam a emissão de notas.",
  "nfse": "A NFS-e (Nota Fiscal de Serviços eletrônica) é emitida para serviços prestados pelo MEI. O cadastro é feito na prefeitura da sua cidade. Algumas prefeituras oferecem sistemas próprios, outras utilizam sistemas como o da SEFAZ.",
  "nfe": "A NF-e (Nota Fiscal eletrônica) é emitida para venda de produtos. Como MEI, você precisa se cadastrar na Secretaria da Fazenda do seu estado. Existem aplicativos que facilitam a emissão, como o NotasFiscais.app.",
  
  // Perguntas sobre limites e faturamento
  "limite": "O limite de faturamento do MEI é de R$ 81.000,00 por ano (ou R$ 6.750,00 por mês). Se ultrapassar esse valor, você precisará migrar para ME (Microempresa).",
  "faturamento": "O MEI pode faturar até R$ 81.000,00 por ano, o que dá uma média de R$ 6.750,00 por mês. Se você ultrapassar esse limite em até 20%, poderá continuar como MEI, mas pagará um imposto adicional sobre o valor excedente.",
  "ultrapassar limite": "Se você ultrapassar o limite de R$ 81.000,00: 1) Em até 20%: continua como MEI, mas paga imposto adicional sobre o excedente; 2) Acima de 20%: será desenquadrado e precisará migrar para ME ou EPP.",
  
  // Perguntas sobre funcionários
  "funcionário": "O MEI pode contratar apenas 1 funcionário que receba o salário mínimo ou o piso da categoria. Você precisará pagar FGTS (8%) e INSS (3%) sobre o salário dele.",
  "contratar": "Para contratar um funcionário como MEI: 1) Registre-o com carteira assinada; 2) Pague o salário mínimo ou piso da categoria; 3) Recolha FGTS e INSS; 4) Entregue a GFIP mensalmente. Você só pode ter um único empregado.",
  "empregado": "Como MEI, você pode ter apenas um empregado contratado. Ele deve receber o salário mínimo ou o piso da categoria, e você deve pagar todos os encargos trabalhistas normais (FGTS, INSS, etc.).",
  
  // Perguntas sobre aplicativos
  "app": "Temos várias recomendações de aplicativos úteis para MEI! Confira nossa seção \"Apps Úteis\" para conhecer ferramentas que vão facilitar sua gestão financeira, emissão de notas fiscais e marketing.",
  "aplicativo": "Na seção \"Apps Úteis\" do nosso site, você encontra recomendações de aplicativos para gestão financeira (Mobills, QuickBooks), emissão de notas (NotasFiscais.app), marketing (Canva) e muito mais!",
  "software": "Existem diversos softwares que podem ajudar na gestão do seu MEI. Para finanças, recomendamos o ZeroPanel ou QuickBooks. Para notas fiscais, o NotasFiscais.app. Veja mais na nossa seção de Apps Úteis!",
  
  // Perguntas sobre benefícios
  "benefícios": "Como MEI, você tem direito a: 1) CNPJ próprio; 2) Cobertura previdenciária (aposentadoria, auxílio-doença); 3) Emissão de notas fiscais; 4) Tributação reduzida; 5) Acesso a serviços bancários para empresas; 6) Possibilidade de vender para o governo.",
  "aposentadoria": "O MEI tem direito à aposentadoria por idade: mulheres aos 62 anos com 15 anos de contribuição, homens aos 65 anos com 20 anos de contribuição. O valor é de um salário mínimo, a menos que você contribua sobre valores maiores.",
  "auxílio doença": "O MEI tem direito ao auxílio-doença após 12 meses de contribuição e perícia médica que comprove a incapacidade temporária para o trabalho. É importante estar com os pagamentos do DAS em dia.",
  "licença maternidade": "A MEI tem direito ao salário-maternidade por 120 dias, desde que tenha pelo menos 10 meses de contribuição antes do parto ou adoção. O benefício é solicitado pelo Meu INSS ou pelo telefone 135.",
  
  // Perguntas sobre encerramento
  "encerrar mei": "Para encerrar seu MEI, acesse o Portal do Empreendedor, faça login com sua conta gov.br e selecione a opção \"Baixar MEI\". Antes de encerrar, certifique-se de que não há débitos pendentes e entregue a declaração de extinção.",
  "fechar mei": "Para fechar seu MEI: 1) Acesse o Portal do Empreendedor; 2) Faça login com sua conta gov.br; 3) Selecione \"Baixar MEI\"; 4) Siga as instruções. Lembre-se de verificar se não há débitos pendentes antes de encerrar.",
  "cancelar mei": "O cancelamento do MEI é gratuito e pode ser feito pelo Portal do Empreendedor. Após o cancelamento, você ainda precisará entregar a Declaração de Extinção (DASN-SIMEI de extinção) até o último dia de junho do ano seguinte.",
  
  // Saudações e outros
  "olá": "Olá! Em que posso ajudar você hoje? Estou aqui para tirar suas dúvidas sobre o MEI.",
  "oi": "Oi! Como posso ajudar você hoje? Estou aqui para responder suas dúvidas sobre o MEI.",
  "bom dia": "Bom dia! Em que posso ajudar você hoje?",
  "boa tarde": "Boa tarde! Em que posso ajudar você hoje?",
  "boa noite": "Boa noite! Em que posso ajudar você hoje?",
  "obrigado": "Por nada! Estou aqui para ajudar. Tem mais alguma dúvida sobre o MEI?",
  "obrigada": "Por nada! Estou aqui para ajudar. Tem mais alguma dúvida sobre o MEI?",
  "tchau": "Até logo! Se tiver mais dúvidas, é só voltar aqui. Tenha um ótimo dia!",
  "adeus": "Até a próxima! Estamos sempre aqui para ajudar com suas dúvidas sobre o MEI."
};

// Função para inicializar o chatbot quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
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
  
  // Converte a mensagem para minúsculas para facilitar a comparação
  const messageLower = message.toLowerCase();
  
  // Verifica se alguma palavra-chave da mensagem corresponde a uma resposta no banco de dados
  let matchFound = false;
  
  for (const key in chatbotResponses) {
    if (messageLower.includes(key)) {
      response = chatbotResponses[key];
      matchFound = true;
      break;
    }
  }
  
  // Se nenhuma correspondência for encontrada, usa a resposta padrão
  if (!matchFound) {
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
      <button class="message-option" onclick="sendPredefinedMessage('Nota fiscal')">Nota fiscal</button>
      <button class="message-option" onclick="sendPredefinedMessage('Limite de faturamento')">Limite de faturamento</button>
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
  
  // Adiciona sugestões relacionadas após certas respostas
  if (messageLower.includes('abrir mei') || messageLower.includes('como ser mei')) {
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'message-options';
    suggestionsDiv.innerHTML = `
      <button class="message-option" onclick="sendPredefinedMessage('Quanto custa abrir MEI?')">Quanto custa?</button>
      <button class="message-option" onclick="sendPredefinedMessage('Benefícios do MEI')">Benefícios</button>
    `;
    chatbotBody.appendChild(suggestionsDiv);
  } else if (messageLower.includes('das') || messageLower.includes('boleto')) {
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'message-options';
    suggestionsDiv.innerHTML = `
      <button class="message-option" onclick="sendPredefinedMessage('Como emitir DAS?')">Como emitir?</button>
      <button class="message-option" onclick="sendPredefinedMessage('Atrasei o DAS')">Atrasei o pagamento</button>
    `;
    chatbotBody.appendChild(suggestionsDiv);
  }
  
  // Rola para a mensagem mais recente
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}
