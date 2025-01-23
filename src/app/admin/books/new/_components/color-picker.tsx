import { useState } from "react"
import { HexColorInput, HexColorPicker } from "react-colorful"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ColorPickerProps {
  value?: string
  onPickerChange: (color: string) => void
}

export function ColorPicker({ value, onPickerChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="relative">
      <div className="color-picker">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            style={{ backgroundColor: value }}
            className="color-picker-preview"
          />
          <PopoverContent align="start" asChild>
            <HexColorPicker color={value} onChange={onPickerChange} />
          </PopoverContent>
        </Popover>
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
    </div>
  )
}
