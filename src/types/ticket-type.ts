export interface Ticket {
    id: string;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UseTicketsResponse {
    tickets: Ticket[];
    isLoading: boolean;
    error: string | null;
  }
  