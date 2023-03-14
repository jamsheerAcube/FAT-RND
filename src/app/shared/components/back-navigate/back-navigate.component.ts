import { Component } from '@angular/core';
import { NavigationService } from 'src/app/service/services/navigation.service';

@Component({
  selector: 'app-back-navigate',
  templateUrl: './back-navigate.component.html',
  styleUrls: ['./back-navigate.component.css']
})
export class BackNavigateComponent {
  constructor(private navigation: NavigationService) {}

  back(): void {
    this.navigation.back();
  }
}
