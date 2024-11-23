import { Document } from 'mongoose';

export interface ICar extends Document {
    id: Number;
    brand: String;
    color: String;
    carModel: String;
}
