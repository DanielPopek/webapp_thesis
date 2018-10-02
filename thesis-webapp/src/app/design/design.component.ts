
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ViewChild,OnInit  } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';


export enum LocationConstants {
  WAREHOUSE = "WAREHOUSE", ROOM = "ROOM", SECTION = "SECTION"
}

export class FileNode {
  id: number;
  parentId: number;
  filename: string;
  type: LocationConstants;
  level: number;
  children: FileNode[];

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

@Injectable()
export class FileDatabase {

  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  parentNodeMap = new Map<FileNode, FileNode>();

  constructor() {
    this.initialize();
  }



  treeData = [{ "id": 0, "type": LocationConstants.WAREHOUSE, "level": 0, "filename": "Location", "parentId": null, "children": [{ "filename": "new item 1", "children": [], "level": 1, "parentId": 0, "id": 1.1 }] }] as FileNode[];
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
  buildFileTree(obj: object, level: number): FileNode[] {
    // @pankaj This should recive Root node of Tree of Type FileNode
    // so we dont have to create a new node and use it as it is
    //console.log(obj);
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      // console.log(key);
      const value = obj[key];
      const node = new FileNode();
      node.id = level;

      node.level = level;
      node.filename = key;
      node.parentId = null;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item Tree node */
  public insertItem(parent: FileNode, name: string) {
    if (parent.children) {
      //console.log("insert ")

      //if (parent.type !== 'SECTION') {
        let newNode: FileNode;
        newNode = new FileNode();
        newNode.filename = name;
        newNode.children = [];
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
  public removeItem(currentNode: FileNode, root: FileNode) {
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
  updateItem(node: FileNode, name: string) {
    node.filename = name;
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






@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
  providers: [FileDatabase]
})
export class DesignComponent  {

  // constructor() { }

  // ngOnInit() {
  // }

  @ViewChild('treeSelector') tree: any;
  
    nestedTreeControl: NestedTreeControl<FileNode>;
    nestedDataSource: MatTreeNestedDataSource<FileNode>;
  
    //
    locationType = Object.keys(LocationConstants);
  
  
    constructor(public database: FileDatabase) {
      this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
      this.nestedDataSource = new MatTreeNestedDataSource();
  
      database.dataChange.subscribe(data => this.nestedDataSource.data = data);
      console.log(this.locationType);
  
    }
  
    hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;
  
    private _getChildren = (node: FileNode) => node.children;
    /** Select the category so we can insert the new item. */
    addNewItem(node: FileNode) {
      this.database.insertItem(node, 'new item');
      //this.tree.renderNodeChanges(this.database.data);
      this.nestedTreeControl.expand(node);
      //console.log(this.nestedTreeControl);
  
      this.renderChanges()
      this.getTree();
    }
  
    public remove(node: FileNode) {
      console.log("currentNode");
  
      this.database.removeItem(node, this.database.data[0]);
      this.renderChanges()
      this.getTree();
  
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
      console.log("parent ", JSON.stringify(this.database.findParent(1.1, this.database.data[0])));
    }
  
    public getArr(node: FileNode) {
      let arr = [];
      if (node.level === 0)
        arr = [LocationConstants.WAREHOUSE];
  
      else {
        // console.log("locarr" + this.locationType);
  
        arr = this.locationType.slice(node.level)
        //console.log("arr");
  
  
      }
      console.log(arr);
      return arr;
    }

}
