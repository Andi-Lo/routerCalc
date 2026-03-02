import { useState } from 'react';

export function useNumberInput(initial = 0, onChange?: (value: number) => void) {
  const [value, setValue] = useState(initial);

  const handleChange = (value: number) => {
    setValue(value);
    onChange?.(value);
  };

  return { value, handleChange };
}
