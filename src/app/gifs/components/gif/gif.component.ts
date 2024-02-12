import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-gif',
  templateUrl: './gif.component.html',
})
export class GifComponent implements OnInit {

  @Input() public gif!: Gif;

  ngOnInit(): void {
    if( !this.gif ) throw new Error ('Gif property is required');
  }

}
