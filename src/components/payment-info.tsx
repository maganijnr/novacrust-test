import React from "react";

export default function PaymentInfo() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-[30px] border border-novacrust-border p-6 bg-white space-y-2">
        <p className="text-gray-500 text-sm font-medium">You pay</p>
        <div className="flex items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="payAmount"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0 text-3xl font-bold">
                <FormControl>
                  <input
                    {...field}
                    className="w-full text-3xl font-bold bg-transparent border-none outline-none focus:ring-0 p-0"
                    placeholder="0.00"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payCurrency"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="flex items-center gap-2 rounded-full border border-novacrust-border bg-novacrust-pale/30 px-4 py-2 h-auto hover:bg-novacrust-pale/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                          💎
                        </div>
                        <SelectValue placeholder="ETH" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="rounded-[30px] border border-novacrust-border p-6 bg-white space-y-2">
        <p className="text-gray-500 text-sm font-medium">You receive</p>
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receiveCurrency"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="flex items-center gap-2 rounded-full border border-novacrust-border bg-novacrust-pale/30 px-4 py-2 h-auto hover:bg-novacrust-pale/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🇳🇬</span>
                        <SelectValue placeholder="NGN" />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NGN">NGN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="payFrom"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-novacrust-primary font-bold">
                Pay from
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-[20px] h-14 px-6 border border-novacrust-border focus:ring-novacrust-primary bg-white shadow-sm">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="metamask">Metamask</SelectItem>
                  <SelectItem value="phantom">Phantom</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payTo"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-novacrust-primary font-bold">
                Pay to
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-[20px] h-14 px-6 border border-novacrust-border focus:ring-novacrust-primary bg-white shadow-sm">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bank_account">Bank Account</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
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
  );
}
