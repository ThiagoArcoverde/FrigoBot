export default class user {
    public redmineKey: string;
    public discordID: string;
    public project: string;

    constructor(redmineKey: string, discordID: string) {
        this.redmineKey = redmineKey;
        this.discordID = discordID;
        this.project = '';
    }

}