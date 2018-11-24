import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup } from "@angular/forms/src/forms";
import { FormBuilder } from "@angular/forms/src/form_builder";
import { CommunicationService } from "src/app/shared/services/communication.service";
import { ApplicationDTO } from "src/app/shared/model/DTO/application.dto.model";

@Component({
  selector: 'app-application-delete-dialog',
  templateUrl: './application-delete-dialog.component.html',
  styleUrls: ['./application-delete-dialog.component.css']
})
export class ApplicationDeleteDialogComponent implements OnInit {

  application: ApplicationDTO;
  header:string;
  id:number;

  constructor(
      private communicationService: CommunicationService,
      private dialogRef: MatDialogRef<ApplicationDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
      this.application = data.element;
      this.header = data.element.name;
  }

  ngOnInit() {
    console.log(this.application);
  }

  delete() {
      // this.communicationService.deleteApplicationByApplicationToken(this.application.token).subscribe((data: any) => {});
   this.dialogRef.close(this.application);
  }

  close() {
      this.dialogRef.close(null);
  }
}
