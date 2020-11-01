import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  paises:any[]=[];
  nuevasCanciones:any[]=[];
  loading:boolean;
  mensajeError:string;

  error : boolean;

  constructor(private http:HttpClient,
              private spotify:SpotifyService) { 
    console.log("Constructor Home");
    // this.http.get("https://restcountries.eu/rest/v2/lang/es")
    //           .subscribe((resp:any)=>{
    //             this.paises = resp;
    //             console.log(resp);
    //           });
    
    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
                .subscribe((data:any)=>{
                  console.log(data);
                  this.nuevasCanciones = data;
                  this.loading = false;
                }, (errorServicio)=>{
                  this.error = true;
                  this.loading = false;
                  console.log(errorServicio);
                  this.mensajeError=errorServicio.error.error.message;
                });
  }

  ngOnInit(): void {
  }

}
