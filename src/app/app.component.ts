import { Component } from '@angular/core';
import { commonService } from './shared/common.service';

@Component({
  selector: 'fc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  pageTitle: string = 'News Articles';
  constructor(private commonService: commonService) {

  }
}
