import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './Common.entity';
import { Product } from './Product.entity';

@Entity()
export class Category extends CommonEntity {
  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable()
  products: Product[];
}
