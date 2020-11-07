import { Injectable } from '@nestjs/common';
import { RoomDataWrapper } from '../models/RoomDataWrapper';
import { HttpService } from '@nestjs/common';

@Injectable()
export class RoomsService {
  constructor(private http: HttpService) {}

  private lastRetrieved: number = 0;
  private rooms: RoomDataWrapper = {
    meta: {
      source: 'favorites',
      next_cursor: 1,
    },
    entries: [
      {
        description: null,
        favorited: true,
        id: 'nNDdfoA',
        images: {
          preview: {
            url:
              'https://uploads-prod.reticulum.io/files/82d09bd8-8a39-485e-bbf8-64fcfbc58d26.jpg',
          },
        },
        last_activated_at: '2020-11-07T13:47:13Z',
        lobby_count: 0,
        member_count: 0,
        name: 'Living Pasts',
        room_size: 50,
        scene_id: 'rWgv5zN',
        type: 'room',
        url: 'https://hubs.mozilla.com/nNDdfoA/living-pasts',
        user_data: null,
      },
    ],
    suggestions: null,
  };

  public async getRooms(): Promise<RoomDataWrapper> {
    const currentTime = Date.now();

    const timeSinceLastRequest = currentTime - this.lastRetrieved; //ms
    const useCache = this.rooms && timeSinceLastRequest < 5000;
    if (useCache) {
      console.log(
        'Using cache, time since last request:',
        timeSinceLastRequest,
      );
    } else {
      console.log('Retrieving rooms information:', currentTime);

      try {
        this.rooms = await this.retrieveRooms();
      } catch (e) {
        console.error('Could not retrieve rooms information; data stale', e);
        this.rooms.meta.isStale = true;
      }

      this.lastRetrieved = currentTime;
    }
    return this.rooms;
  }

  private async retrieveRooms(): Promise<RoomDataWrapper> {
    const url =
      'https://hubs.mozilla.com/api/v1/media/search?source=favorites&type=rooms&user=671602397209952644&cursor=0';
    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyZXQiLCJleHAiOjE2MTIwMDk0MDMsImlhdCI6MTYwNDc1MTgwMywiaXNzIjoicmV0IiwianRpIjoiMzYwMjc1NWItNzU3Yy00MjIwLTk3ODMtYzAyNjg5MTViYWU4IiwibmJmIjoxNjA0NzUxODAyLCJzdWIiOiI2NzE2MDIzOTcyMDk5NTI2NDQiLCJ0eXAiOiJhY2Nlc3MifQ.wiXFDBRaMlD3ot2C82MUpQI8Zjr7JXthkzp6IrrlxatcF5O1JQvNTXmUKNBqjALZtvXMj9V1eAanef1aTFeflQ';

    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response: any = await this.http
      .get(url, { headers: requestHeaders })
      .toPromise();
    return response.data;
  }
}
