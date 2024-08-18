declare const _default: {
    name: string;
    tel: string;
    save: string;
    clear: string;
    cancel: string;
    confirm: string;
    delete: string;
    loading: string;
    noCoupon: string;
    nameEmpaty: string;
    addContact: string;
    telInvalid: string;
    vanCalendar: {
        end: string;
        start: string;
        title: string;
        weekdays: string[];
        monthTitle: (year: number, month: number) => string;
        rangePrompt: (maxRange: number) => string;
    };
    vanCascader: {
        select: string;
    };
    vanPagination: {
        prev: string;
        next: string;
    };
    vanPullRefresh: {
        pulling: string;
        loosing: string;
    };
    vanSubmitBar: {
        label: string;
    };
    vanCoupon: {
        unlimited: string;
        discount: (discount: number) => string;
        condition: (condition: number) => string;
    };
    vanCouponCell: {
        title: string;
        count: (count: number) => string;
    };
    vanCouponList: {
        exchange: string;
        close: string;
        enable: string;
        disabled: string;
        placeholder: string;
    };
    vanAddressEdit: {
        area: string;
        areaEmpty: string;
        addressEmpty: string;
        addressDetail: string;
        defaultAddress: string;
    };
    vanAddressList: {
        add: string;
    };
};
export default _default;
