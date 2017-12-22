import React from 'react'
//import { lookups } from './Vars'

function addCommas( nStr ) {
    nStr += '';
    var x = nStr.toString().split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1,$2');
    }
    return x1 + x2;
}

function addZeroes( num ) {
    num += '';
    var value = Number(num);
    var res = num.split(".");
    if(num.indexOf('.') === -1) {
        value = value.toFixed(2);
        num = value.toString();
    } else if (res[1].length < 3) {
        value = value.toFixed(2);
        num = value.toString();
    }
return num
}

// For invalid Values
export const Invalid = ( props ) => {
    return <span className={props.className + " invalid"}>–</span>;
};

// For invalid Values
export const InvalidSvg = ( props ) => {
    return <tspan className={props.className + " invalid"}>–</tspan>;
};


export const CurrencyCalc = ( value, showZero, showUnit ) => {
  const round = 100;
  var valueb = addCommas(addZeroes(Math.round(value * round) / round));
  if ((valueb && valueb !== "NaN" && parseFloat(valueb) !== 0) ||showZero)
    return valueb;
  else
    return false;
}

// Generate Million USD based on M USD 32.12 => 32.12 M USD

// Percentage 50 / from={ 100 } => 50%
export const MusdCalc = ( value, showZero, showUnit ) => {
  const round = (value >= 0.5) ? 10 : (value >= 0.05) ? 100 : 10000;
  var valueb;
  if (value >= 0.5) {
    valueb = addCommas(addZeroes(Math.round(value * round) / round));
  }
  else {
    valueb = Math.round(value * round) / round
  }
  const unit = showUnit ? "M USD": ""
  if ((valueb && valueb !== "NaN" && parseFloat(valueb) !== 0) ||showZero)
    return valueb + unit;
  else
    return false;
}

export const Musd = ( props ) => {
  const value = MusdCalc(props.children);
  if (value)
	  return <span className={props.className}>{value}</span>;
  else
    return <Invalid className={props.className}/>;
};


// Formal Level from 3 => Level 3
export const Level = ( props ) => {
  const value = props.children;
  if (value)
    return <span className={props.className}>Level {value}</span>;
  else
    return <Invalid className={props.className}/>;
};

export const LevelSvg = ( props ) => {
    const { className, value, style, type, ...other } = props;
    const valueCalculated = props.children;
    return (<text className={props.className} {...other}>
              <tspan textAnchor={props.textAnchor} style={style}>Level { valueCalculated }</tspan>
            </text>);
};

export const MusdSvg = ( props ) => {
  const { className, value, style, type, ...other } = props;
  const valueb = MusdCalc(props.children);
  if (valueb)
    return (<text className={props.className} {...other}>
              <tspan style={style}>{ valueb }</tspan>
              <tspan style={style}> M USD</tspan>
            </text>);
  else
    return <InvalidSvg className={props.className}/>;
};

export const UsdSvg = ( props ) => {
  const { className, value, style, type, ...other } = props;
  const valueb = MusdCalc(props.children/1000000);
  if (valueb)
    return (<text className={props.className} {...other}>
              <tspan style={style}>{ valueb }</tspan>
              <tspan style={style}> M USD</tspan>
            </text>);
  else
    return <InvalidSvg className={props.className}/>;
};

export const TusdSvg = ( props ) => {
  const { className, value, style, type, ...other } = props;
  const valueb = MusdCalc(props.children/1000);
  if (valueb)
    return (<text className={props.className} {...other}>
              <tspan style={style}>{ valueb }</tspan>
              <tspan style={style}> T USD</tspan>
            </text>);
  else
    return <InvalidSvg className={props.className}/>;
};

// Generate Million USD based on USD 73821341 => 73.82 M USD 
export const Currency = ( props ) => {
  const value = CurrencyCalc(props.children);
  if (value)
    return <span className={props.className}>{value}<span className="unit__small">{props.from}</span></span>;
  else
    return <Invalid className={props.className}/>;
};

// Generate Million USD based on USD 73821341 => 73.82 M USD 
export const Usd = ( props ) => {
  const value = MusdCalc(props.children/1000000);
  if (value)
    return <span className={props.className}>{value}</span>;
  else
    return <Invalid className={props.className}/>;
};


