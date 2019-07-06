import React from "react";
import { Select } from "antd";
const { Option } = Select;

const departments = [
    {
        key: "tek",
        label: "Tekstil"
    },
    {
        key: "blg",
        label: "Bilgisayar"
    },
    {
        key: "den",
        label: "Gemi Deniz Teknolojileri"
    }
];
const children = departments.map(({key, label}) => <Option key={key}>{label}</Option>);

const DepartmentSelector = props => <Select
    style={{ minWidth: 200 }}
    placeholder="Bölüm Seçiniz"
    onChange={props.onChange}>
    {children}
</Select>;

export default DepartmentSelector;