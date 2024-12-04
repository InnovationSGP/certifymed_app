import React, { useState, useMemo, useEffect, useRef } from "react";

const Flag = ({ iso }) => {
  return (
    <img
      src={`https://flagcdn.com/24x18/${iso.toLowerCase()}.png`}
      alt=""
      className="h-4 w-6 rounded-sm object-cover"
    />
  );
};

const PhoneNumberInput = ({ id, value, onChange, error }) => {
  const [countryCode, setCountryCode] = useState("+234");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null); // Ref for the dropdown

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd,cca2"
        );
        const data = await response.json();

        const formattedCountries = data
          .filter((country) => country.idd.root)
          .map((country) => ({
            code: `${country.idd.root}${
              country.idd.suffixes ? country.idd.suffixes[0] : ""
            }`.replace(/\s/g, ""),
            iso: country.cca2,
            name: country.name.common,
            searchName: country.name.common.toLowerCase(),
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formattedCountries);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedCountry = countries.find(
    (country) => country.code === countryCode
  );

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return countries;

    return countries.filter((country) => {
      if (query.match(/^[+\d]/)) {
        const searchCode = query.startsWith("+") ? query : `+${query}`;
        return country.code.startsWith(searchCode);
      }
      const countryName = country.name.toLowerCase();
      return countryName === query || countryName.startsWith(query);
    });
  }, [searchQuery, countries]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    onChange(value);
  };

  return (
    <div
      className={`${
        error ? "border border-rose-500	" : ""
      } flex items-center px-3 gap-3 py-[18px] bg-superSilver placeholder:!text-shadesOn placeholder:opacity-45 text-dimGray outline-primary rounded-xl font-medium h-[55px] xl:h-[60px]`}
    >
      <div className="relative flex items-center gap-4" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-2 items-center justify-between text-sm focus:outline-none"
        >
          <span className="flex items-center gap-1.5 mr-2">
            {selectedCountry && <Flag iso={selectedCountry.iso} />}
            <span>{selectedCountry?.code}</span>
          </span>
          <span className="text-gray-500 block pl-2">▼</span>
        </button>

        {isOpen && (
          <div className="absolute -left-2 top-[40px] max-w-[200px] hide-scrollbar p-[14px] max-h-[244px] z-10 mt-1 w-64 overflow-auto rounded-lg border border-gray-300 bg-white shadow-[0px_4px_24px_0px_rgba(0,0,0,0.20)]">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full placeholder:!text-shadesOn !text-[13px] py-2 text-sm focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
            <div className="space-y-1">
              {loading ? (
                <div className="text-center py-2 text-gray-500">
                  Loading countries...
                </div>
              ) : filteredCountries.length === 0 ? (
                <div className="text-center py-2 text-gray-500">
                  No countries found
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      setCountryCode(country.code);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
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
        placeholder="8123456789"
        value={value}
        onChange={handlePhoneNumberChange}
        className="bg-transparent w-full outline-none"
      />
    </div>
  );
};

export default PhoneNumberInput;
