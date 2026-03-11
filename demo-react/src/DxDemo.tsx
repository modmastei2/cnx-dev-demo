import React, { useCallback, useMemo, useState } from "react";
import {
    CnxCheckBoxGroup, CnxDataProvider, CnxDateBox, CnxNumberBox,
    CnxRadioGroup, CnxSelectBox, CnxTagBox,
    type CheckBoxDataProvider, type CheckBoxViewModel,
    type RadioGroupDataProvider, type SelectBoxDataProvider, type TagBoxDataProvider,
} from "@cnx-dev/react-devextreme";

// ─── Static data & services (module-level — never re-created) ─────────────────

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
const regions = [
    { value: "north", text: "ภาคเหนือ" },
    { value: "central", text: "ภาคกลาง" },
    { value: "south", text: "ภาคใต้" },
    { value: "northeast", text: "ภาคอีสาน" },
];
const provinces = [
    { value: "CM", text: "เชียงใหม่", regionId: "north" },
    { value: "LM", text: "ลำปาง", regionId: "north" },
    { value: "PRE", text: "แพร่", regionId: "north" },
    { value: "BKK", text: "กรุงเทพฯ", regionId: "central" },
    { value: "NPT", text: "นครปฐม", regionId: "central" },
    { value: "AYU", text: "อยุธยา", regionId: "central" },
    { value: "PKT", text: "ภูเก็ต", regionId: "south" },
    { value: "SGK", text: "สงขลา", regionId: "south" },
    { value: "KBI", text: "กระบี่", regionId: "south" },
    { value: "KKN", text: "ขอนแก่น", regionId: "northeast" },
    { value: "UBL", text: "อุบลฯ", regionId: "northeast" },
    { value: "NDN", text: "นครราชสีมา", regionId: "northeast" },
];
const cascadeRule = { cascadeField: "value", childKey: "regionId" };

const mockSelectBoxService: SelectBoxDataProvider = {
    getService: async () => ({ data: [
        { value: "BBL", text: "ธนาคารกรุงเทพ", dropdownText: "ธนาคารกรุงเทพ" },
        { value: "KBANK", text: "ธนาคารกสิกรไทย", dropdownText: "ธนาคารกสิกรไทย" },
        { value: "SCB", text: "ธนาคารไทยพาณิชย์", dropdownText: "ธนาคารไทยพาณิชย์" },
    ], totalCount: 3 }),
};
const mockTagBoxService: TagBoxDataProvider = {
    getService: async () => ({ data: [
        { value: "ADMIN", text: "ผู้ดูแลระบบ", dropdownText: "ผู้ดูแลระบบ" },
        { value: "USER", text: "ผู้ใช้งานทั่วไป", dropdownText: "ผู้ใช้งานทั่วไป" },
    ], totalCount: 2 }),
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
const noop = () => {};

// ─── Layout Helpers ───────────────────────────────────────────────────────────

const Section = React.memo(function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
                <h2 className="text-sm font-semibold text-blue-600">{title}</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
        </div>
    );
});

const Field = React.memo(function Field({ label, value, children }: { label: string; value?: unknown; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            {children}
            <p className="text-xs text-slate-400">Val: <span className="font-mono font-semibold text-slate-600">{JSON.stringify(value ?? null)}</span></p>
        </div>
    );
});

// ─── SelectBoxDemo ────────────────────────────────────────────────────────────

