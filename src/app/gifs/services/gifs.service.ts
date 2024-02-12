import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  } ;


  private apiKey: string = 'Ck7X8SCuBaXlCnvSEXVn7ypeEsw8JOvo';
  private serviceURL: string = 'http://api.giphy.com/v1/gifs';


  public gifsList: Gif[] = [];


  // 🔒
  private _tagsHistory: string[] = [];
  // 🗝️
  get tagsHistory() {
    return [...this._tagsHistory]
  }


  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;
    this.searchedTag( this._tagsHistory[0] );
  }


  private organizeHistory(tag : string){

    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }

    this._tagsHistory.length === 10 ? this._tagsHistory.pop() : null;

    this._tagsHistory.unshift(tag);

    this.saveLocalStorage();

  }


  public searchedTag( tag: string ): void {

    if(tag === '') return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 12)
      .set('q', tag)

    this.http.get<SearchResponse>(`${ this.serviceURL }/search`, { params })
      .subscribe( resp => {

        this.gifsList = resp.data;
      })

  }

  public reset(): void {
    this._tagsHistory = [];
    this.saveLocalStorage();
  }
}
