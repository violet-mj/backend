import { ForbiddenException } from "@nestjs/common";
import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";
import Role from '../constant/role.constant'

export const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const { info } = ctx
  const { extensions } = info.parentType.getFields()[info.fieldName]

  const userRole = Role.USER

  if(userRole === extensions.role) {
    throw new ForbiddenException(`User does not have sufficient permission to access ${info.fieldName} field `)
  }

  return next()
}