import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:User = new User();
  constructor(private accountService:AccountService, 
    private myAlertifyService:AlertifyService, 
    private router:Router) { }

  ngOnInit(): void {
  }

  login()
  {
    if(this.accountService.login(this.model))
    {
      this.myAlertifyService.success("Başarıyla Girişiniz Gerçekleşti Sayın " + localStorage.getItem("isLogged"))
    }
    else
    {
      this.myAlertifyService.error("Hatalı Giriş!");
    }

    this.router.navigate(["products"]);
  }

}
