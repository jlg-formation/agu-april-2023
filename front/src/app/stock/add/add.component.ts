import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay, of, switchMap, tap } from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  f = new FormGroup({
    name: new FormControl('Truc', [
      Validators.required,
      Validators.maxLength(3),
    ]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    qty: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  faPlus = faPlus;
  isSubmitting = false;

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  submit() {
    console.log('submit');
    of(void 0)
      .pipe(
        tap(() => {
          this.isSubmitting = true;
        }),
        delay(2000),
        switchMap(() => {
          const newArticle = this.f.value as NewArticle;
          return this.articleService.add(newArticle);
        }),
        switchMap(() => {
          return this.router.navigate(['..'], { relativeTo: this.route });
        }),
        tap(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe();
  }
}
