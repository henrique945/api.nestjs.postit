import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";

export function ProtectTo(): MethodDecorator {
  return (...params) => {
    UseGuards(AuthGuard('jwt'))(...params);
    ApiBearerAuth()(...params);
  };
}