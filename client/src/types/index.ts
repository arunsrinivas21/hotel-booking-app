export interface Hotel {
  id?: string;
  name: string;
  description: string;
  price: number;
  location: string;
  address: string;
  facilities: Array<string>;
  roomStatus: string;
  googleMapsUrl: string;
  category: string;
  bedType: string;
  bookingStatus?: boolean;
  bookDetails?: Record<string, any>;
  rating?: number;
}

export interface HotelsListApiResponse {
  status?: number;
  data: Array<Hotel>;
}

export interface HotelApiResponse {
  status?: number;
  data: Hotel;
}