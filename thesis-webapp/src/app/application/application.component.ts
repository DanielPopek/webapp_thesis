import { Component, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { ApplicationListDataSource } from './application.datasource';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { Jsonp } from '@angular/http';
import { CommunicationService } from "src/app/shared/services/communication.service";
import { ApplicationDTO } from "src/app/shared/model/DTO/application.dto.model";
import { ApplicationDeleteDialogComponent } from "src/app/application-delete-dialog/application-delete-dialog.component";
import { ApplicationAddDialogComponent } from "src/app/application-add-dialog/application-add-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApplicationComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['name', 'description', 'date', 'lastModificationDate', 'token', 'conversations'];
  dataSource: ApplicationListDataSource;
  showData = false;

  TEMP_DESIGNER_ID: number = 1;

  constructor(private router: Router, public dialog: MatDialog, private communicationService: CommunicationService, private snackBar: MatSnackBar) { }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  ngOnInit() {

    this.refreshDataInList();

    if (localStorage.getItem('applications') != null) {
      this.dataSource = new ApplicationListDataSource(this.paginator, this.sort,
        JSON.parse(localStorage.getItem('applications')));
      this.showData = true;
    }
    else this.dataSource = new ApplicationListDataSource(this.paginator, this.sort, []);

    this.dataSource = new ApplicationListDataSource(this.paginator, this.sort, EXAMPLE_DATA);
  }

  refreshDataInList() {
    this.communicationService.getApplicationsByDeveloperHash().subscribe((data: any) => {
      console.log(data)
      this.showData = true;
      localStorage.setItem('applications', JSON.stringify(data));
      this.dataSource = new ApplicationListDataSource(this.paginator, this.sort, data);
    });
  }


  onDelete(application: ApplicationDTO) {
    console.log(application);
    this.openDeleteDialog(application);
  }

  onAdd() {
    this.openAddDialog();
  }

  onEditData(element) {
    this.openEditDialog(element);
  }

  openDeleteDialog(application: ApplicationDTO) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.hasBackdrop = false;
    dialogConfig.data = application;
    dialogConfig.height = '200px';
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(ApplicationDeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          console.log(data.token);
          this.communicationService.deleteApplicationByApplicationToken(data.token).subscribe((response: any) => {
            this.refreshDataInList();
            this.openSnackbar("Usunięto pozycję: " + data.name)
          },
            (err: HttpErrorResponse) => {
              console.log(err);
              this.openSnackbar('Podczas akcji wystąpił nieoczekiwany błąd')
            })
        }
      }
    );
  }

  openSnackbar(text) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.duration = 3000;
    config.panelClass = 'snackbar';
    this.snackBar.open(text, true ? 'Zamknij' : undefined, config);
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
  
    dialogConfig.hasBackdrop = false;
    dialogConfig.height = '400px';
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(ApplicationAddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.communicationService.saveNewApplication(data)
            .subscribe((response: any) => {
              console.log("Save endpoint called : " + response);
              this.refreshDataInList();
              this.openSnackbar("Dodano pozycję: " + data.name)
            },
            (err: HttpErrorResponse) => {
              console.log(err);
              this.openSnackbar('Podczas zapisu wystąpił nieoczekiwany błąd')
            })
        }
      }
    );
  }

openEditDialog(application:ApplicationDTO) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;

  dialogConfig.hasBackdrop = false;
  dialogConfig.height = '420px';
  dialogConfig.width = '400px';

  dialogConfig.data = application;
  const dialogRef = this.dialog.open(ApplicationAddDialogComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
    data => {
      if (data) {
        this.communicationService.editApplication(data)
          .subscribe((response: any) => {
            console.log("Save endpoint called : " + response);
            this.refreshDataInList();
            this.openSnackbar("Nadpisano pozycję: " + data.name)
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.openSnackbar('Podczas zapisu wystąpił nieoczekiwany błąd')
          })
      }
    }
  );
}
}

const EXAMPLE_DATA: ApplicationDTO[] = [
  {
    name: '--', active: true, description: '---', date: '2018-03-12',
    token: "Xi9WKcTUGxPof3q5OZyl6R0FDwMwCvw6test", lastModificationDate: '2018-03-12', conversations: [], hashes:[],designerConversationHashes:[],designerConversationNames:[]
  },
  {
    name: '--', active: true, description: '---', date: '2018-03-12',
    token: "Xi9WKcTUGxPof3q5OZyl6R0FDwMwCvw6test", lastModificationDate: '2018-03-12', conversations: [], hashes:[],designerConversationHashes:[],designerConversationNames:[]
  },
  {
    name: '--', active: true, description: '---', date: '2018-03-12',
    token: "Xi9WKcTUGxPof3q5OZyl6R0FDwMwCvw6test", lastModificationDate: '2018-03-12', conversations: [], hashes:[],designerConversationHashes:[],designerConversationNames:[]
  },
];
