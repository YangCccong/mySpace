// src/User/entities

// import {
//     Column,
//     CreateDateColumn,
//     Entity,
//     PrimaryGeneratedColumn,
//     UpdateDateColumn,
// } from 'typeorm';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type wxUserDocument = wxUser & Document;

@Schema()
export class wxUser extends Document {
    @Prop()
    id: number;

    @Prop()
    createTime: Date;

    @Prop()
    updateTime: Date;

    @Prop('text')
    openid: string

    @Prop({
        default: false,
    })
    isDelete: false;

    @Prop('text')
    nickname: string;

    @Prop('text')
    avatar: string;

    @Prop()
    gender: number;

    // @Prop('text', { select: false, default: null })
    // mobile: string;

    @Prop('text')
    appid: string;

    // @Prop('text', { select: false, default: null })
    // salt: string;

    // @Prop('text', { select: false, default: null })
    // token: string;
}

