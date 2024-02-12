import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styles: ``
})
export class CardListComponent {

  @Input() public gifsCard: Gif[] = [];

}
