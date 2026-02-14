import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Registrant, RegistrantDocument } from './entities/registrant.entity';
import { CreateRegistrantDto } from './dto/create-registrant.dto';
import { UpdateRegistrantDto } from './dto/update-registrant.dto';
import { Setting, SettingDocument } from '../settings/entities/setting.entity';

@Injectable()
export class RegistrantsService {
  constructor(
    @InjectModel(Registrant.name)
    private readonly model: Model<RegistrantDocument>,

    @InjectModel(Setting.name)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  async create(dto: CreateRegistrantDto) {
    const setting = await this.settingModel.findOne();
    if (!setting) {
      throw new BadRequestException('Total seats is not configured.');
    }

    const count = await this.model.countDocuments();
    if (count >= setting.totalSeats) {
      throw new BadRequestException('No seats available.');
    }

    return this.model.create(dto);
  }

  async findAll(search?: string, sort?: string, order?: string) {
    const query: any = {};

    if (search) {
      query.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
      ];
    }

    const sortQuery: any = {};
    if (sort) {
      sortQuery[sort] = order === 'desc' ? -1 : 1;
    }

    return this.model.find(query).sort(sortQuery).exec();
  }

  async countAll(search?: string) {
    const filter = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    return this.model.countDocuments(filter);
  }


  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, dto: UpdateRegistrantDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }
}
