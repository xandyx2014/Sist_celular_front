import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoriasComponent } from './categorias/categorias.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { ItemsComponent } from './items/items.component';
import { RecibosComponent } from './recibos/recibos.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { StoreClienteComponent } from './clientes/store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoretecnicoComponent } from './tecnicos/storetecnico.component';
import { StorecategoriaComponent } from './categorias/storecategoria.component';
import { StoreFormularioComponent } from './formularios/store-formulario.component';
import { StoreItemComponent } from './items/store-item.component';
import { StoreDetalleFormularioComponent } from './formularios/store-detalle-formulario/store-detalle-formulario.component';
import { DetalleComponent } from './detalle/detalle.component';
import { UpdateDetalleComponent } from './detalle/update-detalle/update-detalle.component';

@NgModule({
  declarations: [
    CategoriasComponent,
    ClientesComponent,
    FormulariosComponent,
    ItemsComponent,
    RecibosComponent,
    TecnicosComponent,
    StoreClienteComponent,
    StoretecnicoComponent,
    StorecategoriaComponent,
    StoreFormularioComponent,
    StoreItemComponent,
    StoreDetalleFormularioComponent,
    DetalleComponent,
    UpdateDetalleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    StoreClienteComponent,
    StoretecnicoComponent,
    StorecategoriaComponent,
    StoreFormularioComponent,
    StoreItemComponent,
    StoreDetalleFormularioComponent,
    UpdateDetalleComponent
  ]
})
export class PagesModule { }
