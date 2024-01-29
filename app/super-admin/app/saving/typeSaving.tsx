"use client";
import { Label } from "@/components/ui/label";
import { SubCategoryState } from "@/types/interface";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TypeSaving = ({
  subCategories,
}: {
  subCategories: SubCategoryState[];
}) => {
  return (
    <div>
      <Label className="mb-2">Jenis Simpanan</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Silahkan pilih jenis produk" />
        </SelectTrigger>
        <SelectContent>
          {subCategories.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TypeSaving;
