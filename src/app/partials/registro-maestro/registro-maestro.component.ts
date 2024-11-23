import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-registro-maestro',
  templateUrl: './registro-maestro.component.html',
  styleUrls: ['./registro-maestro.component.scss']
})
export class RegistroMaestroComponent implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  // Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'text';
  public inputType_2: string = 'text';
  public token: string = '';

  public maestro: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idUser: Number = 0;

  //Para el select
  public areas: any[] = [
    { value: '1', viewValue: 'Desarrollo Web' },
    { value: '2', viewValue: 'Programación' },
    { value: '3', viewValue: 'Bases de datos' },
    { value: '4', viewValue: 'Redes' },
    { value: '5', viewValue: 'Matemáticas' },
  ];

  //Lista de materias
  public materias: any[] = [
    { value: '1', nombre: 'Aplicaciones Web' },
    { value: '2', nombre: 'Programación 1' },
    { value: '3', nombre: 'Bases de datos' },
    { value: '4', nombre: 'Tecnologías Web' },
    { value: '5', nombre: 'Minería de datos' },
    { value: '6', nombre: 'Desarrollo móvil' },
    { value: '7', nombre: 'Estructuras de datos' },
    { value: '8', nombre: 'Administración de redes' },
    { value: '9', nombre: 'Ingeniería de Software' },
    { value: '10', nombre: 'Administración de S.O.' },
  ];

  constructor(
    private maestroService: MaestrosService,
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.maestro = this.datos_user;
    } else {
      this.maestro = this.maestroService.esquemaMatestro();
      this.maestro.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Maestro: ", this.maestro);
  }

  public registrar() {
    this.errors = [];

    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar);

    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    // Validar contraseña
    if (this.maestro.password === this.maestro.confirmar_password) {
      //Entra a registrar

      this.maestroService.registrarMaestro(this.maestro).subscribe(
        (response) => {
          // Aquí va la ejecución del servicio si todo es correcto
          alert("Maestro registrado correctamente");
          console.log(`Maestro registrado: ${response}`);
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
      this.maestro.password = "";
      this.maestro.confirmar_password = "";
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

  public checkboxChange(event: any) {
    console.log("Evento: ", event);
    if (event.checked) {
      this.maestro.materias_json.push(event.source.value)
    } else {
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia, i) => {
        if (materia == event.source.value) {
          this.maestro.materias_json.splice(i, 1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }
  public revisarSeleccion(nombre: string) {
    if (this.maestro.materias_json) {
      var busqueda = this.maestro.materias_json.find((element) => element == nombre);
      if (busqueda != undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public regresar() {
    this.location.back();
  }
  public actualizar() {
    //Validación
    this.errors = [];

    this.errors = this.maestroService.validarMaestro(this.maestro, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");
    this.maestroService.editarMaestro(this.maestro).subscribe(
      (response) => {
        alert("Maestro editado correctamente");
        console.log("Maestro editado: ", response);
        //Si se editó, entonces mandar al home
        this.router.navigate(["home"]);
      }, (error) => {
        alert("No se pudo editar el maestro");
      }
    );
  }


  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.maestro.birthdate = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.maestro.birthdate);
  }
}
