"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronDown,
  ArrowLeft,
  Copy,
  CheckCircle2,
  Search,
  Info,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UsdtIcon,
  MetamaskIcon,
  RainbowIcon,
  WalletConnectIcon,
  TonIcon,
  BnbIcon,
  NigerianIcon,
  NovaCrustLogo,
  CheckIcon,
} from "../../public/assets";
import Image from "next/image";

const STEPS = {
  INFO: 1,
  RECIPIENT_BANK: 2,
  RECIPIENT_CONTACT: 3,
  PAYMENT_INSTRUCTIONS: 4,
  PROCESSING: 5,
} as const;

type Step = (typeof STEPS)[keyof typeof STEPS];

const formSchema = z.object({
  payAmount: z.string().min(1, "Amount is required"),
  payCurrency: z.string().min(1, "Currency is required"),
  receiveAmount: z.string().min(1, "Amount is required"),
  receiveCurrency: z.string().min(1, "Currency is required"),
  payFrom: z.string().min(1, "Please select an option"),
  payTo: z.string().min(1, "Please select an option"),

  bank: z.string().optional(),
  accountNumber: z.string().optional(),
  accountName: z.string().optional(),

  recipientEmail: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  recipientPhone: z.string().optional(),
});

const CRYPTO_OPTIONS = [
  { label: "USDT - CELO", value: "CELO", icon: UsdtIcon },
  { label: "USDT - TON", value: "TON", icon: TonIcon },
  { label: "USDT - BNB", value: "BNB", icon: BnbIcon },
];

const FIAT_OPTIONS = [
  { value: "NGN", label: "NGN", icon: "🇳🇬" },
  { value: "USD", label: "USD", icon: "🇺🇸" },
];

const WALLET_OPTIONS = [
  { value: "metamask", label: "Metamask", icon: MetamaskIcon },
  { value: "rainbow", label: "Rainbow", icon: RainbowIcon },
  { value: "walletconnect", label: "WalletConnect", icon: WalletConnectIcon },
];

const PAYOUT_OPTIONS = [{ value: "bank_account", label: "Bank Account" }];
const BANK_OPTIONS = [
  { value: "access_bank", label: "Access Bank" },
  { value: "uba", label: "UBA" },
  { value: "kuda", label: "Kuda" },
];
type FormValues = z.infer<typeof formSchema>;

