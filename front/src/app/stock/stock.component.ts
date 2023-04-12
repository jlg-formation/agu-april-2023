import { Component } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  faRotateRight = faRotateRight;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  articles: Article[] = [
    { id: 'a1', name: 'Tournevis', price: 2.99, qty: 123 },
    { id: 'a2', name: 'Pelle', price: 3.5, qty: 45 },
  ];
}
