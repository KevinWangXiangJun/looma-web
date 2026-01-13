import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
  // 注意：如果有多个国家共享相同的代码（例如 +1），这将默认匹配列表中的第一个
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
      <SelectTrigger className="w-[100px] h-10 bg-gray-50 border border-gray-300 rounded px-3 py-1 flex-shrink-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border border-gray-300 rounded max-h-[226px]">
        {COUNTRIES.map((c: CountryOption) => (
          <SelectItem
            key={c.countryCode}
            value={c.countryCode}
            className={`text-sm flex items-center gap-2 py-2 hover:bg-gray-200 data-[state=checked]:bg-gray-300`}
          >
            <span>
              {c.countryName} {c.phoneCode}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelect;
