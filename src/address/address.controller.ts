import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createASddress.dto';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @UsePipes(new ValidationPipe())
    @Post('/:userId')
    async createAddress(
        @Body() CreateAddressDto: CreateAddressDto,
        @Param('userId') userId: number,
    ): Promise<AddressEntity> {
        return this.addressService.createAddress(CreateAddressDto, userId);
    }
}
