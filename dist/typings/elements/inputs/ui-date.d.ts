export declare class UIDateView {
    element: Element;
    constructor(element: Element);
    bind(): void;
    dateChanged(newValue: any): void;
    minDateChanged(): void;
    maxDateChanged(): void;
    date: string;
    time: boolean;
    minDate: any;
    maxDate: any;
    title: string;
    level: number;
    timeLevel: number;
    __start: any;
    __current: any;
    __decade: any;
    __hour: number;
    __minute: number;
    m: moment.MomentStatic;
    __disablePrev: boolean;
    __disableNext: boolean;
    __disableToday: boolean;
    weekday(w: any): string;
    weekNumber(w: any): number;
    dateDisplay(w: any, d: any): moment.Moment;
    getDateClass(dt: any): string;
    getMonthClass(dt: any): string;
    getYearClass(dt: any): string;
    getHourClass(hour: any): string;
    getMinuteClass(minute: any): string;
    changeDatePage(): void;
    clicked(evt: any): void;
}
export declare class UIDate {
    element: Element;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    value: string;
    startDate: string;
    endDate: string;
    time: boolean;
    minDate: any;
    maxDate: any;
    placeholder: string;
    disabled: boolean;
    readonly: boolean;
    __clear: any;
    __tether: any;
    __value: any;
    __input: any;
    dropdown: any;
    clear(): void;
    busy: any;
    disable(disabled?: any): void;
    valueChanged(newValue: any): void;
    minDateChanged(newValue: any): void;
    maxDateChanged(newValue: any): void;
    __showDropdown: any;
    __unfocus: any;
    __focus: any;
    keyDown(evt: any): any;
    showDropdown(force: any): void;
    focusing(): void;
    stopUnfocus(): void;
    unfocusing(): void;
}
