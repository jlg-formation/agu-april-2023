import { Component, OnDestroy } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';
import { Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  selectedArticles = new Set<Article>();
  errorMsg = '';

  constructor(protected articleService: ArticleService) {
    console.log('articleService: ', articleService);
  }

  ngOnDestroy(): void {
    console.log('stock destroy');
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      tap(() => {
        this.selectedArticles.clear();
      })
    );
  }

  resetErrorMsg() {
    this.errorMsg = '';
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  setErrorMsg(error: Error) {
    this.errorMsg = error.message;
  }
}
