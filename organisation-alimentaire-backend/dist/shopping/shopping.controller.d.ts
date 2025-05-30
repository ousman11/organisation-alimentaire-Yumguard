import { ShoppingService } from './shopping.service';
export declare class ShoppingController {
    private readonly service;
    constructor(service: ShoppingService);
    findAll(): Promise<import("./shopping-item.entity").ShoppingItem[]>;
    create(data: any): Promise<import("./shopping-item.entity").ShoppingItem>;
    toggle(id: string): Promise<import("./shopping-item.entity").ShoppingItem>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
