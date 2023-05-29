import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private emitter = new EventEmitter<boolean>();

  public listen(funcaoASerChamada: any) {
    this.emitter.subscribe(funcaoASerChamada);
  }

  public setLoading(loading: boolean) {
    this.emitter.emit(loading);
  }
}
