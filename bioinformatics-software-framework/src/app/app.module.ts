import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TreeViewComponent } from './home-page/tree-view/tree-view.component';
import { DrawingBoardComponent } from './home-page/drawing-board/drawing-board.component';
import { StepBoxComponent } from './home-page/drawing-board/step-box/step-box.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PairwiseBlastComponent } from './visualizers/pairwise-blast/pairwise-blast.component';
import { ClustalOmegaMsaComponent } from './visualizers/clustal-omega-msa/clustal-omega-msa.component';

const routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: '',
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
    ClustalOmegaMsaComponent
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
