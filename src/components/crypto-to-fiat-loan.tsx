"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ComingSoonState from "./coming-soon-state";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CryptoToFiatLoan() {
  const formSchema = z.object({
    email: z.string().email().min(2, { message: "Please enter a valid email" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const watchEmail = form.watch("email");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <ComingSoonState
        messageOne="Crypto to Fiat Loan is almost here."
        messageTwo="Enter your email and we’ll let you know the moment it’s live."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <div className="space-y-14">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-novacrust-primary text-base font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full rounded-[30px] h-[60px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={!watchEmail}
              className="w-full rounded-[30px] h-[60px] font-bold text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Update me
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
