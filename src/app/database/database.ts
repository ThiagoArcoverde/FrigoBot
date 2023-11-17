import * as fs from 'fs';
import * as path from 'path';

export class database {
    private static basePath = './data/';

    static save(dbName: string, key: string, value: any): void {
        const filePath = this.getFilePath(dbName);

        // Verificar se o diretório existe, se não, criá-lo
        const directory = path.dirname(filePath);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        let data = this.loadData(filePath);

        data[key] = value;

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`Salvando dados no banco ${dbName} com chave ${key}:`, value);
    }

    static load(dbName: string, key: string): any {
        const filePath = this.getFilePath(dbName);
        const data = this.loadData(filePath);

        const value = data[key];
        //console.log(`Carregando dados do banco ${dbName} com chave ${key}:`, value);
        return value;
    }

    static update(dbName: string, key: string, value: any): void {
        const filePath = this.getFilePath(dbName);
        let data = this.loadData(filePath);

        if (data[key]) {
            data[key] = { ...data[key], ...value };
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Atualizando dados no banco ${dbName} com chave ${key}:`, data[key]);
        } else {
            console.error(`Chave ${key} não encontrada para atualização no banco ${dbName}.`);
        }
    }

    static delete(dbName: string, key: string): void {
        const filePath = this.getFilePath(dbName);
        let data = this.loadData(filePath);

        if (data[key]) {
            delete data[key];
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Deletando dados no banco ${dbName} com chave ${key}`);
        } else {
            console.error(`Chave ${key} não encontrada para exclusão no banco ${dbName}.`);
        }
    }

    public static getFilePath(dbName: string): string {
        return `${database.basePath}${dbName}.json`;
    }

    private static loadData(filePath: string): any {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(fileContent) || {};
        } catch (error) {
            // Se o arquivo não existe, retorna um objeto vazio
            return {};
        }
    }
}