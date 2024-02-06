"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabSimpananPokok from "./simpananPokok";
import {
  MandatorySaving,
  MemberState,
  PositionCategory,
  Receivable,
  TypeTab,
} from "@/types/interface";
import TabSimpananWajib from "./simpananWajib";
import TabSimpananWajibKhusus from "./simpananWajibKhusus";
import TabSimpananSukarela from "./simpananSukarela";
import TabTabunganRekreasi from "./tabunganRekreasi";

const TabContent = ({
  principalSavings,
  positionCategories,
  members,
  mandatorySavings,
  receivables,
}: {
  principalSavings: TypeTab[];
  positionCategories: PositionCategory[];
  members: MemberState[];
  mandatorySavings: MandatorySaving[],
  receivables: Receivable[];
}) => {
  return (
    <Tabs defaultValue="simpanan_pokok" className="w-full flex-1">
      <TabsList className="w-full">
        <TabsTrigger value="simpanan_pokok">Simpanan Pokok</TabsTrigger>
        <TabsTrigger value="simpanan_wajib">Simpanan Wajib</TabsTrigger>
        <TabsTrigger value="simpanan_wajib_khusus">
          Simpanan Wajib Khusus
        </TabsTrigger>
        <TabsTrigger value="simpanan_sukarela">Simpanan Sukarela</TabsTrigger>
        <TabsTrigger value="tabungan_rekreasi">Tabungan Rekreasi</TabsTrigger>
      </TabsList>
      <TabsContent value="simpanan_pokok" className="w-full">
        <TabSimpananPokok
          data={principalSavings}
          positionCategories={positionCategories}
        />
      </TabsContent>
      <TabsContent value="simpanan_wajib" className="w-full">
        <TabSimpananWajib
          data={mandatorySavings}
          positionCategories={positionCategories}
        />
      </TabsContent>
      <TabsContent value="simpanan_wajib_khusus" className="w-full">
        <TabSimpananWajibKhusus
        data={mandatorySavings}
        positionCategories={positionCategories}
        />
      </TabsContent>
      <TabsContent value="simpanan_sukarela" className="w-full">
        <TabSimpananSukarela
          data={members}
        />
      </TabsContent>
      <TabsContent value="tabungan_rekreasi" className="w-full">
        <TabTabunganRekreasi data={members} />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
