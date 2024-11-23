import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';

@Controller('car')
export class CarController {
    constructor(private carService: CarService) { }

    // دریافت تمام خودروها
    @Get()
    public getCars() {
        return this.carService.getCars();
    }

    // ارسال خودرو جدید
    @Post()
    public postCar(@Body() car: CarDto) {
        return this.carService.postCar(car);
    }

    // دریافت خودرو با شناسه خاص
    @Get(':id')
    public async getCarById(@Param('id') id: number) {
        return this.carService.getCarById(id);
    }

    // حذف خودرو با شناسه خاص
    @Delete(':id')
    public async deleteCarById(@Param('id') id: number) {
        return this.carService.deleteCarById(id);
    }

    // به‌روزرسانی یک ویژگی خاص از خودرو
    @Put(':id')
    public async putCarById(@Param('id') id: number, @Query() query) {
        const propertyName = query.property_name;
        const propertyValue = query.property_value;
        return this.carService.putCarById(id, propertyName, propertyValue);
    }
}
