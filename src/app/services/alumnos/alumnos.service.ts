import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from './../tools/errors.service';;
import { ValidatorService } from './../tools/validator.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
    private validatorService: ValidatorService,
  ) { }

  public esquemaAlumno() {
    return {
      'id': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'birthdate': '',
      'curp': '',
      'rfc': '',
      'edad': '',
      'ocupacion': '',
      'telefono': ''
    }
  }

  public validarAlumno(data: any, editar: boolean) {
    console.log("Validando alumno... ", data);
    let error: any = [];
    if (!this.validatorService.required(data["id"])) {
      error["id"] = this.errorsService.required;
    }
    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorsService.required;
    }
    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorsService.required;
    }
    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorsService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorsService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorsService.email;
    }
    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorsService.required;
      }
      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorsService.required;
      }
    }
    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorsService.required;
    } else if (!this.validatorService.min(data["rfc"], 12)) {
      error["rfc"] = this.errorsService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    } else if (!this.validatorService.max(data["rfc"], 13)) {
      error["rfc"] = this.errorsService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    if (!this.validatorService.required(data["birthdate"])) {
      error["birthdate"] = this.errorsService.required;
      alert("Ingrese una fecha válida con el formato: MM/DD/AAAA");
    } else if (!this.validatorService.date(data["birthdate"])) {
      error["birthdate"] = this.errorsService.betweenDate;
    }


    if (!this.validatorService.required(data["edad"])) {
      error["edad"] = this.errorsService.required;
    } else if (!this.validatorService.numeric(data["edad"])) {
      alert("El formato es solo números");
    }
    if (!this.validatorService.required(data["curp"])) {
      error["curp"] = this.errorsService.required;
    } else if (!this.validatorService.min(data["curp"], 18)) {
      error["curp"] = this.errorsService.min(18);
      alert("La longitud de caracteres deL CURP deben ser 18");
    } else if (!this.validatorService.max(data["curp"], 18)) {
      error["curp"] = this.errorsService.max(18);
      alert("La longitud de caracteres deL CURP deben ser 18");
    }

    if (!this.validatorService.required(data["ocupacion"])) {
      error["ocupacion"] = this.errorsService.required;
    }


    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorsService.required;
    }
    else if (!this.validatorService.min(data["telefono"], 10)) {
      error["telefono"] = this.errorsService.min(10);
      alert("El número de teléfono debe contener 10 dígitos");
    } else if (!this.validatorService.max(data["telefono"], 10)) {
      error["telefono"] = this.errorsService.max(10);
      alert("El número de teléfono debe contener 10 dígitos");
    }
    //Return arreglo
    return error;
  }
}
