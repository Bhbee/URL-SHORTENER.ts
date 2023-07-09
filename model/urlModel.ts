import { prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

class UrlMapping {
  @prop({ required: true })
  longUrl!: string;

  @prop({ required: true })
  shortUrl?: string;

  @prop()
  qrCodeUrl?: string;

  @prop({ required: true, ref: 'User' })
  userId!: Ref<User>;

  @prop({ required: true,  default: 0 })
  clicks!: number;
   
}

const UrlMappingModel = getModelForClass(UrlMapping);

export { UrlMapping, UrlMappingModel };
