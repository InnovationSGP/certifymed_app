"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import countryList from "react-select-country-list";
import { AsYouType, getCountryCallingCode } from "libphonenumber-js/max";

// Get countries list with phone codes
const getCountries = () => {
  const countries = countryList().getData();
  return countries
    .map((country) => {
      try {
        const callingCode = getCountryCallingCode(country.value);
        return {
          name: country.label,
          code: `+${callingCode}`,
          iso: country.value.toLowerCase(),
          format: getPhoneNumberFormat(country.value),
        };
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean); // Remove null entries
};

// Helper function to get phone number format
const getPhoneNumberFormat = (countryCode) => {
  try {
    const asYouType = new AsYouType(countryCode);
    const example = asYouType.input("1234567890");
    return example.replace(/\d/g, "0");
  } catch {
    return "0000000000";
  }
};

const Flag = ({ iso }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative h-4 w-6">
      <img
        src={`/api/flag/${iso}`}
        alt=""
        className="h-4 w-6 rounded-sm object-cover"
        loading="eager"
        onError={(e) => {
          if (!imgError) {
            setImgError(true);
            e.target.src = `/api/flag/in`;
          }
        }}
      />
    </div>
  );
};

const PhoneNumberInput = ({
  id,
  value: externalValue,
  onChange,
  error,
  disabled = false,
  defaultCountryCode = "+91",
}) => {
  const allCountries = useMemo(() => getCountries(), []);
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [formattedInput, setFormattedInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const initialRender = useRef(true);

  const [countryName, setCountryName] = useState(() => {
    const defaultCountry = allCountries.find(
      (c) => c.code === defaultCountryCode
    );
    return defaultCountry ? defaultCountry.name : "India";
  });

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (externalValue) {
      const formatted = formatPhoneNumber(externalValue, selectedCountry);
      setFormattedInput(formatted);
    }
  }, [externalValue]);

  useEffect(() => {
    if (defaultCountryCode && defaultCountryCode !== countryCode) {
      setCountryCode(defaultCountryCode);
      const country = allCountries.find((c) => c.code === defaultCountryCode);
      if (country) {
        setCountryName(country.name);
      }
    }
  }, [defaultCountryCode, allCountries]);

  const selectedCountry = useMemo(
    () =>
      allCountries.find((country) => country.code === countryCode) ||
      allCountries[0],
    [countryCode, allCountries]
  );

  const formatPhoneNumber = (phoneNumber, country) => {
    if (!phoneNumber || !country) return "";
    try {
      const asYouType = new AsYouType(country.iso.toUpperCase());
      return asYouType.input(phoneNumber);
    } catch {
      return phoneNumber;
    }
  };

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allCountries;

    return allCountries.filter((country) => {
      const matchName = country.name.toLowerCase().includes(query);
      const matchCode = country.code
        .toLowerCase()
        .includes(query.startsWith("+") ? query : `+${query}`);
      return matchName || matchCode;
    });
  }, [searchQuery, allCountries]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(true);
  };

  const handleCountrySelect = (country) => {
    setCountryCode(country.code);
    setCountryName(country.name);
    setIsOpen(false);
    setSearchQuery("");

    if (externalValue) {
      const formatted = formatPhoneNumber(externalValue, country);
      setFormattedInput(formatted);
    }

    if (onChange) {
      onChange({
        phoneNumber: externalValue || "",
        countryCode: country.code,
        countryName: country.name,
      });
    }
  };

  const handlePhoneNumberChange = (e) => {
    if (!disabled && onChange && selectedCountry) {
      const inputValue = e.target.value.replace(/[^\d]/g, "");
      const formatted = formatPhoneNumber(inputValue, selectedCountry);
      setFormattedInput(formatted);

      onChange({
        phoneNumber: inputValue,
        countryCode,
        countryName,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`
      flex items-center px-3 gap-3 py-[18px] bg-superSilver placeholder:!text-shadesOn 
      placeholder:opacity-45 text-dimGray outline-primary rounded-xl font-medium h-[55px] xl:h-[60px]
      ${error ? "border border-rose-500" : ""}
      ${disabled ? "opacity-70 cursor-not-allowed pointer-events-none" : ""}
    `}
    >
      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`flex gap-2 items-center justify-between text-sm focus:outline-none
            ${disabled ? "cursor-not-allowed" : ""}`}
          disabled={disabled}
        >
          <span className="flex items-center gap-1.5 mr-2">
            {selectedCountry && <Flag iso={selectedCountry.iso} />}
            <span>{selectedCountry?.code}</span>
          </span>
          {!disabled && <span className="text-gray-500 block pl-2">▼</span>}
        </button>

        {isOpen && !disabled && (
          <div className="absolute -left-2 top-[40px] max-w-[300px] hide-scrollbar p-[14px] max-h-[244px] z-10 mt-1 w-64 overflow-auto rounded-lg border border-gray-300 bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.20)]">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search country or code..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full placeholder:!text-shadesOn !text-[13px] py-2 text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
            <div className="space-y-1">
              {filteredCountries.length === 0 ? (
                <div className="text-center py-2 text-gray-500">
                  No countries found
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.iso}
                    className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-gray-100 rounded-md"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <Flag iso={country.iso} />
                    <span className="text-xs text-shadesOn">
                      {country.code}
                    </span>
                    <span className="text-xs text-nowrap text-left text-shadesOn flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                      {country.name}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <input
        type="tel"
        placeholder={selectedCountry?.format || "0000000000"}
        value={formattedInput}
        onChange={handlePhoneNumberChange}
        className={`bg-transparent w-full outline-none ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneNumberInput;
