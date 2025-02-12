export interface ITransactionModel {
    create(transaction:Transaction): Promise<void>;
    getTransactionById(id: number): Promise<Transaction>;
    getAllTransactions(): Promise<Transaction[]>;
};


export interface Transaction {
    id: number;
    user_id: number;
    description: string;
    amount: number;
    type: string;
};