import { Component, OnInit, ViewChild } from '@angular/core';
import { HomePageHelpModalComponent } from '../../components/modals/home-page-help-modal/home-page-help-modal.component';
import { TestDataModalComponent } from '../../components/modals/test-data-modal/test-data-modal.component';

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.css']
})
export class EditorViewComponent implements OnInit {
  @ViewChild(HomePageHelpModalComponent) homePageHelpModal: HomePageHelpModalComponent;
  @ViewChild(TestDataModalComponent) testDataModal: TestDataModalComponent;

  constructor() { }

  ngOnInit() {
  }

  openHelpModal() {
    this.homePageHelpModal.openHelpModal();
  }

  openTestDataModal() {
    this.testDataModal.openHelpModal();
  }
}
