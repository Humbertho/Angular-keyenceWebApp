import { Routes } from "@angular/router";
import { DetalleUsuarioComponent } from "src/app/usuarios/detalle-usuario/detalle-usuario.component";
import { EditarUsuarioComponent } from "src/app/usuarios/editar-usuario/editar-usuario.component";
import { ListaUsuariosComponent } from "src/app/usuarios/lista-usuarios/lista-usuarios.component";

export const appRoute: Routes = [
    {
        path:'',
        pathMatch: 'full',
        component: ListaUsuariosComponent,
    },
    {
        path:'detail/:id',
        pathMatch: 'full',
        component: DetalleUsuarioComponent,
    },
    {
        path:'editar/:id',
        pathMatch: 'full',
        component: EditarUsuarioComponent,
    },
    {
        path:'**',
        redirectTo: '',
        pathMatch: 'full'
    }
]