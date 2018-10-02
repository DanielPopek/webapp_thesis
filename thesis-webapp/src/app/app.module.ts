import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TreeDiagram} from 'node_modules/angular2-tree-diagram';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialAppModule } from './ngmaterial.module';
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './login/user.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignUpConfirmComponent } from "src/app/login/sign-up-confirm/sign-up-confirm.component";
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from "src/app/shared/services/user.service";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { D3testComponent } from './d3test/d3test.component';
import { TestPanelComponent } from './test-panel/test-panel.component';
import { PanelComponent } from './panel/panel.component';
import { DesignPanelComponent } from './design-panel/design-panel.component';
import { DesignComponent } from './design/design.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BaseLayoutComponent, BaseLayoutModule } from './shared/layouts';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    SignUpConfirmComponent,
    HomeComponent,
    MenuComponent,
    D3testComponent,
    PanelComponent,
    TestPanelComponent,
    DesignComponent,
    DesignPanelComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MaterialAppModule,
    HttpClientModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BaseLayoutModule,
    TreeDiagram
  ],
  exports: [
    FlexLayoutModule
  ],
  providers: [UserService, AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
