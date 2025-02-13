import {IPersonModel, Person}  from '../interfaces/IPersonModel';
import {openDB} from '../config/db';
import { AppError } from '../errors/AppError';

export class PersonModel implements IPersonModel {

    async create(people: Person): Promise<void> {
        const db = await openDB();
        const personAlreadyRegistered = await db.get('SELECT * FROM PEOPLE WHERE name=?', [people.name]);
        if(personAlreadyRegistered) {
            throw new AppError('Person already registered', 404);
        }
        await db.run('INSERT INTO PEOPLE(name, age) VALUES(?, ?)', [people.name, people.age]);
    }

    async getPersonById(id: number): Promise<Person> {
        const db = await openDB();
        const person = await db.get('SELECT * FROM PEOPLE WHERE id=?', [id]);
        if(!person) {
            throw new AppError('Person not found', 404);
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
        await db.run('DELETE FROM PEOPLE WHERE id=?', [id]);
    }
}