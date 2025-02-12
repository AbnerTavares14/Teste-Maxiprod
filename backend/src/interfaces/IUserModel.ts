export interface IUserModel {
    create(user:User): Promise<void>;
    getUserById(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
    deleteUser(id: number): Promise<void>;
}

export interface User {
    id: number;
    name: string;
    idade: number;
};