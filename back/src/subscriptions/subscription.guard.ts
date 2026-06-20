import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Injectable()
export class SubscriptionExistGuard implements CanActivate {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const subscriptionId = request.params.id as string;

    if (!subscriptionId) {
      throw new BadRequestException('Subscription Id is missing');
    }

    const subscription =
      await this.subscriptionsService.findOne(subscriptionId);
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return true;
  }
}
