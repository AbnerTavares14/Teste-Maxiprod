import {IPersonModel, Person}  from '../interfaces/IPersonModel';
import {openDB} from '../config/db';
import { AppError } from '../errors/AppError';

export class PersonModel implements IPersonModel {

    async create(people: Person): Promise<void> {
        const db = await openDB();
        const personAlreadyRegistered = await db.get('SELECT * FROM PEOPLE WHERE name=?', [people.name]);
        if(personAlreadyRegistered) {
            throw new AppError('Pessoa já está registrada', 409);
        }
        const result = await db.all('INSERT INTO PEOPLE(name, age) VALUES(?, ?) RETURNING *', [people.name, people.age]);
        return result[0];
    }

    async getPersonById(id: number): Promise<Person> {
        const db = await openDB();
        const person = await db.get('SELECT * FROM PEOPLE WHERE id=?', [id]);
        if(!person) {
            throw new AppError('Pessoa não encontrada', 404);
        }
        return person;
    }

    async getPeople(): Promise<Person[]> {
        const db = await openDB();
        const people = await db.all('SELECT * FROM PEOPLE');
        return people;
    }
    

    async deletePersonById(id: number): Promise<void> {
        const db = await openDB();
        await db.run('PRAGMA foreign_keys = ON'); // Sem isso o sqlite não deleta as transações em cascasta, mesmo tendo uma constraint de DELETE ON CASCADE
        await db.run('DELETE FROM PEOPLE WHERE id=?', [id]);
    }
}