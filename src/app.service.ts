import { Injectable } from '@nestjs/common';
import { RoomDataWrapper } from './models/RoomDataWrapper';
import { RoomsService } from './services/rooms.service';

@Injectable()
export class AppService {
  constructor(private roomsService: RoomsService) {}

  async getRooms(): Promise<RoomDataWrapper> {
    return await this.roomsService.getRooms();
  }
}
