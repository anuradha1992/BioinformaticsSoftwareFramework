import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeViewService } from '../../services/support/tree-view.service';

declare const $: any;

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  providers: [TreeViewService]
})
export class TreeViewComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter();

  private services: any = {
    core: {
      // data: this.storage.getComponentTree()
      data: [
        {
          "text" : "User Input",
          "id" : "I1",
          "precedence" : "1",
          "isStep" : true,
          "description" : "Enter the sequence as a manual user input",
          "inputs" : [
            {
              "name" : "Sequence",
              "type" : "text",
              "value" : ""
            }
          ]
        },
        {
          "text" : "NCBI",
          "children" : [
            {
              "Id" : "S001",
              "text" : "BLAST",
              "isStep" : true,
              "precedence" : "4",
              "inputs" : [
                {
                  "name" : "N/P",
                  "type" : "select",
                  "selectors" : [
                    "N",
                    "P"
                  ],
                  "value" : "N"
                }
              ],
              "OutputParams" : {
                "output" : ""
              },
              "description" : "Blast compares sequences by local alignment"
            }
          ],
          "description" : "List of web services offered by ncbi"
        },
        {
          "text" : "MSA",
          "children" : [
            {
              "Id" : "S007",
              "text" : "Clustal Omega",
              "isStep" : true,
              "precedence" : "4",
              "inputs" : [],
              "OutputParams" : {
                "output" : ""
              },
              "description" : "Perform multiple sequence alignment using progressive alignment construction."
            },
            {
              "Id" : "S008",
              "text" : "T-Coffee",
              "isStep" : true,
              "precedence" : "4",
              "inputs" : [],
              "OutputParams" : {
                "output" : ""
              },
              "description" : "Perform multiple sequence alignment using progressive alignment construction."
            },
            {
              "Id" : "S009",
              "text" : "DIALIGN",
              "isStep" : true,
              "precedence" : "4",
              "inputs" : [],
              "OutputParams" : {
                "output" : ""
              },
              "description" : "Perform multiple sequence alignment using block-base alignment."
            },
            {
              "Id" : "S0010",
              "text" : "Max Align",
              "precedence" : "4",
              "isStep" : true,
              "description" : "Obtain the maximum alignment",
              "inputs" : [
                // {
                //   "name" : "Sequence",
                //   "type" : "text",
                //   "value" : ""
                // }
              ],
              "OutputParams" : {
                "output" : ""
              },
            }
          ],
          "description" : "List of services to perform MSA"
        },
        {
          "text" : "Annotators",
          "children" : [
            {
              "Id" : "S001as",
              "text" : "NetPhos",
              "isStep" : true,
              "precedence" : "5",
              "inputs" : [
                // {
                //   "name" : "N/P",
                //   "type" : "select",
                //   "selectors" : [
                //     "N",
                //     "P"
                //   ],
                //   "value" : "N"
                // }
              ],
              "OutputParams" : {
                "output" : ""
              },
              "description" : ""
            },
            {
              "Id" : "S001a1",
              "text" : "ProP",
              "isStep" : true,
              "precedence" : "5",
              "inputs" : [
                // {
                //   "name" : "N/P",
                //   "type" : "select",
                //   "selectors" : [
                //     "N",
                //     "P"
                //   ],
                //   "value" : "N"
                // }
              ],
              "OutputParams" : {
                "output" : ""
              },
              "description" : ""
            },
            {
              "Id" : "S001asq",
              "text" : "SignalP",
              "isStep" : true,
              "precedence" : "5",
              "inputs" : [
                // {
                //   "name" : "N/P",
                //   "type" : "select",
                //   "selectors" : [
                //     "N",
                //     "P"
                //   ],
                //   "value" : "N"
                // }
              ],
              "OutputParams" : {
                "output" : ""
              },
              "description" : ""
            }
          ],
          "description" : "Annotate alignment outputs"
        },
        {
          "text" : "Visualize Output",
          "id" : "V1",
          "precedence" : "5",
          "isStep" : true,
          "description" : "Visualize the output of sequence",
          "inputs" : []
        }
      ]
    }
  };

  constructor() {
  }

  ngOnInit() {
    // this.treeService.getTree().then((res) => {
    //   this.services.core.data = res;
    //   this.storage.saveComponentTree(res);
    // });
    this.initTree();
  }

  initTree() {
    $('#jstree').jstree(this.services).on('changed.jstree', (e, data) => {
      this.select.emit(data.node.original);
    }).jstree();
  }

}
