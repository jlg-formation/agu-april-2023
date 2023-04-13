import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleService } from './services/article.service';
import { HttpArticleService } from './services/http-article.service';

import { registerLocaleData } from '@angular/common';
import localeFrBe from '@angular/common/locales/fr-BE';

registerLocaleData(localeFrBe, 'fr-frameries');

@NgModule({
  declarations: [AppComponent, HomeComponent, LegalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [
    { provide: ArticleService, useClass: HttpArticleService },
    { provide: LOCALE_ID, useValue: 'fr-frameries' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
