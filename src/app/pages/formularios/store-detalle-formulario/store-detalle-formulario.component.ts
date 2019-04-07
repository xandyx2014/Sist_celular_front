import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/interfaces/item.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetalleFormularioService } from 'src/app/services/detalle-formulario.service';

@Component({
  selector: 'app-store-detalle-formulario',
  templateUrl: './store-detalle-formulario.component.html',
  styleUrls: ['./store-detalle-formulario.component.css']
})
export class StoreDetalleFormularioComponent implements OnInit {
  myForm: FormGroup;
  items: Item[] = [];
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private detalleFormularioSv: DetalleFormularioService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StoreDetalleFormularioComponent>
  ) { }

  ngOnInit() {
    console.log( this.data );
    this.obtenerInformacionFormulario();
    this.crearFormulario();
  }

  obtenerInformacionFormulario() {
    this.itemService.showItem().subscribe( resp => {
      this.items = resp.data;
    });
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      descripcion: ['', Validators.required],
      precioTotal: ['', Validators.required],
      item_id: ['', Validators.required]
    });
  }
  storeDetalleFormulario() {
    this.detalleFormularioSv.storeDetalleFormulario({
      ...this.myForm.value,
       detalleFormulario_id: this.data.id})
       .subscribe( resp => {
        console.log( resp );
        this.dialogRef.close();
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
