import { Component, OnInit } from '@angular/core';
// import {TreeDiagram} from 'node_modules/angular2-tree-diagram';
@Component({
  selector: 'app-test-panel',
  templateUrl: './test-panel.component.html',
  styleUrls: ['./test-panel.component.css']
})
export class TestPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  data = {
    json: [
      {
        "guid": "bc4c7a02-5379-4046-92be-12c67af4295a",
        "displayName": "Elentrix",
        "children": [
          "85d412c2-ebc1-4d56-96c9-7da433ac9bb2",
          "28aac445-83b1-464d-9695-a4157dab6eac"
        ]
      }
    ],
    config: {
      nodeWidth: 100,
      nodeHeight: 50
    }
  }


showActualDataState()
{
  console.log(this.data);
}

}




