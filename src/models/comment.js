import { LogA, LogE } from '../../logs/logger.js';
import { ObjectId } from 'mongodb';

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
            const deletion = await this.collection.deleteOne({ _id: typeof id === 'string' ? new ObjectId(id) : id });
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
    async updateCommentById(id, newContent) {
        try {
            if (!newContent || typeof newContent !== 'string' || !newContent.trim()) {
                throw new Error('Conteúdo inválido para atualização.');
            }

            const result = await this.collection.updateOne(
                { _id: typeof id === 'string' ? new ObjectId(id) : id },
                {
                    $set: {
                        content: newContent,
                        updatedAt: new Date(),
                    },
                }
            );

            if (result.modifiedCount === 0) {
                throw new Error('Nenhum comentário foi atualizado.');
            }

            LogA('Comment Updated', { id });
            return result;
        } catch (err) {
            LogE('Error On Updating Comment', err);
            throw err;
        }
    }
}

export { Comment };