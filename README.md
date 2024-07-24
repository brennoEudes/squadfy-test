<p align="center">
<img src="./.github/cover.png" alt="Project-demonstration" width=100%/>
</p>

# 💻 Squadfy - Frontend Developer Teste

Este projeto é uma aplicação desenvolvida para o processo seletivo da **Squadfy**. A aplicação foi construída com base em boas práticas de desenvolvimento frontend, focando em escalabilidade, manutenibilidade e performance.

## 🏢 Sobre a Squadfy

A Squadfy oferece as mais avançadas soluções tecnológicas com times multidisciplinares de alta performance. Tudo para ajudar o seu negócio a se transformar digitalmente e escalar seus resultados! Saiba mais em [Squadfy.com.br](https://squadfy.com.br/).

## 💡 Raciocínio do Desenvolvimento Web

O desenvolvimento da aplicação seguiu um fluxo de trabalho estruturado detalhado abaixo:

1. **Configuração do Ambiente**: A primeira etapa foi garantir que o ambiente de desenvolvimento estivesse corretamente configurado. As ferramentas necessárias foram instaladas, incluindo **TypeScript**, **Next.js** e **Tailwind CSS**.
2. **Desenvolvimento API-First**: Iniciamos o desenvolvimento seguindo o conceito de API-First. Consumimos os dados do payload através de uma API, o que torna a aplicação mais replicável e escalável, permitindo futuras expansões e integrações com outras APIs.
3. **Estilização Mobile-First**: Com os dados sendo consumidos corretamente, a estilização foi iniciada utilizando o conceito Mobile-First. Isso garante uma melhor experiência para usuários de dispositivos móveis, adaptando-se posteriormente para telas maiores.
4. **Deploy e Refinamento**: Após concluir o desenvolvimento de todas as versões responsivas, foi realizado o deploy. Após, foram feitas algumas animações e refatorações para melhorar a performance e a manutenibilidade do código.

## 🛠️ Setup

### Para configurar e iniciar a aplicação localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/brennoEudes/squadfy-test.git

2. Navegue até o diretório do projeto:
   ```bash
   cd squadfy-test

3. Instale as dependências:
    ```bash
    pnpm install

4. Inicie o servidor de desenvolvimento:
    ```bash
    pnpm run dev

A aplicação estará disponível em http://localhost:3000.

### Para instalar o TypeScript, Next.js (versão 14 ou superior) e Tailwind CSS:

 1. Inicialize um novo projeto Next.js com TypeScript:
      ```bash
      pnpx create-next-app@latest squadfy-test --typescript
      ```

   2. Navegue até o diretório do projeto:
      ```bash
      cd squadfy-test
      ```

   3. Instale o Tailwind CSS:
      ```bash
      pnpm install -D tailwindcss postcss autoprefixer
      pnpx tailwindcss init -p
      ```

   4. Configure o Tailwind CSS adicionando as seguintes linhas ao arquivo `tailwind.config.js`:
      ```javascript
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          './pages/**/*.{js,ts,jsx,tsx}',
          './components/**/*.{js,ts,jsx,tsx}',
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }
      ```

   5. Adicione as diretivas do Tailwind CSS ao arquivo `globals.css` em `styles/globals.css`:
      ```css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      ```

### Bibliotecas Adicionais

- React Icons;


## 🤝 Agradecimentos
Agradeço ao time da Squadfy pela oportunidade de me juntar ao time e fazer a diferença!