import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormularioService } from 'src/app/services/formulario.service';
import { MatDialog } from '@angular/material';
import { StoreFormularioComponent } from './store-formulario.component';
import { StoreDetalleFormularioComponent } from './store-detalle-formulario/store-detalle-formulario.component';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {
  titulo = '';
  formularios: Formulario[];
  displayedColumns: string[] = ['id', 'fechaPedido', 'fechaEntrega', 'estado',
  'cliente_id', 'tecnico_id', 'actualizar' , 'insertar', 'detalle', 'recibo', 'eliminar'];
  dataSource: MatTableDataSource<Formulario>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private activatedRouter: ActivatedRoute,
              private formularioService: FormularioService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.llenarTabla();
    this.activatedRouter.data.subscribe( ( data ) => {
        this.titulo = data.titulo;
    } );
  }
  verEstado(elemento) {
    return elemento.deletedAt === null;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(): void {
    this.open( {} , StoreFormularioComponent);
  }
  openDetalleDialog(id) {
    this.open( {id}, StoreDetalleFormularioComponent);
  }
  openUpdateDialog( formulario ) {
    this.open( formulario , StoreFormularioComponent);
  }
  verDetalle(id) {
    this.router.navigate(['pages/detalle', id]);
  }

  open(data, component) {
    const dialogRef = this.dialog.open(component, {
      width: '250px',
      data: { ...data}
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  llenarTabla(): void {
    this.formularioService.showFormulario().subscribe( resp => {
      this.formularios = resp.data;
      this.dataSource = new MatTableDataSource(this.formularios);
      this.paginator._intl.itemsPerPageLabel = 'Item por pagina';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  pdfFormulario(id) {
    return `http://localhost:3000/recibos/${id}`;
  }
  deleteFormularios(formulario) {
    this.formularioService.deleteFormulario(formulario).subscribe( resp => {
      this.llenarTabla();
    });
  }
}
