import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/Select';
import { COUNTRIES } from '@/constants';

interface CountryOption {
  countryName: string;
  phoneCode: string;
  countryCode: string;
}

interface CountrySelectProps {
  country?: string;
  onCountryChange: (value: string) => void;
}

export const CountrySelect = ({ country = '+86', onCountryChange }: CountrySelectProps) => {
  // 根据传入的电话代码查找匹配的国家对象
  const selectedCountry = COUNTRIES.find((c) => c.phoneCode === country);
  
  // 如果找到，使用唯一的 'countryCode' (ISO 代码)，否则为 undefined
  const selectValue = selectedCountry?.countryCode;

  const handleValueChange = (val: string) => {
    // val 是唯一的 ISO 代码（例如 "US", "CA"）
    // 我们查找对应的国家以获取电话代码
    const selected = COUNTRIES.find(c => c.countryCode === val);
    if (selected) {
      onCountryChange(selected.phoneCode);
    }
  };

  return (
    <Select value={selectValue} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[100px] h-10 bg-gray-50 border border-gray-300 rounded px-3 py-1 flex-shrink-0 focus:ring-0 focus:border-gray-300 focus:ring-offset-0">
        <span className="truncate">{selectedCountry?.phoneCode}</span>
      </SelectTrigger>

      <SelectContent className="max-h-[226px]">
        {COUNTRIES.map((c: CountryOption) => (
          <SelectItem
            key={c.countryCode}
            value={c.countryCode}
            className="flex items-center justify-between py-2 pr-3 text-gray-900"
          >
            <span>{c.countryName}</span>
            <span className="ml-2">{c.phoneCode}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
