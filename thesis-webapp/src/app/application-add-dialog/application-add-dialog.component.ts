import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ApplicationDTO } from "src/app/shared/model/DTO/application.dto.model";
import { FormControl } from "@angular/forms";
import { CommunicationService } from "src/app/shared/services/communication.service";

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
  application: ApplicationDTO;


  selectionsList: string[] = [];
  hashesList:string[]=[];

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ApplicationAddDialogComponent>,
      private communicationService: CommunicationService,
      @Inject(MAT_DIALOG_DATA) data ) {
     
      if(data)
        {
            this.application=data.element;
            this.selections.setValue(this.application.conversations);
            this.name=this.application.name;
            this.description=this.application.description;
        }
      this.form = fb.group({
          description: [this.description, Validators.required],
          name: [this.name, Validators.required]
      });

  }



  ngOnInit() {

    this.communicationService.getConversationsNamesByDeveloperHash().subscribe((data: any) => {
        console.log(data);
        this.selectionsList=data.names;
        this.hashesList=data.hashes;
      });

  }


  save() {
      console.log(this.selections.value);
      var dto:ApplicationDTO= new ApplicationDTO();
      if(this.application)
        {
            dto.token=this.application.token;
        }
      dto.name=this.form.value.name;
      dto.description=this.form.value.description;
      var resultHashes=[];
      this.selections.value.forEach(element => {
          resultHashes.push(this.hashesList[this.selectionsList.indexOf(element)]);
      });
      dto.hashes=resultHashes;
      this.dialogRef.close(dto);
  }

  close() {
      this.dialogRef.close();
  }
}
