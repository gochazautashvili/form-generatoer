import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FiledSchema, selectTypes, TFiledSchema } from "./validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormDataType, GeneratedFormType } from "@/types";
import { create_field } from "./actions";
import { toast } from "@/hooks/use-toast";

interface Props {
  type: "edit" | "create";
  field?: FormDataType;
  formData: GeneratedFormType;
  onEdit?: () => void;
}

const CreateFiledDialog = ({ type, field, formData, onEdit }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(field?.fieldType || "");
  const [isPending, startGenerate] = useTransition();

  const options = field?.options?.flatMap((item) => item.value).join(",");

  const form = useForm<TFiledSchema>({
    resolver: zodResolver(FiledSchema),
    defaultValues: {
      fieldLabel: field?.fieldLabel || "",
      fieldName: field?.fieldName || "",
      fieldType: field?.fieldType || "text",
      options: options || "",
      placeholder: field?.placeholder || "",
      required: field?.required || false,

      formSubheading: formData?.formSubheading || "",
      formTitle: formData?.formTitle || "",
    },
  });

  const optionedTypes = ["radio", "checkbox", "select"];
  const showOptions = optionedTypes.includes(selectedType);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const onSubmit = (values: TFiledSchema) => {
    const options = values.options?.split(",");
    const optionsValues = options?.map((item) => {
      return { value: item, label: item };
    });

    const editFormFields = formData?.formFields.map((item) => {
      if (item.id === field?.id) {
        return {
          placeholder: values.placeholder,
          fieldLabel: values.fieldLabel,
          fieldName: values.fieldName,
          fieldType: values.fieldType,
          required: values.required,
          options: optionsValues,
          id: `${Date.now()}`,
        };
      }

      return item;
    });

    const createFormFields = [
      ...(formData?.formFields || []),
      {
        placeholder: values.placeholder,
        fieldLabel: values.fieldLabel,
        fieldName: values.fieldName,
        fieldType: values.fieldType,
        required: values.required,
        options: optionsValues,
        id: `${Date.now()}`,
      },
    ];

    const newData: GeneratedFormType = {
      formTitle: values.formTitle,
      formSubheading: values.formSubheading,
      formFields: type === "edit" ? editFormFields : createFormFields,
    };

    const newJsonForm = JSON.stringify(newData);

    startGenerate(() => {
      create_field(newJsonForm).then((res) => {
        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }

        if (res.success) {
          form.reset();
          onEdit?.();
          setOpen(false);
          toast({ description: res.message });
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-800 w-full">
          <Pencil className="size-4 mr-3" />{" "}
          {type === "edit" ? "Edit" : "Create Form Field"}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === "edit"
              ? "Edit Your Form filed"
              : "Create Your Form filed"}
          </DialogTitle>
          <DialogDescription>
            {type === "edit"
              ? "If you wont to edit your form filed you can make it here."
              : "If you wont to add your form filed you can make it here."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="formTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create Or Edit Form Title</FormLabel>
                  <FormControl>
                    <Input placeholder="form title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formSubheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create Or Edit Form Subheading</FormLabel>
                  <FormControl>
                    <Input placeholder="form subheading..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fieldType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTypeChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[280px] overflow-y-auto">
                      {selectTypes.map((item) => {
                        return (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showOptions && (
              <FormField
                control={form.control}
                name="options"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Options</FormLabel>
                    <FormControl>
                      <Input placeholder="Red,Blue,Green" {...field} />
                    </FormControl>
                    <FormDescription>
                      Separate options with commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="fieldName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This name will appear on your page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fieldLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Field Label..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="placeholder..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="required"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Required?</FormLabel>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-500 mt-1 w-full"
            >
              {isPending && <Loader2 className="animate-spin size-4 mr-3" />}
              {type === "edit" ? "Edit" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFiledDialog;
