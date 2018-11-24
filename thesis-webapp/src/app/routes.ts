import { Routes } from '@angular/router'
import { UserComponent } from './login/user.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from "src/app/home/home.component";
import { SignUpConfirmComponent } from "src/app/login/sign-up-confirm/sign-up-confirm.component";
import { MenuComponent } from './menu/menu.component';
import { DesignPanelComponent } from "src/app/design-panel/design-panel.component";
import { ConversationComponent } from "src/app/conversation/conversation.component";
import { ApplicationComponent } from "src/app/application/application.component";
import { ChatboxComponent } from "src/app/chatbox/chatbox.component";
import { RegisterComponent } from "src/app/login/register/register.component";

export const appRoutes: Routes = [

 

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: MenuComponent,
        children: [{ path: '', component: HomeComponent }]
    },
    {
        path: 'signup', component: SignUpComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'register', component: RegisterComponent,
        children: [{ path: '', component: RegisterComponent }]
    },
    {
        path: 'login', component: SignInComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'confirm', component: SignUpConfirmComponent,
    },
    {
        path: 'panel/:conversationHash', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: DesignPanelComponent }]
    }, 
    {
        path: 'conversation', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: ConversationComponent }]
    }, 
    {
        path: 'application', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: ApplicationComponent }]
    }, 
    {
        path: 'chat', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: ChatboxComponent }]
    }, 
];