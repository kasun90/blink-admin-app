import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Message } from './message';
import { HttpClient, HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private adminURL = 'http://localhost:3000/admin';
  private targetUser: string;

  constructor(private httpClient: HttpClient) { }

  send(message: Message): Observable<Message> {
    const params = new URLSearchParams();
    params.append('target', 'ADMIN');
    params.append('targetUser', this.targetUser);
    params.append('message', message.toJSON());
    return this.httpClient.post(this.adminURL, params.toString(), httpOptions)
    .pipe(catchError(this.handleError()), map((result, number): Message => {
      if (result instanceof Message) {
        return result;
      }
      const replymessage = new Message();
      replymessage.setData(result);
      replymessage.ok();
      return replymessage;
    }));
  }

  setSessionID(sessionID: string) {
    httpOptions.headers = httpOptions.headers.append('X-App-Session', sessionID);
  }

  setTargetUser(targetUser: string) {
    this.targetUser = targetUser;
  }

  private handleError () {
    return (error: any): Observable<Message> => {
      console.error(error); // log to console instead
      const msg = new Message('');
      msg.failed();
      return of(msg);
    };
  }
}
