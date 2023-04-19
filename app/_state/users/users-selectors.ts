import { createFeatureSelector } from '@ngrx/store';
import { User } from './users-store';
 
export const selectUser = createFeatureSelector<User[]>('user');