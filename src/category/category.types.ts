import { Category } from 'src/entities/Category.entity';
import { FindOptionsWhere } from 'typeorm';

export interface FindCategoryParams {
  where?: FindOptionsWhere<Category>;
  select?: Array<keyof Category>;
  relations?: string[];
}
