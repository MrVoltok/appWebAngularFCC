import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias/materias.service';

@Component({
  selector: 'app-registro-materia-screen',
  templateUrl: './registro-materia-screen.component.html',
  styleUrls: ['./registro-materia-screen.component.scss']
})
export class RegistroMateriaScreenComponent implements OnInit {
  public materia: any = {};

  public isUpdate: boolean = false;
  public errors: any = {};
  public editar: boolean = false;

  public idMateria: Number = 0;

  constructor(
    public activatedRoute: ActivatedRoute,
    private materiaService: MateriasService,
  ) { }

  ngOnInit(): void {
    //El if valida si existe un parámetro en la URL
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID Materia: ", this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerMateriaByID();
    }
  }

  public obtenerMateriaByID() {
    this.materiaService.getMateriaByID(this.idMateria).subscribe(
      (response) => {
        this.materia = response;
        this.materia.nrc = response.nrc;
        this.materia.nombre = response.nombre;
        this.materia.seccion = response.seccion;
        this.materia.dias = response.dias;
        this.materia.hora_incio = response.hora_incio;
        this.materia.hora_fin = response.hora_fin;
        this.materia.salon = response.salon;
        this.materia.creditos = response.creditos;
        this.materia.profesor_asignado = response.profesor_asignado;
        this.materia.programa_educativo = response.programa_educativo;

        console.log("Datos materia: ", this.materia);
      }, (error) => {
        alert("No se pudieron obtener los datos de la materia para editar");
      }
    );
  }

}
