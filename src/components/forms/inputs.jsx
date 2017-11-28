import React from 'react'
import classNames from 'classnames'
import InlineError from './inlineError'
import Dropzone from 'react-dropzone'
import Select from 'react-select'


export const Label = ({ children, htmlFor }) => {
    if (children !== false)
        return (<label htmlFor={htmlFor}>{children}</label>)
    else return null
};

export const RenderInput = ({ input, label, wrapper, type, meta: { touched, error } }) => (
    <InlineError touched={touched} error={error}>
        <div className={wrapper === false ? '' : 'wfp-form--group'}>
            <Label>{label}</Label>
            <input {...input} type={type}/>
        </div>
    </InlineError>
);


export const RenderDropzone = ({ input, name, label, type, selectDescription, meta: { touched, error } }) => {
  const files = input.value;
  return (
    <div>
      <Dropzone
        className="wfp-btn xsmall dropzone__select"
        name={name}
        onDrop={( filesToUpload, e ) => input.onChange(filesToUpload)}
      >
        {selectDescription ? selectDescription : 'Upload a file'}
      </Dropzone>
      {touched &&
        error &&
        <span className="error">{error}</span>}
      {files && Array.isArray(files) && (
        <ul className="dropzone__list">
          { files.map((file, i) => <li key={i}>{file.name} <a onClick={( filesToUpload, e ) => input.onChange('')}>clear</a></li>) }
        </ul>
      )}
    </div>
  );
}


const GravatarValue = (props) => {

    console.log(props);
    return (
        <div className="Select-value userselect__value" title={props.value.title}>
            <div className="Select-value-label">
                <div className="userselect__value__text">{props.children}</div>
                <div className="userselect__value__extended">

                <img src={`http://gtd.wfp.org/media/pictures/auto/${props.value.email}.jpg`} />
                Index: {props.value.indexno}
                <span>{props.value.email}</span>
                </div>
            </div>
        </div>
    );
};

/*
    propTypes: {
        children: PropTypes.node,
        placeholder: PropTypes.string,
        value: PropTypes.object
    },
    */

export class RenderStaffSelect extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
    }

    handleChange = (value) => {
        this.setState({ value });
        console.log(value);
        console.log('Selected:', value);
        if (value.indexno)
            this.props.input.onChange(value.indexno);
    }

    render () {
        const { input, label, type, loadOptions, meta: { touched, error } } = this.props;
        return (
            <InlineError touched={touched} error={error}>
                <div className="wfp-form--group">
                    <Label>{label}</Label>
                    <div className="userselect__wrapper">
                        <Select.Async
                            id="state-select"
                            ref="stateSelect"
                            autoFocus
                            className="userselect__select"
                            name="selected-state"
                            placeholder="Select staff by last name"
                            valueKey="indexno"
                            labelKey="text"
                            value={this.state.value}
                            onChange={this.handleChange}        
                            loadOptions={loadOptions}     
                            searchable={true}
                            valueComponent={GravatarValue}       
                        />
                        <input {...input} placeholder={label} type="hidden" />
                    </div>
                </div>
            </InlineError>
        )
    }
};


export class RenderCurrencyInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
    }

    handleChange = (value) => {
        this.setState({ value });
        console.log(value);
        console.log('Selected:', value);
        this.props.input.onChange(value.id);
    }

    render () {
        const { input, label, type, loadOptions, meta: { touched, error } } = this.props;
        return (
            <InlineError touched={touched} error={error}>
                <div className="wfp-form--group">
                    <Label>{label}</Label>
                    <div className="currencyinput__wrapper">
                        <Select.Async
                            id="state-select"
                            ref="stateSelect"
                            autoFocus
                            className="currencyinput__select"
                            name="selected-state"
                            valueKey="id"
                            placeholder="Select currency"
                            labelKey="text"
                            clearable={false}
                            value={this.state.value}
                            onChange={this.handleChange}        
                            loadOptions={loadOptions}     
                            searchable={true}
                        />
                        <input {...input} placeholder={label} type="hidden" />
                    </div>
                </div>
            </InlineError>
        )
    }
};

export const RenderCheckbox = ({ input, label, type, meta: { touched, error } }) => (
    <InlineError touched={touched} error={error}>
        <div className="wfp-checkbox">
            <input id={input.name} placeholder={label} type={type}/>
            <Label htmlFor={input.name}>{label}</Label>
        </div>
    </InlineError>
);


export const RenderTextarea = ({ input, label, type, meta: { touched, error } }) => (
    <InlineError touched={touched} error={error}>
        <div className="wfp-form--group">
            <Label>{label}</Label>
            <textarea {...input} placeholder={label} type={type}/>
        </div>
    </InlineError>
);


export const RenderSelect = (props) => {
    const { input, selectEmptyText, selectList, label, meta: { touched, error } } = props;
    return (
        <InlineError touched={touched} error={error}>
            <div className="wfp-form--group">
            <label>{label}</label>
            <select {...input}>
                <option value="">{selectEmptyText}</option>
                {selectList.map(val => <option value={val} key={val}>{val}</option>)}
            </select>
            </div>
        </InlineError>
    )
}

export const RenderStatic = ({data, label, hideLabel}) => (
    <div className="wfp-form--group--horizontal">
        {hideLabel !== true &&
            <Label>{label}</Label>
        }
        <span className="wfp-staticinput">{data}</span>
    </div>
)

export const FormGroup = ({children, type, className}) => {
	 const btnClass = classNames({
      'wfp-form--group': true,
      'wfp-form--group--seperate': (type === 'seperate'),
      'wfp-form--group--seperatesmall': (type === 'seperatesmall'),
      [$`{className}`]: className,
    }); 
	return (
		<div className={ btnClass }>
			{children}
		</div>
	)
}

export const FormGroupTitle = ({children}) => (
    <h4 className='wfp-form--group__title'>
        {children}
    </h4>
)

export const FormGroupInputField = ({children}) => (
    <div className='wfp-form--group__inputfield'>
        {children}
    </div>
)

export const Button = (props) => {

    const {buttonType, ...other} = props;

    const btnClass = classNames({
        'wfp-btn': !props.buttonType,
        [`wfp-btn--${props.buttonType}`]: props.buttonType,
    });

    return (
        <button className={btnClass} {...other} type={props.type ? props.type : 'button'}>
            {props.children}
        </button>
    )
}

export const FormHint = ({children}) => (
    <div className='wfp-form--group__hint'>
        {children}
    </div>
)

export const RequiredInfo = () => (
    <div className="wfp-form__required-description">
        <span className="mandatory_field">*</span> Indicates required field
    </div>
);