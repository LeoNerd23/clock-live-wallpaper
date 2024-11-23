"use client"

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function Clock() {
  function separateDateETimeBrazil(data: Date = new Date()): {
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    weekday: string;
  } {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      weekday: "long",
    };

    const formatat = new Intl.DateTimeFormat("pt-BR", options);
    const parts = formatat.formatToParts(data);

    const getPart = (type: string): string => {
      const part = parts.find((part) => part.type === type);
      return part?.value || "";
    };

    const day = getPart("day");
    const month = getPart("month");
    const year = getPart("year");
    const hour = getPart("hour");
    const minute = getPart("minute");
    const weekday = getPart("weekday");

    return { day, month, year, hour, minute, weekday };
  }

  const [dateTime, setDateTime] = useState(() => separateDateETimeBrazil());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(separateDateETimeBrazil());
    }, 1000)

    return () => clearInterval(interval);
  }, []);

  const { day, month, year, hour, minute, weekday } = dateTime;

  const weekDays = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  return (
    <div className="h-screen flex justify-center items-center gap-8">
      <div className="gap-8 flex flex-col pb-16">
        <div className="flex flex-col gap-3">
          {weekDays.map((dayName, index) => (
            <Badge
              key={index}
              className={`text-2xl flex justify-center ${
                dayName === weekday.toLowerCase()
                  ? "text-black bg-white"
                  : "text-gray-600 bg-gray-500"
              }`}
            >
              {dayName.substring(0, 3).toUpperCase()}
            </Badge>
          ))}
        </div>

        <div className="text-5xl">
          <span>{day}</span>
          <span>/</span>
          <span>{month}</span>
          <span>/</span>
          <span>{year}</span>
        </div>
      </div>

      <div className="text-[550px] flex items-center">
        <span>{hour}</span>
        <span className="animate-blink text-white">:</span>
        <span>{minute}</span>
      </div>
    </div>
  );
}
