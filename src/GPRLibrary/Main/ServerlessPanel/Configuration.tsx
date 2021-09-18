import React, { useEffect, useMemo, useState } from "react";
import styles from "./Configuration.module.scss";
import {
  BooleanConfigurationRow,
  ColorConfigurationRow,
  NumberConfigurationRow,
  SelectConfigurationRow,
  StringConfigurationRow,
} from "./ConfigurationRow";

type StringConfigurationType = {
  type: "string";
  defaultValue?: string;
};

type NumberConfigurationType = {
  type: "number";
  min?: number;
  max?: number;
  defaultValue?: number;
};

type ColorConfigurationType = {
  type: "color";
  gradient?: boolean;
  defaultValue?: string;
};

type SelectConfigurationType = {
  type: "select";
  options: string[];
  multiple?: boolean;
  defaultValue?: string;
};

type BooleanConfigurationType = {
  type: "boolean";
  defaultValue?: boolean;
};

function isStringConfigurationType(data: any): data is StringConfigurationType {
  return data?.["type"] === "string";
}
function isNumberConfigurationType(data: any): data is NumberConfigurationType {
  return data?.["type"] === "number";
}
function isBooleanConfigurationType(
  data: any
): data is BooleanConfigurationType {
  return data?.["type"] === "boolean";
}
function isColorConfigurationType(data: any): data is ColorConfigurationType {
  return data?.["type"] === "color";
}
function isSelectConfigurationType(data: any): data is SelectConfigurationType {
  return data?.["type"] === "select";
}

export type ConfigurationType = {
  [name: string]: {
    required?: boolean;
    section: string;
    description?: string;
    cacheId?: string;
  } & (
    | StringConfigurationType
    | NumberConfigurationType
    | ColorConfigurationType
    | SelectConfigurationType
    | BooleanConfigurationType
  );
};

type GroupItem = {
  name: string;
} & ConfigurationType[string];

type ConfiguredItemsType = {
  [name: string]: string | string[] | number | boolean;
};

export interface IProps {
  data: ConfigurationType;
  onChange: (v: ConfiguredItemsType) => void;
}

const configurationCache: ConfiguredItemsType = {};

const ServerlessPanelConfiguration: React.FC<IProps> = ({ data, onChange }) => {
  const groups = useMemo(() => {
    const groups = new Map<string, GroupItem[]>();
    Object.entries(data).forEach(([name, item]) => {
      const groupId = item.section.toLowerCase();
      const groupItems = groups.get(groupId);
      if (groupItems) {
        groupItems.push({ ...item, name });
      } else {
        groups.set(groupId, [{ ...item, name }]);
      }
    });
    return groups;
  }, [data]);

  const [configuredItems, updateConfiguredItems] =
    useState<ConfiguredItemsType>(() => {
      return Object.entries(data).reduce((configs, [name, { cacheId }]) => {
        if (cacheId && cacheId in configurationCache) {
          return { ...configs, [name]: configurationCache[cacheId] };
        } else {
          return configs;
        }
      }, {});
    });

  const deleteConfiguredItem = (name: string) => {
    const { cacheId } = data[name];
    if (cacheId) {
      delete configurationCache[cacheId];
    }
    updateConfiguredItems((state) => {
      const { [name]: val, ...rest } = state;
      return rest;
    });
  };

  const setConfiguredItem = (
    name: string,
    value: ConfiguredItemsType[string]
  ) => {
    const { cacheId } = data[name];
    if (cacheId) {
      configurationCache[cacheId] = value;
    }
    updateConfiguredItems((state) => {
      return { ...state, [name]: value };
    });
  };

  useEffect(() => {
    onChange(configuredItems);
  }, [configuredItems, onChange]);

  return (
    <>
      {[...groups].map(([groupId, items]) => {
        return (
          <details key={groupId} open={true}>
            <summary className={styles.groupHeader}>{groupId}</summary>
            {items.map((item) => {
              const { name, required, description, defaultValue } = item;
              const value = configuredItems[name];

              const commonProps = {
                key: name,
                required: !!required,
                name,
                description,
                onChange: (v: ConfiguredItemsType[string]) => {
                  if (!v || v === defaultValue) {
                    deleteConfiguredItem(name);
                  } else {
                    setConfiguredItem(name, v);
                  }
                },
              };
              if (isStringConfigurationType(item)) {
                return (
                  <StringConfigurationRow
                    {...commonProps}
                    value={typeof value === "string" ? value : ""}
                  />
                );
              } else if (isNumberConfigurationType(item)) {
                return (
                  <NumberConfigurationRow
                    {...commonProps}
                    onChange={(v) => {
                      if (typeof v !== "number") {
                        deleteConfiguredItem(name);
                      } else {
                        setConfiguredItem(name, v);
                      }
                    }}
                  />
                );
              } else if (isColorConfigurationType(item)) {
                return (
                  <ColorConfigurationRow
                    {...commonProps}
                    gradient={item.gradient}
                  />
                );
              } else if (isBooleanConfigurationType(item)) {
                return (
                  <BooleanConfigurationRow
                    {...commonProps}
                    defaultValue={item.defaultValue}
                  />
                );
              } else if (isSelectConfigurationType(item)) {
                return (
                  <SelectConfigurationRow
                    {...commonProps}
                    options={item.options}
                    multiple={item.multiple}
                    onChange={(v) => {
                      if (v.length === 0) {
                        deleteConfiguredItem(name);
                      } else {
                        setConfiguredItem(name, v);
                      }
                    }}
                  />
                );
              } else {
                return null;
              }
            })}
          </details>
        );
      })}
    </>
  );
};

export default ServerlessPanelConfiguration;
