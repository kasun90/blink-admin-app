export class UserMessage {
    name: string;
    message: string;
    email: string;
    phone: string;
    timestamp: number;

    constructor(name: string, message: string, email: string, phone: string, timestamp: number) {
        this.name = name;
        this.message = message;
        this.email = email;
        this.phone = phone;
        this.timestamp = timestamp;
    }
}
