export interface Customer {
    id: string;
    name: string;
}

export interface Factory {
    id: string;
    name: string;
}

export interface Order {
    customerId: string;
    quantity: number;
    date: string;
}

export interface OrderInput {
    customerName: string;
    phoneNumber: string;
    quantity: number;
}

export interface WhatsAppMessage {
    date: string;
    inputBy: string;
    orders: {
        customerName: string;
        quantity: number;
    }[];
} 