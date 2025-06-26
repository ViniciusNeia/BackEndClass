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
    async updatePostById(id, newContent) {
        try {
            if (!newContent || typeof newContent !== 'string' || !newContent.trim()) {
                throw new Error('Conteúdo inválido para atualização.');
            }

            const result = await this.collection.updateOne(
                { _id: id},
                {
                    $set: {
                        content: newContent,
                        updatedAt: new Date(),
                    },
                }
            );

            if (result.modifiedCount === 0) {
                throw new Error('Nenhum post foi atualizado.');
            }

            LogA('Post Updated', { id });
            return result;
        } catch (err) {
            LogE('Error On Updating Post', err);
            throw err;
        }
    }

    async getAllPosts() {
        try {
            const posts = await this.collection.find({}).toArray();
            LogA('All Posts Retrieved', { count: posts.length });
            return posts;
        } catch (err) {
            LogE('Error On Getting All Posts', err);
            throw err;
        }
    }
}

export { Post };