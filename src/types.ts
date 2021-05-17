import { InputHTMLAttributes, ReactNode } from "react";

export interface FoodProps {
  key: number;
  food: FoodObj;
  handleDelete: (id: number) => void;
  handleEditFood: (food: FoodObj) => void;
}

export interface FoodObj {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

export interface ContainerFoodProps {
  available: boolean;
}


export interface StateProps {
  modalOpen: boolean,
  editModalOpen: boolean,
  editingFood: FoodObj,
  foods: FoodObj[]
}

export interface HeaderProps {
  toggleModal: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}

export interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: ModalSubitData) => void;
}

export interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodObj;
  handleUpdateFood: (food: FoodObj) => void;
}

export interface ModalSubitData extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  description: string,
  price: string,
  image: string
}

export interface InputData extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // icon: IconType;
}

export interface ContainerProps {
  isFilled: boolean;
  isFocused: boolean;
}

export interface IconProps {
  size: number;
}