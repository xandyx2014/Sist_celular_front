import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item.interface';
import { MatDialog } from '@angular/material';
import { StoreItemComponent } from './store-item.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  titulo = '';
  items: Item[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'marca', 'modelo', 'estado', 'categoria_id', 'actualizar', 'eliminar'];
  dataSource: MatTableDataSource<Item>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private activatedRouter: ActivatedRoute,
              private itemService: ItemService,
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
  verEstado(elemento) {
    return elemento.deletedAt === null;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(StoreItemComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  openUpdateDialog( item ) {
    const dialogRef = this.dialog.open(StoreItemComponent, {
      width: '250px',
      data: item
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  llenarTabla(): any {
    this.itemService.showItem().subscribe( resp => {
      this.items = resp.data;
      this.dataSource = new MatTableDataSource(this.items);
      this.paginator._intl.itemsPerPageLabel = 'Item por pagina';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteItem( item ) {
    this.itemService.deleteItem(item).subscribe(resp => {
      this.llenarTabla();
    });
  }
}
