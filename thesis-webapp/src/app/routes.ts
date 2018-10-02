import { Routes } from '@angular/router'
import { UserComponent } from './login/user.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from "src/app/home/home.component";
import { SignUpConfirmComponent } from "src/app/login/sign-up-confirm/sign-up-confirm.component";
import { MenuComponent } from './menu/menu.component';
import { D3testComponent } from "src/app/d3test/d3test.component";
import { PanelComponent } from "src/app/panel/panel.component";
import { TestPanelComponent } from "src/app/test-panel/test-panel.component";
import { DesignComponent } from "src/app/design/design.component";
import { DesignPanelComponent } from "src/app/design-panel/design-panel.component";

export const appRoutes: Routes = [

 

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: HomeComponent }]
    },
    {
        path: 'signup', component: SignUpComponent,
        children: [{ path: '', component: SignUpComponent }]
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
        path: 'd3test', component: D3testComponent,
    },  
    {
        path: 'panel', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: PanelComponent }]
    },  
    {
        path: 'test-panel', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: TestPanelComponent }]
    }, 
    {
        path: 'design', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: DesignComponent }]
    }, 
    {
        path: 'dspanel', component: MenuComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: DesignPanelComponent }]
    }, 
];