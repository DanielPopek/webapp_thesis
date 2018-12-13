import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'layout-container',
    '[class.layout-strategy]': 'scrollStrategy === "strategy"'
  }
})
export class BaseLayoutComponent implements OnInit {
  @Input() scrollStrategy;
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'base-layout-header',
  template: '<ng-content></ng-content>',
  host: {
    class: 'base-layout-header'
  }
})
export class BaseLayoutHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: 'base-layout-content',
  template: '<ng-content></ng-content>',
  host: {
    class: 'base-layout-content'
  }
})
export class BaseLayoutContentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
