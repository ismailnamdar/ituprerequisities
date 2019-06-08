import React from "react";
import { Select } from "antd";
const { Option } = Select;

const children = [];
for (let i = 0; i < 8; i++) {
    children.push(<Option key={i}>{i + 1 + ". Dönem"}</Option>);
}

const TermSelector = props => <Select
    mode="tags"
    style={{ minWidth: 200 }}
    placeholder="Döneme göre filtrele"
    onChange={props.onChange}>
    {children}
</Select>;

export default TermSelector;