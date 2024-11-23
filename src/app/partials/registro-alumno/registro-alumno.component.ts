import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from 'src/app/services/alumnos/alumnos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
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
  public token: string = '';
  public idUser: Number = 0;

  constructor(
    private alumnosService: AlumnosService,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    //El primer if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.alumno = this.datos_user;
    } else {
      this.alumno = this.alumnosService.esquemaAlumno();
      this.alumno.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Alumno: ", this.alumno);
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

      this.alumnosService.registrarAlumno(this.alumno).subscribe(
        (response) => {
          // Aquí va la ejecución del servicio si todo es correcto
          alert("Usuario registrado correctamente");
          console.log(`Usuario registrado: ${response}`);
          if (this.token != "") {
            this.router.navigate(["home"]);
          } else {
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          //Aquí se ejecuta el error
          alert("No se pudo registrar usuario");
        }
      )
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
  public regresar() {
    this.location.back();

  }
  public actualizar() {
    //Validación
    this.errors = [];

    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");
    this.alumnosService.editarAlumno(this.alumno).subscribe(
      (response) => {
        alert("Alumno editado correctamente");
        console.log("Alumno editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error) => {
        alert("No se pudo editar el alumno");
      }
    );
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.alumno.birthdate = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.alumno.birthdate);
  }
  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
}
