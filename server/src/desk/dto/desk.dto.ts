import { ArrayMinSize, IsArray, IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { StatusDto } from "./status.dto";
import { Type } from "class-transformer";

export class DeskDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  avatar_path?: string;

  @IsNumber()
  author: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => StatusDto)
  statuses: StatusDto[];
}
