import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RgbaStringColorPicker } from "react-colorful";
import { StylesType } from "@/types";
import { Slider } from "./ui/slider";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { edit_styles } from "@/actions";
import { toast } from "@/hooks/use-toast";

interface Props {
  handleChangeStyles: (t: string, v: string | number) => void;
  styles: StylesType;
}

const StylePopover = ({ handleChangeStyles, styles }: Props) => {
  const [isPending, startConfirm] = useTransition();
  const onBackgroundChange = (value: string) => {
    handleChangeStyles("background", value);
  };

  const onFormBackgroundChange = (value: string) => {
    handleChangeStyles("formBackground", value);
  };

  const onBorderColorChange = (value: string) => {
    handleChangeStyles("borderColor", value);
  };

  const onTextColorChange = (value: string) => {
    handleChangeStyles("textColor", value);
  };

  const onBorderWidthChange = (value: number[]) => {
    handleChangeStyles("borderWidth", value[0]);
  };

  const onFormBorderChange = (value: string) => {
    handleChangeStyles("formBorder", value);
  };

  const handleEditStyles = () => {
    startConfirm(() => {
      edit_styles(styles).then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          toast({
            description: res.message,
          });
        }
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-400">Styles</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] flex flex-col gap-2 max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Background:</h1>
            <RgbaStringColorPicker
              color={styles.background}
              onChange={onBackgroundChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Form Background:</h1>
            <RgbaStringColorPicker
              color={styles.formBackground}
              onChange={onFormBackgroundChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Border Color:</h1>
            <RgbaStringColorPicker
              color={styles.borderColor}
              onChange={onBorderColorChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">Text Color:</h1>
            <RgbaStringColorPicker
              color={styles.textColor}
              onChange={onTextColorChange}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Form Border Color:</h1>
          <RgbaStringColorPicker
            color={styles.formBorder}
            onChange={onFormBorderChange}
            style={{ width: "100%" }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">
            Form Border Width: {styles.borderWidth}px
          </h1>
          <Slider
            onValueChange={onBorderWidthChange}
            defaultValue={[styles.borderWidth]}
            max={10}
            min={1}
            step={1}
          />
        </div>
        <Button disabled={isPending} onClick={handleEditStyles}>
          {isPending && <Loader2 className="animate-spin mr-3 size-4" />}
          Confirm
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default StylePopover;
