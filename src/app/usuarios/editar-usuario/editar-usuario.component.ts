import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioForSend } from 'src/app/models/usuarioForSend';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit 
{
  public formUpdate: FormGroup;
  public idUsuario: Number;
  public usuario: Usuario;
  public usuarioUpdate: UsuarioForSend;
  public nombre: String;

  constructor(private formBuilder: FormBuilder, private router: Router, private usuariosService: UsuariosService) 
  { }

  ngOnInit(): void 
  {
    if(!localStorage.getItem("idUsuario"))
    {
      this.router.navigate(["/"]);
    }
    this.cargarForm();
    this.cargarDatos();
  }

  public cargarForm(): void
  {
    this.formUpdate = this.formBuilder.group({
      nombreUsuario: ['', Validators.compose([Validators.required])],
      fechaRegistro: ['', Validators.compose([Validators.required])],
      horaEntrada: ['', Validators.compose([Validators.required])],
      horaSalida: ['', Validators.compose([Validators.required])]
    });
  }

  public cargarDatos(): void
  {
    this.idUsuario = Number(localStorage.getItem("idUsuario"));

    this.usuariosService.getById(this.idUsuario).subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.usuario = response.body;
          console.log("usuario: " + JSON.stringify(this.usuario));
          this.formUpdate.controls['nombreUsuario'].setValue(this.usuario.userName);
          this.formUpdate.controls['fechaRegistro'].setValue(this.usuario.registerDate);
          this.formUpdate.controls['horaEntrada'].setValue(this.usuario.punchIn);
          this.formUpdate.controls['horaSalida'].setValue(this.usuario.punchOut);
        }

        if(response.status == 400)
        {
          console.log("usuario no encontrado");
        }
      }
    )  
  }

  public editarUsuario(): void
  {
    console.log("Id del usuario: " + this.idUsuario);
    this.usuarioUpdate = new UsuarioForSend(this.formUpdate.get('nombreUsuario').value, this.formUpdate.get('fechaRegistro').value, this.formUpdate.get('horaEntrada').value, this.formUpdate.get('horaSalida').value);
    console.log("productos a actualizar: " + JSON.stringify(this.usuarioUpdate));

    this.usuariosService.update(this.idUsuario, this.usuarioUpdate).subscribe(
      (response) => {
        if(response.status == 200)
        {
          console.log("usuario actualizado correctamente");
          this.router.navigate(["/"]);
        }
        if(response.status == 400)
        {
          console.log("el usuario no se actualizo correctamente");
        }
      }
    )
  }
}