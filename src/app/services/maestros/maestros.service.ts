import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from '../tools/errors.service';
import { ValidatorService } from '../tools/validator.service';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(
    private htttp: HttpClient,
    private errorsService: ErrorsService,
    private validatorService: ValidatorService,
  ) { }

  public esquemaMatestro() {
    return {
      'id': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'birthdate': '',
      'telefono': '',
      'rfc': '',
      'cubiculo': '',
      'area_investigacion': '',
      'materias_json': [],
    }
  }

  public validarMaestro(data: any, editar: boolean) {
    console.log("Validando maestro... ", data);

    console.log('...');
    console.log(`materias: ${data["materias_json"]}`);
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

    if (!this.validatorService.required(data["birthdate"])) {
      error["birthdate"] = this.errorsService.required;
    } else if (!this.validatorService.date(data["birthdate"])) {
      error["birthdate"] = this.errorsService.betweenDate;
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

    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorsService.required;
    } else if (!this.validatorService.min(data["rfc"], 12)) {
      error["rfc"] = this.errorsService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    } else if (!this.validatorService.max(data["rfc"], 13)) {
      error["rfc"] = this.errorsService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    if (!this.validatorService.required(data["cubiculo"])) {
      error["cubiculo"] = this.errorsService.required;
    }

    if (!this.validatorService.required(data["area_investigacion"])) {
      error["area_investigacion"] = this.errorsService.required;
    }

    if (!this.validatorService.arrayHasValues(data["materias_json"])) {
      error["materias_json"] = this.errorsService.emptyArray;
      alert(this.errorsService.emptyArray);
    }
    //Return arreglo
    return error;
  }
}
