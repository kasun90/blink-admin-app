import { MessageStatus } from './message-status.enum';

export class Message {
    private data: {[x: string]: any} = {};
    private status: MessageStatus;

    public static fromJSON(jsonStr: string): Message {
        const message = new Message();
        message.setData(JSON.parse(jsonStr));
        return message;
    }

    constructor(type: string = '') {
        this.data._type = type;
    }

    public set(key: string, obj: any) {
        this.data[key] = obj;
    }

    public setData(_data: any) {
        this.data = _data;
    }

    public get(key: string): any {
        return this.data[key];
    }

    public getType(): string {
        return this.data._type;
    }

    public toJSON(): string {
        return JSON.stringify(this.data);
    }

    public ok() {
        this.status = MessageStatus.OK;
    }

    public failed() {
        this.status = MessageStatus.FAILED;
    }

    public isOK(): boolean {
        return this.status === MessageStatus.OK;
    }
}
