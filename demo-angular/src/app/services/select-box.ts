import { Injectable } from '@angular/core';
import {
    SelectBoxDataProvider,
    SelectBoxKey,
    SelectBoxLoadResult,
    SelectBoxParam,
} from '@cnx-dev/angular-devextreme';
import { Observable, of } from 'rxjs';

declare module '@cnx-dev/angular-devextreme' {
    export interface ModuleSelectBoxKey {
        currency: string;
    }
}

@Injectable({
    providedIn: 'root',
})
export class SelectBoxService implements SelectBoxDataProvider {
    public getService(key: SelectBoxKey, param: SelectBoxParam): Observable<SelectBoxLoadResult> {
        if (!key) return of({ data: [], totalCount: 0 });

        const method = (this as any)[key as string];
        if (typeof method === 'function') return method(param);

        console.warn('ไม่พบ endpoint สำหรับดึงข้อมูล: ' + key);
        return of(new SelectBoxLoadResult());
    }

    public currency(param: SelectBoxParam): Observable<SelectBoxLoadResult> {
        return of({
            data: [
                { text: 'USD', value: 'usd', dropdownText: 'USD' },
                { text: 'EUR', value: 'eur', dropdownText: 'EUR' },
                { text: 'GBP', value: 'gbp', dropdownText: 'GBP' },
            ],
            totalCount: 3,
        });
    }
}
