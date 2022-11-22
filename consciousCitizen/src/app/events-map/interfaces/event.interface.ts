import { IActor } from './actor.interface';
import { IAddress } from './address.interface';
import { IRubric } from './rubric.interface';

export interface IEvent {
  lat: number;
  lng: number;
  description: string;
  type: string;
  name: string;
  address: string;
  date: string;
  firstImageBase64: string;
  secondImageBase64: string;
  isDraft: boolean;
}

export interface IEventDto {
  id: number;
  actor: IActor;
  rubric: IRubric;
  address: IAddress;
  status: boolean;
  theme: string;
  messageText: string;
  date: string;
  result: boolean;
  image: string;
  image2: string;
}
