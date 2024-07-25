import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/user/guards/jwt-auth.guard";
import { DeskDto } from "../dto/desk.dto";
import { DeskService } from "../services/desk.service";

@Controller('desk')
export class DeskController {
  constructor(private readonly deskService: DeskService) {}

  @Post('create')
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  createDesk(@Body() deskDto: DeskDto) {
    return this.deskService.createDesk(deskDto);
  }
}