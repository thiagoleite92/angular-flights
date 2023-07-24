import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public loading = true;
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.listen((isLoading: boolean) => {
      this.loading = isLoading;
    });
  }
}
