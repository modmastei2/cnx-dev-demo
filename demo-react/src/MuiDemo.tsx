import {
    CnxCheckBoxGroup,
    CnxDateBox,
    CnxNumberBox,
    CnxRadioGroup,
    CnxSelectBox,
    SelectBoxDataProviderContext,
    CheckBoxDataProviderContext,
    RadioGroupDataProviderContext,
    type CheckBoxDataProvider,
    type CheckBoxViewModel,
    type RadioGroupDataProvider,
    type SelectBoxDataProvider,
} from "@cnx-dev/react-mui";
import { useState } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const fruits: CheckBoxViewModel[] = [
    { value: "apple", text: "Apple" },
    { value: "banana", text: "Banana" },
    { value: "mango", text: "Mango" },
    { value: "grape", text: "Grape" },
    { value: "orange", text: "Orange" },
];

const departments: CheckBoxViewModel[] = [
    { value: "hr", text: "HR" },
    { value: "sales", text: "Sales" },
    { value: "engineering", text: "Engineering" },
    { value: "design", text: "Design" },
    { value: "finance", text: "Finance" },
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

const mockCheckBoxService: CheckBoxDataProvider = {
    getService: async () => [
        { text: "ตัวเลือก 1", value: "1" },
        { text: "ตัวเลือก 2", value: "2" },
        { text: "ตัวเลือก 3", value: "3" },
    ],
};

const mockRadioGroupService: RadioGroupDataProvider = {
    getService: async () => [
        { text: "ใช้งาน", value: "ACTIVE" },
        { text: "ไม่ใช้งาน", value: "INACTIVE" },
    ],
};

// ─── Layout Helpers (same as DevExtreme demo) ─────────────────────────────────

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-purple-50">
                <h2 className="text-sm font-semibold text-purple-600">
                    {title}
                </h2>
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

// ─── MUI Demo ─────────────────────────────────────────────────────────────────

function MuiDemo() {
    // SelectBox
    const [sb1, setSb1] = useState<string | null>(null);
    const [sb2, setSb2] = useState<string | null>(null);
    const [sb3, setSb3] = useState<string>("banana");
    const [sb5, setSb5] = useState<string | null>(null);
    const [sb6, setSb6] = useState<string | null>(null);
    const [sb7, setSb7] = useState<string | null>(null);

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
        <SelectBoxDataProviderContext.Provider value={mockSelectBoxService}>
            <CheckBoxDataProviderContext.Provider value={mockCheckBoxService}>
                <RadioGroupDataProviderContext.Provider
                    value={mockRadioGroupService}
                >
                    <div className="flex flex-col gap-6">
                        {/* ── SelectBox ─────────────────────────────────────── */}
                        <Section title="Select Box (MUI)">
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

                            <Field
                                label="3. Pre-selected ('banana')"
                                value={sb3}
                            >
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

                            <Field label="5. No Clear Button" value={sb5}>
                                <CnxSelectBox
                                    customDataSource={departments}
                                    valueExpr="value"
                                    displayExpr="text"
                                    showClearButton={false}
                                    placeholder="No clear..."
                                    value={sb5}
                                    onValueChanged={(e) => setSb5(e.value)}
                                />
                            </Field>

                            <Field label="6. Ignored (HR, Sales)" value={sb6}>
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

                        {/* ── DateBox ─────────────────────────────────────── */}
                        <Section title="Date Box (MUI)">
                            <Field label="1. Basic Date" value={db1}>
                                <CnxDateBox
                                    placeholder="Select date..."
                                    value={db1}
                                    onValueChanged={(e) => setDb1(e.value)}
                                />
                            </Field>

                            <Field label="2. Min/Max Date" value={db2}>
                                <CnxDateBox
                                    placeholder="2025 only..."
                                    minDate="2025-01-01"
                                    maxDate="2025-12-31"
                                    value={db2}
                                    onValueChanged={(e) => setDb2(e.value)}
                                />
                            </Field>

                            <Field label="3. Pre-filled Date" value={db3}>
                                <CnxDateBox
                                    value={db3}
                                    onValueChanged={(e) => setDb3(e.value)}
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

                            <Field
                                label="5. Disabled Dates (13-15 Apr)"
                                value={db5}
                            >
                                <CnxDateBox
                                    value={db5}
                                    disabledDates={[
                                        "2025-04-13",
                                        "2025-04-14",
                                        "2025-04-15",
                                    ]}
                                    onValueChanged={(e) => setDb5(e.value)}
                                />
                            </Field>

                            <Field label="6. Auto Default (today)" value={db6}>
                                <CnxDateBox
                                    autoDefault
                                    value={db6}
                                    onValueChanged={(e) => setDb6(e.value)}
                                />
                            </Field>
                        </Section>

                        {/* ── NumberBox ─────────────────────────────────────── */}
                        <Section title="Number Box (MUI)">
                            <Field label="1. Basic Use" value={nb1}>
                                <CnxNumberBox
                                    value={nb1}
                                    allowEmpty
                                    onValueChanged={(e) => setNb1(e.value)}
                                />
                            </Field>

                            <Field label="2. Price Format #,##0.00" value={nb2}>
                                <CnxNumberBox
                                    format="#,##0.00"
                                    value={nb2}
                                    allowEmpty
                                    onValueChanged={(e) => setNb2(e.value)}
                                />
                            </Field>

                            <Field label="3. Range (0-100)" value={nb3}>
                                <CnxNumberBox
                                    min={0}
                                    max={100}
                                    value={nb3}
                                    onValueChanged={(e) =>
                                        setNb3(e.value as number)
                                    }
                                />
                            </Field>

                            <Field label="4. Disabled" value={null}>
                                <CnxNumberBox
                                    disabled
                                    value={null}
                                    onValueChanged={() => {}}
                                />
                            </Field>

                            <Field label="5. Disable Arrows" value={nb5}>
                                <CnxNumberBox
                                    disableArrow
                                    allowEmpty
                                    value={nb5}
                                    onValueChanged={(e) => setNb5(e.value)}
                                />
                            </Field>

                            <Field
                                label="6. Positive Percent (0-100%)"
                                value={nb6}
                            >
                                <CnxNumberBox
                                    numberType="positivePercent"
                                    format="#,##0.00"
                                    value={nb6}
                                    onValueChanged={(e) =>
                                        setNb6(e.value as number)
                                    }
                                />
                            </Field>
                        </Section>

                        {/* ── CheckBoxGroup ─────────────────────────────────── */}
                        <Section title="CheckBox Group (MUI)">
                            <Field label="1. Horizontal Fruits" value={cb1}>
                                <CnxCheckBoxGroup
                                    id="mcb1"
                                    customDataSource={fruits}
                                    valueExpr="value"
                                    displayExpr="text"
                                    layout="horizontal"
                                    value={cb1}
                                    onValueChanged={(e) => setCb1(e.value)}
                                />
                            </Field>

                            <Field label="2. Departments" value={cb2}>
                                <CnxCheckBoxGroup
                                    id="mcb2"
                                    customDataSource={departments}
                                    valueExpr="value"
                                    displayExpr="text"
                                    layout="horizontal"
                                    value={cb2}
                                    onValueChanged={(e) => setCb2(e.value)}
                                />
                            </Field>

                            <Field label="3. Disabled" value={[]}>
                                <CnxCheckBoxGroup
                                    id="mcb3"
                                    customDataSource={fruits}
                                    valueExpr="value"
                                    displayExpr="text"
                                    disabled
                                    value={[]}
                                    onValueChanged={() => {}}
                                />
                            </Field>

                            <Field
                                label="4. Pre-selected (Engineering, Design)"
                                value={cb4}
                            >
                                <CnxCheckBoxGroup
                                    id="mcb4"
                                    customDataSource={departments}
                                    valueExpr="value"
                                    displayExpr="text"
                                    value={cb4}
                                    onValueChanged={(e) => setCb4(e.value)}
                                />
                            </Field>

                            <Field label="5. Ignored (HR, Sales)" value={cb5}>
                                <CnxCheckBoxGroup
                                    id="mcb5"
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
                                    id="mcb6"
                                    customDataSource={departments}
                                    valueExpr="value"
                                    displayExpr="text"
                                    mode="single"
                                    value={cb6}
                                    onValueChanged={(e) => setCb6(e.value)}
                                />
                            </Field>

                            <Field label="7. Vertical" value={cb7}>
                                <CnxCheckBoxGroup
                                    id="mcb7"
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
                        <Section title="Radio Group (MUI)">
                            <Field label="1. Horizontal Fruits" value={rg1}>
                                <CnxRadioGroup
                                    id="mrg1"
                                    customDataSource={fruits}
                                    valueExpr="value"
                                    displayExpr="text"
                                    layout="horizontal"
                                    autoDefault={false}
                                    value={rg1}
                                    onValueChanged={(e) =>
                                        setRg1(e.value as string)
                                    }
                                />
                            </Field>

                            <Field label="2. Vertical Departments" value={rg2}>
                                <CnxRadioGroup
                                    id="mrg2"
                                    customDataSource={departments}
                                    valueExpr="value"
                                    displayExpr="text"
                                    layout="vertical"
                                    autoDefault={false}
                                    value={rg2}
                                    onValueChanged={(e) =>
                                        setRg2(e.value as string)
                                    }
                                />
                            </Field>

                            <Field label="3. Default Value" value={rg3}>
                                <CnxRadioGroup
                                    id="mrg3"
                                    customDataSource={departments}
                                    valueExpr="value"
                                    displayExpr="text"
                                    autoDefault={false}
                                    value={rg3}
                                    onValueChanged={(e) =>
                                        setRg3(e.value as string)
                                    }
                                />
                            </Field>

                            <Field label="4. Disabled" value={rg4}>
                                <CnxRadioGroup
                                    id="mrg4"
                                    customDataSource={fruits}
                                    valueExpr="value"
                                    displayExpr="text"
                                    value={rg4}
                                    disabled
                                    onValueChanged={(e) =>
                                        setRg4(e.value as string)
                                    }
                                />
                            </Field>

                            <Field label="5. Optional / No Default" value={rg5}>
                                <CnxRadioGroup
                                    id="mrg5"
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

                            <Field label="6. Ignored (HR, Sales)" value={rg6}>
                                <CnxRadioGroup
                                    id="mrg6"
                                    customDataSource={departments}
                                    valueExpr="value"
                                    displayExpr="text"
                                    ignoreValue={ignoredDepartments}
                                    autoDefault={false}
                                    value={rg6}
                                    onValueChanged={(e) =>
                                        setRg6(e.value as string)
                                    }
                                />
                            </Field>
                        </Section>
                    </div>
                </RadioGroupDataProviderContext.Provider>
            </CheckBoxDataProviderContext.Provider>
        </SelectBoxDataProviderContext.Provider>
    );
}

export default MuiDemo;
