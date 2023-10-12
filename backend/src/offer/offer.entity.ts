import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import JobApplication from 'src/jobApplication/jobApplication.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'offers' })
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  label: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  typeOfEmployment: string;

  @Column({ nullable: true })
  salary: string;

  @Column()
  description: string;

  @Column()
  specialties: string;

  @Column('numeric')
  latitude: number;

  @Column('numeric')
  longitude: number;

  @Column('simple-array', { nullable: true })
  applicants: string[];

  @OneToMany(() => JobApplication, (application) => application.offer, {
    cascade: true,
  })
  applications: JobApplication[];

  @ManyToOne(() => User, (user) => user.offers, { eager: false })
  user: User;
}
