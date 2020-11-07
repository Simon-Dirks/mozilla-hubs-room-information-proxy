import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/common';
import { RoomsService } from './services/rooms.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, RoomsService],
})
export class AppModule {}
