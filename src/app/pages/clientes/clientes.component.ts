import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StoreClienteComponent } from './store.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  titulo = '';
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono', 'correo', 'estado', 'actualizar', 'eliminar'];
  dataSource: MatTableDataSource<Cliente>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRouter: ActivatedRoute,
              private clienteService: ClienteService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.llenarTabla();
    this.activatedRouter.data.subscribe( ( data ) => {
        this.titulo = data.titulo;
    } );
  }
  verEstado(elemento) {
    return elemento.deletedAt === null;
  }
  llenarTabla() {
    this.clienteService.showClientes().subscribe(resp => {
      this.clientes = resp.data;
      this.dataSource = new MatTableDataSource(this.clientes);
      this.paginator._intl.itemsPerPageLabel = 'Item por pagina';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StoreClienteComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  openUpdateDialog( cliente ) {
    const dialogRef = this.dialog.open(StoreClienteComponent, {
      width: '250px',
      data: { ...cliente, actualizar: true}
    });
    dialogRef.afterClosed().subscribe( () => {
      this.llenarTabla();
    });
  }
  deleteUser(cliente) {
    this.clienteService.deleteCliente(cliente).subscribe( resp => {
      this.llenarTabla();
    });
  }
}
