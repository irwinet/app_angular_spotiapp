import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {
    console.log('Spotify service ready...');
  }

  getQuery(query:string){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers=new HttpHeaders({
      'Authorization':'Bearer BQDD6VvjfgOxIt9u-RUhwFBWuBek4lpuuKFN4oUgw3yPbjWha3DzYVBU6MA5qZ0bBRylusQgnKM2gr97L_0'
    });

    return this.http.get(url, {headers});
  }

  getNewReleases(){
    return this.getQuery("browse/new-releases?limit=20")
                    .pipe(map(data=>data['albums'].items));
  }

  getArtistas(termino:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                    .pipe(map(data=>data['artists'].items));
  }

  getArtista(id:string){
    return this.getQuery(`artists/${id}`);
                    //.pipe(map(data=>data['artists'].items));
  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
                    .pipe(map(data=>data['tracks']));
  }
}
