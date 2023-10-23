import JobApplication from 'src/jobApplication/jobApplication.entity';
import { Offer } from 'src/offer/offer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Role from './role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber?: string; 

  @Column({ nullable: true })
  avatarImage?: string;

  avatarImageFileBuffer?: Buffer;

  avatarImageName?: string;

  @Column({ nullable: true })
  cv?: string; 

  cvFileBuffer?: Buffer;

  cvFileName?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  address?: string; 

  @Column({ nullable: true })
  city?: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.Employee],
  })
  public roles: Role[];

  @OneToMany((_type) => Offer, (offer) => offer.user, { eager: true })
  offers?: Offer[];

  @OneToMany((_type) => JobApplication, (application) => application.user, {
    eager: true,
  })
  applications?: JobApplication[];
}
