import { IsNotEmpty, IsIP } from 'class-validator';

export default class ILocationParams {
  @IsNotEmpty()
  @IsIP('4')
  clientIp!: string;
}
