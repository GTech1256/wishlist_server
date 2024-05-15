export class CreateWishDto {
  title: string;
  description?: string;
  url?: string;
  price?: number;
  // image?: File;
  isPublic?: boolean;
}
