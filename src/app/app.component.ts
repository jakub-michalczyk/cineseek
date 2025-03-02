import { Component } from '@angular/core';
import { TopbarComponent } from '../features/core/components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [TopbarComponent],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent {}
