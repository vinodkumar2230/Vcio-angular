import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/component/login.component";
import { HomeComponent } from "./home/component/home.component";
import { PlansComponent } from "./plans/component/plans.component";
import { SignupComponent } from "./signup/component/signup.component";
import { OrganisationComponent } from "./organisation/component/organisation.component";
import { AuthGuard } from "./authentication/auth.guard";




const routes: Routes = [
    {
        path: '', component:HomeComponent
    },
    {
        path: 'home', component:HomeComponent
    },
 
    {
        path:'login', component:LoginComponent
    },

    {
        path:'plans' ,component:PlansComponent
    },

    {
        path:'signup' ,component:SignupComponent
    },
   
    {
        path:'organisation', component:OrganisationComponent,canActivate: [AuthGuard]
    }



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],

})
export class AppRoutingModule {

}