# QA Playground Automation

Projeto de automação de testes End-to-End (E2E) desenvolvido com Playwright e JavaScript para validar componentes interativos do site [QA Playground](https://qaplayground.dev/).

## 🚀 Tecnologias

- **Playwright** (Runner e asserções)
- **Node.js**
- **JavaScript**

## 📋 Funcionalidades & Casos de Teste

### 1. Tabela Dinâmica (Dynamic Table - Find the Spider)
- **Funcionalidade**: Uma tabela que altera posições de linhas dinamicamente a cada carregamento.
- **Testes Simples (`tests/teste.spec.js`)**:
  - **Objetivo**: Garantir que o personagem "Hulk" está presente na tabela de heróis.
  - **Passos**:
    1. Acessar a página inicial do QA Playground.
    2. Clicar em "Mini Web Apps".
    3. Clicar em "Dynamic Table Find the Spider".
    4. Validar se o texto "Hulk" está visível na tabela.
- **Suite Avançada (`tests/dynamic-table.spec.js`)**:
  - **Carregar a lista**: Valida que todas as 8 linhas de heróis cadastrados no banco de dados (`db1.json`) são renderizadas na tabela.
  - **Validar carregamento da página**: Verifica se o container da tabela e os cabeçalhos estão visíveis na página.
  - **Validar nomes apresentados**: Itera sobre todas as linhas da tabela e valida que os nomes exibidos e seus nomes reais correspondentes estão corretos conforme a base de dados (independente de estarem ordenados aleatoriamente).
  - **Validar se as imagens foram carregadas**: Garante que cada herói tem uma imagem de perfil visível, com um atributo `src` apontando para o arquivo correto e que foi renderizada com sucesso (naturalWidth > 0).

### 2. Verificação de Conta (Verify Your Account - Suite `tests/verify-your-account.spec.js`)
- **Funcionalidade**: Um fluxo de verificação de conta via código de confirmação numérico dividido em 6 inputs individuais.
- **Casos de Teste**:
  - **Teste de Carregamento de Tela**:
    - **Objetivo**: Garantir que o título, instruções e os 6 inputs estão visíveis na página.
  - **Captura e Input Correto do Código**:
    - **Objetivo**: Extrair dinamicamente o código de confirmação da página e inseri-lo corretamente para validar a conta.
    - **Resultado Esperado**: Exibição da mensagem "Success".
  - **Código Aleatório (Inválido)**:
    - **Objetivo**: Inserir um código numérico aleatório de 6 dígitos diferente do código correto.
    - **Resultado Esperado**: A mensagem de "Success" não deve ser exibida.
  - **Confirmação Incompleta**:
    - **Objetivo**: Inserir apenas parte dos dígitos necessários (3 dígitos).
    - **Resultado Esperado**: A mensagem de "Success" não deve ser exibida.

### 3. Caixa de Entrada de Tags (Tags Input Box)
- **Funcionalidade**: Componente interativo para adicionar, listar e remover tags de texto.
- **Caso de Teste**:
  - **Objetivo**: Limpar as tags existentes, adicionar novas tags e certificar-se de que foram exibidas corretamente.
  - **Passos**:
    1. Acessar a página do app "Tags Input Box".
    2. Clicar no botão "Remove All" para limpar as tags padrão.
    3. Digitar "validação" no campo de texto e pressionar Enter.
    4. Validar que a tag "validação" está visível.
    5. Digitar "input de texto" e pressionar Enter.
    6. Validar que a tag "input de texto" está visível.

## 🛠️ Como Executar os Testes

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Instale os navegadores do Playwright (se necessário):
   ```bash
   npx playwright install
   ```
3. Execute todos os testes:
   ```bash
   npx.cmd playwright test
   ```
4. Execute apenas os testes da Tabela Dinâmica:
   ```bash
   npx.cmd playwright test tests/dynamic-table.spec.js
   ```
5. Execute apenas os testes de Verificação de Conta:
   ```bash
   npx.cmd playwright test tests/verify-your-account.spec.js
   ```
6. Para abrir o relatório de testes:
   ```bash
   npx.cmd playwright show-report
   ```