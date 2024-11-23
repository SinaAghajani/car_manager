export class CarDto {
    readonly id: number;
    readonly brand: string;
    readonly color: string;
    readonly carModel: string;

    constructor(car: any) {
        this.id = car.id;
        this.brand = car.brand;
        this.color = car.color;
        this.carModel = car.model;
    }
}
