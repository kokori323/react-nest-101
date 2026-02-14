import { Controller, Get, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() dto: CreateSettingDto) {
    return this.settingsService.create(dto);
  }

  @Get('remaining')
  remainingSeats() {
    return this.settingsService.remainingSeats();
  }

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }
}
