import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ViewChild,OnInit  } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import * as d3 from 'd3';
import { IntentStorage } from "src/app/shared/storage/intent.storage";
import { Intent } from "src/app/shared/model/inner/intent.model";
import { CommunicationService } from "src/app/shared/services/communication.service";
import { IntentDTO } from "src/app/shared/model/DTO/intent.dto.model";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { ChatboxComponent } from "src/app/chatbox/chatbox.component";
import { Input } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";


@Component({
  selector: 'app-design-panel',
  templateUrl: './design-panel.component.html',
  styleUrls: ['./design-panel.component.css'],
  providers: [IntentStorage,CommunicationService]
})
export class DesignPanelComponent implements OnInit {

   TEMP_CONV_ID:string='Xi9WKcTUGxPof3q5OZyl6R0FDwMwCvw6test'; 
   hash;
   current;

   @Input() chatbox: ChatboxComponent;

  @ViewChild('treeSelector') tree: any;
  @ViewChild('sidenav') sidenav: MatSidenav;
  
    nestedTreeControl: NestedTreeControl<Intent>;
    nestedDataSource: MatTreeNestedDataSource<Intent>;


  //for D3 js purposes 
  //TODO FILTER !!!!
  dataList: any;
  margin: any;
  width: number;
  height: number;
  svg: any;
  duration: number;
  root: any;
  treeD3:any;
  treeData: any;
  nodes: any;
  links: any;
  currentNode: any;
  currentLabel: string;
  //for D3 js purposes 
  
  
    constructor(public database: IntentStorage, private communicationService: CommunicationService,  private router: Router,
      private route: ActivatedRoute, private snackBar:MatSnackBar) {
      this.nestedTreeControl = new NestedTreeControl<Intent>(this._getChildren);
      this.nestedDataSource = new MatTreeNestedDataSource();
      database.dataChange.subscribe(data => this.nestedDataSource.data = data);
      this.current=this.nestedDataSource.data[0];
    }

    ngOnInit() {

      
      this.hash = this.route.snapshot.paramMap.get('conversationHash');
      console.log(this.hash);

      this.communicationService.getIntentByCommunicationHash(this.hash).subscribe((data: IntentDTO) => {
        console.log(data)
        console.log(this.database.convertDTOtoIntent(data));
        this.database.readData(this.database.convertDTOtoIntent(data));
        this.loadTreeDiagram();
      });
      
    }

    saveConversation()
    {
      this.communicationService.saveRootIntentByConversationHash(this.hash,this.database.getStorageAsDTO()).subscribe((data) => {
        console.log(data)
        this.openSnackbar('Konwersacja została poprawnie zapisana w bazie danych')
      });
    }

    toConversations(){
      this.router.navigate(['/conversation']);
    }


    private _getChildren = (node: Intent) => node.children;

    setCurrentNode(node)
    {
      this.current=node;
      this.sidenav.toggle();
    }

    //TODO -IMPORVE UPDATE !!!
    update()
    {
      this.renderChanges()
      this.getTree();
      this.loadTreeDiagram();
    }

    addNewItem(node: Intent) {
      this.database.insertItem(node, 'new item');
      this.nestedTreeControl.expand(node);
      this.update();
    }
  
    public remove(node: Intent) {
      console.log("currentNode");
      this.database.removeItem(node, this.database.data[0]);
      this.update();
    }
  
    renderChanges() {
      let data = this.nestedDataSource.data;
      this.nestedDataSource.data = null;
      this.nestedDataSource.data = data;
  
    }
  
    getTree() {
      console.log(JSON.stringify(this.database.data));
      console.log(this.treeData);
    }
  
    // check() {
    //   console.log("parent ", JSON.stringify(this.database.findParent(3.1, this.database.data[0])));
    // }

    addAnswer(node:Intent, newAnswer: string) {
      if (newAnswer&&!node.answers.includes(newAnswer)) {
        node.answers.push(newAnswer);
      }
    }

    removeAnswer(node:Intent, toRemove: string) {
     for (var i=node.answers.length-1; i>=0; i--) {
      if (node.answers[i] === toRemove) {
        node.answers.splice(i, 1);
           break; 
      }
    }
    }

    addSample(node:Intent, newSample: string) {
      if (newSample&&!node.trainingSamples.includes(newSample)) {
        node.trainingSamples.push(newSample);
      }
    }

    removeSample(node:Intent, toRemove: string) {
     for (var i=node.trainingSamples.length-1; i>=0; i--) {
      if (node.trainingSamples[i] === toRemove) {
        node.trainingSamples.splice(i, 1);
           break; 
        }
      }
    }

    addEvent(node:Intent, newEvent: string) {
      if (newEvent&&!node.events.includes(newEvent)) {
        node.events.push(newEvent);
      }
    }

