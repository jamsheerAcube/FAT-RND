import { formatDate } from "@angular/common";
import { HttpParams } from "@angular/common/http";

export function prepareHttpParams(filter: any): HttpParams {
  let params = new HttpParams();
  if (filter != undefined)
    for (const key in filter) {
      if (filter[key] && filter[key] != undefined)
        params = params.append(key, filter[key]);
    }
  return params;
}

export function dateFormatter(params: any) {
  if (params.value) {
    var dateVal = new Date(params.value);
    if (dateVal)
      return formatDate(params.value, 'dd-MM-yyyy hh:mm:ss aa', 'en-US');
    else
      return '';
  }
  else
    return '';
}

export function getTodayStartTime() {
  return getFormatedDateWithStartTime(new Date());
}

export function getTodayEndTime() {
  return getFormatedDateWithEndTime(new Date());
}

export function dateValueFormatter(dateVal: any) {
  if (dateVal)
    return formatDate(dateVal, 'yyyy-MM-dd', 'en-US');
  else
    return '';
}

export function getFormatedDateWithStartTime(dateVal: Date) {
  return formatDate(dateVal, 'yyyy-MM-ddT00:00', 'en-US');
}

export function getFormatedDateWithEndTime(dateVal: Date) {
  return formatDate(dateVal, 'yyyy-MM-ddT23:59', 'en-US');
}

function monthDiff(d1: Date, d2: Date) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function dayDiff(d1: Date, d2: Date) {
  var diff = Math.abs(d1.getTime() - d2.getTime());
  var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  //console.log(diffDays);
  return diffDays;
}

export function getAllDays(startDate: Date, endDate: Date) {
  var dateArr: Date[] = [];
  var tempDate: Date = startDate;
  var monthsDiff = dayDiff(startDate, endDate);
  var indx = 0;
  while (indx <= monthsDiff) {
    dateArr.push(tempDate);
    //console.log(tempDate);
    tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);
    indx++;
  }
  //console.log(dateArr);
  return dateArr;
}

export function getAllMonths(startDate: Date, endDate: Date) {
  var dateArr: Date[] = [];
  var tempDate: Date = startDate;
  var monthsDiff = monthDiff(startDate, endDate);
  var indx = 0;
  while (indx <= monthsDiff) {
    //console.log(`tempDate:`, tempDate);
    dateArr.push(tempDate);
    //console.log(dateArr);
    tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1);
    indx++;
  }
  //console.log(dateArr);
  return dateArr;
}

export function getFirstDayOfMonth(dateInput: Date) {
  let y = dateInput.getFullYear();
  let m = dateInput.getMonth();
  return new Date(y, m, 1);
}

export function getLastDayOfMonth(dateInput: Date) {
  let y = dateInput.getFullYear();
  let m = dateInput.getMonth();
  return new Date(y, m + 1, 0);
}

export function dateAddDays(dateInput: Date, days: number): Date {
  let y = dateInput.getFullYear();
  let m = dateInput.getMonth();
  let d = dateInput.getDate();
  return new Date(y, m, d + (days));
}

export function dateAddMonths(dateInput: Date, months: number): Date {
  let y = dateInput.getFullYear();
  let m = dateInput.getMonth();
  let d = dateInput.getDate();
  return new Date(y, m + (months), d);
}

export function getMonthNameFromIndex(monthIndex: number) {
  let months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
}