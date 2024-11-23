import { Schema, model } from 'mongoose';
import { ICar } from '../interfaces/car.interface';

export const CarSchema = new Schema<ICar>({
    id: { type: Number, required: true, unique: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    carModel: { type: String, required: true },
}, { timestamps: true });

export const CarModel = model<ICar>('Car', CarSchema);
