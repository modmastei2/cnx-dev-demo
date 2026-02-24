import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    CnxSelectBoxModule,
    CnxTagBoxModule,
    CnxDateBoxModule,
    CnxNumberBoxModule,
    CnxCheckBoxGroupModule,
    CnxRadioGroupModule,
    SelectBoxViewModel,
} from '@cnx-dev/angular-devextreme';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        CnxSelectBoxModule,
        CnxTagBoxModule,
        CnxDateBoxModule,
        CnxNumberBoxModule,
        CnxCheckBoxGroupModule,
        CnxRadioGroupModule,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    // Standard Data Source using {text, value}
    fruits: SelectBoxViewModel[] = [
        { text: 'Apple', value: 'apple', dropdownText: 'Apple' },
        { text: 'Banana', value: 'banana', dropdownText: 'Banana' },
        { text: 'Orange', value: 'orange', dropdownText: 'Orange' },
        { text: 'Mango', value: 'mango', dropdownText: 'Mango' },
        { text: 'Strawberry', value: 'strawberry', dropdownText: 'Strawberry' },
        { text: 'Pineapple', value: 'pineapple', dropdownText: 'Pineapple' },
    ];

    departments: SelectBoxViewModel[] = [
        { text: 'Engineering', value: 'eng', dropdownText: 'Engineering' },
        { text: 'Human Resources', value: 'hr', dropdownText: 'Human Resources' },
        { text: 'Marketing', value: 'mkt', dropdownText: 'Marketing' },
        { text: 'Sales', value: 'sales', dropdownText: 'Sales' },
        { text: 'Finance', value: 'fin', dropdownText: 'Finance' },
    ];

    ignoredDepartments = ['hr', 'sales'];

    // Select Box Variables
    selectBoxValue1 = signal<string | null>(null);
    selectBoxValue2 = signal<string | null>(null);
    selectBoxValue3 = signal<string | null>('banana');
    selectBoxValue4 = signal<string | null>(null);
    selectBoxValue5 = signal<string | null>(null); // Full configs (Search/Clear)
    selectBoxValue6 = signal<string | null>('eng'); // Ignore Value / Cascade
    selectBoxValue7 = signal<string | null>(null); // Select Box Key

    // Tag Box Variables
    tagBoxValue1 = signal<string[]>([]);
    tagBoxValue2 = signal<string[]>([]);
    tagBoxValue3 = signal<string[]>(['apple', 'mango']);
    tagBoxValue4 = signal<string[]>([]);
    tagBoxValue5 = signal<string[]>([]); // Full configs (Max Length/Displayed)
    tagBoxValue6 = signal<string[]>(['eng']); // Ignore Value
    tagBoxValue7 = signal<string[]>([]); // Tag Box Key

    // Date Box Variables
    dateBoxValue1 = signal<string | null>(null);
    dateBoxValue2 = signal<string | null>(null);
    dateBoxValue3 = signal<string | null>('2026-02-25');
    dateBoxValue4 = signal<string | null>(null);
    dateBoxValue5 = signal<string | null>(null); // Full configs (Format/DisabledDates)
    dateBoxValue6 = signal<string | null>(null); // Custom Calendar Options

    // Number Box Variables
    numberBoxValue1 = signal<number | null>(null);
    numberBoxValue2 = signal<number | null>(null);
    numberBoxValue3 = signal<number | null>(50);
    numberBoxValue4 = signal<number | null>(null);
    numberBoxValue5 = signal<number | null>(null); // Full configs (Integer/disableArrow)
    numberBoxValue6 = signal<number | null>(0); // AllowEmpty false

    // CheckBox Group Variables
    checkBoxGroupValue1 = signal<string[]>([]);
    checkBoxGroupValue2 = signal<string[]>([]);
    checkBoxGroupValue3 = signal<string[]>(['eng', 'mkt']);
    checkBoxGroupValue4 = signal<string[]>([]);
    checkBoxGroupValue5 = signal<string[]>([]); // Full configs (Vertical/Search)
    checkBoxGroupValue6 = signal<string[]>(['fin']); // Ignore values
    checkBoxGroupValue7 = signal<string[]>([]); // Single Select

    // Radio Group Variables
    radioGroupValue1 = signal<string | null>(null);
    radioGroupValue2 = signal<string | null>(null);
    radioGroupValue3 = signal<string | null>('hr');
    radioGroupValue4 = signal<string | null>(null);
    radioGroupValue5 = signal<string | null>(null); // Full configs (Vertical)
    radioGroupValue6 = signal<string | null>('eng'); // Ignore values / Auto Default

    // Handlers
    onSelectBoxChange(caseNum: number, event: any) {
        if (caseNum === 1) this.selectBoxValue1.set(event.value);
        if (caseNum === 2) this.selectBoxValue2.set(event.value);
        if (caseNum === 3) this.selectBoxValue3.set(event.value);
        if (caseNum === 4) this.selectBoxValue4.set(event.value);
        if (caseNum === 5) this.selectBoxValue5.set(event.value);
        if (caseNum === 6) this.selectBoxValue6.set(event.value);
        if (caseNum === 7) this.selectBoxValue7.set(event.value);
    }

    onTagBoxChange(caseNum: number, event: any) {
        if (caseNum === 1) this.tagBoxValue1.set(event.value);
        if (caseNum === 2) this.tagBoxValue2.set(event.value);
        if (caseNum === 3) this.tagBoxValue3.set(event.value);
        if (caseNum === 4) this.tagBoxValue4.set(event.value);
        if (caseNum === 5) this.tagBoxValue5.set(event.value);
        if (caseNum === 6) this.tagBoxValue6.set(event.value);
        if (caseNum === 7) this.tagBoxValue7.set(event.value);
    }

    onDateBoxChange(caseNum: number, event: any) {
        if (caseNum === 1) this.dateBoxValue1.set(event.value);
        if (caseNum === 2) this.dateBoxValue2.set(event.value);
        if (caseNum === 3) this.dateBoxValue3.set(event.value);
        if (caseNum === 4) this.dateBoxValue4.set(event.value);
        if (caseNum === 5) this.dateBoxValue5.set(event.value);
        if (caseNum === 6) this.dateBoxValue6.set(event.value);
    }

    onNumberBoxChange(caseNum: number, event: any) {
        if (caseNum === 1) this.numberBoxValue1.set(event.value);
        if (caseNum === 2) this.numberBoxValue2.set(event.value);
        if (caseNum === 3) this.numberBoxValue3.set(event.value);
        if (caseNum === 4) this.numberBoxValue4.set(event.value);
        if (caseNum === 5) this.numberBoxValue5.set(event.value);
        if (caseNum === 6) this.numberBoxValue6.set(event.value);
    }

    onCheckBoxGroupChange(caseNum: number, event: any) {
        if (caseNum === 1) this.checkBoxGroupValue1.set(event.value);
        if (caseNum === 2) this.checkBoxGroupValue2.set(event.value);
        if (caseNum === 3) this.checkBoxGroupValue3.set(event.value);
        if (caseNum === 4) this.checkBoxGroupValue4.set(event.value);
        if (caseNum === 5) this.checkBoxGroupValue5.set(event.value);
        if (caseNum === 6) this.checkBoxGroupValue6.set(event.value);
        if (caseNum === 7) this.checkBoxGroupValue7.set(event.value);
    }

    onRadioGroupChange(caseNum: number, event: any) {
        if (caseNum === 1) this.radioGroupValue1.set(event.value);
        if (caseNum === 2) this.radioGroupValue2.set(event.value);
        if (caseNum === 3) this.radioGroupValue3.set(event.value);
        if (caseNum === 4) this.radioGroupValue4.set(event.value);
        if (caseNum === 5) this.radioGroupValue5.set(event.value);
        if (caseNum === 6) this.radioGroupValue6.set(event.value);
    }
}
