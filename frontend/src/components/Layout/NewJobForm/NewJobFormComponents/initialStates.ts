
export interface NewJobFormState {
    title: string;
    selectedLabel: string;
    company: string;
    selectedSpecialty: string;
    location: string;
    salary: string;
    selectedTypeOfEmployment: string;
    description: string;
    latitude: number;
    longitude: number;
    errorMessages: {
      title: string;
      selectedLabel: string;
      company: string;
      selectedSpecialty: string;
      location: string;
      salary: string;
      selectedTypeOfEmployment: string;
      description: string;
    };
  }
  
  export const initialState: NewJobFormState = {
    title: "",
    selectedLabel: "",
    company: "",
    selectedSpecialty: "",
    location: "",
    salary: "",
    selectedTypeOfEmployment: "",
    description: "",
    latitude: 0,
    longitude: 0,
    errorMessages: {
      title: "",
      selectedLabel: "",
      company: "",
      selectedSpecialty: "",
      location: "",
      salary: "",
      selectedTypeOfEmployment: "",
      description: "",
    },
  };
  