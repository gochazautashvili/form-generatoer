export type GeneratedFormType = {
  formTitle: string;
  formSubheading: string;
  formFields: FormDataType[];
};

export type FormDataType = {
  id: string;
  fieldName: string;
  fieldLabel: string;
  fieldType: string;
  required: boolean;

  placeholder?: string;
  options?: { value: string; label: string }[];
};

export type FormSubmissionsType = {
  filedName: string;
  filedValue: string;
};

export type StylesType = {
  background: string;
  formBackground: string;
  borderColor: string;
  textColor: string;
  borderWidth: number;
  formBorder: string;
};
