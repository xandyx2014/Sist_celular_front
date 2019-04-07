import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { StorecategoriaComponent } from './storecategoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  titulo = '';
  categoria: Categoria[] = [];
  displayedColumns: string[] = ['id', 'Nombre', 'Descripcion', 'estado', 'actualizar', 'eliminar'];
  dataSource: MatTableDataSource<Categoria>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private activatedRouter: ActivatedRoute,
              private categoriaService: CategoriaService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.llenarTabla();
    this.activatedRouter.data.subscribe( ( data ) => {
        this.titulo = data.titulo;
    } );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(StorecategoriaComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  llenarTabla() {
    this.categoriaService.showCategoria().subscribe( resp => {
      this.categoria = resp.data;
      this.dataSource = new MatTableDataSource(this.categoria);
      this.paginator._intl.itemsPerPageLabel = 'Item por pagina';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  verEstado(elemento) {
    return elemento.deletedAt === null;
  }
  openUpdateDialog( categoria ) {
    const dialogRef = this.dialog.open(StorecategoriaComponent, {
      width: '250px',
      data: categoria
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  deleteCategoria(categoria) {
    this.categoriaService.deleteCategoria(categoria).subscribe( resp => {
      this.llenarTabla();
    });
  }
}
