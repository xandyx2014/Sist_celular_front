import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Tecnico } from 'src/app/interfaces/tecnico.interface';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { MatDialog } from '@angular/material';
import { StoretecnicoComponent } from './storetecnico.component';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.css']
})
export class TecnicosComponent implements OnInit {
  titulo = '';
  tecnicos: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono', 'correo', 'estado', 'actualizar', 'eliminar'];
  dataSource: MatTableDataSource<Tecnico>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private activatedRouter: ActivatedRoute,
              private tecnicoService: TecnicoService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.llenarTabla();
    this.activatedRouter.data.subscribe( ( data ) => {
        this.titulo = data.titulo;
    } );
  }
  llenarTabla() {
    this.tecnicoService.showTecnicos().subscribe( resp => {
      this.tecnicos = resp.data;
      this.dataSource = new MatTableDataSource(this.tecnicos);
      this.paginator._intl.itemsPerPageLabel = 'Item por pagina';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(StoretecnicoComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  verEstado(elemento) {
    return elemento.deletedAt === null;
  }
  openUpdateDialog(tecnico) {
    const dialogRef = this.dialog.open(StoretecnicoComponent, {
      width: '250px',
      data: tecnico
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  deleteTecnico(tecnico) {
    this.tecnicoService.deleteTecnico(tecnico).subscribe( resp => {
      this.llenarTabla();
    });
  }
}
