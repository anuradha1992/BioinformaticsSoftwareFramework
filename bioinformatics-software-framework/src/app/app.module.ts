import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { ModalComponent } from './components/modals/modal/modal.component';
import { TutorialPageComponent } from './pages/tutorial-page/tutorial-page.component';
import { EditorViewComponent } from './pages/editor-view/editor-view.component';

const routes = [
  {
    path: '',
    component: EditorViewComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'editor',
        component: HomePageComponent,
      },
      {
        path: 'tutorial',
        component: TutorialPageComponent
      }
    ]
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
    TestDataModalComponent,
    ModalComponent,
    TutorialPageComponent,
    EditorViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [
    // {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule {
}
