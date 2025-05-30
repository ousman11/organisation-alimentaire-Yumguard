import { Repository } from 'typeorm';
import { ShoppingItem } from './shopping-item.entity';
export declare class ShoppingService {
    private repo;
    constructor(repo: Repository<ShoppingItem>);
    findAll(): Promise<ShoppingItem[]>;
    create(data: Partial<ShoppingItem>): Promise<ShoppingItem>;
    toggleAjoute(id: number): Promise<ShoppingItem>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
