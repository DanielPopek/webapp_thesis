import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged: boolean = localStorage.getItem('userToken') != null;
  constructor(private router: Router) { }

  ngOnInit() {
    // this.isLogged=localStorage.getItem('userToken')!=null;
  }

  logout() {
    localStorage.removeItem('userToken');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}
