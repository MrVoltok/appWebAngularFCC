import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.scss']
})
export class RegistroAlumnoComponent implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  constructor() { }

  ngOnInit(): void {

  }
}
