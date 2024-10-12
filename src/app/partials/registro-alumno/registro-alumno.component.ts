import { Component, Input, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
declare var $: any;
@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.scss']
})
export class RegistroAlumnoComponent implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  // Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'text';
  public inputType_2: string = 'text';

  public alumno: any = {};
  public errors: any = {};
  public editar: boolean = false;

  constructor(
    private alumnosService: AlumnosService
  ) { }

  ngOnInit(): void {
    this.alumno = this.alumnosService.esquemaAlumno();

    console.log(this.alumno);
  }

  public registrar() {
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);

    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    // Validar contraseña
    if (this.alumno.password === this.alumno.confirmar_password) {
      //Entra a registrar
    }
    else {
      alert("Las contraseñas no coinciden");
      this.alumno.password = "";
      this.alumno.confirmar_password = "";
    }
  }

  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }
  public regresar() { }
  public actualizar() { }
}
