import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { userInfo } from "os";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";
import { Role } from "./roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector 
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])


        if(!requiredRoles) {
            return true
        }

        const { user } = context.switchToHttp().getRequest()
        console.log("rolesguard", user)
        return requiredRoles.some((role) => user.role?.includes(role))
    }

}