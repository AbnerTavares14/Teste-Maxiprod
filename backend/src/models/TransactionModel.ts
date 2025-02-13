import {openDB} from '../config/db';
import { AppError } from '../errors/AppError';
import { ITransactionModel, Transaction } from '../interfaces/ITransactionModel';

export class TransactionModel implements ITransactionModel {
    async create(transaction: Transaction): Promise<void> {
        const db = await openDB();
        const personExist = await db.get('SELECT * FROM PEOPLE WHERE id = ?', transaction.person_id); // Verifico se a pessoa existe no banco de dados através do id informado
        if (!personExist) {
            throw new AppError('Pessoa não encontrada', 404); // Retorna um erro caso o id informado não exista no banco de dados
        }
        const {person_id, description, amount, type} = transaction; 

        if(personExist.age < 18 && type === 'receita') { // Verifico se a pessoa é menor de idade e se a transação é de receita
            // Caso a pessoa seja maior de idade e tente fazer uma transação de receita, retorna um erro de Bad Request
            throw new AppError('Menores de idade apenas podem cadastrar despesas', 400); 
        }

        await db.run('INSERT INTO transactions (person_id, description, amount, type) VALUES (?, ?, ?, ?)', [person_id, description, amount, type]);
    }

    async getTransactionById(id: number): Promise<Transaction> {
        const db = await openDB();
        const transaction = await db.get('SELECT * FROM transactions WHERE id = ?', id); // Consulta para verificar se a transação existe no banco de dados
        if(!transaction) {
            throw new AppError("Transação não encontrada", 404); // Lança uma exceção de erro 404 caso a transação não exista
        }
        return transaction;
    }
    
    async getAllTransactions(): Promise<Transaction[]> {
        const db = await openDB();
        const transactions = await db.all('SELECT * FROM transactions');
        return transactions;
    }

}