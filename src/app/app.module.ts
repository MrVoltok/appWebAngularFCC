import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroUsuariosScreenComponent } from './screens/registro-usuarios-screen/registro-usuarios-screen.component';

//Componentes
import { NavbarComponent } from './partials/navbar/navbar.component';
// ELEMENTOS ANGULAR MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
// import { ReactiveFormsModule } from '@angular/forms';

//Partials
import { RegistroAdminComponent } from './partials/registro-admin/registro-admin.component';
import { RegistroAlumnoComponent } from './partials/registro-alumno/registro-alumno.component';
import { RegistroMaestroComponent } from './partials/registro-maestro/registro-maestro.component';

import { NgChartsModule } from 'ng2-charts';

//Para usar el mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { RegistroMateriaScreenComponent } from './screens/registro-materia-screen/registro-materia-screen.component';
import { RegistroMateriaComponent } from './partials/registro-materia/registro-materia.component';
import { MateriaScreenComponent } from './screens/materia-screen/materia-screen.component';
import { EliminarMateriaModalComponent } from './modals/eliminar-materia-modal/eliminar-materia-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroUsuariosScreenComponent,
    NavbarComponent,
    RegistroAdminComponent,
    RegistroAlumnoComponent,
    RegistroMaestroComponent,
    HomeScreenComponent,
    AlumnosScreenComponent,
    MaestrosScreenComponent,
    AdminScreenComponent,
    GraficasScreenComponent,
    RegistroMateriaScreenComponent,
    RegistroMateriaComponent,
    MateriaScreenComponent,
    EliminarMateriaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMaskDirective,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    NgChartsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    // ReactiveFormsModule
  ],
  providers: [
    provideNgxMask(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
