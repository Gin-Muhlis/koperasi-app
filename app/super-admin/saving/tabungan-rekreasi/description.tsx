"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSaving } from "@/redux/features/saving-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const Description = () => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.savingReducer);

  const handleChange = (value: string) => {
    dispatch(createSaving({ type: "SET_DESCRIPTION", value }));
  };
  return (
    <div>
      <Label>Deskripsi</Label>
      <Textarea
        value={selector.description}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Description;
