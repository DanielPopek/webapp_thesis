import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ViewChild,OnInit  } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import * as d3 from 'd3';


export class Event
{
  name:string;
  message:string;
}

export class Intent
{
  id: number;
  parentId: number;
  level: number;
  name:string;
  answers:string[];
  trainingSamples:string[];
  event:Event;
  children:Intent[];
}


const TREE_DATA = {
  Location: {
    level1_sl1: {
      level2_sl1: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    level1_sl2: {
      level2_sl1: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  }
}



//////////////


@Injectable()
export class IntentStorage {

  dataChange = new BehaviorSubject<Intent[]>([]);

  get data(): Intent[] { return this.dataChange.value; }

  parentNodeMap = new Map<Intent, Intent>();

  constructor() {
    this.initialize();
  }



  treeData = [{ "id": 0, "level": 0, "name": "root", "parentId": null, "event":null, "answers":["answer1","answer2","answer3"],"trainingSamples":["train1","train2"], "children": [{ "id": 1.1, "level": 1, "name": "child1", "parentId": 0, "event":null, "answers":["answer1","answer2","answer3"],"trainingSamples":["train1","train2"], "children": [] }] }] as Intent[];
  initialize() {
    // Parse the string to json object.
    const dataObject = TREE_DATA;
    const fakeDataObjecct = { Location: {} }

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    // input as array

    //const data = this.buildFileTree(fakeDataObjecct, 0);
    const data = this.treeData;
    console.log(this.data);

    //this.populateParentMap(this.treeData);

    // Notify the change.
    this.dataChange.next(data);
  }


  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): Intent[] {
    // @pankaj This should recive Root node of Tree of Type FileNode
    // so we dont have to create a new node and use it as it is
    //console.log(obj);
    return Object.keys(obj).reduce<Intent[]>((accumulator, key) => {
      // console.log(key);
      const value = obj[key];
      const node = new Intent();
      node.id = level;

      node.level = level;
      node.name = key;
      node.parentId = null;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
         // node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item Tree node */
  public insertItem(parent: Intent, name: string) {
    if (parent.children) {
      //console.log("insert ")

      //if (parent.type !== 'SECTION') {
        let newNode: Intent;
        newNode = new Intent();
        newNode.name = name;
        newNode.children = [];
        newNode.answers=[];
        newNode.trainingSamples=[];
        newNode.level = parent.level + 1;
        console.log(newNode.level);
        newNode.parentId = parent.id;
        newNode.id = newNode.level + ((parent.children.length + 1) / 10.0);


        console.log(parent.children.length);
        console.log(newNode.id);

        parent.children.push(newNode);
        this.parentNodeMap.set(newNode, parent);
        //console.log(newNode);

      //} else {
        console.log("No More Nodes can be inserted");
      //}
      //this.dataChange.next(this.data);
    }

  }
  public removeItem(currentNode: Intent, root: Intent) {
    //const parentNode = this.parentNodeMap.get(currentNode);
    const parentNode = this.findParent(currentNode.parentId, root);
    console.log("parentNode " + JSON.stringify(parentNode))
    const index = parentNode.children.indexOf(currentNode);
    if (index !== -1) {
      parentNode.children.splice(index, 1);
      this.dataChange.next(this.data);
      this.parentNodeMap.delete(currentNode);
    }
    console.log("currentNode" + index);

  }
  updateItem(node: Intent, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }
  public findParent(id: number, node: any): any {

    console.log("id " + id + " node" + node.id);
    if (node != undefined && node.id === id) {
      return node;
    } else {
      console.log("ELSE " + JSON.stringify(node.children));
      for (let element in node.children) {
        console.log("Recursive " + JSON.stringify(node.children[element].children));
        if (node.children[element].children != undefined && node.children[element].children.length > 0) {
          return this.findParent(id, node.children[element]);
        } else {
          continue;
        }


      }

    }


  }

}

///////////////////COMPONENT START 


@Component({
  selector: 'app-design-panel',
  templateUrl: './design-panel.component.html',
  styleUrls: ['./design-panel.component.css'],
  providers: [IntentStorage]
})
export class DesignPanelComponent implements OnInit {



  @ViewChild('treeSelector') tree: any;
  
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
  
  
    constructor(public database: IntentStorage) {
      this.nestedTreeControl = new NestedTreeControl<Intent>(this._getChildren);
      this.nestedDataSource = new MatTreeNestedDataSource();
      database.dataChange.subscribe(data => this.nestedDataSource.data = data);
    }

    ngOnInit() {
      this.loadTreeDiagram();
    }
  
    //hasNestedChild = (_: number, nodeData: Intent) => !nodeData.type;
  
    private _getChildren = (node: Intent) => node.children;
    /** Select the category so we can insert the new item. */
    addNewItem(node: Intent) {
      this.database.insertItem(node, 'new item');
      //this.tree.renderNodeChanges(this.database.data);
      this.nestedTreeControl.expand(node);
      //console.log(this.nestedTreeControl);
  
      this.renderChanges()
      this.getTree();
      this.loadTreeDiagram();
    }
  
    public remove(node: Intent) {
      console.log("currentNode");
  
      this.database.removeItem(node, this.database.data[0]);
      this.renderChanges()
      this.getTree();
      this.loadTreeDiagram();
    }
  
    renderChanges() {
      let data = this.nestedDataSource.data;
      this.nestedDataSource.data = null;
      this.nestedDataSource.data = data;
  
    }
  
    getTree() {
      console.log(JSON.stringify(this.database.data));
    }
  
    check() {
      console.log("parent ", JSON.stringify(this.database.findParent(3.1, this.database.data[0])));
    }

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

    //D3////////////////////////
    ///D3 JS methods

    loadTreeDiagram()
    {
      this.treeData = this.nestedDataSource.data[0];
      this.setData();
      this.currentNode = this.root;
    }

    setData() {
      this.margin = { top: 0, right: 0, bottom: 30, left: 0 };
      this.width = 960 - this.margin.left - this.margin.right;
      this.height = 700 - this.margin.top - this.margin.bottom;
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
        .text((d) => { return d.data.name; });
  
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
