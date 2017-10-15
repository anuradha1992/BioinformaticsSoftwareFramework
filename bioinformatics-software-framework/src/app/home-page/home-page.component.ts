import { Component, OnInit, ViewChild } from '@angular/core';

import { TreeViewComponent } from './tree-view/tree-view.component';
import { DrawingBoardComponent } from './drawing-board/drawing-board.component';
import { ExecuteFlowService } from '../services/work-flow/execute-flow.service';
import { MatchVisualizeComponent } from './match-visualize/match-visualize.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [TreeViewComponent, DrawingBoardComponent, ExecuteFlowService, MatchVisualizeComponent]
})
export class HomePageComponent implements OnInit {
  @ViewChild(DrawingBoardComponent) drawingBoard: DrawingBoardComponent;

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
      console.log(result);
    });
  }

}
