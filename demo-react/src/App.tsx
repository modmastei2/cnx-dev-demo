import {
    CnxCheckBoxGroup,
    CnxDataProvider,
    CnxDateBox,
    CnxNumberBox,
    CnxRadioGroup,
    CnxSelectBox,
    CnxTagBox,
    type CheckBoxDataProvider,
    type CheckBoxViewModel,
    type RadioGroupDataProvider,
    type SelectBoxDataProvider,
    type TagBoxDataProvider,
} from "@cnx-dev/react-devextreme";
import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const fruits: CheckBoxViewModel[] = [
    { value: "apple", text: "Apple", checked: false },
    { value: "banana", text: "Banana", checked: false },
    { value: "mango", text: "Mango", checked: false },
    { value: "grape", text: "Grape", checked: false },
    { value: "orange", text: "Orange", checked: false },
];

const departments: CheckBoxViewModel[] = [
    { value: "hr", text: "HR", checked: false },
    { value: "sales", text: "Sales", checked: false },
    { value: "engineering", text: "Engineering", checked: false },
    { value: "design", text: "Design", checked: false },
    { value: "finance", text: "Finance", checked: false },
];

const ignoredDepartments = ["hr", "sales"];

// ─── Mock Services ────────────────────────────────────────────────────────────

const mockSelectBoxService: SelectBoxDataProvider = {
    getService: async () => ({
        data: [
            {
                value: "BBL",
                text: "ธนาคารกรุงเทพ",
                dropdownText: "ธนาคารกรุงเทพ",
            },
            {
                value: "KBANK",
                text: "ธนาคารกสิกรไทย",
                dropdownText: "ธนาคารกสิกรไทย",
            },
            {
                value: "SCB",
                text: "ธนาคารไทยพาณิชย์",
                dropdownText: "ธนาคารไทยพาณิชย์",
            },
        ],
        totalCount: 3,
    }),
};

const mockTagBoxService: TagBoxDataProvider = {
    getService: async () => ({
        data: [
            {
                value: "ADMIN",
                text: "ผู้ดูแลระบบ",
                dropdownText: "ผู้ดูแลระบบ",
            },
            {
                value: "USER",
                text: "ผู้ใช้งานทั่วไป",
                dropdownText: "ผู้ใช้งานทั่วไป",
            },
        ],
        totalCount: 2,
    }),
};

const mockCheckBoxService: CheckBoxDataProvider = {
    getService: async () => [
        { checked: false, text: "ตัวเลือก 1", value: "1" },
        { checked: false, text: "ตัวเลือก 2", value: "2" },
        { checked: false, text: "ตัวเลือก 3", value: "3" },
    ],
};

const mockRadioGroupService: RadioGroupDataProvider = {
    getService: async () => [
        { text: "ใช้งาน", value: "ACTIVE" },
        { text: "ไม่ใช้งาน", value: "INACTIVE" },
    ],
};

// ─── Layout Helpers ───────────────────────────────────────────────────────────

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                <h2 className="text-sm font-semibold text-blue-600">{title}</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {children}
            </div>
        </div>
    );
}

