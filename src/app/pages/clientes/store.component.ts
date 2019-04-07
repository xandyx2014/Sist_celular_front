import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-storecliente',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreClienteComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StoreClienteComponent>,
    ) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      nombre: [ this.data.nombre || '', Validators.required],
      direccion: [ this.data.direccion || '', Validators.required],
      telefono: [ this.data.telefono || '', Validators.required],
      correo: [ this.data.correo || '', Validators.required]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buttonCrear() {
    return Object.keys(this.data).length === 0;
  }

  storeCliente() {
    this.clienteService.storeClientes(this.myForm.value).subscribe( resp => {
      this.onNoClick();
    });
  }

  updateCliente() {
    this.clienteService.updateCliente({ ...this.myForm.value, id: this.data.id}).subscribe( resp => {
      console.log( resp );
      this.onNoClick();
    });
  }
}
