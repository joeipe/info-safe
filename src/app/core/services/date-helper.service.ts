import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor() { }

  getISOShortDateFormat(dateString: string): string {
    let [day, month, year] = dateString.split('/')
    const dateObj = new Date(Date.UTC(+year, +month - 1, +day)).toISOString()
    var shortDateObj = dateObj.split('T')[0];
    return shortDateObj;
  }

  getStandardDateFormat(isoShortDate: string): string {
    let [year, month, day] = isoShortDate.split('-');
    var standardDateObj = `${day}/${month}/${year}`;
    return standardDateObj;
  }
}
