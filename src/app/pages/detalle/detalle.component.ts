import { Component, OnInit, ViewChild } from '@angular/core';
import { DetalleFormularioService } from 'src/app/services/detalle-formulario.service';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { DetallesFormulario, Item, Categorium, Data, Tecnico } from '../../interfaces/detalle.interface';
import Swal from 'sweetalert2';
import { UpdateDetalleComponent } from './update-detalle/update-detalle.component';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  titulo = '';
  cliente: Data;
  tecnico: Tecnico;
  totalPagar = 0;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  detalles: DetallesFormulario[] = [];
  displayedColumns: string[] = [ 'id',
    'descripcion',
    'precioTotal',
    'estado',
    'detalleFormulario_id',
    'item_id',
    'categoria',
    'actualizar',
    'eliminar'
    ];
  dataSource: MatTableDataSource<DetallesFormulario>;
  constructor(private detalleFormulario: DetalleFormularioService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.obtenerInformacion();
    this.obtenerTitulo();
  }
  verEstado(elemento) {
    return elemento.deletedAt === null;
  }
  obtenerInformacion() {
   this.activatedRoute.params.subscribe( resp => {
     const id = resp.id;
     this.detalleFormulario.indexDetalleFormulario(id).subscribe( res => {
        this.tecnico = res.data[0].Formularios[0].Tecnico;
        this.cliente = res.data[0];
        this.llenarTabla(res.data[0].Formularios[0].DetallesFormularios);
     });
   });
  }
  obtenerTitulo() {
    this.activatedRoute.data.subscribe( ( data ) => {
      this.titulo = data.titulo;
  } );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  llenarTabla(data) {
    this.detalles = data;
    this.sumatoriaTotal();
    this.dataSource = new MatTableDataSource(this.detalles);
    this.paginator._intl.itemsPerPageLabel = 'Item por pagina';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  sumatoriaTotal() {
    this.totalPagar = Object.keys(this.detalles).reduce( (previus, key: any) => {
      if (this.detalles[key].deletedAt === null) {
        return previus + Number(this.detalles[key].precioTotal);
      } else {
        return previus + 0;
      }
    }, 0);
  }

  verItem( item: Item) {
    Swal.fire({
      title: item.nombre,
      text: `
      Marca: ${item.marca}
      Modelo: ${item.modelo}
      `,
    });
  }
  verCategoria( categoria: Categorium ) {
    Swal.fire({
      title: categoria.Nombre,
      text: categoria.Descripcion
    });
  }
  openDialog(element): void {
    const dialogRef = this.dialog.open(UpdateDetalleComponent, {
      width: '250px',
      data: {...element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerInformacion();
    });
  }
  deleteDetalle(detalle) {
    this.detalleFormulario.deleteDetalleFormulario(detalle).subscribe( resp => {
      this.obtenerInformacion();
    });
  }

}
