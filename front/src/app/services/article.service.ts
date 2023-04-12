import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { generateId } from 'src/misc';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: Article[] = [
    { id: 'a1', name: 'Tournevis', price: 2.99, qty: 123 },
    { id: 'a2', name: 'Pelle', price: 3.5, qty: 45 },
  ];

  articles$ = new BehaviorSubject(this.articles);

  constructor() {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        const article: Article = {
          id: generateId(),
          ...newArticle,
        };
        this.articles.push(article);
        this.articles$.next(this.articles);
      })
    );
  }
}
