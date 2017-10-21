import { Component, OnInit, ViewChild } from '@angular/core';

import { TreeViewComponent } from '../../components/tree-view/tree-view.component';
import { DrawingBoardComponent } from '../../components/drawing-board/drawing-board.component';
import { ExecuteFlowService } from '../../services/work-flow/execute-flow.service';
import { PairwiseBlastComponent } from '../../components/visualizers/pairwise-blast/pairwise-blast.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [TreeViewComponent, DrawingBoardComponent, ExecuteFlowService, PairwiseBlastComponent]
})
export class HomePageComponent implements OnInit {
  @ViewChild(DrawingBoardComponent) drawingBoard: DrawingBoardComponent;
  @ViewChild(PairwiseBlastComponent) pairwiseBlasterView: PairwiseBlastComponent;

  private activeTreeItem: any = null;
  private resultData: any = null;

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
    const steps = this.drawingBoard.getStepSequence();

    this.executionService.executeFlow(steps).then((result) => {
      this.resultData = result;
      switch (result.type) {
        case '':
          this.pairwiseBlasterView.render(result.data);
          break;
      }
    });
  }

}
