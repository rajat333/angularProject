import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes:Routes = [
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	// {path: 'find', redirectTo: 'search'},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: '**', component: PageNotFoundComponent  } 
];

export default routes;