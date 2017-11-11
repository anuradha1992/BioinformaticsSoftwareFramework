import { Component, EventEmitter, OnInit, Output } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter();

  private services: any = {
    "core": {
      "data": [
        {
          "text": "User Input",
          "id": "I1",
          "precedence": "1",
          "isStep": true,
          "description": "Enter the sequence as a manual user input",
          "inputs": [
            {
              "name": "Sequence",
              "type": "text",
              "value": ""
            }
          ]
        },
        // {
        //   "text": "JDBC",
        //   "children": [
        //     {
        //       "id": "J001",
        //       "text": "Execute SQL Query",
        //       "precedence": "1",
        //       "isStep": true,
        //       "inputs": [
        //         {
        //           "name": "db",
        //           "type": "db",
        //           "value": ""
        //         },
        //         {
        //           "name": "retmode",
        //           "type": "text",
        //           "value": ""
        //         }
        //       ],
        //       "OutputParams": {
        //         "output": ""
        //       },
        //       "description": "Execute"
        //     },
        //     {
        //       "Id": "J002",
        //       "text": "Execute SQL Update",
        //       "isStep": true,
        //       "precedence": "1",
        //       "inputs": [
        //         {
        //           "name": "db",
        //           "type": "db",
        //           "value": ""
        //         },
        //         {
        //           "name": "retmode",
        //           "type": "text"
        //         }
        //       ],
        //       "OutputParams": {
        //         "output": ""
        //       },
        //       "description": "Execute an SQL update given the params"
        //     }
        //   ],
        //   "description": "List of web services related to query processing"
        // },
        // {
        //   "text": "General",
        //   "children": [
        //     {
        //       "Id": "G001",
        //       "text": "Split by *",
        //       "isStep": true,
        //       "precedence": "2",
        //       "inputs": [
        //         {
        //           "name": "input_report",
        //           "type": "db",
        //           "value": ""
        //         },
        //         {
        //           "name": "delimeter",
        //           "type": "db",
        //           "value": ""
        //         }
        //       ],
        //       "OutputParams": {
        //         "output_seq_list": ""
        //       },
        //       "description": "Execute"
        //     },
        //     {
        //       "Id": "G002",
        //       "text": "Sort",
        //       "isStep": true,
        //       "precedence": "3",
        //       "inputs": [
        //         {
        //           "name": "input_list",
        //           "type": "db",
        //           "value": ""
        //         }
        //       ],
        //       "OutputParams": {
        //         "output": ""
        //       },
        //       "description": "Execute an SQL update given the params"
        //     }
        //   ],
        //   "description": "List of web services related to query processing"
        // },
        {
          "text": "NCBI",
          "children": [
            {
              "Id": "S001",
              "text": "Blast",
              "isStep": true,
              "precedence": "4",
              "inputs": [
                {
                  "name": "N/P",
                  "type": "select",
                  "selectors":["N", "P"],
                  "value": "N"
                },
                // {
                //   "name": "query",
                //   "type": "seq",
                //   "value": ""
                // }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "Blast compares sequences by local alignment"
            },
            // {
            //   "Id": "S002",
            //   "text": "FASTA",
            //   "precedence": "4",
            //   "isStep": true,
            //   "inputs": [
            //     {
            //       "name": "db",
            //       "type": "db",
            //       "value": ""
            //     },
            //     {
            //       "name": "retmode",
            //       "type": "text",
            //       "value": ""
            //     }
            //   ],
            //   "OutputParams": {
            //     "output": ""
            //   },
            //   "description": "FASTA aligns DNA and protein sequences"
            // },
            // {
            //   "Id": "S003",
            //   "text": "GBSeq",
            //   "precedence": "4",
            //   "isStep": true,
            //   "inputs": [
            //     {
            //       "name": "db",
            //       "type": "db",
            //       "value": ""
            //     },
            //     {
            //       "name": "retmode",
            //       "type": "text",
            //       "value": ""
            //     }
            //   ],
            //   "OutputParams": {
            //     "output": ""
            //   },
            //   "description": "GBSeq represents the elements in a GenBank style report of a sequence with some small additions to structure and support for protein (GenPept) versions of GenBank format as seen in Entrez."
            // },
            // {
            //   "Id": "S004",
            //   "text": "blast_ddbj",
            //   "precedence": "4",
            //   "isStep": true,
            //   "inputs": [
            //     {
            //       "name": "query_seq",
            //       "type": "seq",
            //       "value": ""
            //     },
            //     {
            //       "name": "database",
            //       "type": "db",
            //       "value": ""
            //     },
            //     {
            //       "name": "program",
            //       "type": "text",
            //       "value": ""
            //     }
            //   ],
            //   "OutputParams": {
            //     "text_blast_out": ""
            //   },
            //   "description": "BLAST finds regions of similarity between biological sequences. Uses the DDBJ’s UniProt BLAST service that forms part of its Web API for Bioinformatics pages."
            // },
            // {
            //   "Id": "S005",
            //   "text": "blast simplifier",
            //   "precedence": "4",
            //   "isStep": true,
            //   "inputs": [
            //     {
            //       "name": "gi_number",
            //       "type": "int",
            //       "value": ""
            //     },
            //     {
            //       "name": "input_seq",
            //       "type": "seq",
            //       "value": ""
            //     }
            //   ],
            //   "OutputParams": {
            //     "simplified_report": ""
            //   },
            //   "description": "BLAST finds regions of similarity between biological sequences. Uses the DDBJ’s UniProt BLAST service that forms part of its Web API for Bioinformatics pages."
            // },
            // {
            //   "Id": "S006",
            //   "text": "Get_Protein_FASTA",
            //   "precedence": "4",
            //   "isStep": true,
            //   "inputs": [
            //     {
            //       "name": "input_seq",
            //       "type": "int",
            //       "value": ""
            //     }
            //   ],
            //   "OutputParams": {
            //     "output_sequence": ""
            //   },
            //   "description": "BLAST finds regions of similarity between biological sequences. Uses the DDBJ’s UniProt BLAST service that forms part of its Web API for Bioinformatics pages."
            // }
          ],
          "description": "List of web services offered by ncbi"
        },
        {
          "text": "MSA",
          "children": [
            {
              "Id": "S007",
              "text": "Clustal Omega",
              "isStep": true,
              "precedence": "4",
              "inputs": [
                // {
                //   "name": "db",
                //   "type": "db",
                //   "value": ""
                // },
                // {
                //   "name": "query",
                //   "type": "seq",
                //   "value": ""
                // }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "Perform multiple sequence alignment using progressive alignment construction."
            },
            {
              "Id": "S008",
              "text": "T-Coffee",
              "isStep": true,
              "precedence": "4",
              "inputs": [
                // {
                //   "name": "db",
                //   "type": "db",
                //   "value": ""
                // },
                // {
                //   "name": "query",
                //   "type": "seq",
                //   "value": ""
                // }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "Perform multiple sequence alignment using progressive alignment construction."
            },
            {
              "Id": "S009",
              "text": "DIALIGN",
              "isStep": true,
              "precedence": "4",
              "inputs": [
                // {
                //   "name": "db",
                //   "type": "db",
                //   "value": ""
                // },
                // {
                //   "name": "query",
                //   "type": "seq",
                //   "value": ""
                // }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "Perform multiple sequence alignment using block-base alignment."
            }
          ],
          "description": "List of services to perform MSA"
        },
        {
          "text": "Visualize Output",
          "id": "V1",
          "precedence": "5",
          "isStep": true,
          "description": "Visualize the output of sequence",
          "inputs": []
        }
      ]
    }
  };

  constructor() {
  }

  ngOnInit() {
    $('#jstree').jstree(this.services).on('changed.jstree', (e, data) => {
      this.select.emit(data.node.original);
    }).jstree();
  }

}