export const Tusd = ( props ) => {
  const value = MusdCalc(props.children/1000);
  if (value)
    return <span className={props.className}>{value}</span>;
  else
    return <Invalid className={props.className}/>;
};

// Generate Billion USD based on USD 7331821341 => 73.82 B USD 
export const Busd = ( props ) => {
  const value = MusdCalc(props.children/1000000000);
  if (value)
    return <span className={props.className}>{ value }</span>;
  else
    return <Invalid className={props.className}/>;
};

// Format MT 50 => 50 MT
export const MtCalc = ( value, showZero, showUnit ) => {
   const round = (value >= 0.5) ? 10 : (value >= 0.05) ? 100 : 10000;
  var valueb;
  if (value >= 0.5) {
    valueb = addCommas(addZeroes(Math.round(value * round) / round));
  }
  else {
    valueb = Math.round(value * round) / round
  }
  const unit = showUnit ? "MT": ""
  if ((valueb && valueb !== "NaN" && parseFloat(valueb) !== 0) ||showZero)
    return valueb + unit;
  else
    return false;
}

export const Mt = (props ) => {
	const valueb = MtCalc(props.children, props.showZero);
  if (valueb)
	  return <span className={props.className}>{ valueb }</span>;
  else
    return <Invalid className={props.className}/>;
};

export const MtSvg = ( props ) => {
  const valueb = MtCalc(props.children, props.showZero);
  if (valueb) {
    const { className, value, style, type, ...other } = props;
    return <text className={props.className} {...other}><tspan textAnchor="start" style={style}>{ valueb }</tspan><tspan style={style}> MT</tspan></text>;
  } else
    return <InvalidSvg className={props.className}/>;
};



// Format Beneficiaries
export const Beneficiaries = ( props ) => {
  this.value = addCommas(Math.round(props.children * 100) / 100);
  if ((this.value && this.value !== "NaN") || props.showZero) {
	  return <span className={props.className}>{ this.value }</span>;
  }
  else {
    return <Invalid className={props.className}/>;
  }
};

// Format People
export const People = ( props ) => {
  if ((props.children && props.children !== "NaN") || props.showZero) {
    const valueCalculated = addCommas(props.children);
    return <span className={props.className}>{ valueCalculated }</span>;
  }
  return <Invalid className={props.className}/>; 
};

// Format People
export const PeopleSvg = ( props ) => {
    const { className, value, style, type, ...other } = props;
    const valueCalculated = addCommas(props.children);
    return <text className={props.className} {...other}><tspan textAnchor={props.textAnchor} style={style}>{ valueCalculated }</tspan><tspan style={style}> people</tspan></text>;
};

// Format Partners 7 => 7 Partners
export const Partners = ( props ) => {
    return <span className={props.className}>{ props.children }</span>;
};


/* Percentage 50 / from={ 100 } => 50% */
export const PercentageCalc = ( value, from, showZero, showUnit, isShift ) => {
  const unit = showUnit ? "%": "";
  var valueRe = false;
  if ((value && value !== "NaN") || showZero) {
    if (from)
      valueRe =  Math.round(value / from * 100);
    else
      valueRe =  Math.round(value);
  }
  if (valueRe !== false && isShift) {
    valueRe = 100-valueRe;
  }
  valueRe = (valueRe === false) ? false : valueRe + unit;
  return valueRe;
}

export const Months = ( props ) => {
  if (props.children !== false)
      return <span className={props.className}>{ props.children }</span>;
  return <Invalid className={props.className}/>; 
};

export const Percentage = ( props ) => {
  const value = PercentageCalc(props.children, props.from, false, false, props.isShift);
  if (value !== false)
      return <span className={props.className}>{ value }</span>;
  return <Invalid className={props.className}/>; 
};

export const PercentageSvg = ( props ) => {
    const { className, value, style, from, tspanProps, type, ...other } = props;
    const valueb = PercentageCalc(props.children);
    if (valueb !== false)
        return <text dx={props.dx} dy={props.dy} className={props.className} {...other}><tspan>{ valueb }</tspan><tspan> %</tspan></text>;
    return <InvalidSvg className={props.className}/>; 
};


