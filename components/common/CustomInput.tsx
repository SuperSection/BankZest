import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/schemas/auth.schema";

const formSchema = authFormSchema("sign-up");
type formType = z.infer<typeof formSchema>;

type CustomInputProps = {
  formControl: Control<formType>;
  name: FieldPath<formType>;
  label: string;
  placeholder: string;
};

const CustomInput = ({
  formControl,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
