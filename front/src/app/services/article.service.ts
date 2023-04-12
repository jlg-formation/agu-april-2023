import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { BehaviorSubject } from 'rxjs';

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
}
