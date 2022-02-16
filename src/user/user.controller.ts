/* eslint-disable prettier/prettier */
import {
	Controller,
	Get,
	UseGuards,
	Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin', 'user')
	@Get('me')
	getProfile(@Request() req) {
		return this.userService.getOne(req.user.id);
	}

}
