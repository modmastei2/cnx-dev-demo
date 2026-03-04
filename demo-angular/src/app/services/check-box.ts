import { Injectable } from '@angular/core';
import {
    CheckBoxDataProvider,
    CheckBoxKey,
    CheckBoxParam,
    CheckBoxViewModel,
} from '@cnx-dev/angular-devextreme';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CheckBoxService implements CheckBoxDataProvider {
    public getService(key: CheckBoxKey, param: CheckBoxParam): Observable<CheckBoxViewModel[]> {
        if (!key) return of([]);

        const method = (this as any)[key as string];
        if (typeof method === 'function') return method(param);

        console.warn('ไม่พบ endpoint สำหรับดึงข้อมูล: ' + key);
        return of([]);
    }

    public departments(_: CheckBoxParam): Observable<CheckBoxViewModel[]> {
        return of([
            { text: 'Engineering', value: 'eng', checked: false },
            { text: 'Human Resources', value: 'hr', checked: false },
            { text: 'Marketing', value: 'mkt', checked: false },
            { text: 'Sales', value: 'sales', checked: false },
            { text: 'Finance', value: 'fin', checked: false },
        ]);
    }

    public fruits(_: CheckBoxParam): Observable<CheckBoxViewModel[]> {
        return of([
            { text: 'Apple', value: 'apple', checked: false },
            { text: 'Banana', value: 'banana', checked: false },
            { text: 'Orange', value: 'orange', checked: false },
            { text: 'Mango', value: 'mango', checked: false },
        ]);
    }
}
