import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';

// Resolvi utilizar o sqlite por ser um banco de dados simples e que não necessita de muita configuração
// Além de não precisar de um servidor para rodar, o que facilita a execução do projeto

export async function openDB() {
    return open({
        filename: path.resolve(__dirname, '..', 'database.sqlite'),
        driver: sqlite3.Database
    });
};


// Função que cria as tabelas no banco de dados, caso não tenham sido criadas
export async function seed() { 
    const db = await openDB();
    await db.run('PRAGMA foreign_keys = ON');
    await db.run(`CREATE TABLE IF NOT EXISTS PEOPLE(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL, 
        age INT NOT NULL)`
    );

    await db.run(`CREATE TABLE IF NOT EXISTS TRANSACTIONS(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        person_id INTEGER NOT NULL, 
        description TEXT NOT NULL, 
        amount REAL NOT NULL,
        type TEXT CHECK(Type IN('despesa', 'receita')) NOT NULL, 
        FOREIGN KEY(person_id) REFERENCES PEOPLE(id) ON DELETE CASCADE
        )`
    );
}