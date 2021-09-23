import type { NextApiRequest, NextApiResponse } from "next";
import icons from "simple-icons";

const API = (req: NextApiRequest, res: NextApiResponse) => {
  const { name, logoColor } = req.query;
  const icon = name && icons.Get(Array.isArray(name) ? name[0] : name);

  if (!icon) {
    res.status(404);
  } else {
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(icon.svg.replace("<svg", `<svg fill="#${logoColor ?? icon.hex}"`));
  }
};

export default API;
