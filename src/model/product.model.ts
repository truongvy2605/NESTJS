export interface Product {
    id: string,
    name: string,
    price: number,
    description: string,
    stock: number 
}

export interface CartItem {
    item: Product;
    quantity: number;
  }