const SelectBoxDemo = React.memo(function SelectBoxDemo() {
    const [sb1, setSb1] = useState<string | null>(null);
    const [sb2, setSb2] = useState<string | null>(null);
    const [sb3, setSb3] = useState<string>("banana");
    const [sb5, setSb5] = useState<string | null>(null);
    const [sb6, setSb6] = useState<string | null>(null);
    const [sb7, setSb7] = useState<string | null>(null);
    const [sbRegion, setSbRegion] = useState<string | null>(null);
    const [sb8, setSb8] = useState<string | null>(null);

    const handleSb1 = useCallback((e: any) => setSb1(e.value), []);
    const handleSb2 = useCallback((e: any) => setSb2(e.value), []);
    const handleSb3 = useCallback((e: any) => setSb3(e.value), []);
    const handleSb5 = useCallback((e: any) => setSb5(e.value), []);
    const handleSb6 = useCallback((e: any) => setSb6(e.value), []);
    const handleSb7 = useCallback((e: any) => setSb7(e.value), []);
    const handleSb8 = useCallback((e: any) => setSb8(e.value), []);
    const handleSbRegion = useCallback((e: any) => { setSbRegion(e.value); setSb8(null); }, []);

    return (
        <Section title="Select Box">
            <Field label="1. Basic Usage" value={sb1}><CnxSelectBox customDataSource={fruits} placeholder="Select fruit..." value={sb1} onValueChanged={handleSb1} /></Field>
            <Field label="2. Departments (Custom)" value={sb2}><CnxSelectBox customDataSource={departments} valueExpr="value" displayExpr="text" placeholder="Select department..." value={sb2} onValueChanged={handleSb2} /></Field>
            <Field label="3. Pre-selected Value" value={sb3}><CnxSelectBox customDataSource={fruits} value={sb3} onValueChanged={handleSb3} /></Field>
            <Field label="4. Disabled" value={null}><CnxSelectBox customDataSource={fruits} disabled value={null} onValueChanged={noop} /></Field>
            <Field label="5. Service-based (Banks)" value={sb5}><CnxSelectBox selectBoxKey="bank" placeholder="Select bank..." value={sb5} onValueChanged={handleSb5} /></Field>
            <Field label="6. No Clear Button" value={sb6}><CnxSelectBox customDataSource={fruits} showClearButton={false} placeholder="No clear..." value={sb6} onValueChanged={handleSb6} /></Field>
            <Field label="7. Ignore Values (HR, Sales)" value={sb7}><CnxSelectBox customDataSource={departments} valueExpr="value" displayExpr="text" ignoreValue={ignoredDepartments} placeholder="Filtered departments..." value={sb7} onValueChanged={handleSb7} /></Field>
            <div className="col-span-full border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2"><span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>8. In-Memory Cascading (Region → Province)</p>
                <div className="flex gap-6">
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Parent — Select Region</label>
                        <CnxSelectBox customDataSource={regions} valueExpr="value" displayExpr="text" placeholder="เลือกภาค..." value={sbRegion} onValueChanged={handleSbRegion} />
                        <p className="text-xs text-blue-600">Region: <strong>{JSON.stringify(sbRegion)}</strong></p>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Child — Province (Cascade)</label>
                        <CnxSelectBox customDataSource={provinces} valueExpr="value" displayExpr="text" cascadeRule={cascadeRule} cascadeBy={sbRegion} value={sb8} onValueChanged={handleSb8} />
                        <p className="text-xs text-pink-600">Province: <strong>{JSON.stringify(sb8)}</strong></p>
                    </div>
                </div>
            </div>
        </Section>
    );
});

// ─── TagBoxDemo ───────────────────────────────────────────────────────────────

