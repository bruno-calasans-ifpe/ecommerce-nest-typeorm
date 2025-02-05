import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './client/cliente.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/product.module';
import { ItemOrderModule } from './item_order/item_order.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { ProductCategoryService } from './product_category/product_category.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ecommerce',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClienteModule,
    AddressModule,
    ProductModule,
    OrderModule,
    ItemOrderModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
