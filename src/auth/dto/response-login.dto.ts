import { ProfileDto } from '../../user/dto/get-profile.dto';

export class ResponseLoginDto {
  accessToken: string;
  user: ProfileDto;
}
