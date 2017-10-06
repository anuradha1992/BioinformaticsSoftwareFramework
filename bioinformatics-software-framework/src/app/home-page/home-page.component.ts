import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private services: any = {
    "core": {
      "data": [
        {
          "text": "jdbc",
          "children": [
            {
              "Id": "J001",
              "text": "Execute SQL Query",
              "InputParams": [
                {
                  "name": "db",
                  "type": "db",
                  "value": ""
                },
                {
                  "name": "retmode",
                  "type": "text",
                  "value": ""
                }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "Execute"
            },
            {
              "Id": "J002",
              "text": "Execute SQL Update",
              "InputParams": [
                {
                  "name": "db",
                  "type": "db",
                  "value": ""
                },
                {
                  "name": "retmode",
                  "type": "text"
                }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "Execute an SQL update given the params"
            }
          ],
          "description": "List of web services related to query processing"
        },
        {
          "text": "general",
          "children": [
            {
              "Id": "G001",
              "text": "Split by *",
              "InputParams": [
                {
                  "name": "input_report",
                  "type": "db",
                  "value": ""
                },
                {
                  "name": "delimeter",
                  "type": "db",
                  "value": ""
                }
              ],
              "OutputParams": {
                "output_seq_list": ""
              },
              "description": "Execute"
            },
            {
              "Id": "G002",
              "text": "Sort",
              "InputParams": [
                {
                  "name": "input_list",
                  "type": "db",
                  "value": ""
                }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "Execute an SQL update given the params"
            }
          ],
          "description": "List of web services related to query processing"
        },
        {
          "text": "ncbi",
          "children": [
            {
              "Id": "S001",
              "text": "BlastN",
              "InputParams": [
                {
                  "name": "db",
                  "type": "db",
                  "value": ""
                },
                {
                  "name": "query",
                  "type": "seq",
                  "value": ""
                }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "BlastP compares sequences by local alignment"
            },
            {
              "Id": "S002",
              "text": "FASTA",
              "InputParams": [
                {
                  "name": "db",
                  "type": "db",
                  "value": ""
                },
                {
                  "name": "retmode",
                  "type": "text",
                  "value": ""
                }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "FASTA aligns DNA and protein sequences"
            },
            {
              "Id": "S003",
              "text": "GBSeq",
              "InputParams": [
                {
                  "name": "db",
                  "type": "db",
                  "value": ""
                },
                {
                  "name": "retmode",
                  "type": "text",
                  "value": ""
                }
              ],
              "OutputParams": {
                "output": ""
              },
              "description": "GBSeq represents the elements in a GenBank style report of a sequence with some small additions to structure and support for protein (GenPept) versions of GenBank format as seen in Entrez."
            },
            {
              "Id": "S004",
              "text": "blast_ddbj",
              "InputParams": [
                {
                  "name": "query_seq",
                  "type": "seq",
                  "value": ""
                },
                {
                  "name": "database",
                  "type": "db",
                  "value": ""
                },
                {
                  "name": "program",
                  "type": "text",
                  "value": ""
                }
              ],
              "OutputParams": {
                "text_blast_out": ""
              },
              "description": "BLAST finds regions of similarity between biological sequences. Uses the DDBJ’s UniProt BLAST service that forms part of its Web API for Bioinformatics pages."
            },
            {
              "Id": "S005",
              "text": "blast simplifier",
              "InputParams": [
                {
                  "name": "gi_number",
                  "type": "int",
                  "value": ""
                },
                {
                  "name": "input_seq",
                  "type": "seq",
                  "value": ""
                }
              ],
              "OutputParams": {
                "simplified_report": ""
              },
              "description": "BLAST finds regions of similarity between biological sequences. Uses the DDBJ’s UniProt BLAST service that forms part of its Web API for Bioinformatics pages."
            },
            {
              "Id": "S006",
              "text": "Get_Protein_FASTA",
              "InputParams": [
                {
                  "name": "input_seq",
                  "type": "int",
                  "value": ""
                }
              ],
              "OutputParams": {
                "output_sequence": ""
              },
              "description": "BLAST finds regions of similarity between biological sequences. Uses the DDBJ’s UniProt BLAST service that forms part of its Web API for Bioinformatics pages."
            }
          ],
          "description": "List of web services offered by ncbi"
        }
      ]
    }
  };
  private description: string = '';

  constructor() {
  }

  ngOnInit() {
    $('#jstree').jstree(this.services).on('changed.jstree',  (e, data) => {
        this.description = data.node.original.description || '';
      }).jstree();
  }

}
