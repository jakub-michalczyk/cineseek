import { Component } from '@angular/core';
import { TopbarComponent } from '../features/core/components/topbar/topbar.component';
import { SearchViewComponent } from '../features/search/components/search-view/search-view.component';

@Component({
  selector: 'app-root',
  imports: [TopbarComponent, SearchViewComponent],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent {}
