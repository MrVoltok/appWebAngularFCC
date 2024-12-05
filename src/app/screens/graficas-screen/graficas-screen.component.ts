import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { GraphicsService } from 'src/app/services/extra/graphics.service';
@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit {
  //Agregar chartjs-plugin-datalabels
  //Variables
  public total_user: any = {};
  //Histograma
  lineChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de materias',
        backgroundColor: '#F88406'
      }
    ]
  }
  lineChartOption = {
    responsive: false
  }
  lineChartPlugins = [DatalabelsPlugin];
  //Barras
  barChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#82D3FB',
        ]
      }
    ]
  }
  barChartOption = {
    responsive: false
  }
  barChartPlugins = [DatalabelsPlugin];
  //Circular
  public pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#FCFF44',
          '#F1C8F2',
          '#31E731'
        ]
      }
    ]
  }
  pieChartOption = {
    responsive: false
  }
  pieChartPlugins = [DatalabelsPlugin];
  // Doughnut
  public doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: [
          '#F88406',
          '#FCFF44',
          '#31E7E7'
        ]
      }
    ]
  }
  doughnutChartOption = {
    responsive: false
  }
  doughnutChartPlugins = [DatalabelsPlugin];
  constructor(
    private graphicServices: GraphicsService
  ) { }
  ngOnInit(): void {
    this.obtenerTotalUsers();
    console.log("Data: ", this.doughnutChartData);
  }
  public obtenerTotalUsers() {
    this.graphicServices.countUsers().subscribe(
      (response) => {
        this.total_user = response;
        console.log("Total usuarios: ", this.total_user);

        this.doughnutChartData.datasets[0].data = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos,
        ];

        this.pieChartData.datasets[0].data = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos,
        ]

        this.barChartData.datasets[0].data = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos,
        ]

        this.lineChartData.datasets[0].data = [
          this.total_user.admins,
          this.total_user.maestros,
          this.total_user.alumnos,
        ]

        console.log("Total usuarios: ", this.total_user);
        console.log("Data actualizada: ", this.doughnutChartData.datasets[0].data);
      }, (error) => {
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }
}
