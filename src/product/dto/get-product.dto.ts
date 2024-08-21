import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductDto {
  @Type()
  @IsOptional()
  @ApiProperty({ default: 'iphone', required: false })
  @IsString()
  name: string;

  @Type()
  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  minPrice: number;

  @Type()
  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber()
  maxPrice: number;

  @Type()
  @IsOptional()
  @ApiProperty({ default: '1,2', type: String, required: false })
  @Transform(({ value }) => value?.split(','))
  categories: number[];

  @Type()
  @IsOptional()
  @ApiProperty({ required: false, default: 5 })
  @IsNumber()
  limit: number;

  @Type()
  @IsOptional()
  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  page: number;
}
