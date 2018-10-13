import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { ConversationDTO } from "src/app/shared/model/DTO/conversation.dto.model";

@Component({
  selector: 'app-conversation-add-dialog',
  templateUrl: './conversation-add-dialog.component.html',
  styleUrls: ['./conversation-add-dialog.component.css']
})
export class ConversationAddDialogComponent implements OnInit {

  form: FormGroup;
  description:string;
  name:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ConversationAddDialogComponent> ) {

      this.form = fb.group({
          description: [this.description, Validators.required],
          name: [this.name, Validators.required]
      });

  }

  ngOnInit() {

  }


  save() {
      var dto:ConversationDTO= new ConversationDTO();
      dto.name=this.form.value.name;
      dto.description=this.form.value.description;
      this.dialogRef.close(dto);
  }

  close() {
      this.dialogRef.close();
  }


}
