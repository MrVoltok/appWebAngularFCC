import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  public type: String = "password";
  public username: String = ""
  public password: String = ""
  public errors: any = {};
  public load: boolean = false;

  constructor(
    private router: Router,
    private facadeService: FacadeService,
  ) { }

  ngOnInit(): void {

  }

  public login() {
    this.load = true;
    this.errors = [];
    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    this.facadeService.login(this.username, this.password).subscribe(
      (response) => {
        this.facadeService.saveUserData(response);
        this.router.navigate(["home"]);
        this.load = false;
      }, (error) => {
        alert("No se pudo iniciar sesión");
      }
    )
  }

  public showPassword() {
    if (this.type == "password") {
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }
    else if (this.type == "text") {
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }
  }

  public registrar() {
    this.router.navigate(["registro-usuarios"]);
  }
}
