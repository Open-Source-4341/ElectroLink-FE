export class ProfileEntity {
  userId!: number;
  companyName!: string;
  taxID!: number;
  companyAddress!: string;
  description!: string;
  certifications!: string[];
  rating!: number;
  reviewsCount!: number;
  reviews!: {
    user: string;
    date: string;
    comment: string;
  }[];
}
