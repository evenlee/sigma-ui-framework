// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView, bindingMode, DOM} from "aurelia-framework";
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@containerless()
@customElement('ui-form')
@inlineView(`<template><form class="ui-form \${class}" enterpressed.trigger="fireSubmit()"><slot></slot></form></template>`)
export class UIForm {
  constructor(public element: Element) { }

  @bindable() class = '';

  fireSubmit() {
    UIEvent.fireEvent('submit', this.element);
  }
}

@autoinject()
@containerless()
@customElement('ui-fieldset')
@inlineView(`<template><fieldset class="ui-fieldset \${class}"><legend>\${legend}</legend><div class="ui-fieldset-wrapper"><slot></slot></div></fieldset></template>`)
export class UIFieldset {
  constructor(public element: Element) {
    this.__collapsable = element.hasAttribute('collapsable');
  }

  __collapsable;

  @bindable() class = '';
  @bindable() legend = '';
  @bindable() enabled = true;
}

@autoinject()
@customElement('ui-input-group')
@inlineView(`<template class="ui-input-group"><slot name="inputLabel"></slot><div class="ui-group-wrapper"><slot></slot></div></template>`)
export class UIInputGroup {
  constructor(public element: Element) {
    if (this.element.hasAttribute('display')) this.element.classList.add('ui-display');
  }
}

@autoinject()
@containerless()
@customElement('ui-input-label')
@inlineView(`<template><label class="ui-input-label \${__labelClass} \${class}" for.bind="for" slot="inputLabel"><slot></slot></label></template>`)
export class UIInputLabel {
  constructor(public element: Element) {
    if (element.hasAttribute('required')) this.__labelClass += ' ui-required';
    if (element.hasAttribute('align-top')) this.__labelClass += ' ui-align-top';
  }

  __labelClass = '';

  @bindable() for = '';
  @bindable() class = '';
}

@autoinject()
@customElement('ui-input-addon')
@inlineView(`<template class="ui-input-addon"><slot><span class="\${icon}"></span></slot></template>`)
export class UIInputAddon {
  constructor(public element: Element) { }

  @bindable() icon;
}

@autoinject()
@customElement('ui-input-button')
@inlineView(`<template class="ui-input-button" role="button"><slot><span class="\${icon}"></span></slot></template>`)
export class UIInputButton {
  constructor(public element: Element) { }

  @bindable() icon;
}

@autoinject()
@customElement('ui-input-info')
@inlineView(`<template class="ui-input-info-bar"><slot></slot></template>`)
export class UIInputInfo {
  constructor(public element: Element) {
    if (this.element.hasAttribute('primary')) this.element.classList.add('ui-bg-primary');
    else if (this.element.hasAttribute('secondary')) this.element.classList.add('ui-bg-secondary');
    else if (this.element.hasAttribute('dark')) this.element.classList.add('ui-bg-dark');
    else if (this.element.hasAttribute('light')) this.element.classList.add('ui-bg-light');
    else if (this.element.hasAttribute('info')) this.element.classList.add('ui-bg-info');
    else if (this.element.hasAttribute('danger')) this.element.classList.add('ui-bg-danger');
    else if (this.element.hasAttribute('success')) this.element.classList.add('ui-bg-success');
    else if (this.element.hasAttribute('warning')) this.element.classList.add('ui-bg-warning');
    else this.element.classList.add('ui-text-muted');
  }
}

@autoinject()
@customElement('ui-display')
@inlineView(`<template class="ui-input-wrapper ui-display"><span innerhtml.bind="value"></span></template>`)
export class UIInputDisplay {
  constructor(public element: Element) { }

  @bindable() value: any = '';
}

@autoinject()
@customElement('ui-input')
@inlineView(`<template class="ui-input-wrapper \${__focus?'ui-focus':''}"><span class="ui-invalid-icon fi-ui"></span>
  <input class="ui-input" size="1" keypress.trigger="keyDown($event)" input.trigger="format($event)" change.trigger="fireChange()"
    value.bind="__value" placeholder.bind="placeholder" focus.trigger="__focus=true" blur.trigger="__focus=false" 
    type.bind="__type" id.bind="id" maxlength.bind="maxlength" ref="__input" \${disabled?'disabled':''} \${readonly?'readonly':''}/>
  <span class="ui-in-counter" if.bind="__counter">\${(maxlength-__value.length)}</span>
  <span class="ui-clear" if.bind="__clear && __value" click.trigger="clear()">&times;</span></template>`)
