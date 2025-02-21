import {openDB} from '../config/db';
import { AppError } from '../errors/AppError';
import { ITransactionModel, Transaction } from '../interfaces/ITransactionModel';

export class TransactionModel implements ITransactionModel {
    async create(transaction: Transaction): Promise<Transaction> {
        const db = await openDB();
        const person = await db.get('SELECT * FROM PEOPLE WHERE id = ?', transaction.person_id); // Verifico se a pessoa existe no banco de dados através do id informado
        if (!person) {
            throw new AppError('Pessoa não encontrada', 404); // Retorna um erro caso o id informado não exista no banco de dados
        }
        const {person_id, description, amount, type} = transaction; 

        if(person.age < 18 && type === 'receita') { // Verifico se a pessoa é menor de idade e se a transação é de receita
            // Caso a pessoa seja maior de idade e tente fazer uma transação de receita, retorna um erro de Bad Request
            throw new AppError('Menores de idade podem apenas cadastrar despesas', 400); 
        }

         const result = await db.all('INSERT INTO transactions (person_id, description, amount, type) VALUES (?, ?, ?, ?) RETURNING *', [person_id, description, amount, type]);
         return {...result[0], name: person.name};
    }

    async getTransactionById(id: number): Promise<Transaction> {
        const db = await openDB();
        // Consulta para verificar se a transação existe no banco de dados
        const transaction = await db.get('SELECT t.*, p.name FROM transactions as t JOIN PEOPLE as p ON t.person_id = p.id WHERE t.id = ?', id); 
        if(!transaction) {
            throw new AppError("Transação não encontrada", 404); // Lança uma exceção de erro 404 caso a transação não exista
        }
        return transaction;
    }
    
    async getAllTransactions(): Promise<Transaction[]> {
        const db = await openDB();
        // Consulta para retornar todas as transações do banco de dados e o nome da pessoa que fez a transação
        const transactions = await db.all('SELECT t.*, p.name FROM transactions as t JOIN PEOPLE as p ON t.person_id = p.id'); 
        return transactions;
    }

}