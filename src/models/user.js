import { LogA, LogE } from '../../logs/logger.js';

class User{
    constructor(db){
        this.collection = db.collection('users');
    }

    async create(user){
        try{
            if(!user.username || !user.email) throw new Error('Preencha os campos obrigatorios');
            const creation = await this.collection.insertOne({...user, createdAt: new Date()})
            LogA('New User Added', {id: creation.insertedId, username: user.username});
            return creation
        }catch (err){
            LogE('Erro On Adding User', err);
            throw err;
        }
    }

    async deleteUserByName(username){
        try{
            const deletion = await this.collection.deleteOne({username});
            LogA('User Deletion', {username});
            return deletion;
        }catch (err){
            LogE('Error On Deliting User', err);
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
}

export { User }