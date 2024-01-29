"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSaving } from "@/redux/features/saving-slice";
import { appDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const SavingTime = () => {
  const dispatch = useDispatch<appDispatch>();
  const currentyear = new Date().getFullYear();
  const nextYear = currentyear + 1;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleChange = (type: string, value: string) => {
    dispatch(createSaving({type: `SET_${type}`, value}))
  }

  return (
    <div>
      <Label className="mb-2">Waktu Simpanan</Label>
      <div className="flex items-center justify-start gap-4">
        <Select onValueChange={(value) => handleChange("MONTH", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bulan" />
          </SelectTrigger>
          <SelectGroup>
          <SelectContent>
            {months.map((item, index) => (
              <SelectItem key={index} value={item.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
          </SelectGroup>
          
        </Select>
        <Select onValueChange={(value) => handleChange("YEAR", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={currentyear.toString()}>
              {currentyear}
            </SelectItem>
            <SelectItem value={nextYear.toString()}>{nextYear}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SavingTime;
