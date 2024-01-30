"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import Loader from "@/app/components/loader";
import { createSavingMembers } from "@/app/utils/featuresApi";
import { Button } from "@/components/ui/button";
import { createSaving, resetState } from "@/redux/features/saving-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import { SubCategoryState } from "@/types/interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SaveSaving = ({
  subCategories,
}: {
  subCategories: SubCategoryState[];
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.savingReducer);

  const handleSaveSaving = async () => {
    setIsLoading(true);
    const subCategory: SubCategoryState | undefined = subCategories.find(
      (item) => item.name == "simpanan sukarela"
    );

    const arrayIdMembers = JSON.parse(selector.members).map(
      (member: any) => member.id
    );

    const data = {
      members_id: arrayIdMembers,
      month_year: `${selector.month}-${selector.year}`,
      sub_category_id: subCategory?.id,
      description: selector.description,
      amount: selector.amount,
      type_saving: subCategory?.name,
    };

    const response = await createSavingMembers(data, session?.user.accessToken);

    if (response.status == 200) {
      setIsLoading(false);
      setSuccess(response.data.message);
      dispatch(resetState());
      router.refresh();
    } else if (response.stsatus == 422) {
      setIsLoading(false);
      const errorsData = response.data.errors;
      const keys = Object.keys(errorsData);
      const firstKey = keys[0];
      const message = errorsData[firstKey][0];

      setError(message);
    } else {
      setIsLoading(false);
      setError(response.data.message);
    }
  };

  return (
    <>
      <div className="w-full flex justify-end">
        <Button
          size="sm"
          className="bg-amber-400 text-white"
          onClick={handleSaveSaving}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Simpan Data"}
        </Button>
      </div>
      {success && <AlertSuccess message={success.toString()} isShow={true} />}
      {error && <AlertError message={error.toString()} isShow={true} />}
    </>
  );
};

export default SaveSaving;
