import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { StepBoxComponent } from './components/step-box/step-box.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PairwiseBlastComponent } from './components/visualizers/pairwise-blast/pairwise-blast.component';
import { ClustalOmegaMsaComponent } from './components/visualizers/clustal-omega-msa/clustal-omega-msa.component';
import { InstructionsPopoverComponent } from './components/instructions-popover/instructions-popover.component';
import { HomePageHelpModalComponent } from './components/modals/home-page-help-modal/home-page-help-modal.component';
import { TestDataModalComponent } from './components/modals/test-data-modal/test-data-modal.component';

const routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    TreeViewComponent,
    DrawingBoardComponent,
    StepBoxComponent,
    PairwiseBlastComponent,
    ClustalOmegaMsaComponent,
    InstructionsPopoverComponent,
    HomePageHelpModalComponent,
    TestDataModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
