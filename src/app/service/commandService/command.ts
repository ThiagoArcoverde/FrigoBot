export interface command{
    commandInfo: {name: string, description: string}
    invokeCommand(app: any): void
}