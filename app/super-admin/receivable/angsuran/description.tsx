"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createInstallment } from "@/redux/features/installment-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const Description = () => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.installmentReducer);

  const handleChange = (value: string) => {
    dispatch(createInstallment({ type: "SET_DESCRIPTION", value }));
  };
  return (
    <div>
      <Label>Keterangan (opsional)</Label>
      <Textarea
        value={selector.description}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Description;
