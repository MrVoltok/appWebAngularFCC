import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-registro-usuarios-screen',
  templateUrl: './registro-usuarios-screen.component.html',
  styleUrls: ['./registro-usuarios-screen.component.scss']
})
export class RegistroUsuariosScreenComponent implements OnInit {

  public tipo: string = "registro-usuarios";

  public user: any = {};
  public editar: boolean = false;

  public isAdmin: boolean = false;
  public isAlumno: boolean = false;
  public isMaestro: boolean = false;
  public tipo_user: string = "";

  constructor() { }

  ngOnInit(): void {

  }

  public radioChange(event: MatRadioChange) {
    if (event.value == "administrador") {
      this.isAdmin = true;
      this.tipo_user = "adminsitrador";
      this.isAlumno = false;
      this.isMaestro = false;
    }
    else if (event.value = "alumno") {
      this.isAlumno = true;
      this.tipo_user = "alumno";
      this.isAdmin = false;
      this.isMaestro = false;
    }
    else if (event.value == "maestro") {
      this.isMaestro = true;
      this.tipo_user = "maestro";
      this.isAlumno = false;
      this.isAdmin = false;
    }
  }

}
