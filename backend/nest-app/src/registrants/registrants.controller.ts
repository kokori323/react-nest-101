import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { RegistrantsService } from './registrants.service';
import { CreateRegistrantDto } from './dto/create-registrant.dto';

@Controller('registrants')
export class RegistrantsController {
  constructor(private readonly service: RegistrantsService) {}

  @Post()
  create(@Body() dto: CreateRegistrantDto) {
    return this.service.create(dto);
  }

  @Get()
async findAll(
  @Query('search') search?: string,
  @Query('sort') sort?: string,
  @Query('order') order?: string,
) {
  const items = await this.service.findAll(search, sort, order);
  const total = await this.service.countAll(search);

  return { total, items };
}


  @Get('count')
  countAll() {
    return this.service.countAll();
  }
}
