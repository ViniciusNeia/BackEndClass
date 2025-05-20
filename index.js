import {connect} from './src/db/connection.js'
import {User} from './src/models/user.js'
import { Post } from './src/models/post.js';
import { Comment } from './src/models/comment.js';
import { ObjectId } from 'mongodb';

const db = await connect();
const userService = new User(db);
const postService = new Post(db);
const commentService = new Comment(db);

try{
    // const userC = await userService.create({username: 'Vinicius', email: 'viniciusgneia@gmail.com'});
    // console.log(await userService.read());
    // const userD = await userService.deleteUserByName('Vinicius')

    // const postC = await postService.create({author: 'Vinicius', content: 'Nova API criada!'});
    // console.log(await postService.findPostsFromAuthor('Vinicius'));
    // const postD = await postService.deletePostById(new ObjectId(/*'Insira o ID a ser deletado aqui'*/))

    // const commentC = await commentService.create({postId: 1 , author: 'Vinicius', content: 'Otima API!'});
    // console.log(await commentService.findByPostId(1));
    // const commentD = await commentService.deleteCommentById(new ObjectId(/*'Insira o ID a ser deletado aqui'*/))

}catch (err){
    console.error('General Error, see Log:', err.message);
}