import cx from "classnames";
import React from "react";
import ColorPicker from "../../../ColorPicker";
import Switch from "../../../Switch";
import styles from "./ConfigurationRow.module.scss";

interface ConfigurationRowProps {
  required: boolean;
  name: string;
}
const ConfigurationRow: React.FC<ConfigurationRowProps> = ({
  required,
  name,
  children,
}) => {
  return (
    <div className={styles.row}>
      <label
        htmlFor={name}
        className={cx(styles.label, {
          [styles.required]: required,
        })}
      >
        {name}
      </label>
      {children}
    </div>
  );
};

interface StringConfigurationRowProps extends ConfigurationRowProps {
  value?: string;
  description?: string;
  onChange: (v: string) => void;
}

export const StringConfigurationRow: React.FC<StringConfigurationRowProps> = ({
  required,
  name,
  value,
  description,
  onChange,
}) => {
  return (
    <ConfigurationRow required={required} name={name}>
      <input
        type="text"
        defaultValue={value}
        onBlur={(e) => {
          onChange(e.target.value);
        }}
        placeholder={description}
        title={description ?? name}
        required={required}
      />
    </ConfigurationRow>
  );
};

interface NumberConfigurationRowProps extends ConfigurationRowProps {
  value?: number;
  description?: string;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
}
export const NumberConfigurationRow: React.FC<NumberConfigurationRowProps> = ({
  required,
  name,
  value,
  min,
  max,
  description,
  onChange,
}) => {
  return (
    <ConfigurationRow required={required} name={name}>
      <input
        defaultValue={value}
        type="number"
        onBlur={(e) => {
          const { value } = e.target;
          onChange(value ? +value : null);
        }}
        title={description ?? name}
        min={min ?? 0}
        max={max}
        required={required}
        placeholder="Number"
      />
      <span className={styles.description}>{description}</span>
    </ConfigurationRow>
  );
};

interface ColorConfigurationRowProps extends ConfigurationRowProps {
  onChange: (v: string | string[]) => void;
  value?: number;
  description?: string;
  gradient?: boolean;
}
export const ColorConfigurationRow: React.FC<ColorConfigurationRowProps> = ({
  required,
  name,
  onChange,
  description,
  gradient,
}) => {
  return (
    <ConfigurationRow required={required} name={name}>
      <ColorPicker
        onBlur={(v, angle) => {
          const colors = v.map((v) => v.slice(1));
          if (colors.length > 1) colors.unshift(`${angle}`);
          onChange(colors);
        }}
        supportGradient={gradient}
      />
      <span className={styles.description}>{description}</span>
    </ConfigurationRow>
  );
};

interface BooleanConfigurationRowProps extends ConfigurationRowProps {
  value?: boolean;
  onChange: (v: boolean) => void;
  description?: string;
  defaultValue?: boolean;
}

export const BooleanConfigurationRow: React.FC<BooleanConfigurationRowProps> =
  ({ required, name, description, defaultValue = false, onChange }) => {
    return (
      <ConfigurationRow required={required} name={name}>
        <Switch onChange={onChange} defaultValue={defaultValue} />
        <span className={styles.description}>{description}</span>
      </ConfigurationRow>
    );
  };

interface SelectConfigurationRowProps extends ConfigurationRowProps {
  onChange: (v: string | string[]) => void;
  description?: string;
  options: string[];
  multiple?: boolean;
}
export const SelectConfigurationRow: React.FC<SelectConfigurationRowProps> = ({
  required,
  name,
  options,
  description,
  multiple = false,
  onChange,
}) => {
  return (
    <ConfigurationRow required={required} name={name}>
      <select
        required={required}
        onChange={(e) => {
          const selected: string[] = [];
          Array.prototype.forEach.call(e.target.options, (option) => {
            option.selected && option.value && selected.push(option.value);
          });
          onChange(selected);
        }}
        multiple={multiple}
      >
        <option value="">--{description}--</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </ConfigurationRow>
  );
};
