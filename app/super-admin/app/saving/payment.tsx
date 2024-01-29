"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { appDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const Payment = () => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.savingReducer);
  return (
    <div>
      <Label>Jumlah</Label>
      <div className="flex items-center justify-center gap-2">
        <div className="border border-solid rounded p-2 text-center flex items-center justify-center">
          <span>Rp.</span>
        </div>
        <Input type="number" />
      </div>
    </div>
  );
};

export default Payment;
