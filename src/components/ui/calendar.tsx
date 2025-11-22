"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "./utils";
import { buttonVariants } from "./button";

interface CalendarProps {
  className?: string;
  classNames?: Partial<React.ComponentProps<typeof DayPicker>["classNames"]>;
  showOutsideDays?: boolean;
  dayPickerProps?: React.ComponentProps<typeof DayPicker>;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  dayPickerProps,
}: CalendarProps) {
  const [month, setMonth] = React.useState(new Date());

  // Кастомный заголовок (Caption)
  const CustomCaption = () => {
    const handlePrevious = () => {
      setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
    };

    const handleNext = () => {
      setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
    };

    return (
      <div className={cn("flex justify-between items-center w-full px-1 py-1")}>
        <button
          onClick={handlePrevious}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0"
          )}
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="text-sm font-medium">
          {month.toLocaleString("default", { month: "long", year: "numeric" })}
        </div>
        <button
          onClick={handleNext}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0"
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    );
  };

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          dayPickerProps?.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      // @ts-ignore: кастомный Caption не типизирован в DayPickerProps
      components={{ Caption: CustomCaption }}
      {...dayPickerProps}
    />
  );
}

export { Calendar };
