import { IsNotEmpty } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  title: string;
  description?: string;
  url?: string;
  price?: number;
  // image?: File;
  isPublic?: boolean;
}
