import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getCurrentDateTime(): Date {
    const dateTime: Date = new Date();
    dateTime.setMilliseconds(0);
    return dateTime;
  }

  getCurrentDateTimeToString(): string {
    const dateTime: Date = new Date();
    dateTime.setMilliseconds(0);
    return dateTime.toString();
  }
}
