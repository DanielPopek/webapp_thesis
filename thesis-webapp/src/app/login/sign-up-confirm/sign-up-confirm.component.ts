import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sign-up-confirm',
  templateUrl: './sign-up-confirm.component.html',
  styleUrls: ['./sign-up-confirm.component.css']
})
export class SignUpConfirmComponent implements OnInit {

  fieldEmail='abc@abc.com';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.fieldEmail=this.route.snapshot.paramMap.get('email');
  }

}
