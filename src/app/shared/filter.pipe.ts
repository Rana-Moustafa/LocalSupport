import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})

export class FilterPipe  implements PipeTransform {
    transform(items: string): any {
        return items.replace(/<.*?>/g, '');
    }
}