    removeEvent(node:Intent, toRemove: string) {
     for (var i=node.events.length-1; i>=0; i--) {
      if (node.events[i] === toRemove) {
        node.events.splice(i, 1);
           break; 
        }
      }
    }

    addMisunderstandingStatement(node:Intent, newSample: string) {
      if (newSample&&!node.misunderstandingStatements.includes(newSample)) {
        node.misunderstandingStatements.push(newSample);
      }
    }

    removeMisunderstandingStatement(node:Intent, toRemove: string) {
     for (var i=node.misunderstandingStatements.length-1; i>=0; i--) {
      if (node.misunderstandingStatements[i] === toRemove) {
        node.misunderstandingStatements.splice(i, 1);
           break; 
      }
    }
    }


    openSnackbar(text) {
      let config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.duration = 3000;
      config.panelClass ='snackbar' ;
      this.snackBar.open(text, true?'Zamknij':undefined, config);
    }
    ///D3////////////////////////
    ///D3JS methods

    loadTreeDiagram()
    {
      this.treeData = this.nestedDataSource.data[0];
      this.currentNode = this.root;
      this.setData();

    }

    setData() {
      this.margin = { top: 0, right: 0, bottom: 30, left: 0 };
      this.width = 1860 - this.margin.left - this.margin.right;
      this.height = 500 - this.margin.top - this.margin.bottom;
      d3.select("svg").remove();
      d3.select("#chart").append("svg");
      this.svg = d3.select('svg')
        .attr('width', this.width + this.margin.right + this.margin.left)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  
      this.duration = 750;
  
      // declares a tree layout and assigns the size
      this.treeD3 = d3.tree()
        .size([this.height, this.width]);
  
      // Assigns parent, children, height, depth
      this.root = d3.hierarchy(this.treeData, (d) => { return d.children; });
      this.root.x0 = this.height / 2;
      this.root.y0 = 10;
  
      this.updateChart(this.root);
    }
  
    click=function(d) {
      // console.log('click');
      // console.log(d);
      // if (d.children) {
      //   d._children = d.children;
      //   d.children = null;
      // } else {
      //   d.children = d._children;
      //   d._children = null;
      // }
      // this.currentNode = d;
      // this.currentLabel = this.currentNode.data.name;
      // this.updateChart(d);
      // console.log(this.currentNode.data.name);
      // console.log(this.currentLabel);
      //var currentNodeLabel=document.getElementById("title");
      //currentNodeLabel.innerHTML=this.currentNode.data.name;
      //console.log(this.currentNode.data.name)
    }.bind(this);
  
  
    checkCurrentNode()
    {
      console.log(this.currentNode.data.name);
      console.log(this.currentLabel);
    }
  
  
    updateChart(source) {
      let i = 0;
      // console.log(source);
      this.treeData = this.treeD3(this.root);
      this.nodes = this.treeData.descendants();
      this.links = this.treeData.descendants().slice(1);
      this.nodes.forEach((d) => { d.y = d.depth * 180 });
  
      let node = this.svg.selectAll('g.node')
        .data(this.nodes, (d) => { return d.id || (d.id = ++i); });
  
      let nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d) => {
          return 'translate(' + source.y0 + ',' + source.x0 + ')';
        })
        .on('click', this.click);
  
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', (d) => {
          return d._children ? 'lightsteelblue' : '#fff';
        });
  
      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', (d) => {
          return d.children || d._children ? -13 : 13;
        })
        .attr('text-anchor', (d) => {
          return d.children || d._children ? 'end' : 'start';
        })
        .style('font', '12px sans-serif')
        .text((d) => { return d.data.id+' '+d.data.name; });
  
      let nodeUpdate = nodeEnter.merge(node);
  
      nodeUpdate.transition()
        .duration(this.duration)
        .attr('transform', (d) => {
          return 'translate(' + d.y + ',' + d.x + ')';
        });
  
      nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('stroke-width', '3px')
        .style('stroke', '#4b9831')
        .style('fill', (d) => {
          return d._children ? 'lightsteelblue' : '#fff';
        })
        .attr('cursor', 'pointer');
  
      let nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr('transform', (d) => {
          return 'translate(' + source.y + ',' + source.x + ')';
        })
        .remove();
  
      nodeExit.select('circle')
        .attr('r', 1e-6);
  
      nodeExit.select('text')
        .style('fill-opacity', 1e-6);
  
      let link = this.svg.selectAll('path.link')
        .data(this.links, (d) => { return d.id; });
  
      let linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-width', '2px')
        .attr('d', function (d) {
          let o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });
  
      let linkUpdate = linkEnter.merge(link);
  
      linkUpdate.transition()
        .duration(this.duration)
        .attr('d', (d) => { return diagonal(d, d.parent); });
  
      let linkExit = link.exit().transition()
        .duration(this.duration)
        .attr('d', function (d) {
          let o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();
  
      this.nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
      function diagonal(s, d) {
        let path = `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
        return path;
      }
    }

}
