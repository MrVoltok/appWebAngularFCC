import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-maestro',
  templateUrl: './registro-maestro.component.html',
  styleUrls: ['./registro-maestro.component.scss']
})
export class RegistroMaestroComponent implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  constructor() { }

  ngOnInit(): void {

  }

}
