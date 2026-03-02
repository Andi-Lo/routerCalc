import { useState } from 'react';

export function useNumberInput(initial = 0, onChange?: (value: number) => void) {
  const [value, setValue] = useState(initial);

  const handleChange = (value: number) => {
    setValue(value);
    onChange?.(value);
  };

  // Restore a value externally (e.g. from history) — also fires onChange
  const restore = (value: number) => {
    setValue(value);
    onChange?.(value);
  };

  return { value, handleChange, restore };
}
