import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import path from 'path';

export async function openDB() {
    return open({
        filename: path.resolve(__dirname, '..', 'database.sqlite'),
        driver: sqlite3.Database
    });
};

export async function seed() { 
    const db = await openDB();
    await db.run(`CREATE TABLE IF NOT EXISTS USERS(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) UNIQUE NOT NULL, 
        idade INT NOT NULL)`
    );

    await db.run(`CREATE TABLE IF NOT EXISTS TRANSACTIONS(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id INTEGER NOT NULL, 
        description TEXT NOT NULL, 
        amount REAL NOT NULL,
        Type TEXT CHECK(Type IN('despesa', 'receita')) NOT NULL, 
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )`
    );
}