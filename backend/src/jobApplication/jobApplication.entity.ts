import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Offer } from '../offer/offer.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'applications' })
export default class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  coverLetter: string;

  @Column({ nullable: true })
  cvFilePath: string;

  @ManyToOne(() => Offer, (offer) => offer.applications, {
    onDelete: 'CASCADE',
  })

  offer: Offer

  @ManyToOne(() => User, (user) => user.offers, { onDelete: 'CASCADE' })
  user: User;
}

