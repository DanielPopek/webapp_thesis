import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ApplicationDTO } from "src/app/shared/model/DTO/application.dto.model";

@Component({
  selector: 'app-application-add-dialog',
  templateUrl: './application-add-dialog.component.html',
  styleUrls: ['./application-add-dialog.component.css']
})
export class ApplicationAddDialogComponent implements OnInit {

  form: FormGroup;
  description:string;
  name:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ApplicationAddDialogComponent> ) {

      this.form = fb.group({
          description: [this.description, Validators.required],
          name: [this.name, Validators.required]
      });

  }

  ngOnInit() {

  }


  save() {
      var dto:ApplicationDTO= new ApplicationDTO();
      dto.name=this.form.value.name;
      dto.description=this.form.value.description;
      this.dialogRef.close(dto);
  }

  close() {
      this.dialogRef.close();
  }
}
