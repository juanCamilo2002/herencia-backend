import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        if(!user) {
            throw new ForbiddenException("No se encontró un usuario authenticado.");
        }

        if(!requiredRoles.includes(user.role)) {
            throw new ForbiddenException(`Acceso denegado. Requiere uno de los roles: ${requiredRoles.join(', ')}`)
        }

        return true;
    }
}