export class UIInput {
  constructor(public element: Element) {
    if (element.hasAttribute('email')) this.__type = 'email';
    else if (element.hasAttribute('url')) this.__type = 'url';
    else if (element.hasAttribute('file')) this.__type = 'file';
    else if (element.hasAttribute('search')) this.__type = 'search';
    else if (element.hasAttribute('number') || element.hasAttribute('number.bind')) this.__type = 'number';
    else if (element.hasAttribute('decimal') || element.hasAttribute('decimal.bind')) this.__type = 'number';
    else if (element.hasAttribute('password')) this.__type = 'password';
    else this.__type = 'text';

    if (element.hasAttribute('email')) this.__format = 'email';
    else if (element.hasAttribute('url')) this.__format = 'url';
    else if (element.hasAttribute('number') || element.hasAttribute('number.bind')) this.__format = 'number';
    else if (element.hasAttribute('decimal') || element.hasAttribute('decimal.bind')) this.__format = 'decimal';
    else this.__format = 'text';

    this.__clear = element.hasAttribute('clear');
    this.__counter = element.hasAttribute('charcount');
  }

  bind() {
    this.disabled = isTrue(this.disabled);
    this.readonly = isTrue(this.readonly);
  }

  __type;
  __format;
  __counter;

  __clear;
  __input;
  __value = '';

  /**
   * @property    
   * @type        
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';
  /**
   * @property    
   * @type        
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  number = NaN;
  /**
   * @property    
   * @type        
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  decimal = NaN;

  @bindable() id;
  @bindable() maxlength = 999;
  @bindable() placeholder = '';
  @bindable() disabled = true;
  @bindable() readonly = false;

  clear() {
    this.__value = this.value = ''; this.__input.focus();
  }

  __ignoreChange = false;
  valueChanged(newValue) {
    if (this.__ignoreChange) return;
    if (this.__format == 'email' || this.__format == 'url') newValue = (newValue || '').toLowerCase();
    this.value = this.__value = newValue;
  }
  numberChanged(newValue) {
    if (this.__ignoreChange) return;
    this.__value = newValue;
  }
  decimalChanged(newValue) {
    if (this.__ignoreChange) return;
    this.__value = newValue;
  }

  format(evt) {
    this.__ignoreChange = true;
    if (this.__format == 'email' || this.__format == 'url') this.value = evt.target.value = evt.target.value.toLowerCase();
    else if (this.__format == 'number') this.number = evt.target.valueAsNumber || '';
    else if (this.__format == 'decimal') this.decimal = evt.target.valueAsNumber || '';
    else this.value = evt.target.value;
    UIEvent.queueTask(() => this.__ignoreChange = false);
  }

  keyDown(evt) {
    let code = evt.keyCode || evt.which;
    if (evt.ctrlKey || evt.metaKey || evt.altKey) return true;
    if (code == 13) return UIEvent.fireEvent('enterpressed', this.element);
    if (this.__format == 'email') return /[a-zA-Z0-9\@\-\.\_\&\+]/.test(String.fromCharCode(code));
    if (this.__format == 'url') return /[a-zA-Z0-9\/\-\.\_\?\#\%\=\;\:\{\[\]\}\&\+]/.test(String.fromCharCode(code));
    if (this.__format == 'number') return /[0-9\-]/.test(String.fromCharCode(code));
    if (this.__format == 'decimal') {
      if (code == 46 && evt.target.value.indexOf('.') >= 0) return false;
      return /[0-9\.\-]/.test(String.fromCharCode(code));
    }
    return true;
  }

  fireChange() {
    UIEvent.fireEvent('change', this.element, this.value);
  }
}

@autoinject()
@customElement('ui-textarea')
@inlineView(`<template class="ui-input-wrapper \${__focus?'ui-focus':''} \${__counter?'ui-ta-counter':''}"><span class="ui-invalid-icon fi-ui"></span>
  <textarea class="ui-input" rows.bind="rows" value.bind="value" placeholder.bind="placeholder" \${disabled?'disabled':''} \${readonly?'readonly':''}
    focus.trigger="__focus=true" blur.trigger="__focus=false" id.bind="id" maxlength.bind="maxlength" ref="__input" change.trigger="fireChange()"></textarea>
  <span class="ui-ta-counter" if.bind="__counter">\${value.length & debounce} of \${maxlength}</span>
  <span class="ui-clear" if.bind="__clear && value" click.trigger="clear()">&times;</span></template>`)
export class UITextarea {
  constructor(public element: Element) {
    this.__counter = element.hasAttribute('charcount');
    this.__clear = element.hasAttribute('clear');
  }

  bind() {
    this.disabled = isTrue(this.disabled);
    this.readonly = isTrue(this.readonly);
  }

  __counter;
  __clear;
  __input;

  /**
   * @property    
   * @type        
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value = '';

  @bindable() id;
  @bindable() rows = 5;
  @bindable() maxlength = 10000;
  @bindable() placeholder = '';
  @bindable() disabled = true;
  @bindable() readonly = false;

  clear() {
    this.value = ''; this.__input.focus();
  }

  fireChange() {
    UIEvent.fireEvent('change', this.element, this.value);
  }
}



@autoinject()
@containerless()
@customElement('ui-phone')
@inlineView(`<template><div class="ui-input-addon"><span class="ui-flag \${__ctry}" if.bind="!country"></span>\${__prefix}</div>
  <div class="ui-input-wrapper \${class} \${__focus?'ui-focus':''}"><span class="ui-invalid-icon fi-ui"></span>
  <input class="ui-input" size="1" keypress.trigger="keyDown($event)" input.trigger="format($event)" change.trigger="fireChange()"
    value.bind="__value" placeholder.bind="__placeholder" focus.trigger="__focus=true" blur.trigger="__focus=false" 
    type.bind="__type" id.bind="id" ref="__input" \${disabled?'disabled':''} \${readonly?'readonly':''}/>
  <span class="ui-clear" if.bind="__clear && __value" click.trigger="clear()">&times;</span></div></template>`)
export class UIPhone {
  constructor(public element: Element) {
    this.__clear = element.hasAttribute('clear');
  }

  bind() {
    this.disabled = isTrue(this.disabled);
    this.readonly = isTrue(this.readonly);

    if (this.__national = !isEmpty(this.country)) this.__prefix = '+' + PhoneLib.getDialingCode(this.country); else this.__ctry = PhoneLib.getIso2Code(this.value);
    this.__placeholder = PhoneLib.getExample(this.country || 'us', PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, this.__national);
  }

  __clear;
  __input;
  __ctry = '';
  __value = '';
  __prefix = '';
  __national = false;
  __placeholder = '';

  /**
   * @property    
   * @type        
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';
  /**
   * @property    
   * @type        
   */
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  phone;