function Field({
    label,
    value,
    children,
}: {
    label: string;
    value?: unknown;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            {children}
            <p className="text-xs text-slate-400">
                Val:{" "}
                <span className="font-mono font-semibold text-slate-600">
                    {JSON.stringify(value ?? null)}
                </span>
            </p>
        </div>
    );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
    // SelectBox
    const [sb1, setSb1] = useState<string | null>(null);
    const [sb2, setSb2] = useState<string | null>(null);
    const [sb3, setSb3] = useState<string>("banana");
    const [sb5, setSb5] = useState<string | null>(null);
    const [sb6, setSb6] = useState<string | null>(null);
    const [sb7, setSb7] = useState<string | null>(null);

    // TagBox
    const [tb1, setTb1] = useState<string[]>([]);
    const [tb2, setTb2] = useState<string[]>([]);
    const [tb3, setTb3] = useState<string[]>(["apple", "mango"]);
    const [tb5, setTb5] = useState<string[]>([]);
    const [tb6, setTb6] = useState<string[]>([]);
    const [tb7, setTb7] = useState<string[]>([]);

    // DateBox
    const [db1, setDb1] = useState<string | null>(null);
    const [db2, setDb2] = useState<string | null>(null);
    const [db3, setDb3] = useState<string | null>("2024-06-15");
    const [db5, setDb5] = useState<string | null>(null);
    const [db6, setDb6] = useState<string | null>(null);

    // NumberBox
    const [nb1, setNb1] = useState<number | null>(null);
    const [nb2, setNb2] = useState<number | null>(null);
    const [nb3, setNb3] = useState<number>(50);
    const [nb5, setNb5] = useState<number | null>(null);
    const [nb6, setNb6] = useState<number>(0);

    // CheckBoxGroup
    const [cb1, setCb1] = useState<string[]>([]);
    const [cb2, setCb2] = useState<string[]>([]);
    const [cb4, setCb4] = useState<string[]>(["engineering", "design"]);
    const [cb5, setCb5] = useState<string[]>([]);
    const [cb6, setCb6] = useState<string[]>([]);
    const [cb7, setCb7] = useState<string[]>([]);

    // RadioGroup
    const [rg1, setRg1] = useState<string | null>(null);
    const [rg2, setRg2] = useState<string | null>(null);
    const [rg3, setRg3] = useState<string>("engineering");
    const [rg4, setRg4] = useState<string>("apple");
    const [rg5, setRg5] = useState<string | null>(null);
    const [rg6, setRg6] = useState<string | null>(null);

    return (
        <CnxDataProvider
            selectBox={mockSelectBoxService}
            tagBox={mockTagBoxService}
            checkBoxGroup={mockCheckBoxService}
            radioGroup={mockRadioGroupService}
        >
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-6">
                    <div className="border-b border-slate-200 pb-4">
                        <h1 className="text-xl font-bold text-slate-800">
                            DevExtreme Component Demos
                        </h1>
                    </div>

                    {/* ── SelectBox ─────────────────────────────────────── */}
                    <Section title="Select Box">
                        <Field label="1. Basic Usage" value={sb1}>
                            <CnxSelectBox
                                customDataSource={fruits}
                                placeholder="Select fruit..."
                                value={sb1}
                                onValueChanged={(e) => setSb1(e.value)}
                            />
                        </Field>

                        <Field label="2. Departments (Custom)" value={sb2}>
                            <CnxSelectBox
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                placeholder="Select dept..."
                                value={sb2}
                                onValueChanged={(e) => setSb2(e.value)}
                            />
                        </Field>

                        <Field label="3. Pre-selected ('banana')" value={sb3}>
                            <CnxSelectBox
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                value={sb3}
                                onValueChanged={(e) => setSb3(e.value)}
                            />
                        </Field>

                        <Field label="4. Disabled State" value={null}>
                            <CnxSelectBox
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                disabled
                                placeholder="Not allowed"
                                onValueChanged={() => {}}
                            />
                        </Field>

                        <Field label="5. Search & Clear Enabled" value={sb5}>
                            <CnxSelectBox
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                searchEnabled
                                showClearButton
                                placeholder="Search..."
                                value={sb5}
                                onValueChanged={(e) => setSb5(e.value)}
                            />
                        </Field>

                        <Field
                            label="6. Ignored Values (HR, Sales)"
                            value={sb6}
                        >
                            <CnxSelectBox
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                ignoreValue={ignoredDepartments}
                                value={sb6}
                                onValueChanged={(e) => setSb6(e.value)}
                            />
                        </Field>

                        <Field label="7. Select Box Key" value={sb7}>
                            <CnxSelectBox
                                selectBoxKey="currency"
                                valueExpr="value"
                                displayExpr="text"
                                value={sb7}
                                onValueChanged={(e) => setSb7(e.value)}
                            />
                        </Field>
                    </Section>

                    {/* ── TagBox ────────────────────────────────────────── */}
                    <Section title="Tag Box (Multi-select)">
                        <Field label="1. Basic Usage" value={tb1}>
                            <CnxTagBox
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                placeholder="Select fruits..."
                                value={tb1}
                                onValueChanged={(e) =>
                                    setTb1(e.value as string[])
                                }
                            />
                        </Field>

                        <Field label="2. Departments" value={tb2}>
                            <CnxTagBox
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                placeholder="Select depts..."
                                value={tb2}
                                onValueChanged={(e) =>
                                    setTb2(e.value as string[])
                                }
                            />
                        </Field>

                        <Field
                            label="3. Pre-selected ('apple', 'mango')"
                            value={tb3}
                        >
                            <CnxTagBox
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                value={tb3}
                                onValueChanged={(e) =>
                                    setTb3(e.value as string[])
                                }
                            />
                        </Field>

                        <Field label="4. Disabled State" value={[]}>
                            <CnxTagBox
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                disabled
                                placeholder="Not allowed"
                                value={[]}
                                onValueChanged={() => {}}
                            />
                        </Field>

                        <Field label="5. Max Displayed (2)" value={tb5}>
                            <CnxTagBox
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                maxDisplayedTags={2}
                                placeholder="Max 2 visibly shown"
                                value={tb5}
                                onValueChanged={(e) =>
                                    setTb5(e.value as string[])
                                }
                            />
                        </Field>

                        <Field label="6. Ignored Values" value={tb6}>
                            <CnxTagBox
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                value={tb6}
                                onValueChanged={(e) =>
                                    setTb6(e.value as string[])
                                }
                            />
                        </Field>

                        <Field label="7. Tag Box Key" value={tb7}>
                            <CnxTagBox
                                tagBoxKey="fruits"
                                valueExpr="value"
                                displayExpr="text"
                                value={tb7}
                                onValueChanged={(e) =>
                                    setTb7(e.value as string[])
                                }
                            />
                        </Field>
                    </Section>

                    {/* ── DateBox ───────────────────────────────────────── */}
                    <Section title="Date Box">
                        <Field label="1. Basic Date" value={db1}>
                            <CnxDateBox
                                placeholder="Select date..."
                                value={db1}
                                onValueChanged={(e) =>
                                    setDb1(e.value as string)
                                }
                            />
                        </Field>

                        <Field label="2. Date and Time" value={db2}>
                            <CnxDateBox
                                placeholder="Select datetime..."
                                value={db2}
                                onValueChanged={(e) =>
                                    setDb2(e.value as string)
                                }
                            />
                        </Field>

                        <Field label="3. Pre-filled Date" value={db3}>
                            <CnxDateBox
                                value={db3}
                                onValueChanged={(e) =>
                                    setDb3(e.value as string)
                                }
                            />
                        </Field>

                        <Field label="4. Disabled State" value={null}>
                            <CnxDateBox
                                disabled
                                placeholder="Not allowed"
                                value={null}
                                onValueChanged={() => {}}
                            />
                        </Field>

                        <Field label="5. Empty Not Allowed" value={db5}>
                            <CnxDateBox
                                allowEmpty={false}
                                value={db5}
                                onValueChanged={(e) =>
                                    setDb5(e.value as string)
                                }
                            />
                        </Field>

                        <Field label="6. Custom Format (MM/yyyy)" value={db6}>
                            <CnxDateBox
                                format="MM/yyyy"
                                placeholder="Month/Year"
                                value={db6}
                                onValueChanged={(e) =>
                                    setDb6(e.value as string)
                                }
                            />
                        </Field>
                    </Section>

                    {/* ── NumberBox ─────────────────────────────────────── */}
                    <Section title="Number Box">
                        <Field label="1. Basic Use" value={nb1}>
                            <CnxNumberBox
                                value={nb1}
                                onValueChanged={(e) =>
                                    setNb1(e.value as number)
                                }
                            />
                        </Field>

                        <Field label="2. Price Format" value={nb2}>
                            <CnxNumberBox
                                format="$ #,##0.00"
                                value={nb2}
                                onValueChanged={(e) =>
                                    setNb2(e.value as number)
                                }
                            />
                        </Field>

                        <Field label="3. Range Limits (0-100)" value={nb3}>
                            <CnxNumberBox
                                min={0}
                                max={100}
                                value={nb3}
                                onValueChanged={(e) =>
                                    setNb3(e.value as number)
                                }
                            />
                        </Field>

                        <Field label="4. Disabled State" value={null}>
                            <CnxNumberBox
                                disabled
                                value={null}
                                onValueChanged={() => {}}
                            />
                        </Field>

                        <Field label="5. Disable Arrows (Integer)" value={nb5}>
                            <CnxNumberBox
                                disableArrow
                                value={nb5}
                                onValueChanged={(e) =>
                                    setNb5(e.value as number)
                                }
                            />
                        </Field>

                        <Field
                            label="6. Required (allowEmpty false)"
                            value={nb6}
                        >
                            <CnxNumberBox
                                allowEmpty={false}
                                value={nb6}
                                onValueChanged={(e) =>
                                    setNb6(e.value as number)
                                }
                            />
                        </Field>
                    </Section>

                    {/* ── CheckBoxGroup ─────────────────────────────────── */}
                    <Section title="CheckBox Group">
                        <Field label="1. Horizontal Fruits" value={cb1}>
                            <CnxCheckBoxGroup
                                id="cb1"
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                layout="horizontal"
                                value={cb1}
                                onValueChanged={(e) => setCb1(e.value)}
                            />
                        </Field>

                        <Field label="2. Default Value" value={cb2}>
                            <CnxCheckBoxGroup
                                id="cb2"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                layout="horizontal"
                                value={cb2}
                                onValueChanged={(e) => setCb2(e.value)}
                            />
                        </Field>

                        <Field label="3. Disabled Options" value={[]}>
                            <CnxCheckBoxGroup
                                id="cb3"
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                disabled
                                value={[]}
                                onValueChanged={() => {}}
                            />
                        </Field>

                        <Field
                            label="4. Search Enabled & Max Length (3)"
                            value={cb4}
                        >
                            <CnxCheckBoxGroup
                                id="cb4"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                value={cb4}
                                onValueChanged={(e) => setCb4(e.value)}
                            />
                        </Field>

                        <Field
                            label="5. Ignored Values (HR, Sales)"
                            value={cb5}
                        >
                            <CnxCheckBoxGroup
                                id="cb5"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                ignoreValue={ignoredDepartments}
                                value={cb5}
                                onValueChanged={(e) => setCb5(e.value)}
                            />
                        </Field>

                        <Field label="6. Single Select" value={cb6}>
                            <CnxCheckBoxGroup
                                id="cb6"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                mode="single"
                                value={cb6}
                                onValueChanged={(e) => setCb6(e.value)}
                            />
                        </Field>

                        <Field label="7. Vertical Departments" value={cb7}>
                            <CnxCheckBoxGroup
                                id="cb7"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                layout="vertical"
                                value={cb7}
                                onValueChanged={(e) => setCb7(e.value)}
                            />
                        </Field>
                    </Section>

                    {/* ── RadioGroup ────────────────────────────────────── */}
                    <Section title="Radio Group">
                        <Field label="1. Horizontal Fruits" value={rg1}>
                            <CnxRadioGroup
                                id="rg1"
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                layout="horizontal"
                                value={rg1}
                                onValueChanged={(e) =>
                                    setRg1(e.value as string)
                                }
                            />
                        </Field>

                        <Field label="2. Vertical Departments" value={rg2}>
                            <CnxRadioGroup
                                id="rg2"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                layout="vertical"
                                value={rg2}
                                onValueChanged={(e) =>
                                    setRg2(e.value as string)
                                }
                            />
                        </Field>

                        <Field label="3. Default Value" value={rg3}>
                            <CnxRadioGroup
                                id="rg3"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                value={rg3}
                                onValueChanged={(e) =>
                                    setRg3(e.value as string)
                                }
                            />
                        </Field>

                        <Field label="4. Disabled Options" value={rg4}>
                            <CnxRadioGroup
                                id="rg4"
                                customDataSource={fruits}
                                valueExpr="value"
                                displayExpr="text"
                                value={rg4}
                                disabled
                                onValueChanged={(e) => {
                                    setRg4(e.value as string);
                                }}
                            />
                        </Field>

                        <Field label="5. Optional / No Default" value={rg5}>
                            <CnxRadioGroup
                                id="rg5"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                autoDefault={false}
                                value={rg5}
                                onValueChanged={(e) =>
                                    setRg5(e.value as string)
                                }
                            />
                        </Field>

                        <Field
                            label="6. Ignored Values (HR, Sales)"
                            value={rg6}
                        >
                            <CnxRadioGroup
                                id="rg6"
                                customDataSource={departments}
                                valueExpr="value"
                                displayExpr="text"
                                ignoreValue={ignoredDepartments}
                                value={rg6}
                                onValueChanged={(e) =>
                                    setRg6(e.value as string)
                                }
                            />
                        </Field>
                    </Section>
                </div>
            </div>
        </CnxDataProvider>
    );
}

export default App;
