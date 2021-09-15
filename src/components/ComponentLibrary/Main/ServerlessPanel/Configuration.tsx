import React, { useEffect, useMemo, useReducer, useState } from "react";
import {
  BooleanConfigurationRow,
  ColorConfigurationRow,
  NumberConfigurationRow,
  SelectConfigurationRow,
  StringConfigurationRow,
} from "./ConfigurationRow";
import styles from "./Configuration.module.scss";

export type ConfigurationType = {
  [name: string]: {
    required?: boolean;
    section: string;
    description?: string;
  } & (
    | {
        type: "string" | "boolean" | "number" | "color";
      }
    | {
        type: "select";
        options: string[];
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

  const [configuredItems, updateConfiguredItems] = useReducer(
    (
      state: ConfiguredItemsType,
      action:
        | {
            type: "set";
            name: string;
            value: ConfiguredItemsType[string];
          }
        | {
            type: "delete";
            name: string;
          }
    ) => {
      switch (action.type) {
        case "set":
          return { ...state, [action.name]: action.value };
        case "delete":
          const { [action.name]: val, ...rest } = state;
          return rest;
        default:
          throw new Error();
      }
    },
    {}
  );

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
              const { name, type, required, description } = item;
              const value = configuredItems[name];
              if (type === "string") {
                return (
                  <StringConfigurationRow
                    key={name}
                    required={!!required}
                    name={name}
                    value={typeof value === "string" ? value : ""}
                    onChange={(v) => {
                      if (!v) {
                        updateConfiguredItems({
                          type: "delete",
                          name,
                        });
                      } else {
                        updateConfiguredItems({
                          type: "set",
                          name,
                          value: v,
                        });
                      }
                    }}
                    description={description}
                  />
                );
              } else if (type === "number") {
                return (
                  <NumberConfigurationRow
                    key={name}
                    required={!!required}
                    name={name}
                    onChange={(v) => {
                      if (typeof v !== "number") {
                        updateConfiguredItems({
                          type: "delete",
                          name,
                        });
                      } else {
                        updateConfiguredItems({
                          type: "set",
                          name,
                          value: v,
                        });
                      }
                    }}
                    description={description}
                  />
                );
              } else if (type === "color") {
                return (
                  <ColorConfigurationRow
                    key={name}
                    required={!!required}
                    name={name}
                    onChange={(v) => {}}
                  />
                );
              } else if (type === "boolean") {
                return (
                  <BooleanConfigurationRow
                    key={name}
                    required={!!required}
                    name={name}
                    onChange={(v) => {
                      if (!v) {
                        updateConfiguredItems({
                          type: "delete",
                          name,
                        });
                      } else {
                        updateConfiguredItems({
                          type: "set",
                          name,
                          value: v,
                        });
                      }
                    }}
                    description={description}
                  />
                );
              } else if (type === "select") {
                return (
                  <SelectConfigurationRow
                    key={name}
                    required={!!required}
                    name={name}
                    options={item.options}
                    description={description}
                    onChange={(v) => {
                      if (!v) {
                        updateConfiguredItems({
                          type: "delete",
                          name,
                        });
                      } else {
                        updateConfiguredItems({
                          type: "set",
                          name,
                          value: v,
                        });
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
