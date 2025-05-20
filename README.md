Este projeto é uma biblioteca desenvolvida em Node.js que fornece funcionalidades básicas de um sistema de micro-blogging

⚙️ Tecnologias Utilizadas
- Node.js
- MongoDB
- MongoDB Native Driver
- JavaScript ES6+

✅ Funcionalidades
📌 Usuários:
- Criar novo usuário
- Buscar todos os usuários
- Buscar usuário por ID
- Excluir usuário

📝 Postagens:
- Criar nova postagem
- Buscar todas as postagens
- Buscar post por ID
- Excluir post

💬 Comentários:
- Criar comentário associado a post
- Buscar comentários por post
- Excluir comentário

🧾 Logs:
- Registra todas as ações executadas pelo sistema
- Registra erros com mensagens detalhadas
- Arquivo gerado: logs/system.log

🚀 Como Executar
1. Clone o repositório
```bash
git clone https://github.com/ViniciusNeia/BackEndClass.git
cd BackEndClass
```
2. Instale as dependências
```bash
npm install
```
3. Configure a conexão com o MongoDB
No arquivo src/db/connection.js, altere a conexão se necessário:
```bash
const client = new MongoClient('Coloque sua Conexão aqui')
Certifique-se de que o MongoDB está rodando localmente ou altere para seu servidor.
```

4. Execute o projeto
```bash
node index.js
```

Autor: Vinicius Gonçalves Neia
