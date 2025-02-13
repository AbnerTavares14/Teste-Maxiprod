export interface IPersonModel {
    create(user:Person): Promise<void>;
    getPersonById(id: number): Promise<Person>;
    getPeople(): Promise<Person[]>;
    deletePersonById(id: number): Promise<void>;
}

export interface Person {
    id: number;
    name: string;
    age: number;
};