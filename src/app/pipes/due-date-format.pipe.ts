import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dueDateFormat'
})
export class DueDateFormatPipe implements PipeTransform {
  transform(value: Date | null): string | null {
    if (!value) return null;

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'MMM dd, yyyy');
  }
}