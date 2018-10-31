from channels.generic.websocket import AsyncWebsocketConsumer
import json
import os
import gzip

with open(os.getcwd() + '/static/products100.json', 'r') as infile:
    json_file = json.load(infile)
    json_file_gzip = gzip.compress(bytes(json.dumps(json_file), encoding='utf-8'))

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        print('text_data', text_data)
        text_data_json = json.loads(text_data)

        if 'getJson' in text_data_json['cmd']:
            # Send JSON
            await self.send(text_data=json.dumps(json_file))

        elif 'getCompressedJson' in text_data_json['cmd']:
            # Send compressed JSON
            await self.send(bytes_data=json_file_gzip)