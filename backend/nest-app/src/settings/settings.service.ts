import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Setting, SettingDocument } from './entities/setting.entity';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name)
    private readonly model: Model<SettingDocument>,
  ) {}

  async create(dto: CreateSettingDto) {
    const existing = await this.model.findOne();

    if (existing) {
      existing.totalSeats = dto.totalSeats;
      return existing.save();
    }

    return this.model.create(dto);
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, dto: UpdateSettingDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  async remainingSeats() {
    const setting = await this.model.findOne();
    if (!setting) return { remaining: 0 };

    const registrantCount = await this.model.db
      .collection('registrants')
      .countDocuments();

    return {
      remaining: setting.totalSeats - registrantCount,
    };
  }
}
