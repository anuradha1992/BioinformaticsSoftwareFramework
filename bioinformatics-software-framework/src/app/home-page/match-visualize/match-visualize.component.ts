import { Component, Input, OnInit } from '@angular/core';
import blasterjs from 'biojs-vis-blasterjs';

@Component({
  selector: 'app-match-visualize',
  templateUrl: './match-visualize.component.html',
  styleUrls: ['./match-visualize.component.css']
})
export class MatchVisualizeComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    const alignments = this.data;
    const instance = new blasterjs({
      string: alignments,
      multipleAlignments: "blast-multiple-alignments",
      alignmentsTable: "blast-alignments-table",
      singleAlignment: "blast-single-alignment"
    });
  }
}
