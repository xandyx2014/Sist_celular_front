import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReciboService } from 'src/app/services/recibo.service';
import { Recibo } from 'src/app/interfaces/recibos.interface';


@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css']
})
export class RecibosComponent implements OnInit {
  titulo = '';
  recibos: Recibo[] = [];
  displayedColumns: string[] = ['id', 'formaDePago', 'garantia', 'recibo_id'];
  dataSource: MatTableDataSource<Recibo>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private activatedRouter: ActivatedRoute,
              private reciboService: ReciboService) { }

  ngOnInit() {
    this.reciboService.showRecibo().subscribe( resp => {
      this.recibos = resp.data;
      this.dataSource = new MatTableDataSource(this.recibos);
      this.paginator._intl.itemsPerPageLabel = 'Item por pagina';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.activatedRouter.data.subscribe( ( data ) => {
        this.titulo = data.titulo;
    } );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
