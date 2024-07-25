import { IsHexColor, IsString, Length } from "class-validator";

export class StatusDto {
  @IsString()
  @Length(1, 64)
  name: string;

  @IsString()
  @IsHexColor()
  @Length(7, 7)
  color: string;
}