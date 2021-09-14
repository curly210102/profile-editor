import React, { useMemo, useState } from "react";
import ServerlessControl from "./ServerlessControl";

type Option = {
  name: string;
  required?: boolean;
  type: ControlType;
  options?: any[];
  section: string;
};

export type ControlType = "string" | "boolean" | "number" | "color" | "select";

export type Options = { [_: string]: Omit<Option, "name"> };

interface Props {
  options: Options;
  defaultUserName: string;
  requestUrl: string;
}

const ServerlessPanel: React.FC<Props> = ({
  defaultUserName = "",
  options,
  requestUrl,
}) => {
  const groups = new Map<string, Option[]>();
  Object.entries(options).forEach(([name, option]) => {
    const groupId = option.section.toLowerCase();
    const groupItems = groups.get(groupId);
    if (groupItems) {
      groupItems.push({ ...option, name });
    } else {
      groups.set(groupId, [{ ...option, name }]);
    }
  });
  const [parameters, setParameters] = useState<{ [_: string]: unknown }>({
    username: defaultUserName,
  });
  const generatedUrl = useMemo(() => {
    return `${requestUrl}/${Object.entries(parameters).map(([name, value]) => {
      return `${name}=${Array.isArray(value) ? value.join(",") : value}`;
    })}`;
  }, [parameters, requestUrl]);
  return (
    <>
      {[...groups].map(([groupId, options]) => {
        return (
          <section key={groupId}>
            <h6>{groupId}</h6>
            <div>
              {/* {options.map(({ name, type }) => {
                return (
                  <ServerlessControl
                    key={name}
                    type={type}
                    onChange={(v) => {
                      setParameters((p) => ({ ...p, [name]: v }));
                    }}
                    value={parameters[name]}
                  />
                );
              })} */}
            </div>
          </section>
        );
      })}
      <section>
        {generatedUrl}
        {/* <Image src={linkUrl} /> */}
      </section>
      <section>{"URL + Insert"}</section>
    </>
  );
};

export default ServerlessPanel;
