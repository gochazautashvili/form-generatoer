import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDataType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "./ui/slider";

type Props = FormDataType & { borderColor: string };

const FiledGenerator = ({
  fieldLabel,
  fieldName,
  fieldType,
  required,
  placeholder,
  options,
  borderColor,
}: Props) => {
  switch (fieldType) {
    case "rating":
    case "date":
    case "tel":
    case "email":
    case "number":
    case "password":
    case "text":
      return (
        <div className="flex flex-col gap-1">
          <Input
            style={{ borderColor }}
            id={`${fieldName}`}
            type={fieldType}
            name={fieldName}
            placeholder={placeholder}
            required={required}
          />
        </div>
      );
    case "slider":
      return <Slider defaultValue={[5]} max={10} step={1} min={1} />;

    case "textarea":
      return (
        <Textarea
          style={{ borderColor }}
          className="min-h-[90px]"
          id={`${fieldName}`}
          name={fieldName}
          placeholder={placeholder}
          required={required}
        />
      );

    case "select":
      return (
        <Select name={fieldName}>
          <SelectTrigger
            style={{ borderColor }}
            id={`${fieldName}`}
            className="w-full"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "checkbox":
      if (options) {
        return (
          <>
            {options.map((option) => {
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    style={{ borderColor }}
                    name={option.value}
                    id={`${option.value}`}
                  />
                  <Label
                    htmlFor={`${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </>
        );
      }

      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            style={{ borderColor }}
            name={fieldName}
            id={`${fieldName}`}
          />
          <Label
            htmlFor={`${fieldName}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {fieldLabel}
          </Label>
        </div>
      );

    case "radio":
      return (
        <RadioGroup
          className="flex flex-col gap-2"
          name={fieldName}
          defaultValue={options?.[0].value}
        >
          {options?.map((item) => {
            return (
              <div key={item.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  style={{ borderColor }}
                  value={item.value}
                  id={item.value}
                />
                <Label htmlFor={item.value}>{item.label}</Label>
              </div>
            );
          })}
        </RadioGroup>
      );

    default:
      break;
  }

  return <div></div>;
};

export default FiledGenerator;
