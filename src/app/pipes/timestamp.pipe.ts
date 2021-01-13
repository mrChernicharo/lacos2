import { Pipe, PipeTransform } from '@angular/core';
import { IServerTimestamp } from '../models/cliente.model';
import { FormatOptions } from './custom-date.pipe';

@Pipe({
  name: 'timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(date: IServerTimestamp, config: FormatOptions): string {
    let formatedDate: string;
    const parsedDate = new Date(date.seconds * 1000);

    switch (config) {
      case 'dd/mm/yyyy':
        formatedDate = parsedDate.toLocaleDateString('pt-BR');
        break;
      case 'dd/mm':
        formatedDate = parsedDate.toLocaleDateString('pt-BR').substr(0, 5);
        break;
    }

    return formatedDate;
  }
}
