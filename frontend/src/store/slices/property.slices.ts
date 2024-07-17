import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interface for Property schema
interface IPropertyForm {
  title?: string;
  description?: string;
  propertyStatus?: string;
  propertyType?: string;
  constructionType?: string;
  price?: {
    amount?: number | null;
    currency?: string;
  };
  size?: number | null;
  roomsSize?: number | null;
  bedRooms?: number | null;
  bathRooms?: number | null;
  builtYear?: number | null;
  floorNumber?: number | null;
  videoUrl?: string;
  amenities?: any;
  location?: {
    country: string;
    address: string;
    street: string;
    city: string;
    zipCode: number | null;
    map?: {
      longitude: number;
      latitude: number;
    };
  };
}

const initialState: { propertyForm: IPropertyForm } = {
  propertyForm: {
    title: "",
    description: "",
    propertyStatus: "",
    propertyType: "",
    constructionType: "",
    roomsSize: null,
    price: {
      amount: null,
      currency: "",
    },
    size: null,
    bedRooms: null,
    bathRooms: null,
    builtYear: null,
    floorNumber: null,
    amenities: [],
    videoUrl: "",
    location: {
      address: "",
      country: "",
      city: "",
      street: "",
      zipCode: null,
      map: {
        longitude: 0,
        latitude: 0,
      },
    },
  },
};

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("propertyForm");
    if (!serializedState) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log("Error loading state from session storage");
    return initialState;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("propertyForm", serializedState);
  } catch (error) {
    console.log("Error When Saving Property Form In SesssionStorage");
  }
};

const propertySlice = createSlice({
  initialState: loadState(),
  name: "property",
  reducers: {
    updatePropertyForm: (state, action: PayloadAction<IPropertyForm>) => {
      state.propertyForm = { ...state.propertyForm, ...action?.payload };
      saveState(state);
    },
    resetPropertyForm: (state) => {
      state.propertyForm = initialState.propertyForm;
      sessionStorage.removeItem("propertyForm");
      saveState(state);
    },
  },
});

export const { updatePropertyForm, resetPropertyForm } = propertySlice.actions;
export default propertySlice.reducer;
