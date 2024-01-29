"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSaving } from "@/redux/features/saving-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.savingReducer);

  const handleInput = (event: any): void => {
    dispatch(createSaving({ type: "SET_AMOUNT", value: event.target.value }));
  };
  
  return (
    <div>
      <Label>Jumlah</Label>
      <div className="flex items-center justify-center gap-2">
        <div className="border border-solid rounded p-2 text-center flex items-center justify-center text-md">
          <span>Rp.</span>
        </div>
        <Input type="number" defaultValue={selector.amount} onChange={handleInput} />
      </div>
    </div>
  );
};

export default Payment;
