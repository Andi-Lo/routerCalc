import { useCallback, useState } from 'react';

export function useNumberInput(initial = 0, onChange?: (value: number) => void) {
  const [value, setValue] = useState(initial);

  const handleChange = useCallback(
    (value: number) => {
      setValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  // Restore a value externally (e.g. from history) — also fires onChange
  const restore = useCallback(
    (value: number) => {
      setValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  return { value, handleChange, restore };
}
