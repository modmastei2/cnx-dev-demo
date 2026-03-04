import { Injectable } from '@angular/core';
import {
    RadioGroupDataProvider,
    RadioGroupKey,
    RadioGroupParam,
    RadioGroupViewModel,
} from '@cnx-dev/angular-devextreme';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RadioGroupService implements RadioGroupDataProvider {
    public getService(
        key: RadioGroupKey,
        param: RadioGroupParam,
    ): Observable<RadioGroupViewModel[]> {
        if (!key) return of([]);

        const method = (this as any)[key as string];
        if (typeof method === 'function') return method(param);

        console.warn('ไม่พบ endpoint สำหรับดึงข้อมูล: ' + key);
        return of([]);
    }

    public departments(_: RadioGroupParam): Observable<RadioGroupViewModel[]> {
        return of([
            { text: 'Engineering', value: 'eng' },
            { text: 'Human Resources', value: 'hr' },
            { text: 'Marketing', value: 'mkt' },
            { text: 'Sales', value: 'sales' },
            { text: 'Finance', value: 'fin' },
        ]);
    }

    public fruits(_: RadioGroupParam): Observable<RadioGroupViewModel[]> {
        return of([
            { text: 'Apple', value: 'apple' },
            { text: 'Banana', value: 'banana' },
            { text: 'Orange', value: 'orange' },
            { text: 'Mango', value: 'mango' },
        ]);
    }
}
