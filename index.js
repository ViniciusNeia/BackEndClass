import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import { Post } from './src/models/post.js';
import { Comment } from './src/models/comment.js';
import { User } from './src/models/user.js';
import { connect } from './src/db/connection.js';
import { ObjectId } from 'mongodb';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { verifyToken } from './src/middleware/JWTauth.js';
import jwt from 'jsonwebtoken';

const db = await connect();
const userService = new User(db);
const postService = new Post(db);
const commentService = new Comment(db);
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
dotenv.config();

app.set('view engine', 'hbs');
app.set('views', path.join(process.cwd(), 'src','views'));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser( ));

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await userService.collection.findOne({ username });
    if (!user || user.password !== password) {
        return res.status(403).send('Credenciais inválidas');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
    });

    return res.redirect('/posts');
});
app.get('/posts', verifyToken, async (req, res) => {
    try {
        const users = await userService.read();
        const usernames = users.map(u => u.username);
        const author = req.query.author;
        let posts;
        if (author) {
            posts = await postService.findPostsFromAuthor(author);
        } else {
            posts = await postService.getAllPosts();
        }
        const postsWithAuthorFlag = posts.map(post => ({
            ...post,
            author: usernames.includes(post.author) ? post.author : '*DELETED*',
            authorExists: usernames.includes(post.author)
        }));
        const usersWithSelected = users.map(u => ({
            ...u,
            selected: u.username === author
        }));
        res.render('posts', { posts: postsWithAuthorFlag, users: usersWithSelected, selectedAuthor: author || '' });
    } catch (err) {
        res.status(500).send('Erro ao buscar posts: ' + err.message);
    }
});
app.post('/posts', verifyToken, async (req, res) => {
    try {
        const { content, author } = req.body;
        await postService.create({ content, author });
        res.redirect('/posts');
    } catch (err) {
        res.status(500).send('Erro ao criar post: ' + err.message);
    }
});
app.delete('/posts/:id', verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        await postService.deletePostById(new ObjectId(postId));
        res.redirect('/posts');
    } catch (err) {
        res.status(500).send('Erro ao deletar post: ' + err.message);
    }
});
app.put('/posts/:id', verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const { content, author } = req.body;
        await postService.updatePostById(new ObjectId(postId), content);
        res.redirect('/posts');
    } catch (err) {
        res.status(500).send('Erro ao atualizar post: ' + err.message);
    }
});
app.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await userService.read();
        res.render('users', { users });
    } catch (err) {
        res.status(500).send('Erro ao buscar usuários: ' + err.message);
    }
});
app.post('/users', verifyToken, async (req, res) => {
    try {
        const { username, email } = req.body;
        await userService.create({ username, email });
        res.redirect('/users');
    } catch (err) {
        res.status(500).send('Erro ao registrar usuário: ' + err.message);
    }
});
app.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        await userService.deleteUserById(new ObjectId(userId));
        res.redirect('/users');
    } catch (err) {
        res.status(500).send('Erro ao deletar usuário: ' + err.message);
    }
});
app.put('/users/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email } = req.body;
        await userService.updateUserById(new ObjectId(userId), { username, email });
        res.redirect('/users');
    } catch (err) {
        res.status(500).send('Erro ao atualizar usuário: ' + err.message);
    }
});
app.get('/posts/:id/comments', verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await commentService.findByPostId(postId);
        const users = await userService.read(); 
        res.render('comments', { postId, comments, users }); 
    } catch (err) {
        res.status(500).send('Erro ao buscar comentários: ' + err.message);
    }
});

app.post('/posts/:id/comments', verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const { author, content } = req.body;
        await commentService.create({ postId, author, content });
        res.redirect(`/posts/${postId}/comments`);
    } catch (err) {
        res.status(500).send('Erro ao adicionar comentário: ' + err.message);
    }
});

app.put('/posts/:id/comments/:commentId', verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { content } = req.body;
        await commentService.updateCommentById(new ObjectId(commentId), content);
        res.redirect(`/posts/${postId}/comments`);
    } catch (err) {
        res.status(500).send('Erro ao atualizar comentário: ' + err.message);
    }
});

app.delete('/posts/:id/comments/:commentId', verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        await commentService.deleteCommentById(new ObjectId(commentId));
        res.redirect(`/posts/${postId}/comments`);
    } catch (err) {
        res.status(500).send('Erro ao deletar comentário: ' + err.message);
    }
});
server.listen(PORT, () => {
    console.log(`Server online em: http://localhost:${PORT}`);
});

