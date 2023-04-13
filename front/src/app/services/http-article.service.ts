import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/article';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private readonly http: HttpClient) {
    super();
    console.log('http article instantiated');
  }

  override refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        return this.http.get<Article[]>(url);
      }),
      catchError((err) => {
        this.articles$.next([]);
        throw new Error('Erreur de chargement');
      }),
      map((articles) => {
        this.articles$.next(articles);
      })
    );
  }
}
