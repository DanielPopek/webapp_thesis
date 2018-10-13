
import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConversationListDataSource } from './conversation.datasource';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { Jsonp } from '@angular/http';
import { CommunicationService } from "src/app/shared/services/communication.service";
import { ConversationDTO } from "src/app/shared/model/DTO/conversation.dto.model";
import { ConversationDeleteDialogComponent } from "src/app/conversation-delete-dialog/conversation-delete-dialog.component";
import { ConversationAddDialogComponent } from "src/app/conversation-add-dialog/conversation-add-dialog.component";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConversationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['id', 'name', 'description'];
  dataSource: ConversationListDataSource;
  showData = false;

  TEMP_DESIGNER_ID:number=1; 

  constructor(private router: Router, public dialog: MatDialog, private communicationService: CommunicationService) { }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  ngOnInit() {

    this.communicationService.getConversationsByDeveloperId(this.TEMP_DESIGNER_ID).subscribe((data: any) => {
      console.log(data)
      this.showData = true;
      localStorage.setItem('conversations', JSON.stringify(data));
      this.dataSource = new ConversationListDataSource(this.paginator, this.sort, data);
    });

    if (localStorage.getItem('conversations') != null) {
      this.dataSource = new ConversationListDataSource(this.paginator, this.sort,
        JSON.parse(localStorage.getItem('conversations')));
      this.showData = true;
    }
    else this.dataSource = new ConversationListDataSource(this.paginator, this.sort, []);

    //this.dataSource = new ConversationListDataSource(this.paginator, this.sort, EXAMPLE_DATA);
  }

  refreshDataInList()
  {
    this.communicationService.getConversationsByDeveloperId(this.TEMP_DESIGNER_ID).subscribe((data: any) => {
      console.log(data)
      this.showData = true;
      localStorage.setItem('conversations', JSON.stringify(data));
      this.dataSource = new ConversationListDataSource(this.paginator, this.sort, data);
    });
  }


  onDelete(conversation: ConversationDTO) {
    console.log(conversation);
    this.openDeleteDialog(conversation);
  }

  onEdit(conversation: any)
  {
    conversation = conversation.element;

    console.log(conversation);
    this.router.navigate(['/panel/' + conversation.conversationHash]);
  }

  onAdd()
  {
    this.openAddDialog();
  }

  openDeleteDialog(conversation: ConversationDTO) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '200px',
      left: '600px',
      right: '100px',
    };

    dialogConfig.hasBackdrop = false;

    // dialogConfig.data = {
    //   conversation: conversation
    // };
    dialogConfig.data = conversation;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';

    const dialogRef =this.dialog.open(ConversationDeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data =>{this.refreshDataInList();}
  );  
  }


  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '200px',
      left: '600px',
      right: '100px',
    };

    dialogConfig.hasBackdrop = false;

    // dialogConfig.data = {
    //   conversation: conversation
    // };

    //dialogConfig.data = conversation;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';

    const dialogRef =this.dialog.open(ConversationAddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => 
      {if(data)
        {this.communicationService.saveNewConversation(data).subscribe(response=>{
        console.log("Save endpoint called : "+response);
        this.refreshDataInList();
      })}}
  );  
  }


}




const EXAMPLE_DATA: ConversationDTO[] = [
  {
    conversationId: 1, name: '--', description: '---', root: null,
    conversationHash: "Xi9WKcTUGxPof3q5OZyl6R0FDwMwCvw6test",
  },
  {
    conversationId: 2, name: '-sada-', description: '---', root: null,
    conversationHash: "Xi9WKcTUGxPof3q5OZyl6R0FDwMwCvw6test",
  },
  {
    conversationId: 3, name: '-dsadsa-', description: '---', root: null,
    conversationHash: "Xi9WKcTUGxPof3q5OZyl6R0FDwMwCvw6test",
  },
];