  @bindable() id;
  @bindable() country = '';
  @bindable() disabled = true;
  @bindable() readonly = false;

  clear() {
    this.__value = this.value = ''; this.__input.focus();
  }

  __ignoreChange = false;
  valueChanged(newValue) {
    if (this.__ignoreChange) return;
    this.value = this.phone = this.__value = newValue;
  }

  countryChanged(newValue) {
    if (this.__national = !isEmpty(newValue)) this.__prefix = '+' + PhoneLib.getDialingCode(this.country); else this.__ctry = PhoneLib.getIso2Code(this.value);
    this.__placeholder = PhoneLib.getExample(this.country || 'us', PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, this.__national);
  }

  format(evt) {
    this.__ignoreChange = true;
    let val = evt.target.value;
    if (!this.__national && !(/^\+/.test(val))) val = '+' + val;
    if (!this.__national) this.__ctry = PhoneLib.getIso2Code(val);
    evt.target.value = PhoneLib.formatInput(val, this.country);
    this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
    this.phone = PhoneLib.getNumberInfo(val, this.country);
    UIEvent.queueTask(() => this.__ignoreChange = false);
  }

  keyDown(evt) {
    let code = evt.keyCode || evt.which;
    if (evt.ctrlKey || evt.metaKey || evt.altKey) return true;
    if (code == 13) return UIEvent.fireEvent('enterpressed', this.element);
    return /[0-9]/.test(String.fromCharCode(code));
  }

  fireChange() {
    UIEvent.fireEvent('change', this.element, this.value);
  }
}