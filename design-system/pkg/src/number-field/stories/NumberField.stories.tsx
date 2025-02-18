import { chain } from '@react-aria/utils';
import { action } from '@keystar/ui-storybook';
import { useState } from 'react';

import { Button } from '@keystar/ui/button';

import { NumberField, NumberFieldProps } from '..';

export default {
  title: 'Components/NumberField',
};

export const Default = () => render({});

Default.story = {
  name: 'default',
};

export const DefaultValue10 = () => render({ defaultValue: 10 });

DefaultValue10.story = {
  name: 'defaultValue: 10',
};

export const Value10 = () => render({ value: 10 });

Value10.story = {
  name: 'value: 10',
};

export const MaximumFractionDigits0 = () =>
  render({ formatOptions: { maximumFractionDigits: 0 } });

MaximumFractionDigits0.story = {
  name: 'maximumFractionDigits = 0',
};

export const Currency = () =>
  render({
    formatOptions: { style: 'currency', currency: 'EUR' },
    label: 'Price',
  });

Currency.story = {
  name: 'currency',
};

export const Percent = () =>
  render({ formatOptions: { style: 'percent' }, label: 'Tax' });

Percent.story = {
  name: 'percent',
};

export const PercentMaxFractionDigits2NoMinFractionDigits = () =>
  render({
    formatOptions: { style: 'percent', maximumFractionDigits: 2 },
    label: 'Tax',
  });

PercentMaxFractionDigits2NoMinFractionDigits.story = {
  name: 'percent, max fraction digits: 2, no min fraction digits',
};

export const PercentMin2Max2FractionDigits = () =>
  render({
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
    label: 'Tax',
  });

PercentMin2Max2FractionDigits.story = {
  name: 'percent min = 2 max = 2 fraction digits',
};

export const PercentMin2Max3FractionDigits = () =>
  render({
    formatOptions: {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    },
    label: 'Tax',
  });

PercentMin2Max3FractionDigits.story = {
  name: 'percent min = 2 max = 3 fraction digits',
};

export const MinValue00FractionDigits = () =>
  render({ minValue: 0, formatOptions: { maximumFractionDigits: 0 } });

MinValue00FractionDigits.story = {
  name: 'minValue = 0, 0 fraction digits',
};

export const PercentUsingSign = () =>
  render({
    formatOptions: { style: 'percent', signDisplay: 'always' },
    label: 'Tax',
  });

PercentUsingSign.story = {
  name: 'percent using sign',
};

export const Disabled = () => render({ isDisabled: true });

Disabled.story = {
  name: 'disabled',
};

export const Readonly = () => render({ defaultValue: 10, isReadOnly: true });

Readonly.story = {
  name: 'readonly',
};

export const ErrorMessage = () =>
  render({ errorMessage: 'Some validation message.' });

ErrorMessage.story = {
  name: 'errorMessage',
};

export const MinValue0MaxValue20 = () => render({ minValue: 0, maxValue: 20 });

MinValue0MaxValue20.story = {
  name: 'minValue = 0, maxValue = 20',
};

export const MinValue50MaxValue20 = () =>
  render({ minValue: -50, maxValue: -20 });

MinValue50MaxValue20.story = {
  name: 'minValue = -50, maxValue = -20',
};

export const MinValue20MaxValue50 = () =>
  render({ minValue: 20, maxValue: 50 });

MinValue20MaxValue50.story = {
  name: 'minValue = 20, maxValue = 50',
};

export const MinValue0DefaultValue0 = () =>
  render({ minValue: 0, defaultValue: 0 });

MinValue0DefaultValue0.story = {
  name: 'minValue = 0, defaultValue = 0',
};

export const Step5 = () => render({ step: 5 });

Step5.story = {
  name: 'step = 5',
};

export const Step3WithMin2Max21 = () =>
  render({ step: 3, minValue: 2, maxValue: 21 });

Step3WithMin2Max21.story = {
  name: 'step = 3 with min = 2, max = 21',
};

export const AutoFocus = () => render({ autoFocus: true });

AutoFocus.story = {
  name: 'autoFocus',
};

export const HideStepper = () => render({ hideStepper: true });

HideStepper.story = {
  name: 'hideStepper',
};

export const Required = () => render({ isRequired: true });

Required.story = {
  name: 'required',
};

export const NoVisibleLabel = () =>
  renderNoLabel({ isRequired: true, 'aria-label': 'Width' });

NoVisibleLabel.story = {
  name: 'no visible label',
};

