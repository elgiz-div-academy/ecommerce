import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from 'src/common/enum/user-roles.enum';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  list() {
    return this.categoryService.find();
  }

  @Get(':id')
  item(@Param('id') id: number) {
    return this.categoryService.findOne({ where: { id } });
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN)
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRoles.ADMIN)
  @ApiBearerAuth()
  delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