const TagBoxDemo = React.memo(function TagBoxDemo() {
    const [tb1, setTb1] = useState<string[]>([]);
    const [tb2, setTb2] = useState<string[]>([]);
    const [tb3, setTb3] = useState<string[]>(["apple", "mango"]);
    const [tb5, setTb5] = useState<string[]>([]);
    const [tb6, setTb6] = useState<string[]>([]);
    const [tb7, setTb7] = useState<string[]>([]);
    const [tbRegion, setTbRegion] = useState<string | null>(null);
    const [tb8, setTb8] = useState<string[]>([]);

    const handleTb1 = useCallback((e: any) => setTb1(e.value as string[]), []);
    const handleTb2 = useCallback((e: any) => setTb2(e.value as string[]), []);
    const handleTb3 = useCallback((e: any) => setTb3(e.value as string[]), []);
    const handleTb5 = useCallback((e: any) => setTb5(e.value as string[]), []);
    const handleTb6 = useCallback((e: any) => setTb6(e.value as string[]), []);
    const handleTb7 = useCallback((e: any) => setTb7(e.value as string[]), []);
    const handleTb8 = useCallback((e: any) => setTb8(e.value as string[]), []);
    const handleTbRegion = useCallback((e: any) => { setTbRegion(e.value); setTb8([]); }, []);

    return (
        <Section title="Tag Box">
            <Field label="1. Basic Fruits" value={tb1}><CnxTagBox customDataSource={fruits} valueExpr="value" displayExpr="text" placeholder="เลือกผลไม้..." value={tb1} onValueChanged={handleTb1} /></Field>
            <Field label="2. Departments" value={tb2}><CnxTagBox customDataSource={departments} valueExpr="value" displayExpr="text" placeholder="เลือกแผนก..." value={tb2} onValueChanged={handleTb2} /></Field>
            <Field label="3. Pre-selected" value={tb3}><CnxTagBox customDataSource={fruits} valueExpr="value" displayExpr="text" value={tb3} onValueChanged={handleTb3} /></Field>
            <Field label="4. Disabled" value={[]}><CnxTagBox customDataSource={fruits} valueExpr="value" displayExpr="text" disabled value={[]} onValueChanged={noop} /></Field>
            <Field label="5. Service-based (Roles)" value={tb5}><CnxTagBox tagBoxKey="role" placeholder="เลือก role..." value={tb5} onValueChanged={handleTb5} /></Field>
            <Field label="6. No Clear Button" value={tb6}><CnxTagBox customDataSource={fruits} valueExpr="value" displayExpr="text" showClearButton={false} value={tb6} onValueChanged={handleTb6} /></Field>
            <Field label="7. Max 2 Tags Shown" value={tb7}><CnxTagBox customDataSource={fruits} valueExpr="value" displayExpr="text" maxDisplayedTags={2} value={tb7} onValueChanged={handleTb7} /></Field>
            <div className="col-span-full border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2"><span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>8. In-Memory Cascading (Region → Provinces)</p>
                <div className="flex gap-6">
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Parent — Select Region</label>
                        <CnxSelectBox customDataSource={regions} valueExpr="value" displayExpr="text" placeholder="เลือกภาค..." value={tbRegion} onValueChanged={handleTbRegion} />
                        <p className="text-xs text-blue-600">Region: <strong>{JSON.stringify(tbRegion)}</strong></p>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Child — Provinces (Cascade)</label>
                        <CnxTagBox customDataSource={provinces} valueExpr="value" displayExpr="text" cascadeRule={cascadeRule} cascadeBy={tbRegion} value={tb8} onValueChanged={handleTb8} />
                        <p className="text-xs text-pink-600">Provinces: <strong>{JSON.stringify(tb8)}</strong></p>
                    </div>
                </div>
            </div>
        </Section>
    );
});

// ─── DateBoxDemo ──────────────────────────────────────────────────────────────

