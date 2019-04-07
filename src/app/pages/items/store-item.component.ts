import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StoreClienteComponent } from '../clientes/store.component';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.css']
})
export class StoreItemComponent implements OnInit {
  myForm: FormGroup;
  categorias: Categoria[] = [];
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data,
    private categoriaService: CategoriaService,
    public dialogRef: MatDialogRef<StoreClienteComponent>,
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.obtenerCategorias();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  crearFormulario() {
    this.myForm = this.fb.group({
      nombre: [this.data.nombre || ' ', Validators.required],
      marca: [this.data.marca || ' ', Validators.required],
      modelo: [this.data.modelo || ' ', Validators.required],
      categoria_id: [this.data.categoria_id || ' ', Validators.required]
    });
  }
  obtenerCategorias() {
    this.categoriaService.showCategoria().subscribe( resp => {
      this.categorias = resp.data;
    });
  }
  buttonCrear() {
    return Object.keys(this.data).length === 0;
  }
  storeItem() {
    this.itemService.storeItem(this.myForm.value).subscribe( resp => {
      this.dialogRef.close();
    });
  }
  updateItem() {
    this.itemService.updateItem({...this.myForm.value, id: this.data.id}).subscribe( (resp) => {
      console.log( resp );
      this.onNoClick();
    });
  }

}
