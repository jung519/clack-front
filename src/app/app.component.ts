import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat/chat.service';

const ConnectionMethod = {
  message: false,
  testSocket: false
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clack-front';
  messages
  connection
  method

  constructor(private chatService: ChatService) {}


  clickBtn (method) {
    this.method = method
    ConnectionMethod[method] = true
    switch (method) {
      case 'message':
        ConnectionMethod[method] && (this.getMessage())
        this.chatService.sendMessage('Hi!', method)
        break;
      case 'testSocket':
        ConnectionMethod[method] && (this.getMessage())
        this.chatService.sendMessage('test!', method)    
        break;
    
      default:
        break;
    }
  }

  getMessage() {
    this.chatService.getMessage(this.method).subscribe(message => {
      console.log('getMessage =>', message)
      this.messages = message
    })
  }
}