const DateBoxDemo = React.memo(function DateBoxDemo() {
    const [db1, setDb1] = useState<string | null>(null);
    const [db2, setDb2] = useState<string | null>(null);
    const [db3, setDb3] = useState<string | null>("2024-06-15");
    const [db5, setDb5] = useState<string | null>(null);
    const [db6, setDb6] = useState<string | null>(null);

    const handleDb1 = useCallback((e: any) => setDb1(e.value as string), []);
    const handleDb2 = useCallback((e: any) => setDb2(e.value as string), []);
    const handleDb3 = useCallback((e: any) => setDb3(e.value as string), []);
    const handleDb5 = useCallback((e: any) => setDb5(e.value as string), []);
    const handleDb6 = useCallback((e: any) => setDb6(e.value as string), []);

    return (
        <Section title="Date Box">
            <Field label="1. Basic Date" value={db1}><CnxDateBox placeholder="Select date..." value={db1} onValueChanged={handleDb1} /></Field>
            <Field label="2. Date and Time" value={db2}><CnxDateBox placeholder="Select datetime..." value={db2} onValueChanged={handleDb2} /></Field>
            <Field label="3. Pre-filled Date" value={db3}><CnxDateBox value={db3} onValueChanged={handleDb3} /></Field>
            <Field label="4. Disabled State" value={null}><CnxDateBox disabled placeholder="Not allowed" value={null} onValueChanged={noop} /></Field>
            <Field label="5. Empty Not Allowed" value={db5}><CnxDateBox allowEmpty={false} value={db5} onValueChanged={handleDb5} /></Field>
            <Field label="6. Custom Format (MM/yyyy)" value={db6}><CnxDateBox format="MM/yyyy" placeholder="Month/Year" value={db6} onValueChanged={handleDb6} /></Field>
        </Section>
    );
});

// ─── NumberBoxDemo ────────────────────────────────────────────────────────────

const NumberBoxDemo = React.memo(function NumberBoxDemo() {
    const [nb1, setNb1] = useState<number | null>(null);
    const [nb2, setNb2] = useState<number | null>(null);
    const [nb3, setNb3] = useState<number>(50);
    const [nb5, setNb5] = useState<number | null>(null);
    const [nb6, setNb6] = useState<number>(0);

    const handleNb1 = useCallback((e: any) => setNb1(e.value as number), []);
    const handleNb2 = useCallback((e: any) => setNb2(e.value as number), []);
    const handleNb3 = useCallback((e: any) => setNb3(e.value as number), []);
    const handleNb5 = useCallback((e: any) => setNb5(e.value as number), []);
    const handleNb6 = useCallback((e: any) => setNb6(e.value as number), []);

    return (
        <Section title="Number Box">
            <Field label="1. Basic Use" value={nb1}><CnxNumberBox value={nb1} onValueChanged={handleNb1} /></Field>
            <Field label="2. Price Format" value={nb2}><CnxNumberBox format="$ #,##0.00" value={nb2} onValueChanged={handleNb2} /></Field>
            <Field label="3. Range Limits (0-100)" value={nb3}><CnxNumberBox min={0} max={100} value={nb3} onValueChanged={handleNb3} /></Field>
            <Field label="4. Disabled State" value={null}><CnxNumberBox disabled value={null} onValueChanged={noop} /></Field>
            <Field label="5. Disable Arrows (Integer)" value={nb5}><CnxNumberBox disableArrow value={nb5} onValueChanged={handleNb5} /></Field>
            <Field label="6. Required (allowEmpty false)" value={nb6}><CnxNumberBox allowEmpty={false} value={nb6} onValueChanged={handleNb6} /></Field>
        </Section>
    );
});

// ─── CheckBoxGroupDemo ────────────────────────────────────────────────────────

