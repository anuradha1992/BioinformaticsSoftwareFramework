import { Component, OnInit } from '@angular/core';

declare const msa: any;

@Component({
  selector: 'app-clustal-omega-msa',
  templateUrl: './clustal-omega-msa.component.html',
  styleUrls: ['./clustal-omega-msa.component.css']
})
export class ClustalOmegaMsaComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  render(data) {
    const alignments = data;
    const seqs = msa.io.fasta.parse(alignments);
    const m = msa({
      el: document.getElementById('clustal-omega-msa'),
      seqs: seqs
    });

    m.render();
  }

  clear() {
    document.getElementById('clustal-omega-msa').innerHTML = '';
  }
}
