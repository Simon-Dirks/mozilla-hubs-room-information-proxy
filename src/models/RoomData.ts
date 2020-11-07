export interface RoomData {
  description: string;
  favorited: boolean;
  id: string;
  images: {
    preview: {
      url: string;
    };
  };
  last_activated_at: string; // Date
  lobby_count: number;
  member_count: number;
  name: string;
  room_size: number;
  scene_id: 'rWgv5zN';
  type: 'room';
  url: string;
  user_data: unknown;
}
