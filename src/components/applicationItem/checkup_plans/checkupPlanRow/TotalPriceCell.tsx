import React from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const TotalPriceCell = ({ index }: { index: number }) => {
  const { control, setValue } = useFormContext();
  
  // Точечно следим ТОЛЬКО за qty и price этой конкретной строки
  const qty = useWatch({ control, name: `checkupPlans.${index}.qty` as any});
  const price = useWatch({ control, name: `checkupPlans.${index}.price` as any });
  
  // Высчитываем сумму на лету прямо в момент рендера (без useEffect и без setValue!)
  const q = parseInt(qty) || 0;
  const p = parseInt(price) || 0;
  const totalPrice = q && p ? (q * p).toString() : "";
  
  return (
    <TextField
      value={totalPrice}
      variant='standard'
      size='small'
      fullWidth
      disabled
      placeholder="0"
    />
  );
};


export default TotalPriceCell;
