import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class AuthController {
    userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        const users = await this.userService.create(data)
        
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        const users = await this.userService.findAllUser();
    }
}