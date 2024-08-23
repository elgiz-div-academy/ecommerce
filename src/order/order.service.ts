import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order.entity';
import { In, Repository } from 'typeorm';
import { FindOrderParams } from './order.type';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductService } from 'src/product/product.service';
import { OrderItem } from 'src/entities/OrderItem.entity';

@Injectable()
export class OrderService {
  constructor(
    private productService: ProductService,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  find(params?: FindOrderParams) {
    let { where, select, relations, pagination } = params || {};
    const limit = pagination.limit || 10;
    const page = pagination.page;
    return this.orderRepo.find({
      where,
      select,
      relations,
      take: limit,
      skip: page * limit,
    });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({
      where: {
        id,
      },
    });
  }

  async create(params: CreateOrderDto) {
    let productIds: number[] = params.items.map((item) => item.productId);
    let products = await this.productService.find({
      where: { id: In(productIds) },
    });

    let totalPrice = 0;
    for (let product of products) {
      totalPrice += product.price;
    }

    let items = products.map((product) => {
      return {
        price: product.price,
        product,
      };
    });

    const order = this.orderRepo.create({ ...params, totalPrice, items });
    await order.save();
    return order;
  }
}
