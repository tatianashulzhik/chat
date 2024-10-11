import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles, RoleType } from './roles.entity';

@Injectable()
export class RolesService implements OnModuleInit {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) { }

    async onModuleInit() {
        const userRole = await this.rolesRepository.findOne({ where: { name: RoleType.USER } });
        if (!userRole) {
            await this.rolesRepository.save({ name: RoleType.USER });
        }

        const adminRole = await this.rolesRepository.findOne({ where: { name: RoleType.ADMIN } });
        if (!adminRole) {
            await this.rolesRepository.save({ name: RoleType.ADMIN });
        }
    }
}
