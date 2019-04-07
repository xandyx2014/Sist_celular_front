import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { RecibosComponent } from './recibos/recibos.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ItemsComponent } from './items/items.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { DetalleComponent } from './detalle/detalle.component';


const routes: Routes = [
  {  path: 'clientes', component: ClientesComponent, data: { titulo: 'Clientes'}},
  {  path: 'recibos', component: RecibosComponent, data: { titulo: 'Recibos'} },
  {  path: 'tecnicos', component: TecnicosComponent, data: { titulo: 'Tecnicos'} },
  {  path: 'categorias', component: CategoriasComponent, data: { titulo: 'Categorias'}},
  {  path: 'items', component: ItemsComponent, data: { titulo: 'Items'} },
  {  path: 'formulario', component: FormulariosComponent, data: { titulo: 'Formulario'} },
  {  path: 'detalle/:id', component: DetalleComponent, data: { titulo: 'Detalle Formulario'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
