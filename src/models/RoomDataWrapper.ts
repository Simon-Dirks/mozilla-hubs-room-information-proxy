import { RoomData } from '../models/RoomData';

export interface RoomDataWrapper {
  meta: {
    source: 'favorites';
    next_cursor: number;
    isStale?: boolean; // Added for our use case
  };
  entries: RoomData[];
  suggestions: unknown;
}
