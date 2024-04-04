import { ReactElement } from "react";
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from "react-hook-form";

export interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  features: string[];
}

export interface ListItemProps {
  title: string;
  social: string;
  description: string;
  id: number;
}

export interface SearchMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MockupsProps {
  image?: string;
  description?: string;
  username?: string;
  avatar?: string;
  isSubmiting: boolean;
}

export interface InputProps {
  Icon: ReactElement;
  placeHolder: string;
  inpType: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}
