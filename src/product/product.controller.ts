import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from 'src/common/enum/user-roles.enum';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  list(@Query() query: GetProductDto) {
    let price: [number, number] = [query.minPrice, query.maxPrice];

    return this.productService.find({
      filter: { ...query, price },
      pagination: { limit: query.limit, page: query.page },
      relations: ['categories'],
    });
  }

  @Get(':id')
  item(@Param('id') id: number) {
    return this.productService.findOne({
      where: { id },
      relations: ['categories'],
    });
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN, UserRoles.CONTENT_MANAGER)
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN, UserRoles.CONTENT_MANAGER)
  update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN, UserRoles.CONTENT_MANAGER)
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
