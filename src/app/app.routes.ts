import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path: "",
        component:HomeComponent,
    },
    {path: "home",
        component:HomeComponent,
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component:RegisterComponent
    },
    {
        path: "about",
        component:AboutComponent
    },
    {
        path: "contact",
        component:ContactComponent
    }
    
];
