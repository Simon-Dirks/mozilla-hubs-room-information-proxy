import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RoomDataWrapper } from './models/RoomDataWrapper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRooms(): Promise<RoomDataWrapper> {
    return this.appService.getRooms();
  }
}
