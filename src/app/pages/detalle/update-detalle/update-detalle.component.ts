import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DetalleFormularioService } from 'src/app/services/detalle-formulario.service';

@Component({
  selector: 'app-update-detalle',
  templateUrl: './update-detalle.component.html',
  styleUrls: ['./update-detalle.component.css']
})
export class UpdateDetalleComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<UpdateDetalleComponent>,
    private detalleService: DetalleFormularioService
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      descripcion: [this.data.descripcion || '', Validators.required],
      precioTotal: [this.data.precioTotal || '', Validators.required],
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  updateDetalle() {
    this.detalleService.updateDetalleFormulario({
      ...this.myForm.value,
      id: this.data.id,
      formulario_id: this.data.detalleFormulario_id,
      item_id: this.data.item_id
    }).subscribe( resp => {
      this.onNoClick();
    });
  }
}
