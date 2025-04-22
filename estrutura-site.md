# Estrutura e Design do Novo Site MEI em Foco

## Visão Geral
O novo site do MEI em Foco será desenvolvido do zero, seguindo as diretrizes visuais da Universidade de Vassouras - Campus Maricá, com foco em uma experiência de usuário intuitiva, design responsivo e conteúdo educativo para microempreendedores individuais.

## Paleta de Cores
Baseada no site da Univassouras, com algumas adaptações para o projeto MEI em Foco:
- **Cor primária**: #990000 (Vermelho escuro - cor institucional principal)
- **Cor secundária**: #4D5D6C (Cinza azulado - para títulos e elementos secundários)
- **Cor de destaque**: #FF5722 (Laranja - para botões de ação e destaques)
- **Cores neutras**:
  - Branco: #FFFFFF (Fundo principal)
  - Cinza claro: #F5F5F5 (Fundo alternativo)
  - Cinza médio: #E0E0E0 (Bordas e separadores)
  - Cinza escuro: #333333 (Texto principal)

## Tipografia
- **Família principal**: Roboto (Sans-serif)
- **Tamanhos**:
  - Texto base: 16px
  - Títulos principais: 32px
  - Subtítulos: 24px
  - Texto pequeno: 14px
- **Pesos**:
  - Regular (400) para texto corrido
  - Medium (500) para destaques
  - Bold (700) para títulos

## Layout e Grid
- Layout responsivo usando CSS Grid e Flexbox
- Container centralizado com largura máxima de 1200px
- Sistema de grid de 12 colunas
- Breakpoints:
  - Mobile: até 576px
  - Tablet: 577px - 991px
  - Desktop: 992px e acima

## Componentes Principais

### Header
- Logo do MEI em Foco à esquerda
- Logo da Univassouras à direita
- Menu de navegação fixo abaixo dos logos
- Versão mobile com menu hambúrguer

### Footer
- Logo do MEI em Foco
- Informações do projeto (nome da professora, disciplina)
- Links para redes sociais
- Links úteis
- Informações de contato
- Créditos do desenvolvedor

### Componentes Reutilizáveis
- Botões (primário, secundário, terciário)
- Cards para conteúdo
- Acordeões para perguntas frequentes
- Formulários padronizados
- Alertas e notificações
- Breadcrumbs para navegação
- Paginação

## Estrutura de Páginas

### 1. Página Inicial
- Hero section com chamada principal e botões de ação
- Seção "O que é o MEI" com breve explicação
- Seção "Serviços Essenciais" com cards para principais funcionalidades
- Seção "Valor do DAS 2025" com informações atualizadas
- Seção "Próximos Eventos" com cards para eventos
- Seção "Instagram" com posts recentes
- Call-to-action final

### 2. O que é MEI
- Explicação detalhada sobre o MEI
- Vantagens de ser MEI
- Requisitos para se tornar MEI
- Atividades permitidas
- Limites de faturamento
- Comparativo MEI x ME x EPP

### 3. Como Abrir MEI
- Passo a passo detalhado
- Documentos necessários
- Vídeo tutorial (embed do YouTube)
- Link direto para o Portal do Empreendedor
- Perguntas frequentes sobre abertura

### 4. Consulta MEI
- Links para:
  - Consulta de situação cadastral
  - Emissão de DAS
  - Declaração Anual (DASN-SIMEI)
  - Consulta de pendências
  - Atualização de dados cadastrais
- Instruções para cada serviço

### 5. DAS e Obrigações
- Informações sobre o DAS 2025
- Como calcular e pagar
- Calendário de pagamentos
- Declaração Anual
- Emissão de notas fiscais
- Contratação de funcionário

### 6. Aplicativos Úteis
- Lista de aplicativos úteis para MEI
- Descrição, funcionalidades e links
- Categorias (finanças, notas fiscais, gestão)
- Avaliações e recomendações

### 7. Tira-dúvidas (FAQ)
- Perguntas organizadas por categorias
- Sistema de busca
- Acordeões para expandir/recolher respostas
- Links para mais informações

### 8. Dicas
- Dicas rápidas em formato de cards
- Checklists para MEI
- Infográficos
- Conteúdo interativo

### 9. Blog
- Artigos organizados por categorias
- Sistema de busca e filtros
- Compartilhamento em redes sociais
- Comentários (opcional)

### 10. Eventos
- Calendário de eventos
- Detalhes dos próximos eventos
- Galeria de eventos passados
- Formulário de inscrição (opcional)

### 11. Sobre
- História do projeto
- Equipe (professora e criador)
- Objetivos e missão
- Parceiros e apoiadores
- Formulário de contato

### 12. Instagram
- Feed integrado do Instagram
- Posts destacados
- Link para seguir o perfil

## Funcionalidades Especiais
- Chatbot simples para dúvidas frequentes
- Modo PWA para instalação no celular
- Acessibilidade (alto contraste, aumento de fonte)
- Sistema de busca no site
- Compartilhamento de conteúdo

## Tecnologias
- HTML5 semântico
- CSS3 com variáveis e flexbox/grid
- JavaScript para interatividade
- Bootstrap 5 para componentes responsivos
- FontAwesome para ícones
- Google Fonts para tipografia
- Otimização para SEO e performance

## Considerações de Acessibilidade
- Contraste adequado entre texto e fundo
- Textos alternativos para imagens
- Navegação por teclado
- Estrutura semântica de HTML
- Tamanhos de fonte ajustáveis
