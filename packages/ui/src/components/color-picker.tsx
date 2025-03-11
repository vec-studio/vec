import {
  DialogTrigger,
  ColorPicker as RACColorPicker,
  type ColorPickerProps as RACColorPickerProps
} from 'react-aria-components'
import { Button } from './button'
import { ColorArea } from './color-area'
import { ColorField } from './color-field'
import { colorPickerClassName, colorPickerDialogClassName } from './color-picker.css'
import { ColorSlider } from './color-slider'
import { ColorSwatch } from './color-swatch'
import { Dialog } from './dialog'
import { Popover } from './popover'

export interface ColorPickerProps extends RACColorPickerProps {
  label?: string
  children?: React.ReactNode
}

export function ColorPicker({ label, children, ...props }: ColorPickerProps) {
  return (
    <RACColorPicker {...props}>
      <DialogTrigger>
        <Button className={colorPickerClassName}>
          <ColorSwatch />
          <span>{label}</span>
        </Button>
        <Popover placement="bottom start">
          <Dialog className={colorPickerDialogClassName}>
            {children || (
              <>
                <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
                <ColorSlider colorSpace="hsb" channel="hue" />
                <ColorField label="Hex" />
              </>
            )}
          </Dialog>
        </Popover>
      </DialogTrigger>
    </RACColorPicker>
  )
}
