import user from '../model/user';
import { database } from './database';

export default class UserDB {
    private static tableName = 'tbUser';

    static saveUser(key: string, value: any): void {
        database.save(`${UserDB.tableName}/${key}`, key, value);
    }

    static loadUser(key: string): user | undefined {
        return database.load(`${UserDB.tableName}/${key}`, key);
    }

    static updateUser(key: string, value: any): void {
        database.update(`${UserDB.tableName}/${key}`, key, value);
    }

    static deleteUser(key: string): void {
        database.delete(`${UserDB.tableName}/${key}`, key);
    }
}