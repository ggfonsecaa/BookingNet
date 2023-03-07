import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    datosUsuarioEnSesion = new BehaviorSubject<LoginModel>(new LoginModel());
    apiUrl: string = "https://localhost:7204/api/v1/auth"

    constructor(private http: HttpClient) {
      this.VerificarSesionActual();
    }

    IdentificarUsuario(usuario: String, clave: String): Observable<LoginModel>{
      return this.http.post<LoginModel>(`${this.apiUrl}/login`, {
        UserEmail: usuario,
        PassWord: clave
      })
    }

    // RecuperarClave(usuario: RecuperarClaveModel): Observable<RecuperarClaveModel> {
    //   return this.http.post<RecuperarClaveModel>('http://localhost:3000/recuperarClave', usuario, {
    //     headers: new HttpHeaders({
    //       'Content-Type' : 'application/json'
    //     })
    //   })
    // }

    VerificarSesionActual() {
      let datos = this.ObtenerInformacionSesion();
      if (datos) {
        this.RefrescarDatosSesion(datos);
      }
    }

    AlmacenarSesion(datos: LoginModel) {
      datos.IsLoggedIn = true;
      let stringDatos = JSON.stringify(datos);
      localStorage.setItem("datosSesion", stringDatos);
      this.RefrescarDatosSesion(datos);
    }

    ObtenerDatosUsuarioEnSesion() {
      return this.datosUsuarioEnSesion.asObservable();
    }

    RefrescarDatosSesion(datos: LoginModel) {
      this.datosUsuarioEnSesion.next(datos);
    }

    ObtenerInformacionSesion() {
      let datosString = localStorage.getItem("datosSesion");
      if(datosString) {
        let datos = JSON.parse(datosString);
        return datos;
      } else {
        return false;
      }
    }

    EliminarInformacionSesion(){
      localStorage.removeItem("datosSesion");
      this.RefrescarDatosSesion(new LoginModel());
    }

    SeHaIniciadoSesion() {
      let datosString = localStorage.getItem("datosSesion");
      return datosString;
    }

    ObtenerIdUsuarioSesion() {
      let datosString = localStorage.getItem("datosSesion");
      if (datosString) {
        let datos = JSON.parse(datosString);
        return datos.datos.id;
      } else {
        return '';
      }
    }

    ObtenerToken() {
      let datosString = localStorage.getItem("datosSesion");
      if (datosString) {
        let datos = JSON.parse(datosString);
        return datos.Data.Token;
      } else {
        return '';
      }
    }
}
