import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './dto/car.dto';

@Injectable()
export class CarService {
    constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) { }

    // دریافت تمام خودروها
    public async getCars(): Promise<CarDto[]> {
        const cars = await this.carModel.find().exec();
        if (!cars || cars.length === 0) {
            throw new HttpException('Not found', 404);
        }
        return cars.map(car => new CarDto(car));
    }

    // ارسال خودرو جدید
    public async postCar(newCar: CarDto) {
        const car = new this.carModel(newCar);
        return car.save();
    }

    // دریافت خودرو با شناسه خاص
    public async getCarById(id: number): Promise<CarDto> {
        const car = await this.carModel.findOne({ id }).exec();
        if (!car) {
            throw new HttpException('Not found', 404);
        }
        return new CarDto(car);
    }

    // حذف خودرو با شناسه خاص
    public async deleteCarById(id: number): Promise<CarDto> {
        const car = await this.carModel.findOne({ id }).exec();
        if (!car) {
            throw new HttpException('Not found', 404);
        }
        await this.carModel.deleteOne({ id }).exec();
        return new CarDto(car);
    }

    // به‌روزرسانی یک ویژگی خاص از خودرو
    public async putCarById(
        id: number,
        propertyName: string,
        propertyValue: string
    ): Promise<CarDto> {
        const car = await this.carModel
            .findOneAndUpdate({ id }, { [propertyName]: propertyValue }, { new: true })
            .exec();
        if (!car) {
            throw new HttpException('Not found', 404);
        }
        return new CarDto(car);
    }
}
