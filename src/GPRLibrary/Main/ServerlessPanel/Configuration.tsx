import React, { useEffect, useMemo, useState } from "react";
import styles from "./Configuration.module.scss";
import {
  BooleanConfigurationRow,
  ColorConfigurationRow,
  NumberConfigurationRow,
  SelectConfigurationRow,
  StringConfigurationRow,
} from "./ConfigurationRow";

export type ConfigurationType = {
  [name: string]: {
    required?: boolean;
    section: string;
    description?: string;
    cacheId?: string;
  } & (
    | {
        type: "string";
        defaultValue?: string;
      }
    | {
        type: "number";
        min?: number;
        max?: number;
        defaultValue?: number;
      }
    | {
        type: "color";
        gradient?: boolean;
        defaultValue?: string;
      }
    | {
        type: "select";
        options: string[];
        multiple?: boolean;
        defaultValue?: string;
      }
    | {
        type: "boolean";
        defaultValue?: boolean;
      }
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
              const { name, type, required, description, defaultValue } = item;
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
              if (type === "string") {
                return (
                  <StringConfigurationRow
                    {...commonProps}
                    value={typeof value === "string" ? value : ""}
                  />
                );
              } else if (type === "number") {
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
              } else if (type === "color") {
                return (
                  <ColorConfigurationRow
                    {...commonProps}
                    gradient={item.gradient}
                  />
                );
              } else if (type === "boolean") {
                return (
                  <BooleanConfigurationRow
                    {...commonProps}
                    defaultValue={item.defaultValue}
                  />
                );
              } else if (type === "select") {
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