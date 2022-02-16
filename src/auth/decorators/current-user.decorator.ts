/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/schemas/user.schema';

export const CurrentUser = createParamDecorator(
	(data, context: ExecutionContext): User => {
		const req = context.switchToHttp().getRequest();
		return req.user;
	},
);