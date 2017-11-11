import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { TreeViewComponent } from '../../components/tree-view/tree-view.component';
import { DrawingBoardComponent } from '../../components/drawing-board/drawing-board.component';
import { ExecuteFlowService } from '../../services/work-flow/execute-flow.service';
import { PairwiseBlastComponent } from '../../components/visualizers/pairwise-blast/pairwise-blast.component';
import { ClustalOmegaMsaComponent } from '../../components/visualizers/clustal-omega-msa/clustal-omega-msa.component';

declare const $;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [TreeViewComponent, DrawingBoardComponent, ExecuteFlowService, PairwiseBlastComponent]
})
export class HomePageComponent implements OnInit {
  @ViewChild(DrawingBoardComponent) drawingBoard: DrawingBoardComponent;
  @ViewChild(PairwiseBlastComponent) pairwiseBlasterView: PairwiseBlastComponent;
  @ViewChild(ClustalOmegaMsaComponent) clustalOmegaView: ClustalOmegaMsaComponent;

  private activeTreeItem: any = null;
  private resultData: any = null;
  private helpStep: number = 1;

  constructor(private executionService: ExecuteFlowService) {
  }

  ngOnInit() {

  }

  selectTree(item) {
    this.activeTreeItem = item;
  }

  addStep() {
    this.activeTreeItem.isStep && this.drawingBoard.addStep(this.activeTreeItem);
  }

  execute() {
    this.clearUI();

    const steps = this.drawingBoard.getStepSequence();

    this.executionService.executeFlow(steps).then((result) => {
      this.resultData = result;
      console.log(result);
      switch (result.type) {
        case 'blast':
          this.pairwiseBlasterView.render(result.data);
          break;
        case 'clustal-omega':
          this.clustalOmegaView.render(result.data);
          break;
      }
    });
  }

  clearUI() {
    this.pairwiseBlasterView.clear();
    this.clustalOmegaView.clear();
  }

  openHelpModal() {
    this.helpStep = 1;
    $("[modal='hom-page-help']").modal('show');
  }

  prevHelpModalStep() {
    const stepVal = this.helpStep - 1;

    this.helpStep = _.max([stepVal, 1]);
  }

  nextHelpModalStep() {
    const stepVal = this.helpStep + 1;

    this.helpStep = _.min([stepVal, 3]);
  }

}
