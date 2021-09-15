import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./ConfigurationRow.module.scss";
import ColorPicker from "../../../ColorPicker";
import Switch from "../../../Switch";
import Modal from "../../../Modal";

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
        placeholder={description}
      />
    </ConfigurationRow>
  );
};

interface ColorConfigurationRowProps extends ConfigurationRowProps {
  onChange: (v: string | string[] | null) => void;
  value?: number;
  description?: string;
}
export const ColorConfigurationRow: React.FC<ColorConfigurationRowProps> = ({
  required,
  name,
  onChange,
}) => {
  return (
    <ConfigurationRow required={required} name={name}>
      <ColorPicker onBlur={() => {}} />
    </ConfigurationRow>
  );
};

interface BooleanConfigurationRowProps extends ConfigurationRowProps {
  value?: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}

export const BooleanConfigurationRow: React.FC<BooleanConfigurationRowProps> =
  ({ required, name, description, onChange }) => {
    return (
      <ConfigurationRow required={required} name={name}>
        <Switch onChange={onChange} />
      </ConfigurationRow>
    );
  };

interface SelectConfigurationRowProps extends ConfigurationRowProps {
  onChange: (v: string) => void;
  description?: string;
  options: string[];
}
export const SelectConfigurationRow: React.FC<SelectConfigurationRowProps> = ({
  required,
  name,
  options,
  description,
}) => {
  return (
    <ConfigurationRow required={required} name={name}>
      <select required={required}>
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
