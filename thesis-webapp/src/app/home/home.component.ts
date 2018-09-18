import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from "src/app/ngmaterial.module";
import { Supervisor } from "src/app/shared/model/supervisor.model";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialAppModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialAppModule
  ]
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
supervisor:Supervisor= new Supervisor();

  // constructor() { }
  constructor(private router: Router){}
  open: boolean = false;

  ngOnInit() {
    // this.supervisorService.getSupervisorInfo()
    // .subscribe((data) => {  
    //   console.log('Response ', data);
    //   this.supervisor=data as Supervisor;
    // }, (error) => {
    //   console.log('Error! ', error);
    // });

  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  


  
  

}
