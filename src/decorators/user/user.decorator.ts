import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
});