export const AriaLabelledby = () => (
  <>
    <label htmlFor="numberfield" id="label">
      Width
    </label>
    {renderNoLabel({
      isRequired: true,
      id: 'numberfield',
      'aria-labelledby': 'label',
    })}
  </>
);

AriaLabelledby.story = {
  name: 'aria-labelledby',
};

export const WithDescriptionNoVisibleLabel = () =>
  renderNoLabel({
    'aria-label': 'Age',
    description: 'Please select your age.',
  });

WithDescriptionNoVisibleLabel.story = {
  name: 'with description, no visible label',
};

export const CustomWidth = () => render({ width: 'container.xsmall' });

CustomWidth.story = {
  name: 'custom width',
};

export const CustomWidthNoVisibleLabel = () =>
  renderNoLabel({
    width: 'size.container.xsmall',
    isRequired: true,
    'aria-label': 'Width',
  });

CustomWidthNoVisibleLabel.story = {
  name: 'custom width no visible label',
};

export const Controlled = () => <NumberFieldControlled />;

Controlled.story = {
  name: 'controlled',
};

export const CurrencySwitcher = (args: {
  currency?: string;
  currencyDisplay?: string;
  currencySign?: string;
}) => (
  <NumberFieldWithCurrencySelect
    formatOptions={{
      style: 'currency',
      currency: args.currency,
      currencySign: args.currencySign,
      currencyDisplay: args.currencyDisplay,
    }}
  />
);

CurrencySwitcher.args = {
  currency: 'EUR',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
};
CurrencySwitcher.argTypes = {
  currency: {
    control: {
      type: 'select',
    },
    options: ['EUR', 'USD', 'GBP', 'JPY'],
  },
  currencyDisplay: {
    control: {
      type: 'select',
    },
    options: ['symbol', 'narrowSymbol', 'code', 'name'],
  },
  currencySign: {
    control: {
      type: 'select',
    },
    options: ['standard', 'accounting'],
  },
};

export const MinWidth = () => render({ width: 0 });

MinWidth.story = {
  name: 'min width',
};

export const FocusEvents = () =>
  render({
    onBlur: action('onBlur'),
    onFocus: action('onFocus'),
    onFocusChange: action('onFocusChange'),
    onKeyDown: action('onKeyDown'),
    onKeyUp: action('onKeyUp'),
  });

FocusEvents.story = {
  name: 'focus events',
};

export const InputDomEvents = () =>
  render({
    onCopy: action('onCopy'),
    onCut: action('onCut'),
    onPaste: action('onPaste'),
    onCompositionStart: action('onCompositionStart'),
    onCompositionEnd: action('onCompositionEnd'),
    onCompositionUpdate: action('onCompositionUpdate'),
    onSelect: action('onSelect'),
    onBeforeInput: action('onBeforeInput'),
    onInput: action('onInput'),
  });

InputDomEvents.story = {
  name: 'input dom events',
};

export const ResetControlledStateToBlankWithNull = () => (
  <NumberFieldControlledStateReset />
);

ResetControlledStateToBlankWithNull.story = {
  name: 'reset controlled state to blank with null',
};

function render(props: NumberFieldProps = {}) {
  return (
    <NumberField
      onChange={action('onChange')}
      UNSAFE_className="custom_classname"
      label="Width"
      {...props}
    />
  );
}

function renderNoLabel(props: any = {}) {
  return (
    <NumberField
      {...props}
      onChange={action('onChange')}
      UNSAFE_className="custom_classname"
    />
  );
}

function NumberFieldControlled(props: NumberFieldProps) {
  let [value, setValue] = useState(10);
  return (
    <NumberField
      {...props}
      formatOptions={{ style: 'currency', currency: 'EUR' }}
      value={value}
      onChange={chain(setValue, action('onChange'))}
      label="Price"
    />
  );
}

function NumberFieldWithCurrencySelect(props: NumberFieldProps) {
  let [value, setValue] = useState(10);

  return (
    <NumberField
      label="Price"
      {...props}
      value={value}
      onChange={chain(setValue, action('onChange'))}
      width="alias.singleLineWidth"
    />
  );
}

function NumberFieldControlledStateReset() {
  const [controlledValue, setControlledValue] = useState<number | null>(12);
  return (
    <>
      <NumberField
        // @ts-ignore
        value={controlledValue}
        onChange={value => setControlledValue(value)}
      />
      <Button onPress={() => setControlledValue(null)}>Reset</Button>
    </>
  );
}
