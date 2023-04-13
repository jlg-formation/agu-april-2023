import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../services/article.service';
import { Article } from '../interfaces/article';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy, OnInit {
  errorMsg = '';
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  selectedArticles = new Set<Article>();

  constructor(protected articleService: ArticleService) {
    console.log('articleService: ', articleService);
  }

  ngOnDestroy(): void {
    console.log('stock destroy');
  }

  ngOnInit(): void {
    if (this.articleService.articles$.value === undefined) {
      this.articleService
        .refresh()
        .pipe(
          catchError((err) => {
            this.errorMsg = err.message;
            return of(undefined);
          })
        )
        .subscribe();
    }
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      switchMap(() => {
        return this.articleService.refresh();
      }),
      tap(() => {
        this.selectedArticles.clear();
      })
    );
  }

  refresh(): Observable<void> {
    return this.articleService.refresh();
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