const CheckBoxGroupDemo = React.memo(function CheckBoxGroupDemo() {
    const [cb1, setCb1] = useState<string[]>([]);
    const [cb2, setCb2] = useState<string[]>([]);
    const [cb4, setCb4] = useState<string[]>(["engineering", "design"]);
    const [cb5, setCb5] = useState<string[]>([]);
    const [cb6, setCb6] = useState<string[]>([]);
    const [cb7, setCb7] = useState<string[]>([]);
    const [cbRegion, setCbRegion] = useState<string | null>(null);
    const [cb8, setCb8] = useState<string[]>([]);

    const handleCb1 = useCallback((e: any) => setCb1(e.value), []);
    const handleCb2 = useCallback((e: any) => setCb2(e.value), []);
    const handleCb4 = useCallback((e: any) => setCb4(e.value), []);
    const handleCb5 = useCallback((e: any) => setCb5(e.value), []);
    const handleCb6 = useCallback((e: any) => setCb6(e.value), []);
    const handleCb7 = useCallback((e: any) => setCb7(e.value), []);
    const handleCb8 = useCallback((e: any) => setCb8(e.value), []);
    const handleCbRegion = useCallback((e: any) => { setCbRegion(e.value); setCb8([]); }, []);

    return (
        <Section title="CheckBox Group">
            <Field label="1. Horizontal Fruits" value={cb1}><CnxCheckBoxGroup id="cb1" customDataSource={fruits} valueExpr="value" displayExpr="text" layout="horizontal" value={cb1} onValueChanged={handleCb1} /></Field>
            <Field label="2. Default Value" value={cb2}><CnxCheckBoxGroup id="cb2" customDataSource={departments} valueExpr="value" displayExpr="text" layout="horizontal" value={cb2} onValueChanged={handleCb2} /></Field>
            <Field label="3. Disabled Options" value={[]}><CnxCheckBoxGroup id="cb3" customDataSource={fruits} valueExpr="value" displayExpr="text" disabled value={[]} onValueChanged={noop} /></Field>
            <Field label="4. Search Enabled & Max Length (3)" value={cb4}><CnxCheckBoxGroup id="cb4" customDataSource={departments} valueExpr="value" displayExpr="text" value={cb4} onValueChanged={handleCb4} /></Field>
            <Field label="5. Ignored Values (HR, Sales)" value={cb5}><CnxCheckBoxGroup id="cb5" customDataSource={departments} valueExpr="value" displayExpr="text" ignoreValue={ignoredDepartments} value={cb5} onValueChanged={handleCb5} /></Field>
            <Field label="6. Single Select" value={cb6}><CnxCheckBoxGroup id="cb6" customDataSource={departments} valueExpr="value" displayExpr="text" mode="single" value={cb6} onValueChanged={handleCb6} /></Field>
            <Field label="7. Vertical Departments" value={cb7}><CnxCheckBoxGroup id="cb7" customDataSource={departments} valueExpr="value" displayExpr="text" layout="vertical" value={cb7} onValueChanged={handleCb7} /></Field>
            <div className="col-span-full border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2"><span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>8. In-Memory Cascading (Region → Provinces)</p>
                <div className="flex gap-6">
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Parent — Select Region</label>
                        <CnxSelectBox customDataSource={regions} valueExpr="value" displayExpr="text" placeholder="เลือกภาค..." value={cbRegion} onValueChanged={handleCbRegion} />
                        <p className="text-xs text-blue-600">Region: <strong>{JSON.stringify(cbRegion)}</strong></p>
                    </div>
                    <div className="flex-2 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Child — Provinces (Cascade CheckBox)</label>
                        <CnxCheckBoxGroup id="cb8" customDataSource={provinces} valueExpr="value" displayExpr="text" cascadeRule={cascadeRule} cascadeBy={cbRegion} value={cb8} onValueChanged={handleCb8} />
                        <p className="text-xs text-pink-600">Provinces: <strong>{JSON.stringify(cb8)}</strong></p>
                    </div>
                </div>
            </div>
        </Section>
    );
});

// ─── RadioGroupDemo ───────────────────────────────────────────────────────────

