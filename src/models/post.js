import { LogA, LogE } from '../../logs/logger.js';

class Post{
    constructor(bd){
        this.collection = bd.collection('posts')
    }
async create(post){
        try{
            if(!post.author || !post.content) throw new Error('Preencha os campos obrigatorios');
            const creation = await this.collection.insertOne({...post, createdAt: new Date()})
            LogA('Post Created', {id: creation.insertedId, author: post.author});
            return creation
        }catch (err){
            LogE('Erro On Creating Post', err);
            throw err;
        }
    }

    async deletePostById(id){
        try{
            const deletion = await this.collection.deleteOne({_id: id});
            LogA('Post Deletion', { id });
            return deletion;
        }catch (err){
            LogE('Error On Deliting Post', err);
            throw err;
        }
    }

    async findPostsFromAuthor(author){
        try{
            const posts = await this.collection.find({author}).toArray();
            LogA('Posts Found', { author, count: posts.length });
            return posts;
        }catch (err){
            LogE('Error On Reading Posts', err);
            throw err;
        }
    }
}

export {Post}