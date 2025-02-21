export interface ITransactionModel {
    create(transaction:Transaction): Promise<Transaction>;
    getTransactionById(id: number): Promise<Transaction>;
    getAllTransactions(): Promise<Transaction[]>;
};


export interface Transaction {
    id: number;
    name: string;
    person_id: number;
    description: string;
    amount: number;
    type: "receita" | "despesa";
};