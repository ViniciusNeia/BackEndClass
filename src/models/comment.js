import { LogA, LogE } from '../../logs/logger.js';

class Comment{
    constructor(db){
        this.collection = db.collection('comments');
    }

    async create(comment){
        try{
            if(!comment.postId || !comment.author || !comment.content) throw new Error('Preencha os campos obrigatorios');
            const creation = await this.collection.insertOne({...comment, createdAt: new Date()})
            LogA('New Comment Added', {id: creation.insertedId, postId: comment.postId});
            return creation
        }catch (err){
            LogE('Erro On Creating Comment', err);
            throw err;
        }
    }

    async deleteCommentById(id){
        try{
            const deletion = await this.collection.deleteOne({ _id: id});
            LogA('Comment Deletion', { id });
            return deletion;
        }catch (err){
            LogE('Error On Deliting Comment', err);
            throw err;
        }
    }

    async findByPostId(postId){
        try{
            const comments = await this.collection.find({ postId}).toArray();
            LogA('Comments Read', { postId, count: comments.length });
            return comments;
        }catch (err){
            LogE('Error On Reading Comments', err);
            throw err;
        }
    }
}

export { Comment }