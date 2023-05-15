import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListaUsuariosComponent,
    EditarUsuarioComponent,
    DetalleUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ListaUsuariosComponent,
  ]
})
export class UsuariosModule { }
