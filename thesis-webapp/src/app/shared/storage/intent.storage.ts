import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ViewChild, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { Intent } from "src/app/shared/model/inner/intent.model";
import { IntentDTO } from "src/app/shared/model/DTO/intent.dto.model";


@Injectable()
export class IntentStorage {

  dataChange = new BehaviorSubject<Intent[]>([]);

  get data(): Intent[] { return this.dataChange.value; }

  parentNodeMap = new Map<Intent, Intent>();

  constructor() {
    this.initialize();
  }


  //initial data 
  treeData = [{ "id": "0", "level": 0, "name": "root", "parentId": null, "events": [], "misunderstandingStatements": [], "answers": ["answer1", "answer2", "answer3"], "trainingSamples": ["train1", "train2"], "children": [{ "id": "1.1", "level": 1, "name": "child1", "parentId": "0", "events": [], "answers": ["answer1", "answer2", "answer3"], "trainingSamples": ["train1", "train2"], "children": [] }] }] as Intent[];

  initialize() {
    const data = this.treeData;
    console.log(this.data);
    this.dataChange.next(data);
  }

  readData(intents: Intent[]) {
    const data = intents;
    console.log(this.data);
    this.dataChange.next(data);
  }

  inform() {
    this.dataChange.next(this.data);
  }

  convertDTOtoIntent(dto: IntentDTO) {
    return [this.convertDTOtoIntentRecursively(dto, "0", 0, null)];
  }

  convertDTOtoIntentRecursively(dto: IntentDTO, id: string, level: number, parentId: string) {
    var intent: Intent = new Intent();
    intent.trainingSamples = dto.trainingSamples;
    intent.answers = dto.answerSamples;
    intent.events = dto.events;
    intent.misunderstandingStatements = dto.misunderstandingStatements;
    intent.name = dto.name;
    intent.level = level;
    intent.parentId = parentId;
    intent.id = id;
    intent.children = []
    var childArray: Intent[];
    var num: number = 0;
    var i: number;

    for (i = num; i < dto.subintents.length; i++) {
      var child = dto.subintents[i];
      //  var childIntent:Intent=this.convertDTOtoIntentRecursively(child,level+1+ ((i + 1) / 10.0),level+1,id)
      var childIntent: Intent = this.convertDTOtoIntentRecursively(child, id + '.' + (i + 1), level + 1, id)
      intent.children.push(childIntent);
    }
    return intent;
  }

  convertIntentToDTO(intent: Intent) {
    var dto: IntentDTO = new IntentDTO();
    dto.trainingSamples = intent.trainingSamples;
    dto.answerSamples = intent.answers;
    dto.events = intent.events;
    dto.misunderstandingStatements = intent.misunderstandingStatements;
    dto.name = intent.name;
    dto.subintents = []
    var childArray: IntentDTO[];
    var num: number = 0;
    var i: number;

    for (i = num; i < intent.children.length; i++) {
      var child = intent.children[i];
      var childIntent: IntentDTO = this.convertIntentToDTO(child);
      dto.subintents.push(childIntent);
    }
    return dto;
  }

  getStorageAsDTO() {
    console.log(this.convertIntentToDTO(this.data[0]))
    return this.convertIntentToDTO(this.data[0]);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): Intent[] {
    return Object.keys(obj).reduce<Intent[]>((accumulator, key) => {
      // console.log(key);
      const value = obj[key];
      const node = new Intent();
      node.id = "0";

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
      newNode.answers = [];
      newNode.trainingSamples = [];
      newNode.events = [];
      newNode.misunderstandingStatements = [];
      newNode.level = parent.level + 1;
      console.log(newNode.level);
      newNode.parentId = parent.id;
      // newNode.id = newNode.level + ((parent.children.length + 1) / 10.0);
      newNode.id = parent.id + '.' + (parent.children.length + 1);

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
    console.log("CURRENT")
    console.log(currentNode)
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
  public findParent(id: string, node: any): any {

    console.log("ENTERED " + node.id + " LOOKING FOR:" + id);
    if (node.children == undefined || node.children.length == 0) return null;
    if (node != undefined && node.id === id) {
      return node;
    } else {
      // console.log("ELSE " + JSON.stringify(node.children));
      console.log(node.children.length)
      var i: number;
      var result = null;
      for (i = 0; !result && i < node.children.length; i++) {
        //if (node.children[i].children != undefined && node.children[i].children.length > 0) {
        result = this.findParent(id, node.children[i]);
      }
      return result;
    }
  }

}