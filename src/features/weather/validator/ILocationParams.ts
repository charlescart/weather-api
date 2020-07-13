import {
  IsNotEmpty, IsIP, IsOptional, IsString, MinLength,
} from 'class-validator';

export default class ILocationParams {
  @IsNotEmpty()
  @IsIP('4')
  clientIp!: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  city?: string;
}
