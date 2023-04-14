import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { Observable, catchError, delay, map, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Article, NewArticle } from '../interfaces/article';

export const url = 'http://localhost:3000/api/articles';

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
      delay(300),
      switchMap(() => {
        return this.http.get<Article[]>(url);
      }),
      catchError(() => {
        this.articles$.next([]);
        throw new Error('Erreur de chargement');
      }),
      map((articles) => {
        this.articles$.next(articles);
      })
    );
  }

  override add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      delay(300),
      switchMap(() => {
        return this.http.post<void>(url, newArticle);
      }),
      catchError((err) => {
        console.error('err: ', err);
        throw new Error('Erreur technique');
      })
    );
  }

  override remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(300),
      switchMap(() => {
        return this.http.delete<void>(url, { body: ids });
      }),
      catchError((err) => {
        console.error('err: ', err);
        throw new Error('Erreur technique');
      })
    );
  }
}
