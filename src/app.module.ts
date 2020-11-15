import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/common';
import { RoomsService } from './services/rooms.service';
import { EasyconfigModule } from 'nestjs-easyconfig/dist/easyconfig.module';

@Module({
  imports: [
    HttpModule,
    EasyconfigModule.register({ path: './.env', safe: true }),
  ],
  controllers: [AppController],
  providers: [AppService, RoomsService],
})
export class AppModule {
}
