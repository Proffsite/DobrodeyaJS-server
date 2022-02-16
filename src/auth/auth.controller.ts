/* eslint-disable prettier/prettier */

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from '../user/dto/login.dto';
import { SignUpDto } from '../user/dto/signup.dto';


@Controller('')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	// Login user 
	@Post('/login')
	login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
		return this.authService.login(loginDto);
	}

	//Register user

	@Post('/register')
	register(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
		return this.authService.register(signUpDto)
	}
}
