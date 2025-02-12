import {IUserModel, User}  from '../interfaces/IUserModel';
import {openDB} from '../config/db';
import { AppError } from '../errors/AppError';

export class UserModel implements IUserModel {

    async create(user: User): Promise<void> {
        const db = await openDB();
        const personAlreadyRegistered = await db.get('SELECT * FROM USERS WHERE name=?', [user.name]);
        if(personAlreadyRegistered) {
            throw new AppError('User already registered', 404);
        }
        await db.run('INSERT INTO USERS(name, idade) VALUES(?, ?)', [user.name, user.idade]);
    }

    async getUserById(id: number): Promise<User> {
        const db = await openDB();
        const user = await db.get('SELECT * FROM USERS WHERE id=?', [id]);
        if(!user) {
            throw new AppError('User not found', 404);
        }
        return user
    }

    async getAllUsers(): Promise<User[]> {
        const db = await openDB();
        const users = await db.all('SELECT * FROM USERS');
        return users;
    }
    

    async deleteUser(id: number): Promise<void> {
        const db = await openDB();
        await db.run('DELETE FROM USERS WHERE id=?', [id]);
    }
}