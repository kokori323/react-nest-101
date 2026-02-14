import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrantDto } from './create-registrant.dto';

export class UpdateRegistrantDto extends PartialType(CreateRegistrantDto) {}
