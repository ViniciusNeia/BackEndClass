import { LogA, LogE } from '../../logs/logger.js';
import { ObjectId } from 'mongodb';

class User{
    constructor(db){
        this.collection = db.collection('users');
    }

    async create(user){
        try{
            if(!user.username || !user.email) throw new Error('Preencha os campos obrigatorios');
            const userToInsert = {
                ...user,
                password: user.email,
                createdAt: new Date()
            };
            const creation = await this.collection.insertOne(userToInsert);
            LogA('New User Added', {id: creation.insertedId, username: user.username});
            return creation;
        }catch (err){
            LogE('Erro On Adding User', err);
            throw err;
        }
    }

    async deleteUserById(id){
        try{
            const deletion = await this.collection.deleteOne({ _id: typeof id === 'string' ? new ObjectId(id) : id });
            LogA('User Deletion', { id });
            return deletion;
        }catch (err){
            LogE('Error On Deleting User', err);
            throw err;
        }
    }

    async read(){
        try{
            const users = await this.collection.find({}).toArray();
            LogA('Users Read', { count: users.length });
            return users;
        }catch (err){
            LogE('Error On Reading Users', err);
            throw err;
        }
    }
    async updateUserById(id, updates) {
        try {
            if (!id || typeof updates !== 'object' || !Object.keys(updates).length) {
                throw new Error('Dados inválidos para atualização.');
            }
            const allowedFields = ['email', 'username'];
            const updateData = {};

            for (const key of Object.keys(updates)) {
                if (allowedFields.includes(key) && updates[key]) {
                    updateData[key] = updates[key];
                }
            }

            if (updateData.email) {
                updateData.password = updateData.email;
            }

            if (!Object.keys(updateData).length) {
                throw new Error('Nenhum campo válido para atualizar.');
            }

            updateData.updatedAt = new Date();

            const result = await this.collection.updateOne(
                { _id: typeof id === 'string' ? new ObjectId(id) : id },
                { $set: updateData }
            );

            if (result.modifiedCount === 0) {
                throw new Error('Nenhum usuário foi atualizado.');
            }

            LogA('User Updated', { id, updatedFields: Object.keys(updateData) });
            return result;
        } catch (err) {
            LogE('Error On Updating User', err);
            throw err;
        }
    }

    async getUser(username) {
        try {
            if (!username) throw new Error('Username é obrigatório.');
            const user = await this.collection.findOne({ username }, { projection: { password: 0 } });
            LogA('User Fetched', { username, found: !!user });
            return user;
        } catch (err) {
            LogE('Error on fetching User', err);
            throw err;
        }
    }
}

export { User };