// Percentage 50 / from={ 100 } => 50%
export const Households = ( props ) => {
  if ((props.children && props.children !== "NaN") || props.showZero) {
    return <span className={props.className}>{ addCommas(props.children) }</span>;
  }
  return <Invalid className={props.className}/>; 
};

// Countries 21 => 21 Countries
export const Countries = ( props ) => {
    return <span className={props.className}>{ props.children }</span>;
};

// Trips 50  => 50 Trips
export const Trips = ( props ) => {
    const valueCalculated = addCommas(props.children);
    return <span className={props.className}>{ valueCalculated }</span>;
};

// None
export const None = ( props ) => {
    return <span className={props.className}>{props.children}</span>;
};

export const NoneSvg = ( props ) => {
    const { className, value, style, type, ...other } = props;
    const valueCalculated = props.children;
    return <text className={props.className} {...other}><tspan textAnchor={props.textAnchor} style={style}>{ valueCalculated }</tspan></text>;
};

// Format Region RBB => Bangkok Regional Bureau
/* export const Region = ( props ) => {
    const selected = props.show ? props.show : "fullName"; 
    var name = false;
    if (lookups[props.children])
      name = lookups[props.children][selected];
    return <span className={props.className}>{ props.children }{name && <span className="unit__small">{ name }</span>}</span>;
}; */


export const MonthYearCalc = ( value, showZero, showUnit ) => {

  var newDate;
  if (typeof value === 'number' && value.length >= 7) {
    newDate = new Date(value);
  }
  else if (value.getMonth) {
    newDate = value;
  }
  else {
    const year = value.toString().substring(0, 4);
    const month = parseInt(value.toString().substring(4, 7), 10) - 1;
    newDate = new Date(year, month, 1);
  }
  const monthName = newDate.toLocaleString("en-us", { month: "short" });
  const monthNameFull = newDate.toLocaleString("en-us", { month: "long" });

  return {"monthName": monthName, "monthNameFull": monthNameFull, "year": newDate.getFullYear(), "date": newDate }
}

export const MonthYearCalcDate = ( value, showZero, showUnit ) => {
  const year = value.toString().substring(0, 4);
  const month = parseInt(value.toString().substring(4, 7), 10) - 1;
  const newDate = new Date(year, month, 1);
  return newDate
}

// Format YYYYMM / from 201709  => Sep 2017
export const MonthYear = ( props ) => {
  const value = MonthYearCalc(props.children);
  return <span className={props.className}>{ value.monthName } { value.year }</span>;
};

export const Year = ( props ) => {
  return <span className={props.className}>{ props.children }</span>;
};

// Format YYYYMM / from 201709  => Sep 2017
export const MonthYearSvg = ( props ) => {
  const value = MonthYearCalc(props.children);

  const { className, style, type, ...other } = props;
  return <text className={props.className} {...other}><tspan style={style}>{ value.monthName } { value.year }</tspan></text>;
};


// Camelcase Title if Uppercase UPPERCASE NAME ==> Uppercase Name
export const titleCase = ( str ) => {
  if (str === undefined) return null;
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}


// All Unit Components together in <Unit type="Unitname" />

const components = {
  Usd,
  Tusd,
  Musd,
  Busd,
  Currency,
  Partners,
  Beneficiaries,
  Households,
  Months,
  Mt,
  People,
  Percentage,
  MonthYear,
  Year,
  None,
  NoneSvg,
  //Region,
  Trips,
  Level,
  LevelSvg,
  Countries,
  UsdSvg,
  TusdSvg,
  MusdSvg,
  PeopleSvg,
  MonthYearSvg,
  PercentageSvg,
  MtSvg,
  PercentageCalc,
};

export const Unit = (props ) => {
  const type = props.type ? props.type : "None";
  const Unit = components[type];
  const unitHideClass = props.hideUnit ? "unit--hide" : "";
  const textAnchor = props.textAnchor ? props.textAnchor : "start";
  const unitClassName = props.type ? props.type.toLowerCase() : "";
  const className = "unit " + props.className + " " + unitClassName + " " + unitHideClass;
  const {hideUnit, ...other} = props;
  if (Unit === undefined) {
    console.warn(`The unit "${type}" is undefined`);
    return null;
  }
  return (<Unit {...other} className={className} textAnchor={textAnchor} />);
};

