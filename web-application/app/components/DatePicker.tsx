"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X as XIcon } from "lucide-react";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  dataAvailableDates: Date[];
}

export function DatePicker(props: DatePickerProps) {
  const { date, setDate, dataAvailableDates } = props;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          {date && (
            <XIcon
              className="ml-auto h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                setDate(undefined);
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            setIsCalendarOpen(false);
          }}
          disabled={(date) =>
            !dataAvailableDates.find((d) => d.getTime() === date.getTime())
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
