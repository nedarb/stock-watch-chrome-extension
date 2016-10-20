import Checkbox from 'material-ui/Checkbox';
import React from 'react';

const OptionsDisplaySectionColumn = (props) =>
  <div>
    <h1>Columns</h1>
    <Checkbox checked={true} disabled={true} label="symbol" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="current price" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="change by value" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="change by percentage" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="previously closed price" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="open price" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="day low" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="day high" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="52 week low" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="52 week high" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="market capital" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="P/E" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="beta" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="EPS" labelStyle={{textAlign: 'left'}} />
    <Checkbox label="institutionally owned" labelStyle={{textAlign: 'left'}} />
  </div>;

export default OptionsDisplaySectionColumn;
