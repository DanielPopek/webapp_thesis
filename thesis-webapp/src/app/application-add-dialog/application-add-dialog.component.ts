import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ApplicationDTO } from "src/app/shared/model/DTO/application.dto.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-application-add-dialog',
  templateUrl: './application-add-dialog.component.html',
  styleUrls: ['./application-add-dialog.component.css']
})
export class ApplicationAddDialogComponent implements OnInit {

  form: FormGroup;
  description:string;
  name:string;
  selections = new FormControl();

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ApplicationAddDialogComponent> ) {

      this.form = fb.group({
          description: [this.description, Validators.required],
          name: [this.name, Validators.required]
      });

  }


  selectionsList: string[] = ['Extra cheese', 'Mushroom','Mushroom','Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  ngOnInit() {

  }


  save() {
      console.log(this.selections.value);
      var dto:ApplicationDTO= new ApplicationDTO();
      dto.name=this.form.value.name;
      dto.description=this.form.value.description;
      this.dialogRef.close(dto);
  }

  close() {
      this.dialogRef.close();
  }
}
