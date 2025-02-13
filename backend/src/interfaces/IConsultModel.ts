export interface IConsultationModel {
    getConsultById(id: number): Promise<Consultation>;
    getConsult(): Promise<Consultation[]>;
};

export interface Consultation {
    name: string;
    age: string;
    income: number;
    expense: number;
    balance: number;
};