export default function CryptoToCash({
  setTabType,
}: {
  tabType: string;
  setTabType: Dispatch<SetStateAction<string>>;
}) {
  const [step, setStep] = useState<Step>(STEPS.INFO);
  const [searchCoin, setSearchCoin] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payAmount: "",
      payCurrency: "ETH",
      receiveAmount: "",
      receiveCurrency: "NGN",
      payFrom: "",
      payTo: "",
      bank: "",
      accountNumber: "",
      accountName: "",
      recipientEmail: "",
      recipientPhone: "",
    },
  });

  const nextStep = () => {
    if (step === STEPS.INFO) {
      if (form.getValues("payTo") === "bank_account") {
        setStep(STEPS.RECIPIENT_BANK);
        setTabType("recipient_tabs");
      } else {
        setStep(STEPS.RECIPIENT_CONTACT);
        setTabType("recipient_tabs");
      }
    } else if (step === STEPS.RECIPIENT_BANK) {
      setStep(STEPS.RECIPIENT_CONTACT);
      setTabType("recipient_tabs");
    } else if (step === STEPS.RECIPIENT_CONTACT) {
      setStep(STEPS.PAYMENT_INSTRUCTIONS);
      setTabType("recipient_tabs");
    } else if (step === STEPS.PAYMENT_INSTRUCTIONS) {
      setStep(STEPS.PROCESSING);
      setTabType("recipient_tabs");
    }
  };

  const prevStep = () => {
    if (step === STEPS.RECIPIENT_BANK) {
      setStep(STEPS.INFO);
      setTabType("recipient_tabs");
    } else if (step === STEPS.RECIPIENT_CONTACT) {
      if (form.getValues("payTo") === "bank_account") {
        setStep(STEPS.RECIPIENT_BANK);
        setTabType("recipient_tabs");
      } else {
        setStep(STEPS.INFO);
        setTabType("all_tabs");
      }
    } else if (step === STEPS.PAYMENT_INSTRUCTIONS) {
      setStep(STEPS.RECIPIENT_CONTACT);
      setTabType("recipient_tabs");
    }
  };

  function onSubmit(values: FormValues) {
    console.log("Final submission:", values);
    nextStep();
  }

  const renderHeader = (title: string) => (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={prevStep}
        className=" hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-novacrust-primary" />
      </button>
      <h2 className="text-xl font-medium text-novacrust-primary absolute left-1/2 -translate-x-1/2">
        {title}
      </h2>
      <div className="w-9" />
    </div>
  );

  return (
    <div className="w-full max-w-[520px] mx-auto py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === STEPS.INFO && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="rounded-[30px] border border-novacrust-border p-6 bg-white space-y-2">
                <p className="text-novacrust-pale-text text-sm font-medium">
                  You pay
                </p>
                <div className="flex items-center justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="payAmount"
                    render={({ field }) => (
                      <FormItem className="flex-1 space-y-0 text-3xl font-bold">
                        <FormControl>
                          <input
                            {...field}
                            className="w-full text-3xl font-bold bg-transparent border-none outline-none focus:ring-0 p-0 focus-visible:ring-0 focus-within:ring-0"
                            placeholder="0.00"
                            onChange={(e) => {
                              const value = e.target.value;
                              const cleanValue = value
                                .replace(/[^0-9.]/g, "")
                                .replace(/(\..*)\./g, "$1");
                              const parts = cleanValue.split(".");
                              parts[0] = parts[0].replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              );
                              field.onChange(parts.join("."));
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="payCurrency"
                    render={({ field }) => {
                      const selectedOption = CRYPTO_OPTIONS.find(
                        (o) => o.value === field.value
                      );
                      return (
                        <FormItem className="space-y-0 relative">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="flex items-center gap-2 rounded-full border border-novacrust-border bg-novacrust-pale/30 px-4 py-2 h-auto hover:bg-novacrust-pale/50 transition-colors relative">
                                <SelectValue>
                                  <div className="flex items-center gap-2">
                                    {selectedOption && (
                                      <Image
                                        src={selectedOption.icon}
                                        width={20}
                                        height={20}
                                        alt={selectedOption.label}
                                        className="rounded-full overflow-hidden"
                                      />
                                    )}
                                    <span>
                                      {selectedOption?.label || "ETH"}
                                    </span>
                                  </div>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent
                                className="  w-full  min-w-[264px] space-y-2 border border-novacrust-border rounded-[20px] py-4 px-3"
                                align="end"
                              >
                                <div className="w-full h-[44px] border border-novacrust-border rounded-[20px] mb-2 flex items-center gap-2 px-4">
                                  <Search size={20} color="#828282" />
                                  <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchCoin}
                                    onChange={(e) =>
                                      setSearchCoin(e.target.value)
                                    }
                                    className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 focus-visible:ring-0 focus-within:ring-0"
                                  />
                                </div>
                                {CRYPTO_OPTIONS.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Image
                                        src={option.icon}
                                        width={24}
                                        height={24}
                                        alt={option.label}
                                        className="rounded-full overflow-hidden"
                                      />
                                      <span>{option.label}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="rounded-[30px] border border-novacrust-border p-6 bg-white space-y-2">
                <p className="text-novacrust-pale-text text-sm font-medium">
                  You receive
                </p>
                <div className="flex items-center justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="receiveAmount"
                    render={({ field }) => (
                      <FormItem className="flex-1 space-y-0 text-3xl font-bold">
                        <FormControl>
                          <input
                            {...field}
                            className="w-full text-3xl font-bold bg-transparent border-none outline-none focus:ring-0 p-0"
                            placeholder="0.00"
                            onChange={(e) => {
                              const value = e.target.value;
                              const cleanValue = value
                                .replace(/[^0-9.]/g, "")
                                .replace(/(\..*)\./g, "$1");
                              const parts = cleanValue.split(".");
                              parts[0] = parts[0].replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              );
                              field.onChange(parts.join("."));
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="receiveCurrency"
                    render={({ field }) => {
                      const selectedOption = FIAT_OPTIONS.find(
                        (o) => o.value === field.value
                      );
                      return (
                        <FormItem className="space-y-0">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="flex items-center gap-2 rounded-full border border-novacrust-border bg-novacrust-pale/30 px-4 py-2 h-auto hover:bg-novacrust-pale/50 transition-colors">
                                <SelectValue>
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">
                                      {selectedOption?.icon || "🇳🇬"}
                                    </span>
                                    <span>
                                      {selectedOption?.label || "NGN"}
                                    </span>
                                  </div>
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent
                              className="w-full  min-w-[100px] space-y-2 border border-novacrust-border rounded-[20px] py-2 px-2"
                              align="end"
                            >
                              {FIAT_OPTIONS.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">
                                      {option.icon}
                                    </span>
                                    <span>{option.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="payFrom"
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-novacrust-primary text-base font-medium font-sans">
                          Pay from
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full  bg-white h-[60px]! rounded-[200px]">
                              <SelectValue
                                placeholder="Select an option"
                                className="px-5 font-medium"
                              />
                            </SelectTrigger>
                            <SelectContent className="w-full max-w-[464px] mx-auto top-10 space-y-2 border border-novacrust-border rounded-[20px] py-3 px-2">
                              {WALLET_OPTIONS.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  <div className="flex items-center gap-3">
                                    <Image
                                      src={option.icon}
                                      width={24}
                                      height={24}
                                      alt={option.label}
                                      className="shrink-0"
                                    />
                                    <span>{option.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="payTo"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-novacrust-primary text-base font-medium">
                        Pay to
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full  bg-white h-[60px]! rounded-[200px]">
                            <SelectValue
                              placeholder="Select an option"
                              className="px-5 font-medium"
                            />
                          </SelectTrigger>
                          <SelectContent className="w-full max-w-[464px] mx-auto top-10 space-y-2 border border-novacrust-border rounded-[20px] py-3 px-2">
                            {PAYOUT_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center gap-3">
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="button"
                onClick={nextStep}
                className="w-full bg-novacrust-primary hover:bg-novacrust-primary/90 text-white rounded-full py-8 text-lg font-bold transition-all shadow-lg active:scale-[0.98] mt-4"
              >
                Convert now
              </Button>
            </div>
          )}

          {step === STEPS.RECIPIENT_BANK && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 relative">
              {renderHeader("Recipient details")}

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-novacrust-primary text-base font-medium font-sans">
                        Bank
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full  bg-white h-[60px]! rounded-[200px]">
                            <SelectValue
                              placeholder="Select an option"
                              className="px-5 font-medium"
                            />
                          </SelectTrigger>
                          <SelectContent className="w-full max-w-[464px] mx-auto top-10 space-y-2 border border-novacrust-border rounded-[20px] py-3 px-2">
                            {BANK_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center gap-3">
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-novacrust-primary text-base font-medium font-sans">
                        Account number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your account number"
                          className="w-full rounded-[200px] h-[60px]! px-6 border border-novacrust-border bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <p className="text-novacrust-primary text-base font-medium font-sans">
                    Account name
                  </p>
                  <div className="w-full rounded-[200px] h-[60px]! px-6 border border-novacrust-pale bg-novacrust-pale flex items-center">
                    <p className="text-base font-normal text-novacrust-primary">
                      OLUTAYO ABEOKI
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-novacrust-primary hover:bg-novacrust-primary/90 text-white rounded-full py-8 text-lg font-bold transition-all shadow-lg active:scale-[0.98] mt-4"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === STEPS.RECIPIENT_CONTACT && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {renderHeader("Recipient details")}

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="recipientEmail"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-novacrust-primary text-base font-medium font-sans">
                        Recipient email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter recipient email"
                          className="w-full rounded-[200px] h-[60px]! px-6 border border-novacrust-border bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientPhone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-novacrust-primary text-base font-medium font-sans">
                        Recipient phone number
                      </FormLabel>
                      <div className="flex gap-0 rounded-[200px] overflow-hidden border border-novacrust-border">
                        <div className="w-28 border-r border-novacrust-border h-full px-4 border  bg-novacrust-pale flex items-center justify-between text-sm font-medium">
                          <span className="flex items-center gap-2 font-normal text-sm">
                            +234
                            <Image
                              src={NigerianIcon}
                              width={20}
                              height={20}
                              className="rounded-full overflow-hidden min-h-5 min-w-5"
                              alt="icon"
                            />
                          </span>
                          <ChevronDown className="w-5 h-5 text-novacrust-primary" />
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="000 - 000 - 0000"
                            className="flex-1 px-6 border-0 ring-0! outline-none rounded-none h-[60px] bg-white"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-novacrust-primary hover:bg-novacrust-primary/90 text-white rounded-full py-8 text-lg font-bold transition-all shadow-lg active:scale-[0.98] mt-4"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === STEPS.PAYMENT_INSTRUCTIONS && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {renderHeader(
                `Send ${form.getValues("payCurrency")} to the address below`
              )}

              <div className="space-y-6">
                <div className="w-fit mx-auto bg-novacrust-light rounded-[30px] border border-[#CCF6E5]">
                  <p className="text-base font-medium text-novacrust-primary  px-4 py-1.5">
                    4KJYNYZBbkS7fRMghUcJ{" "}
                    <Copy className="inline-block w-4 h-4 ml-1 cursor-pointer text-novacrust-primary hover:opacity-100" />
                  </p>
                </div>

                <div className="space-y-4 bg-[#F7F7F7] py-4 px-6 rounded-[10px]">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-novacrust-text font-normal">
                      Amount to send
                    </span>
                    <span className="font-normal text-base text-novacrust-primary">
                      {form.getValues("payAmount")}{" "}
                      {form.getValues("payCurrency")}{" "}
                      <Copy className="inline-block w-4 h-4 ml-1 cursor-pointer opacity-30 hover:opacity-70" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-novacrust-text font-normal">
                      Network
                    </span>
                    <span className="font-normal text-base text-novacrust-primary">
                      {form.getValues("payCurrency")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-novacrust-text font-normal">
                      Native
                    </span>
                    <span className="font-normal text-base text-novacrust-primary">
                      Other
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 p-4 items-start">
                  <Info size={24} color="#013941" />
                  <p className="text-sm text-novacrust-text leading-relaxed font-normal">
                    Only send {form.getValues("payCurrency")} to this address.
                    Ensure the sender is on the (ETH) network otherwise you
                    might lose your deposit!
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-novacrust-primary hover:bg-novacrust-primary/90 text-white rounded-full py-8 text-lg font-bold transition-all shadow-lg active:scale-[0.98] mt-4"
                >
                  I have sent it
                </Button>
              </div>
            </div>
          )}

          {step === STEPS.PROCESSING && (
            <div className="space-y-8 animate-in zoom-in-95 duration-700 flex flex-col items-center">
              <div className="w-[177px] h-6 relative overflow-hidden">
                <Image
                  src={NovaCrustLogo}
                  alt="logo"
                  fill
                  objectFit="contain"
                />
              </div>

              <div className="relative w-[80px] h-[80px] min-w-[80px] min-h-[80px]">
                <Image src={CheckIcon} alt="check" fill objectFit="contain" />
              </div>

              <div className="text-center space-y-3">
                <h2 className="text-2xl font-medium text-novacrust-primary">
                  Your transaction is processing.
                </h2>
                <p className="text-novacrust-text font-normal max-w-[280px] mx-auto leading-relaxed">
                  The recipient will receive it shortly.
                </p>
              </div>

              <div className="w-full mt-5 bg-[#F7F7F7] px-6 py-4 rounded-[10px] flex items-center justify-between ">
                <div>
                  <p className="text-sm text-novacrust-text font-normal">
                    Transaction ID
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <p className="text-base font-normal text-novacrust-primary">
                    NC1212HDPP
                  </p>
                  <Copy className="w-5 h-5 text-gray-400 cursor-pointer hover:text-novacrust-primary transition-colors" />
                </div>
              </div>

              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="mt-5 text-novacrust-primary font-bold flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                Go back to home
              </button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
