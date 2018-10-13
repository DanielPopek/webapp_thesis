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
import { CommunicationService } from "src/app/shared/services/communication.service";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { DesignPanelComponent } from './design-panel/design-panel.component';
import {ConversationComponent} from './conversation/conversation.component';
import {ApplicationComponent} from './application/application.component';
import {ConversationDeleteDialogComponent} from './conversation-delete-dialog/conversation-delete-dialog.component';
import {ConversationAddDialogComponent} from './conversation-add-dialog/conversation-add-dialog.component';
import {ApplicationDeleteDialogComponent} from './application-delete-dialog/application-delete-dialog.component';
import {ApplicationAddDialogComponent} from './application-add-dialog/application-add-dialog.component';
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
    DesignPanelComponent,
    ConversationComponent,
    ConversationDeleteDialogComponent,
    ConversationAddDialogComponent,
    ApplicationDeleteDialogComponent,
    ApplicationAddDialogComponent,
    ApplicationComponent
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
  providers: [UserService,CommunicationService, AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [ConversationDeleteDialogComponent,ConversationAddDialogComponent,ApplicationDeleteDialogComponent,ApplicationAddDialogComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
