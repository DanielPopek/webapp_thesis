
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommunicationService } from "src/app/shared/services/communication.service";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Input } from "@angular/core";

// const randomMessages = [
//   'OK',
//   'SUPER',
//   ':)'
// ];
// const rand = max => Math.floor(Math.random() * max);
// const getRandomMessage = () => randomMessages[rand(randomMessages.length)];

const INITIAL_CONTEXT:any={
  "intentHash":"",
  "message": "",
  "events": [],
  "data": null
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  @ViewChild('message') message: ElementRef;
  @ViewChild('bottom') bottom: ElementRef;

  @Input() conversationHash: number;

  visible = false;
  context:any;

  operator = {
    name: 'Chatrooster',
    status: 'online',
    avatar: `../../../assets/images/logo/logo2.png`
  };

  client = {
    name: 'JA',
    status: 'online',
    avatar: `../../../assets/images/avatar/img_avatar.png`
  };

  messages = [];

  constructor(private communicationService:CommunicationService, private snackBar:MatSnackBar) {}

  ngOnInit() {
    this.context=INITIAL_CONTEXT;
    setTimeout(() => {
      this.addMessage(
        this.operator,
        'Próbne okno czatu. Możesz przetestować moje zachowanie :)',
        'received'
      );
    }, 1500);
    console.log(this.conversationHash)
  }

  reset()
  {
    this.messages=[]
    this.context=INITIAL_CONTEXT;
  }

  openSnackbar(text) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.duration = 2500;
    config.panelClass ='snackbar' ;
    this.snackBar.open("Zdarzenia: "+text, true?'Zamknij':undefined, config);
  }

  hey(text)
  {
    console.log(text);
  }

  addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime()
    });
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView();
    }
  }

  // randomMessage() {
  //   this.addMessage(this.operator, getRandomMessage(), 'received');
  // }

  sendMessage({ message }) {
    if (message.trim() === '') {
      return;
    }
    this.addMessage(this.client, message, 'sent');
    // setTimeout(() => this.randomMessage(), 1000);
    this.context.message=message;
    this.communicationService.getResponse(this.context,this.conversationHash).subscribe((data) => {
      console.log(data)
      this.context=data;
      this.addMessage(this.operator, this.context.message, 'received');
      if(this.context.events!=null)
        {
        //   for (let entry of this.context.events) {
        //     this.openSnackbar(entry)
        //  }
        this.openSnackbar(this.context.events)
        }
    });
  }

  toggleChat() {
    this.visible = !this.visible;
  }

  onSubmit() {
    const message = this.getMessage();
    if (message.trim() === '') {
      return;
    }

    this.sendMessage({ message });
    this.clearMessage();
    this.focusMessage();
  }

  getMessage() {
    return this.message.nativeElement.value;
  }

  focusMessage() {
    this.message.nativeElement.focus();
  }

  clearMessage() {
    this.message.nativeElement.value = '';
  }
}