import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
 
@Injectable({providedIn: 'root'})
export class ChatService {

    private url = 'http://localhost:4558';
 
    constructor(private socket: Socket) { }
 
    sendMessage(msg: string, method: string){
      console.log('^sendMessage()')
        this.socket.emit(method, msg);
    }

    getMessage(method) {
      console.log('^getMessage', method)
      let observable = new Observable(observer => {
        this.socket = io(this.url);
        this.socket.on(method, (data) => {
          observer.next(data);    
        });
        return () => {
          this.socket.disconnect();
        };  
      })     
      return observable;
    }
    
}