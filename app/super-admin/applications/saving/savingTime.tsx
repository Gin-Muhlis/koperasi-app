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
import { months } from "@/constants/CONSTS";
import { createSaving } from "@/redux/features/saving-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const SavingTime = () => {
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.savingReducer);
  const currentyear = new Date().getFullYear();
  const nextYear = currentyear + 1;

  const handleChange = (type: string, value: string) => {
    dispatch(createSaving({ type: `SET_${type}`, value }));
  };
  
  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <div>
          <Label className="mb-2">Waktu Simpanan (Bulan)</Label>
          <Select
            value={selector.month.toString()}
            onValueChange={(value) => handleChange("MONTH", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Bulan" />
            </SelectTrigger>
            <SelectGroup>
              <SelectContent>
                {months.map((item, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectGroup>
          </Select>
        </div>
        <div>
          <Label className="mb-2">Waktu Simpanan (Tahun)</Label>
          <Select
            value={selector.year.toString()}
            onValueChange={(value) => handleChange("YEAR", value)}
          >
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
    </div>
  );
};

export default SavingTime;
