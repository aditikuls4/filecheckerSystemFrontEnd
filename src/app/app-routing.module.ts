import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { AdminGuard } from './service/admin.guard';
import { StudentGuard } from './service/student.guard';
import { StudentsComponent } from './components/students/students.component';
import { PendingRequestComponent } from './components/pending-request/pending-request.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { ApprovedRequestComponent } from './components/approved-request/approved-request.component';
import { RejectedRequestComponent } from './components/rejected-request/rejected-request.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full'
  },
{
  path:'signup',
  component: SignupComponent,
  pathMatch: 'full'
},
{
  path:'login',
  component: LoginComponent,
  pathMatch:'full'
}
,
{path:'admin-dashboard',
component: AdminDashboardComponent
  ,pathMatch:'full',
  canActivate:[AdminGuard]
},
{path:'student-dashboard',
component: StudentDashboardComponent
  ,pathMatch:'full',
  canActivate:[StudentGuard]
},
{path:'student',
component: StudentsComponent
  ,pathMatch:'full',
  canActivate:[AdminGuard]
},
{path:'pendingRequest',
component: PendingRequestComponent
  ,pathMatch:'full',
  canActivate:[AdminGuard]
},
{path:'approvedRequest',
component: ApprovedRequestComponent
  ,pathMatch:'full',
  canActivate:[AdminGuard]
},
{path:'rejectedRequest',
component: RejectedRequestComponent
  ,pathMatch:'full',
  canActivate:[AdminGuard]
},
{ path: 'attachments/:userId', component: AttachmentComponent
  
 },
 {path:'profile',
 component:ProfileComponent,
  pathMatch:"full"
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