const RadioGroupDemo = React.memo(function RadioGroupDemo() {
    const [rg1, setRg1] = useState<string | null>(null);
    const [rg2, setRg2] = useState<string | null>(null);
    const [rg3, setRg3] = useState<string>("engineering");
    const [rg4, setRg4] = useState<string>("apple");
    const [rg5, setRg5] = useState<string | null>(null);
    const [rg6, setRg6] = useState<string | null>(null);
    const [rgRegion, setRgRegion] = useState<string | null>(null);
    const [rg7, setRg7] = useState<string | null>(null);

    const handleRg1 = useCallback((e: any) => setRg1(e.value as string), []);
    const handleRg2 = useCallback((e: any) => setRg2(e.value as string), []);
    const handleRg3 = useCallback((e: any) => setRg3(e.value as string), []);
    const handleRg4 = useCallback((e: any) => setRg4(e.value as string), []);
    const handleRg5 = useCallback((e: any) => setRg5(e.value as string), []);
    const handleRg6 = useCallback((e: any) => setRg6(e.value as string), []);
    const handleRg7 = useCallback((e: any) => setRg7(e.value), []);
    const handleRgRegion = useCallback((e: any) => { setRgRegion(e.value); setRg7(null); }, []);

    return (
        <Section title="Radio Group">
            <Field label="1. Horizontal Fruits" value={rg1}><CnxRadioGroup id="rg1" customDataSource={fruits} valueExpr="value" displayExpr="text" layout="horizontal" value={rg1} onValueChanged={handleRg1} /></Field>
            <Field label="2. Vertical Departments" value={rg2}><CnxRadioGroup id="rg2" customDataSource={departments} valueExpr="value" displayExpr="text" layout="vertical" value={rg2} onValueChanged={handleRg2} /></Field>
            <Field label="3. Default Value" value={rg3}><CnxRadioGroup id="rg3" customDataSource={departments} valueExpr="value" displayExpr="text" value={rg3} onValueChanged={handleRg3} /></Field>
            <Field label="4. Disabled Options" value={rg4}><CnxRadioGroup id="rg4" customDataSource={fruits} valueExpr="value" displayExpr="text" value={rg4} disabled onValueChanged={handleRg4} /></Field>
            <Field label="5. Optional / No Default" value={rg5}><CnxRadioGroup id="rg5" customDataSource={departments} valueExpr="value" displayExpr="text" autoDefault={false} value={rg5} onValueChanged={handleRg5} /></Field>
            <Field label="6. Ignored Values (HR, Sales)" value={rg6}><CnxRadioGroup id="rg6" customDataSource={departments} valueExpr="value" displayExpr="text" ignoreValue={ignoredDepartments} value={rg6} onValueChanged={handleRg6} /></Field>
            <div className="col-span-full border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50">
                <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2"><span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>7. In-Memory Cascading (Region → Province)</p>
                <div className="flex gap-6">
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Parent — Select Region</label>
                        <CnxSelectBox customDataSource={regions} valueExpr="value" displayExpr="text" placeholder="เลือกภาค..." value={rgRegion} onValueChanged={handleRgRegion} />
                        <p className="text-xs text-blue-600">Region: <strong>{JSON.stringify(rgRegion)}</strong></p>
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500">Child — Province (Cascade Radio)</label>
                        <CnxRadioGroup id="rg7" customDataSource={provinces} valueExpr="value" displayExpr="text" layout="horizontal" cascadeRule={cascadeRule} cascadeBy={rgRegion} value={rg7} onValueChanged={handleRg7} />
                        <p className="text-xs text-pink-600">Province: <strong>{JSON.stringify(rg7)}</strong></p>
                    </div>
                </div>
            </div>
        </Section>
    );
});

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function DxDemo() {
    const providerValue = useMemo(() => ({
        selectBox: mockSelectBoxService,
        tagBox: mockTagBoxService,
        checkBoxGroup: mockCheckBoxService,
        radioGroup: mockRadioGroupService,
    }), []);

    return (
        <CnxDataProvider {...providerValue}>
            <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-6">
                <div className="border-b border-slate-200 pb-4">
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">DevExtreme</p>
                    <h1 className="text-xl font-bold text-slate-800">Component Demos</h1>
                </div>
                <SelectBoxDemo />
                <TagBoxDemo />
                <DateBoxDemo />
                <NumberBoxDemo />
                <CheckBoxGroupDemo />
                <RadioGroupDemo />
            </div>
        </CnxDataProvider>
    );
}
