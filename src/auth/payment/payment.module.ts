import { Module } from "@nestjs/common";
import { AuthModule } from "../auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            
        ])
    ]
})