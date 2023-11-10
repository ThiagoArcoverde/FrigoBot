export interface command{
    commandInfo: {name: string, description: string, options?: [{name: string, description: string, type: number, required: boolean}]}
    invokeCommand(app: any): void
}