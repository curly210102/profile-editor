import React, { useCallback, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { GradientPickerPopover } from "react-linear-gradient-picker";
import "react-linear-gradient-picker/dist/index.css";
import styles from "./ColorPicker.module.scss";

const hexToRgba = (hex: string) => {
  const num = parseInt(hex.slice(1), 16); // Convert to a number
  const nums = [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255,
    (num >> 24) & 255,
  ];

  return {
    color: `rgb(${nums[0]}, ${nums[1]}, ${nums[2]})`,
    opacity: nums[3],
  };
};

const rgbaToHex = (rgba: { color: string; opacity: number }) => {
  const rgb = rgba.color.match(/[\d.]{1,3}/g);
  const a =
    +rgba.opacity === 1 ? "" : Math.round(rgba.opacity * 255).toString(16);
  if (!rgb) throw new Error();
  return `#${rgb.map((c) => (+c).toString(16).padStart(2, "0")).join("")}${a}`;
};

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

const Trigger = (background: string, togglePicker: () => void) => (
  <div
    className={styles.switch}
    onClick={togglePicker}
    style={{ background }}
  />
);

interface Props {
  supportGradient?: boolean;
  onBlur?: (v: string[], angle: number) => void;
  default?: string;
  hexPrefix?: string;
}
const ColorPicker: React.FC<Props> = ({ onBlur, supportGradient = false }) => {
  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(90);
  const [palette, setPalette] = useState([
    { offset: "0.00", color: "rgb(0, 0, 0)", opacity: 1 },
  ]);

  const toggle = useCallback(
    (open) => {
      setOpen(open);
      if (!open && onBlur) {
        onBlur(
          palette.map(({ offset, ...rest }) => rgbaToHex(rest)),
          angle
        );
      }
    },
    [angle, onBlur, palette]
  );

  return (
    <div className={styles.container}>
      <GradientPickerPopover
        {...{
          open,
          setOpen: toggle,
          width: 220,
          paletteHeight: 32,
          palette,
          onPaletteChange: setPalette,
          trigger: Trigger,
          ...(supportGradient
            ? {
                angle,
                setAngle,
                showAnglePicker: true,
                maxStops: 3,
              }
            : {
                maxStops: 1,
              }),
        }}
      >
        {/* @ts-ignore */}
        <WrappedColorPicker />
      </GradientPickerPopover>
    </div>
  );
};

export default ColorPicker;
