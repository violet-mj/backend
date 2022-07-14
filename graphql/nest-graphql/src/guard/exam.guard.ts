
import { CanActivate, ConsoleLogger, ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

@Injectable()
export class ExamGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    console.log(ctx.getHandler())
    return true
  }
}