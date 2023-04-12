import { Component, OnDestroy } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;

  constructor(protected articleService: ArticleService) {
    console.log('articleService: ', articleService);
    setTimeout(() => {
      articleService.add({ name: 'Truc', price: 3.45, qty: 23 }).subscribe();
    }, 2000);
  }

  ngOnDestroy(): void {
    console.log('stock destroy');
  }
}
