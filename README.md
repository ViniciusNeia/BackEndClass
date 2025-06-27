Este projeto é uma biblioteca desenvolvida em Node.js que fornece funcionalidades básicas de um sistema de micro-blogging

⚙️ Tecnologias Utilizadas
- Node.js
- Express.js
- MongoDB
- MongoDB Native Driver
- JavaScript ES6+

✅ Funcionalidades
📌 Usuários:
- Criar novo usuário
- Login
- Controle de Usuário por meio de conta Admin

📝 Postagens:
- Criar nova postagem
- Buscar todas as postagens
- Buscar post
- Excluir post

💬 Comentários:
- Criar comentário associado a post
- Editar Comentario
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
npm start //Criado o Script para rodar em modo de desenvolvedor com o nodemon
```

Instruções de Uso:
Ola Professor, é possivel apenas editar e apagar seus proprios posts. A senha de login é igual ao e-mail na hora de criação do usuário. Além disso, se for criado um usuário com username "admin" ele terá acesso para modificar, apagar e editar posts e comentarios de outros usuários. Simulando um superusuário.
Estou também adicionando o Json da minha conexão do banco local. Garanti a unicidade de usernames por meio do banco, garantindo que só exista 1 usuário admin.

Autor: Vinicius Gonçalves Neia
