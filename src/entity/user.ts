import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 80,
  })
  @Length(1, 80)
  firstName: string;

  @Column({
    length: 80,
  })
  @Length(1, 80)
  lastName: string;

  @Column({
    length: 80,
  })
  @Length(8, 80)
  password: string;

  @Column({
    length: 100,
  })
  @Length(1, 100)
  @IsEmail()
  email: string;

  @Column({
    length: 80,
  })
  @Length(8, 80)
  confirmationToken: string;

  @Column({
    default: false,
    nullable: false,
  })
  confirmed: boolean;
}

export const userSchema = {
  id: { type: 'number', required: true, example: 1 },
  firstName: { type: 'string', required: true, example: 'John' },
  lastName: { type: 'string', required: true, example: 'Doe' },
  password: { type: 'string', required: true, example: 'password' },
  email: {
    type: 'string',
    required: true,
    example: 'avileslopez.javier@gmail.com',
  },
  confirmationToken: { type: 'string', required: true },
  confirmed: { type: 'boolean', required: true },
};
