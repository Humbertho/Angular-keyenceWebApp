import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioForSend } from 'src/app/models/usuarioForSend';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit
{
  public usuariosLista: Usuario[] = [];
  public usuariosListaExcel: Array<any> = [];
  public usuarioSend: UsuarioForSend;
  public excelData: any;
  public banderaListaExcel : Boolean = false;
  public memoriaTemporalId: Number = 0;
  public memoriaTemporalUserName: String = "";

  constructor(private usuariosService: UsuariosService, private router: Router)
  {

  }

  ngOnInit(): void
  {
    this.cargarUsuarios();
  }

  public onFileChange(evt: any)
  {
    const target : DataTransfer = <DataTransfer>(evt.target);

    if(target.files.length !== 1)
    {
      console.log("No puedes usar multiples archivos");      
    }

    let file = evt.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (e) => {

      var workBook = XLSX.read(fileReader.result, {type: 'binary'});
      var sheetNames = workBook.SheetNames;
      
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]], {raw: false});

      for(const itemFila of this.excelData)
      { 
        var auxID = itemFila['User ID'];
        var auxNombre = itemFila['User Name'];
        var auxDate = itemFila['Date'];
        var auxPunchIn = itemFila['Punch In'];
        var auxPunchOut = itemFila['Punch Out'];
        this.usuariosListaExcel.push(new UsuarioForSend(auxNombre, auxDate, auxPunchIn, auxPunchOut));
      }
      this.banderaListaExcel = true;
      //console.log("final: " + JSON.stringify(this.usuariosListaExcel));
    } 
  }

  public cargarUsuarios(): void
  {
    console.log("Cargar usuario");

    this.usuariosService.usuariosAll().subscribe(
      (response) => {
        if(response.status == 200)
        {
          this.usuariosLista = response.body;
          //console.log("usuarios: " + JSON.stringify(this.usuariosLista));
        }

        if(response.status == 400)
        {
          console.log("usuarios no encontrados");
        }
      }
    )
  }

  public subirId(id: Number)
  {
    localStorage.setItem("idUsuario", String(id));
  }

  public limpiar(): void
  {
    this.banderaListaExcel = false;
    this.usuariosListaExcel = [];
  }

  public guardarDatos(): void
  {
    this.usuariosService.saveAll(this.usuariosListaExcel).subscribe(
      (response) => {
        if(response.status == 200)
        {
          console.log("usuarios subidos correctamente");
          this.cargarUsuarios();
        }

        if(response.status == 400)
        {
          console.log("los usuarios no se guardaron correctamente");
        }
      }
    )
  }

  public memoriaTemporal(id: Number, userName: String): void
  {
    this.memoriaTemporalId = null;
    this.memoriaTemporalUserName = null;
    this.memoriaTemporalId = id;
    this.memoriaTemporalUserName = userName;
  }

  public borrarUsuario(id: Number): void
  {
    this.usuariosService.delete(id).subscribe(
      (response) => {
        if(response.status == 200)
        {
          console.log("usuario eliminado correctamente");
          this.cargarUsuarios();
        }

        if(response.status == 400)
        {
          console.log("el usuario no se elimino correctamente");
        }
      }
    )
  }
}
