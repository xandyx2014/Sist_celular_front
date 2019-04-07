import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { zip } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Tecnico } from 'src/app/interfaces/tecnico.interface';
import * as moment from 'moment';
@Component({
  selector: 'app-store-formulario',
  templateUrl: './store-formulario.component.html',
  styleUrls: ['./store-formulario.component.css']
})
export class StoreFormularioComponent implements OnInit {
  myForm: FormGroup;
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];
  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StoreFormularioComponent>,
  ) { }

  ngOnInit() {
    console.log( this.data );
    this.obtenerInformacionFormulario();
    this.crearFormulario();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buttonCrear() {
    return Object.keys(this.data).length === 0;
  }
  storeFormulario(): void {
    const formulario = {...this.myForm.value};
    this.formularioService.storeFormulario({
      fechaPedido: moment(formulario.fechaPedido).format('YYYY/MM/DD'),
      fechaEntrega: moment(formulario.fechaEntrega).format('YYYY/MM/DD'),
      cliente_id: formulario.cliente_id,
      tecnico_id: formulario.tecnico_id
    }).subscribe( resp => {
      console.log( resp );
    });
    this.dialogRef.close();
  }
  obtenerInformacionFormulario() {
    zip(
      this.clienteService.showClientes(),
      this.tecnicoService.showTecnicos()
      ).subscribe( ([cliente, tecnico]) => {
        this.clientes = cliente.data;
        this.tecnicos = tecnico.data;
      });
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      fechaPedido: [ new Date(this.data.fechaPedido) || '', Validators.required],
      fechaEntrega: [new Date(this.data.fechaEntrega) || '', Validators.required],
      cliente_id: [ this.data.cliente_id ||  '', Validators.required],
      tecnico_id: [ this.data.tecnico_id || '', Validators.required]
    });
  }
  updateFormulario(): void {
    const formulario = {...this.myForm.value};
    this.formularioService.updateFormulario({
      ...this.data,
      id: this.data.id,
      fechaPedido: moment(formulario.fechaPedido).format('YYYY/MM/DD'),
      fechaEntrega: moment(formulario.fechaEntrega).format('YYYY/MM/DD'),
      cliente_id: formulario.cliente_id,
      tecnico_id: formulario.tecnico_id
    }).subscribe( resp => {
      this.dialogRef.close();
    });
    this.dialogRef.close();
  }

}
