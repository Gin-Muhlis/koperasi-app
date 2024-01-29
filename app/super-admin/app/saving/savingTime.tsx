"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const SavingTime = () => {
  const currentyear = new Date().getFullYear();
  const nextYear = currentyear + 1;
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div>
      <Label className="mb-2">Waktu Simpanan</Label>
      <div className="flex items-center justify-start gap-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Bulan" />
          </SelectTrigger>
          <SelectContent>
            {months.map((item, index) => (
              <SelectItem key={index} value={index.toString()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
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
