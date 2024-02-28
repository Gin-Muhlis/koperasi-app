"use client";

import AlertError from "@/app/components/alertError";
import AlertSuccess from "@/app/components/alertSuccess";
import Loader from "@/app/components/loader";
import { createInstallmentMember } from "@/app/utils/featuresApi";
import { Button } from "@/components/ui/button";
import { resetState } from "@/redux/features/installment-slice";
import { appDispatch, useAppSelector } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SaveInstallment = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<appDispatch>();
  const selector = useAppSelector((state) => state.installmentReducer);

  const handleInstallment = async () => {
    setIsLoading(true);
    const members = JSON.parse(selector.members);

    const data = {
      members,
      description: selector.description,
      month_year: `${selector.month < 9 ? `0${selector.month}` : `${selector.year}`
        }-${selector.year}`,
    };

    const response = await createInstallmentMember(data, session?.user.accessToken);

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
          onClick={handleInstallment}
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

export default SaveInstallment;
