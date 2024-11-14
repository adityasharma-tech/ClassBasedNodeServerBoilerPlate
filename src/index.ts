import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})
import { ExpressLoader } from './loaders/ExpressLoader';

new ExpressLoader();