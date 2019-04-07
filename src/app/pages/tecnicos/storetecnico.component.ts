import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-storetecnico',
  templateUrl: './storetecnico.component.html',
  styleUrls: ['./storetecnico.component.css']
})
export class StoretecnicoComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private tecnicoService: TecnicoService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<StoretecnicoComponent>,
    ) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      nombre: [this.data.nombre || '', Validators.required],
      direccion: [this.data.direccion || '', Validators.required],
      telefono: [this.data.telefono || '', Validators.required],
      correo: [this.data.correo || '', Validators.required]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  crearButton() {
    return Object.keys(this.data).length === 0;
  }
  storeTecnicos() {
    this.tecnicoService.storeTecnicos(this.myForm.value).subscribe( resp => {
      this.onNoClick();
    });
  }
  updateTecnico() {
    this.tecnicoService.updateTecnico({...this.myForm.value, id: this.data.id})
      .subscribe( resp => {
        console.log( resp );
        this.onNoClick();
      });
  }
}
