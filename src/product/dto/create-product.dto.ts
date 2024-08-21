import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @Type()
  @IsString()
  @ApiProperty()
  @Length(3, 50)
  name: string;

  @Type()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @Type()
  @IsString()
  @IsOptional()
  @ApiProperty()
  @MaxLength(500)
  description: string;

  @Type()
  @ApiProperty()
  @IsString()
  @IsUrl()
  image: string;

  @Type()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: Number, isArray: true })
  @IsOptional()
  categories: number[];
}
