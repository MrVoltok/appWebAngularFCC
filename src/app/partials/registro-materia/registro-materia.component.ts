import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { MaestrosService } from 'src/app/services/maestros/maestros.service';
declare var $: any;

@Component({
  selector: 'app-registro-materia',
  templateUrl: './registro-materia.component.html',
  styleUrls: ['./registro-materia.component.scss']
})
export class RegistroMateriaComponent implements OnInit {
  public materia: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public token: string = '';
  public idMateria: Number = 0;

  public lista_maestros: any[] = [];

  @Input() set datos_materia(value: any) {
    if (value) {
      this.materia = value;
      console.log("Datos recibidos en el componente hijo: ", this.materia);
    }
  }

  public dias: any[] = [
    { value: '1', nombre: 'Lunes' },
    { value: '2', nombre: 'Martes' },
    { value: '3', nombre: 'Miercoles' },
    { value: '4', nombre: 'Jueves' },
    { value: '5', nombre: 'Viernes' },
    { value: '6', nombre: 'Sabado' },
  ]

  public programas: any[] = [
    { value: '1', viewValue: 'Ingeniería en Ciencias de la Computación' },
    { value: '2', viewValue: 'Licenciatura en Ciencias de la Computación' },
    { value: '3', viewValue: 'Ingeniería en Tecnologías de la Información' },
  ];

  constructor(
    private materiaService: MateriasService,
    private maestroService: MaestrosService,
    private router: Router,
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    this.getMaestros();
    //El primer if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);
      this.materia = this.datos_materia;

    } else {
      this.materia = this.materiaService.esquemaMateria();
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Materia: ", this.materia);
  }

  public checkboxChange(event: any) {
    console.log("Evento: ", event);
    if (event.checked) {
      this.materia.dias.push(event.source.value)
    } else {
      console.log(event.source.value);
      this.materia.dias.forEach((dia, i) => {
        if (dia == event.source.value) {
          this.materia.dias.splice(i, 1)
        }
      });
    }
    console.log("Array materias: ", this.materia);
  }
  public revisarSeleccion(nombre: string) {
    if (this.materia.dias) {
      var busqueda = this.materia.dias.find((element) => element == nombre);
      if (busqueda != undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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

  public letrasNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      !(charCode >= 48 && charCode <= 57) && //
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

  public getMaestros() {
    this.maestroService.obtenerListaMaestros().subscribe(
      (response) => {
        this.lista_maestros = response;

        this.lista_maestros.forEach(usuario => {
          usuario.first_name = usuario.user.first_name;
          usuario.last_name = usuario.user.last_name;
          usuario.viewValue = `${usuario.user.first_name} ${usuario.user.last_name}`;
        });

      }, (error) => {
        alert('NO');
      }
    )
  }

  public registrar() {
    this.errors = [];

    this.errors = this.materiaService.validarMateria(this.materia, this.editar);

    console.log(this.materia);
    console.log(this.errors);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    //REGISTRO DE LA MATERIA
    this.materiaService.registrarMateria(this.materia).subscribe(
      (response) => {
        // Aquí va la ejecución del servicio si todo es correcto
        alert("Materia registrada correctamente");
        console.log(`Materia registrada: ${response}`);
        if (this.token != "") {
          this.router.navigate(["home"]);
        } else {
          this.router.navigate(["/materias"]);
        }
      },
      (error) => {
        //Aquí se ejecuta el error
        alert("No se pudo registrar la materia");
      }
    )
  }

  public regresar() {
    this.location.back();
  }

  public actualizar() {
    //Validación
    this.errors = [];

    this.errors = this.materiaService.validarMateria(this.materia, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log("Pasó la validación");
    this.materiaService.editarMateria(this.materia).subscribe(
      (response) => {
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        //Si se editó, entonces mandar a la lista de materias
        this.router.navigate(["/materias"]);
      }, (error) => {
        alert("No se pudo editar el maestro");
      }
    );
  }
}
