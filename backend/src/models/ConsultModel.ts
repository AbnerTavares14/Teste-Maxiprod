import {IConsultationModel, Consultation} from '../interfaces/IConsultModel';
import {openDB} from '../config/db';
import { AppError } from '../errors/AppError';

// Classe especializada em fazer as consultas totais
// Já que a classe UserModel é especializada em fazer as consultas de usuários
// E a classe TransactionModel é especializa em fazer as consultas de transações
// Para mim fazia mais sentido criar uma classe separa para fazer as consultas totais
export class ConsultationModel implements IConsultationModel {
    
    // Método para retornar a consulta de todas as pessoas, com o total de receitas, despesas e saldo de cada uma, além de conter o total geral no final
    // Tentei fazer a query de forma mais otimizada, para que não fosse necessário fazer várias consultas ao banco de dados 
    // E nem precisar fazer a soma dos valores no backend
    public async getConsult(): Promise<Consultation[]> {
        const db = await openDB();
        // Como o SUM retorna NULL caso a pessoa não tenha transações, utilizei o TOTAL pois ele faz a mesma coisa que o SUM,
        // Com a diferença de que ele retorna 0 ao invés de NULL em caso da pessoa não ter feito nenhuma transação
        // Utilizei o UNION ALL para buscar os dados de todas as pessoas e o total geral em uma única consulta
        // Como o UNION ALL exige que ambas as consultas tenham o mesmo número de colunas, precisei adicionar NULL na idade e id
        const consults = await db.all(`SELECT p.name, p.age, p.id,
            TOTAL(CASE WHEN t.type = 'receita' THEN t.amount END) AS income,
            TOTAL(CASE WHEN t.type = 'despesa' THEN t.amount END) AS expenses,
            TOTAL(CASE WHEN t.type = 'receita' THEN t.amount END) - TOTAL(CASE WHEN t.type = 'despesa' THEN t.amount END) AS balance
            FROM PEOPLE p
            LEFT JOIN TRANSACTIONS t ON p.id = t.person_id
            GROUP BY p.id
            
            UNION ALL 

            SELECT 'TOTAL' AS name, NULL AS age, NULL AS id,
            TOTAL(CASE WHEN t.type = 'receita' THEN t.amount END) AS income,
            TOTAL(CASE WHEN t.type = 'despesa' THEN t.amount END) AS expenses,
            TOTAL(CASE WHEN t.type = 'receita' THEN t.amount END) - TOTAL(CASE WHEN t.type = 'despesa' THEN t.amount END) AS balance
            FROM TRANSACTIONS t
        `);

        return consults;
    }

    // Método para retornar a consulta de uma pessoa específica, com o total de receitas, despesas e saldo
    public async getConsultById(id: number): Promise<Consultation> {
        const db = await openDB();
        const personRegistered = await db.get(`SELECT * FROM PEOPLE WHERE id = ?`, id); // Consulta para verificar se a pessoa existe no banco de dados

        if(!personRegistered) { // caso não exista registro da pessoa no banco de dados, retorna um erro 404
            throw new AppError("Essa pessoa não está cadastrada!", 404);
        }

        // Consulta que retorna os dados da pessoa, com o total de receitas, despesas e o saldo líquido dela
        const consult = await db.get(` SELECT p.name, p.age, p.id,
                TOTAL(CASE WHEN t.type = 'receita' THEN t.amount END) AS receita,
                TOTAL(CASE WHEN t.type = 'despesa' THEN t.amount END) AS despesas,
                TOTAL(CASE WHEN t.type = 'receita' THEN t.amount END) - TOTAL(CASE WHEN t.type = 'despesa' THEN t.amount END) AS saldo
                FROM PEOPLE p
                LEFT JOIN TRANSACTIONS t ON p.id = t.person_id
                WHERE p.id = ?;
            `, id);
        return consult;   
    }
}

