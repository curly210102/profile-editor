import React, { useEffect, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { GradientPickerPopover } from "react-linear-gradient-picker";
import "react-linear-gradient-picker/dist/index.css";

const rgbToRgba = (rgb: string, a = 1) =>
  rgb.replace("rgb(", "rgba(").replace(")", `, ${a})`);
const rgbaToRgb = (rgbaString: string) => {
  const rgba = rgbaString.match(/[\d.]{1,4}/g);
  if (!rgba) throw new Error();
  return {
    a: rgba.pop()!,
    rgb: `rgba(${rgba.join(",")})`,
  };
};
const WrappedColorPicker = ({
  onSelect,
  color,
  opacity,
}: {
  onSelect: (rgb: string, alpha: string) => void;
  color: string;
  opacity: number;
}) => {
  return (
    <RgbaStringColorPicker
      color={rgbToRgba(color, opacity)}
      onChange={(c) => {
        const { rgb, a } = rgbaToRgb(c);
        onSelect(rgb, a);
      }}
    />
  );
};

interface Props {
  onBlur?: (v: string | string[]) => void;
}
const ColorPicker: React.FC<Props> = ({ onBlur }) => {
  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(90);
  const [palette, setPalette] = useState([
    { offset: "0.00", color: "rgb(0, 0, 0)", opacity: 1 },
    { offset: "1.00", color: "rgb(0, 0, 0)", opacity: 1 },
  ]);

  useEffect(() => {
    if (!open) {
      onBlur && onBlur(palette.map(({ color }) => color));
    }
  }, [onBlur, open, palette]);
  return (
    <GradientPickerPopover
      {...{
        open,
        setOpen,
        angle,
        setAngle,
        showAnglePicker: true,
        width: 220,
        maxStops: 3,
        paletteHeight: 32,
        palette,
        onPaletteChange: setPalette,
      }}
    >
      {/* @ts-ignore */}
      <WrappedColorPicker />
    </GradientPickerPopover>
  );
};

export default ColorPicker;
