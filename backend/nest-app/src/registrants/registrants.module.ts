import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrantsService } from './registrants.service';
import { RegistrantsController } from './registrants.controller';
import { Registrant, RegistrantSchema } from './entities/registrant.entity';

import { Setting, SettingSchema } from '../settings/entities/setting.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Registrant.name, schema: RegistrantSchema },
      { name: Setting.name, schema: SettingSchema },
    ]),
  ],
  controllers: [RegistrantsController],
  providers: [RegistrantsService],
})
export class RegistrantsModule {}
