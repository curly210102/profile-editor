import React, { useCallback, useState } from "react";
import OptionComponent from "./Option";

interface Props {
  username?: string;
}
interface Parameters {
  username: string;
  locale?: string;
  title_color?: string;
  text_color?: string;
  icon_color?: string;
  border_color?: string;
  bg_color?: string;
  hide_border?: boolean;
  cache_seconds?: number;
  border_radius?: number;
  theme?: string;
  hide?: string[];
  hide_rank?: boolean;
  hide_title?: boolean;
  show_icons?: boolean;
  include_all_commits?: boolean;
  count_private?: boolean;
  line_height?: number;
  custom_title?: string;
  disable_animations?: boolean;
}
type Parameter = keyof Parameters;
type Option = {
  name: Parameter;
  required?: boolean;
  type: "string" | "boolean" | "number" | "color" | "select";
  options?: any[];
  section: string;
};
const options: Record<Parameter, Omit<Option, "name">> = {
  username: {
    required: true,
    type: "string",
    section: "general",
  },
  locale: {
    type: "select",
    options: [],
    section: "general",
  },
  theme: {
    type: "select",
    options: [],
    section: "theme",
  },
  title_color: {
    type: "color",
    section: "theme",
  },
  text_color: {
    type: "color",
    section: "theme",
  },
  icon_color: {
    type: "color",
    section: "theme",
  },
  border_color: {
    type: "color",
    section: "theme",
  },
  bg_color: {
    type: "color",
    section: "theme",
  },
  hide_border: {
    type: "boolean",
    section: "appearance",
  },
  border_radius: {
    type: "number",
    section: "appearance",
  },
  custom_title: {
    type: "string",
    section: "appearance",
  },
  hide_title: {
    type: "boolean",
    section: "appearance",
  },
  hide_rank: {
    type: "boolean",
    section: "appearance",
  },
  show_icons: {
    type: "boolean",
    section: "appearance",
  },
  line_height: {
    type: "number",
    section: "appearance",
  },
  disable_animations: {
    type: "boolean",
    section: "appearance",
  },
  cache_seconds: {
    type: "number",
    section: "data",
  },
  hide: {
    type: "string",
    section: "data",
  },
  include_all_commits: {
    type: "boolean",
    section: "data",
  },
  count_private: {
    type: "boolean",
    section: "data",
  },
};
const groups = new Map<string, Option[]>();
Object.entries(options).forEach(([name, option]) => {
  const groupId = option.section.toLowerCase();
  const groupItems = groups.get(groupId);
  if (groupItems) {
    groupItems.push({ ...option, name: name as Parameter });
  } else {
    groups.set(groupId, [{ ...option, name: name as Parameter }]);
  }
});

const Chart: React.FC<Props> = ({ username = "" }) => {
  const [parameters, setParameters] = useState<Parameters>({
    username,
  });
  return (
    <>
      {[...groups].map(([groupId, options]) => {
        return (
          <section key={groupId}>
            <h6>{groupId}</h6>
            <div>
              {options.map(({ name, type }) => {
                return (
                  <OptionComponent
                    key={name}
                    type={type}
                    onChange={(v) => {
                      setParameters((p) => ({ ...p, [name]: v }));
                    }}
                    value={parameters[name]}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
      <section></section>
    </>
  );
};

export default Chart;
