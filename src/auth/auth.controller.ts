/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';


@Controller('')
export class AuthController {
	constructor(private authService: AuthService) { }

	//Register user

	@Post('/register')
	register(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
		return this.authService.register(signUpDto)
	}

	// Login user 

	@Post('/login')
	login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
		console.log('nest', loginDto);
		return this.authService.login(loginDto);
	}

}
