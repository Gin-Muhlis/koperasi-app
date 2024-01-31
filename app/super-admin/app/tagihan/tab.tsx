"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabSimpananPokok from "./simpananPokok";
import { PositionCategory, TypeTabPrincipalSaving } from "@/types/interface";

const TabContent = ({
  principalSavings,
  positionCategories,
}: {
  principalSavings: TypeTabPrincipalSaving[];
  positionCategories: PositionCategory[];
}) => {
  return (
    <Tabs defaultValue="simpanan_pokok" className="w-full flex-1">
      <TabsList className="w-full">
        <TabsTrigger value="simpanan_pokok">Simpanan Pokok</TabsTrigger>
        <TabsTrigger value="simpanan_wajib">Simpanan Wajib</TabsTrigger>
        <TabsTrigger value="simpanan_sukarela">Simpanan Sukarela</TabsTrigger>
        <TabsTrigger value="tabungan_rekreasi">Tabungan Rekreasi</TabsTrigger>
        <TabsTrigger value="piutang">Piutang</TabsTrigger>
      </TabsList>
      <TabsContent value="simpanan_pokok" className="w-full">
        <TabSimpananPokok
          data={principalSavings}
          positionCategories={positionCategories}
        />
      </TabsContent>
      <TabsContent value="simpanan_wajib" className="w-full">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="simpanan_sukarela" className="w-full">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="tabungan_rekreasi" className="w-full">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="piutang" className="w-full">
        Make changes to your account here.
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
