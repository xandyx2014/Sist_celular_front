import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-storecategoria',
  templateUrl: './storecategoria.component.html',
  styleUrls: ['./storecategoria.component.css']
})
export class StorecategoriaComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StorecategoriaComponent>,
    ) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      Nombre: [this.data.Nombre || '', Validators.required],
      Descripcion: [this.data.Descripcion || ''],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  crearButton() {
    return Object.keys(this.data).length === 0;
  }

  storeCliente() {
    this.categoriaService.storeCategoria(this.myForm.value).subscribe( resp => {
      this.onNoClick();
    });
  }
  updateCategoria() {
    this.categoriaService.updateCategoria({...this.myForm.value, id: this.data.id})
      .subscribe( resp => {
        this.onNoClick();
        console.log( resp );
      });
  }
}
