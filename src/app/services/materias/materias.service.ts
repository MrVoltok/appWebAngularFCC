import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from './../tools/errors.service';;
import { ValidatorService } from './../tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environments/environment';
import { FacadeService } from '../facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
    private validatorService: ValidatorService,
    private facadeService: FacadeService
  ) { }

  public esquemaMateria() {
    return {
      'nrc': '',
      'nombre': '',
      'seccion': '',
      'dias': [],
      'hora_inicio': '',
      'hora_fin': '',
      'salon': '',
      'programa_educativo': '',
      'profesor_asignado': '',
      'creditos': '',
    }
  }

  public validarMateria(data: any, editar: boolean) {
    console.log('Validando Materia...');
    let error: any = [];

    // NRC
    if (!this.validatorService.required(data['nrc'])) {
      error['nrc'] = this.errorsService.required;
    } else if (!this.validatorService.max(data["nrc"], 5)) {
      error["nrc"] = this.errorsService.max(5);
      alert("El NRC debe contener 5 dígitos");
    } else if (!this.validatorService.min(data["nrc"], 5)) {
      error["nrc"] = this.errorsService.min(5);
      alert("El NRC debe contener 5 dígitos");
    }

    // NOMBRE DE LA MATERIA
    if (!this.validatorService.required(data['nombre'])) {
      error['nombre'] = this.errorsService.required;
    }

    // SECCION
    if (!this.validatorService.required(data['seccion'])) {
      error['seccion'] = this.errorsService.required;
    } else if (!this.validatorService.max(data["seccion"], 3)) {
      error["seccion"] = this.errorsService.max(3);
      alert("La sección debe contener 3 dígitos");
    } else if (!this.validatorService.min(data["seccion"], 3)) {
      error["seccion"] = this.errorsService.min(3);
      alert("La seccion debe contener 3 dígitos");
    }

    // HORA INICIO
    console.log(data['hora_inicio']);
    if (!this.validatorService.required(data['hora_inicio'])) {
      error['hora_inicio'] = this.errorsService.required;
    }

    console.log(data['hora_fin']);
    // HORA FIN
    if (!this.validatorService.required(data['hora_fin'])) {
      error['hora_fin'] = this.errorsService.required;
    }

    // SALON
    if (!this.validatorService.required(data['salon'])) {
      error['salon'] = this.errorsService.required;
    }

    // PROGRAMA EDUCATIVO
    if (!this.validatorService.required(data['programa_educativo'])) {
      error['programa_educativo'] = this.errorsService.required;
    }

    // PROFESOR ASIGNADO
    if (!this.validatorService.required(data['profesor_asignado'])) {
      error['profesor_asignado'] = this.errorsService.required;
    }

    // CREDITOS
    if (!this.validatorService.required(data['creditos'])) {
      error['creditos'] = this.errorsService.required;
    } else if (!this.validatorService.max(data["creditos"], 2)) {
      error["creditos"] = this.errorsService.max(2);
      alert("Los créditos deben contener 2 dígitos");
    } else if (!this.validatorService.min(data["creditos"], 2)) {
      error["creditos"] = this.errorsService.min(2);
      alert("Los créditos deben contener 2 dígitos");
    }

    // DIAS
    if (!this.validatorService.arrayHasValues(data["dias"])) {
      error["dias"] = this.errorsService.emptyDias;
      alert(this.errorsService.emptyDias);
    }

    return error;
  }

  // /materias/
  // /lista-materias/
  // /materia-edit/

  // Registrar materia
  public registrarMateria(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/materias/`, data, httpOptions);
  }

  // Obtener lista de materias
  public obtenerListaMaterias(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, { headers: headers });
  }

  // Obtener una sola materia dependiendo su ID
  public getMateriaByID(idMateria: Number) {
    return this.http.get<any>(`${environment.url_api}/materias/?id=${idMateria}`, httpOptions);
  }

  // Actualizar materia
  public editarMateria(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/materia-edit/`, data, { headers: headers });
  }

  //Eliminar Materia
  public eliminarMateria(idMateria: number): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/materia-edit/?id=${idMateria}`, { headers: headers });
  }
}
