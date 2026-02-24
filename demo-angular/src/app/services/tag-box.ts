import { Injectable } from '@angular/core';
import {
    TagBoxDataProvider,
    TagBoxKey,
    TagBoxLoadResult,
    TagBoxParam,
} from '@cnx-dev/angular-devextreme';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TagBoxService implements TagBoxDataProvider {
    public getService(key: TagBoxKey, param: TagBoxParam): Observable<TagBoxLoadResult> {
        if (!key) return of({ data: [], totalCount: 0 });

        const method = (this as any)[key as string];
        if (typeof method === 'function') return method(param);

        console.warn('ไม่พบ endpoint สำหรับดึงข้อมูล: ' + key);
        return of(new TagBoxLoadResult());
    }

    public fruits(param: TagBoxParam): Observable<TagBoxLoadResult> {
        return of({
            data: [
                { text: 'Apple', value: 'apple', dropdownText: 'Apple' },
                { text: 'Banana', value: 'banana', dropdownText: 'Banana' },
                { text: 'Orange', value: 'orange', dropdownText: 'Orange' },
                { text: 'Mango', value: 'mango', dropdownText: 'Mango' },
                { text: 'Pineapple', value: 'pineapple', dropdownText: 'Pineapple' },
            ],
            totalCount: 5,
        });
    }

    public departments(param: TagBoxParam): Observable<TagBoxLoadResult> {
        return of({
            data: [
                { text: 'HR', value: 'hr', dropdownText: 'Human Resources' },
                { text: 'Sales', value: 'sales', dropdownText: 'Sales Department' },
                { text: 'IT', value: 'it', dropdownText: 'Information Technology' },
                { text: 'Finance', value: 'finance', dropdownText: 'Finance Department' },
            ],
            totalCount: 4,
        });
    }
}
