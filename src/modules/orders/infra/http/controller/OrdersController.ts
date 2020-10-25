import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import AppError from '@shared/errors/AppError';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (!id){
      throw new AppError('id não encontrado');
    }

    const findOrder = container.resolve(FindOrderService);

    const order = await findOrder.execute({
      id,
    });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const customer = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(customer);
  }
}
