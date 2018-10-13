
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup } from "@angular/forms/src/forms";
import { FormBuilder } from "@angular/forms/src/form_builder";
import { CommunicationService } from "src/app/shared/services/communication.service";
import { ConversationDTO } from "src/app/shared/model/DTO/conversation.dto.model";


@Component({
  selector: 'app-conversation-delete-dialog',
  templateUrl: './conversation-delete-dialog.component.html',
  styleUrls: ['./conversation-delete-dialog.component.css']
})
export class ConversationDeleteDialogComponent implements OnInit {

  conversaton: ConversationDTO;
  header:string;
  id:number;

  constructor(
      private communicationService: CommunicationService,
      private dialogRef: MatDialogRef<ConversationDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
      this.conversaton = data.element;
      this.header = data.element.name;
  }

  ngOnInit() {
    console.log(this.conversaton);
  }

  delete() {
      this.communicationService.deleteConversationByConversationHash(this.conversaton.conversationHash).subscribe((data: any) => {
    });
   this.dialogRef.close(null);
  }

  close() {
      this.dialogRef.close(null);
  }

}
