"use client";
import CashToCrypto from "@/components/cash-to-crypto";
import CryptoToCash from "@/components/crypto-to-cash";
import CryptoToFiatLoan from "@/components/crypto-to-fiat-loan";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [tabType, setTabType] = useState<string>("all_tabs");

  return (
    <div className="w-full min-h-screen bg-novacrust-pale sm:pt-10">
      <MaxWidthWrapper className=" mx-auto bg-white min-h-screen sm:min-h-0 sm:rounded-[30px] p-5 pt-10 sm:pt-5">
        <Tabs defaultValue="crypto_cash">
          {tabType === "all_tabs" && (
            <TabsList className="bg-novacrust-pale rounded-[30px] mx-auto p-0">
              <TabsTrigger value="crypto_cash">Crypto to cash</TabsTrigger>
              <TabsTrigger value="cash_crypto">Cash to crypto</TabsTrigger>
              <TabsTrigger value="crypto_fiat_loan">
                Crypto to fiat oan
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="crypto_cash">
            <CryptoToCash tabType={tabType} setTabType={setTabType} />
          </TabsContent>
          <TabsContent value="cash_crypto">
            <CashToCrypto />
          </TabsContent>
          <TabsContent value="crypto_fiat_loan">
            <CryptoToFiatLoan />
          </TabsContent>
        </Tabs>
      </MaxWidthWrapper>
    </div>
  );
}
