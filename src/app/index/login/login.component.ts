import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animatons';
import {AuthenticationService} from '../../service/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Registration} from '../../models/userModel';
import {RegistrationService} from '../../service/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  
  closeResult: string;
  registrationForm: FormGroup;
  loginForm:FormGroup;
  registrationInputs: Registration[];
  currentUser: Registration[];
  isLoggedIn:boolean=false;

  cartItemCount:number=0;
  approvalText:string="";

  @Input()
  public alerts: Array<IAlert> = [];

  message = "";
  public globalResponse: any;

  constructor( private fb: FormBuilder,private regService:RegistrationService,private authService:AuthenticationService,public router:Router ) {

  }
  ngOnInit()
  {
    this.registrationForm = this.fb.group({
      name:  ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      password:['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      mob:['',Validators.required],
      dob:[''],
    });
    this.loginForm = this.fb.group({
      email:  ['', [Validators.required]],
      password:['',[Validators.required]],
    });
  }

 
  Login()
  {
    let user=this.loginForm.value;
    this.isLoggedIn=false;
    this.authService.removeToken();
    this.alerts=[];
    //console.log(user);
        this.authService.ValidateUser(user)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Either user name or password is incorrect.'
              });
            },
            () => {
                //This is Success part
                //console.log(this.globalResponse._body);
                var token = this.globalResponse._body;
                var decoded = jwt_decode(token); 
                //console.log(decoded.role);  //prinitng role               
                //console.log(decoded);
                this.authService.storeToken(this.globalResponse._body);  
                this.authService.storeRole(decoded.role);
                 this.alerts.push({
                   id: 1,
                   type: 'success',
                   message: 'Login successful. Now you can close and proceed further.',
                 });
                 this.isLoggedIn=true;
                 //this.GetClaims();
                 this.router.navigateByUrl("");
                
                }
            )
  }
  

  

  GetClaims()
  {
        this.authService.getClaims()
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is error part
              console.log(error.message);
            },
            () => {
                //  This is Success part
               console.log(this.globalResponse );
                let a=this.globalResponse;
                this.currentUser=this.globalResponse;
                this.authService.storeRole(this.currentUser);
                }
              )
            
  } 
  LogOut()
  {
    this.isLoggedIn=false;
    this.authService.removeToken();
  }
 

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}



