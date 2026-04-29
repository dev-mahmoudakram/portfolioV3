"use client";

import { useEffect, useRef, useState } from "react";
import intlTelInput, { type Iso2 } from "intl-tel-input";
import "intl-tel-input/dist/css/intlTelInput.css";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange }: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const itiRef = useRef<ReturnType<typeof intlTelInput> | null>(null);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inputRef.current) return;

    const iti = intlTelInput(inputRef.current, {
      initialCountry: "auto",
      geoIpLookup: () =>
        fetch("https://ipapi.co/json/")
          .then((r) => r.json())
          .then((data: { country_code?: string }) => (data.country_code ?? "us") as Iso2)
          .catch(() => "us" as Iso2),
      loadUtils: () => import("intl-tel-input/utils"),
      separateDialCode: true,
      dropdownContainer: document.body,
    });

    itiRef.current = iti;

    iti.promise.then(() => {
      readyRef.current = true;
      setReady(true);

      const el = inputRef.current;
      if (!el) return;

      const notify = () => {
        if (itiRef.current) onChange(itiRef.current.getNumber());
      };

      el.addEventListener("input", notify);
      el.addEventListener("countrychange", notify);
    });

    return () => iti.destroy();
  }, []);

  return (
    <div className={`iti-dark relative transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}>
      <input
        ref={inputRef}
        type="tel"
        placeholder="Phone"
        inputMode="numeric"
        onChange={(e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        }}
        className="min-w-0 flex-1 pr-4 text-white"
      />
    </div>
  );
}
