import { ProfileEntity } from '../entity/profile.entity';

export class ProfileAssembler {
  static fromJson(data: any): ProfileEntity {
    const entity = new ProfileEntity();
    entity.userId = data.userId;
    entity.companyName = data.companyName;
    entity.taxID = data.taxID;
    entity.companyAddress = data.companyAddress;
    entity.description = data.description;
    entity.certifications = data.certifications ?? [];
    entity.rating = data.rating;
    entity.reviewsCount = data.reviewsCount;
    entity.reviews = data.reviews ?? [];

    return entity;
  }

  static toJson(entity: ProfileEntity): any {
    return {
      userId: entity.userId,
      companyName: entity.companyName,
      taxID: entity.taxID,
      companyAddress: entity.companyAddress,
      description: entity.description,
      certifications: entity.certifications,
      rating: entity.rating,
      reviewsCount: entity.reviewsCount,
      reviews: entity.reviews
    };
  }
}
