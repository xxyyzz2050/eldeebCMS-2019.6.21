import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EldeebService {
  constructor() {
    console.log('*** EldeebService ***');
  }

  test() {
    console.log('*** EldeebService.test() ***');
  }
}
